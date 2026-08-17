import { Routes, Route } from "react-router-dom";
// Main Pages
import LandingPage from "./pages/LandingPage";
import JourneySelection from "./pages/JourneySelection";
import WorldMap from "./pages/WorldMap";
import GamePortal from "./pages/GamePortal";
// Arena Pages
import ArenaHome from "./pages/Arena/ArenaHome";
import RoomSelection from "./pages/Arena/RoomSelection";
import CreateRoom from "./pages/Arena/CreateRoom";
import JoinRoom from "./pages/Arena/JoinRoom";
import WaitingLobby from "./pages/Arena/WaitingLobby";
// DSA Pages
import DSAHome from "./pages/DSA/DSAHome";
import ArrayKingdom from "./pages/DSA/ArrayKingdom";
import LearnPage from "./pages/DSA/LearnPage";
import Lesson from "./pages/DSA/Lesson";
import PracticePage from "./pages/DSA/PracticePage";
import Question from "./pages/DSA/Question";
import Quiz from "./pages/DSA/Quiz";
// String Pages
import StringsKingdom from "./pages/DSA/StringsKingdom";
import LearnStrings from "./pages/DSA/LearnStrings";
import StringLesson from "./pages/DSA/StringLesson";
import StringsQuiz from "./pages/DSA/StringsQuiz";
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
        {/* ===================== ARENA ===================== */}
        <Route path="/arena" element={<ArenaHome />} />
        <Route
  path="/arena/room/:battleType"
  element={<RoomSelection />}
/>

<Route
  path="/arena/create/:battleType"
  element={<CreateRoom />}
/>

<Route path="/arena/join/:battleType" element={<JoinRoom />}/>
        <Route path="/arena/lobby" element={<WaitingLobby />} />
        {/* ===================== DSA ===================== */}
        <Route path="/dsa" element={<DSAHome />} />
        {/* Arrays */}
        <Route path="/arrays" element={<ArrayKingdom />} />
        <Route path="/learn-arrays" element={<LearnPage />} />
        <Route path="/learn-arrays/:id" element={<Lesson />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/question/:slug" element={<Question />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* ===================== STRINGS ===================== */}
        <Route path="/strings" element={<StringsKingdom />} />
        <Route path="/learn-strings" element={<LearnStrings />} />
        <Route path="/learn-strings/:id" element={<StringLesson />} />
        <Route path="/strings-quiz" element={<StringsQuiz />} />
      </Routes>
  );
}
