import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GamePortal() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/journey");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          ⚔ Preparing Your Adventure...
        </h1>

        <p className="mt-4 text-slate-400">
          Loading your journey...
        </p>
      </div>
    </div>
  );
}

export default GamePortal;