import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JourneySelection from "./pages/JourneySelection";
import WorldMap from "./pages/WorldMap";
import GamePortal from "./pages/GamePortal";

import DSAHome from "./pages/DSA/DSAHome";

// Arrays
import ArrayKingdom from "./pages/DSA/ArrayKingdom";
import LearnPage from "./pages/DSA/LearnPage";
import Lesson from "./pages/DSA/Lesson";
import PracticePage from "./pages/DSA/PracticePage";
import Question from "./pages/DSA/Question";
import Quiz from "./pages/DSA/Quiz";

// Strings
import StringsKingdom from "./pages/DSA/StringsKingdom";
import LearnStrings from "./pages/DSA/LearnStrings";
import StringLesson from "./pages/DSA/StringLesson";

export default function App() {
  return (
    
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Journey Selection */}
        <Route path="/journey" element={<JourneySelection />} />

        {/* World Map */}
        <Route path="/world-map" element={<WorldMap />} />

        {/* Game Portal */}
        <Route path="/portal" element={<GamePortal />} />

        {/* DSA Home */}
        <Route path="/dsa" element={<DSAHome />} />

        {/* ===================== ARRAYS ===================== */}

        <Route path="/arrays" element={<ArrayKingdom />} />

        <Route path="/learn-arrays" element={<LearnPage />} />

        <Route
          path="/learn-arrays/:id"
          element={<Lesson />}
        />

        <Route
          path="/practice"
          element={<PracticePage />}
        />

        <Route
          path="/question/:slug"
          element={<Question />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        {/* ===================== STRINGS ===================== */}

        <Route
          path="/strings"
          element={<StringsKingdom />}
        />

        <Route
          path="/learn-strings"
          element={<LearnStrings />}
        />

        <Route
          path="/learn-strings/:id"
          element={<StringLesson />}
        />

        {/* Future Routes */}

        {/* <Route path="/strings-practice" element={<StringsPractice />} /> */}

        {/* <Route path="/strings-quiz" element={<StringsQuiz />} /> */}

        {/* <Route path="/strings-mini-boss" element={<StringsMiniBoss />} /> */}

        {/* <Route path="/strings-final-boss" element={<StringsFinalBoss />} /> */}

      </Routes>
  
  );
}