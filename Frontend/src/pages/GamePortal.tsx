import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function GamePortal() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/journey");
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] text-slate-900">
      <div className="text-center flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <h1 className="text-xl font-bold font-heading text-slate-900">
          Loading AlgoQuest AI...
        </h1>
        <p className="text-xs text-slate-500">
          Initializing interactive environment
        </p>
      </div>
    </div>
  );
}

export default GamePortal;