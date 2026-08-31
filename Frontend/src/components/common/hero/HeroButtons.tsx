import { useNavigate } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";

function HeroButtons() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Button
        size="lg"
        variant="primary"
        onClick={() => navigate(isAuthenticated ? "/portal" : "/journey")}
      >
        <span>Start Learning Now</span>
        <ArrowRight size={18} />
      </Button>

      <Button size="lg" variant="glass" onClick={() => navigate("/journey")}>
        <Compass size={18} />
        <span>Explore Curricula</span>
      </Button>
    </div>
  );
}


export default HeroButtons;