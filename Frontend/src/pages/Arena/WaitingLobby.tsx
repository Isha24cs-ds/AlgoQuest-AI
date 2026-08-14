import { useLocation } from "react-router-dom";

export default function WaitingLobby() {
  const location = useLocation();

  const room = location.state?.room;

  if (!room) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="bg-slate-900 p-10 rounded-2xl border border-slate-800 text-center">
          <h1 className="text-2xl font-bold">No Room Found</h1>
          <p className="text-slate-400 mt-3">
            Join a room first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="bg-slate-900 rounded-3xl p-10 w-[700px] border border-slate-800">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Waiting Lobby
            </h1>

            <p className="text-slate-400 mt-2">
              Waiting for all players...
            </p>

          </div>

          <div className="text-right">

            <p className="text-slate-400 text-sm">
              Room Code
            </p>

            <p className="text-3xl font-bold tracking-widest text-blue-400">
              {room.roomCode}
            </p>

          </div>

        </div>

        <div className="mt-10 space-y-4">

          <div className="bg-slate-800 rounded-xl p-5 flex justify-between items-center border border-slate-700">

            <span className="font-semibold">
              Host (You)
            </span>

            <span className="text-green-400">
              Ready
            </span>

          </div>

        </div>

        <button
          className="w-full mt-10 bg-red-600 hover:bg-red-700 py-4 rounded-xl text-xl font-semibold transition"
        >
          Start Battle
        </button>

      </div>

    </div>
  );
}
