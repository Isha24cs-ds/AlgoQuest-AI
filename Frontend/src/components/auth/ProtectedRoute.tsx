import type { ReactNode } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading, openAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, loading, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300 text-xs font-semibold">
        Loading session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 p-6 text-center space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
          <Lock size={28} />
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h2 className="font-heading text-2xl font-extrabold text-white">Access Restricted</h2>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            You must be logged in to access problem solving, practice modules, and contest arenas.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              openAuthModal();
              navigate("/login");
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-xs"
          >
            <LogIn size={15} />
            <span>Log In</span>
          </button>

          <button
            onClick={() => {
              openAuthModal();
              navigate("/signup");
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition border border-slate-700"
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
