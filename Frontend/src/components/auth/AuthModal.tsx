import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Lock, LogIn, UserPlus, X, Sparkles } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const navigate = useNavigate();

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-6 text-slate-900 relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
          title="Close Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-xs">
            <Lock size={22} />
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              <Sparkles size={11} />
              <span>AlgoQuest AI</span>
            </div>

            <h3 className="font-heading text-xl font-extrabold text-slate-900">
              Login Required
            </h3>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            Please log in or create an account to save your DSA progress, use Nova AI mentor, and create/join Arena rooms.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => {
              closeAuthModal();
              navigate("/login");
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs"
          >
            <LogIn size={15} />
            <span>Log In</span>
          </button>

          <button
            onClick={() => {
              closeAuthModal();
              navigate("/signup");
            }}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs"
          >
            <UserPlus size={15} />
            <span>Sign Up</span>
          </button>

          <button
            onClick={closeAuthModal}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
