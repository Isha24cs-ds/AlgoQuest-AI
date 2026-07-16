import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JourneySelection from "./pages/JourneySelection";
import WorldMap from "./pages/WorldMap";
import GamePortal from "./pages/GamePortal";
import PracticePage from "./pages/DSA/PracticePage";
import Question from "./pages/DSA/Question";

import DSAHome from "./pages/DSA/DSAHome";
import ArraysKingdom from "./pages/DSA/ArrayKingdom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/portal" element={<GamePortal />} />
      <Route path="/journey" element={<JourneySelection />} />
      <Route path="/worlds" element={<WorldMap />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/question/:id" element={<Question />} />
      <Route path="/dsa" element={<DSAHome />} />
      <Route path="/arrays" element={<ArraysKingdom />} />
    </Routes>
  );
}

export default App;