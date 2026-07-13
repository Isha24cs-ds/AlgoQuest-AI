import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JourneySelection from "./pages/JourneySelection";
import WorldMap from "./pages/WorldMap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/journey" element={<JourneySelection />} />
      <Route path="/worlds" element={<WorldMap />} />
    </Routes>
  );
}

export default App;