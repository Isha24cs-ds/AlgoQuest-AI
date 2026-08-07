import { useNavigate } from "react-router-dom";
import { PlusCircle, DoorOpen } from "lucide-react";

export default function RoomSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

      <div className="grid md:grid-cols-2 gap-10 w-4/5">

        <div
          onClick={() => navigate("/arena/create")}
          className="cursor-pointer bg-slate-900 rounded-3xl p-10 border border-slate-700 hover:border-blue-500 transition"
        >
          <PlusCircle size={60} className="text-blue-400" />

          <h1 className="text-4xl font-bold mt-6">
            Create Room
          </h1>

          <p className="text-slate-400 mt-4">
            Create a private coding battle and invite friends.
          </p>

        </div>

        <div
          onClick={() => navigate("/arena/join")}
          className="cursor-pointer bg-slate-900 rounded-3xl p-10 border border-slate-700 hover:border-green-500 transition"
        >
          <DoorOpen size={60} className="text-green-400" />

          <h1 className="text-4xl font-bold mt-6">
            Join Room
          </h1>

          <p className="text-slate-400 mt-4">
            Enter a room code and join an existing battle.
          </p>

        </div>

      </div>

    </div>
  );
}