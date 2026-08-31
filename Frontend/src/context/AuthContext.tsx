import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { API_BASE_URL } from "../config";



export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  openAuthModal: (onSuccessAction?: () => void) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void) => boolean;
  executePendingAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("questai_token");
      const storedUser = localStorage.getItem("questai_user");

      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            // Ignore parse error
          }
        }

        // Verify token with backend GET /me
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });


          const data = await res.json();
          if (res.ok && data.success && data.user) {
            setUser(data.user);
            localStorage.setItem("questai_user", JSON.stringify(data.user));
          } else {
            // Invalid token
            logout();
          }
        } catch (err) {
          console.error("Auth verification error:", err);
        }
      }

      setLoading(false);
    }

    initAuth();
  }, []);

  function login(newToken: string, newUser: User) {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("questai_token", newToken);
    localStorage.setItem("questai_user", JSON.stringify(newUser));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("questai_token");
    localStorage.removeItem("questai_user");
  }

  function openAuthModal(onSuccessAction?: () => void) {
    if (onSuccessAction) {
      setPendingAction(() => onSuccessAction);
    }
    setIsAuthModalOpen(true);
  }

  function closeAuthModal() {
    setIsAuthModalOpen(false);
    setPendingAction(null);
  }

  function executePendingAction() {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }

  function requireAuth(action: () => void): boolean {
    if (token && user) {
      action();
      return true;
    }
    openAuthModal(action);
    return false;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        isAuthModalOpen,
        login,
        logout,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        executePendingAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
