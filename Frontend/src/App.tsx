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
import VariablesPracticePage from "./pages/DSA/VariablesPracticePage";
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
import StringsPracticePage from "./pages/DSA/StringsPracticePage";
// Linked List Pages
import LinkedListTrack from "./pages/DSA/LinkedListTrack";
import LearnLinkedList from "./pages/DSA/LearnLinkedList";
import LinkedListLesson from "./pages/DSA/LinkedListLesson";
import LinkedListPracticePage from "./pages/DSA/LinkedListPracticePage";
// Stack Pages
import StackTrack from "./pages/DSA/StackTrack";
import LearnStack from "./pages/DSA/LearnStack";
import StackLesson from "./pages/DSA/StackLesson";
import StackPracticePage from "./pages/DSA/StackPracticePage";
// Queue Pages
import QueueTrack from "./pages/DSA/QueueTrack";
import LearnQueue from "./pages/DSA/LearnQueue";
import QueueLesson from "./pages/DSA/QueueLesson";
import QueuePracticePage from "./pages/DSA/QueuePracticePage";

// Auth Page
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />
        {/* Auth */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
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
        <Route path="/arena/lobby/:roomCode" element={<WaitingLobby />} />
        {/* ===================== DSA ===================== */}
        <Route path="/dsa" element={<DSAHome />} />
        {/* Variables & Math */}
        <Route path="/variables" element={<VariablesPracticePage />} />
        <Route path="/variables-practice" element={<VariablesPracticePage />} />
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
        <Route path="/strings-practice" element={<StringsPracticePage />} />
        {/* ===================== LINKED LISTS ===================== */}
        <Route path="/linkedlist" element={<LinkedListTrack />} />
        <Route path="/learn-linkedlist" element={<LearnLinkedList />} />
        <Route path="/learn-linkedlist/:id" element={<LinkedListLesson />} />
        <Route path="/linkedlist-practice" element={<LinkedListPracticePage />} />
        {/* ===================== STACK ===================== */}
        <Route path="/stack" element={<StackTrack />} />
        <Route path="/learn-stack" element={<LearnStack />} />
        <Route path="/learn-stack/:id" element={<StackLesson />} />
        <Route path="/stack-practice" element={<StackPracticePage />} />
        {/* ===================== QUEUE ===================== */}
        <Route path="/queue" element={<QueueTrack />} />
        <Route path="/learn-queue" element={<LearnQueue />} />
        <Route path="/learn-queue/:id" element={<QueueLesson />} />
        <Route path="/queue-practice" element={<QueuePracticePage />} />
      </Routes>
  );
}
