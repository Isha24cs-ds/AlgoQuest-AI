import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JourneySelection from "./pages/JourneySelection";
import WorldMap from "./pages/WorldMap";
import GamePortal from "./pages/GamePortal";
import Quiz from "./pages/DSA/Quiz";
import PracticePage from "./pages/DSA/PracticePage";
import Question from "./pages/DSA/Question";
import LearnPage from "./pages/DSA/LearnPage";
import DSAHome from "./pages/DSA/DSAHome";
import ArraysKingdom from "./pages/DSA/ArrayKingdom";
import Lesson from "./pages/DSA/Lesson";

function App() {
  return (
    <Routes>
      <Route path="/learn-arrays/:id" element={<Lesson />} /> 
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/portal" element={<GamePortal />} />
      <Route path="/journey" element={<JourneySelection />} />
      <Route path="/worlds" element={<WorldMap />} />

      <Route path="/dsa" element={<DSAHome />} />
      <Route path="/arrays" element={<ArraysKingdom />} />
      <Route path="/learn-arrays" element={<LearnPage />} />

      <Route path="/practice" element={<PracticePage />} />
      <Route path="/question/:slug" element={<Question />} />
    </Routes>
  );
}

export default App;