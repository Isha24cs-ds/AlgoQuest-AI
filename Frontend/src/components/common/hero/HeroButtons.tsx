import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function HeroButtons() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-5">
      <Button onClick={() => navigate("/portal")}>
        🚀 Start Adventure
      </Button>

      <Button
        variant="secondary"
        onClick={() => navigate("/worlds")}
      >
        🌍 Explore Worlds
      </Button>
    </div>
  );
}

export default HeroButtons;