import { useState } from "react";
import { Copy } from "lucide-react";

export default function CreateRoom() {

  const [roomCode] = useState(
    Math.random().toString(36).substring(2,8).toUpperCase()
  );

  function copyCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  }

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="bg-slate-900 rounded-3xl p-10 w-[600px]">

        <h1 className="text-4xl font-bold">
          Room Created 🎉
        </h1>

        <p className="text-slate-400 mt-3">
          Share this code with your friends.
        </p>

        <div className="bg-slate-800 rounded-xl mt-10 p-8 flex justify-between items-center">

          <span className="text-5xl tracking-widest font-bold">
            {roomCode}
          </span>

          <button onClick={copyCode}>

            <Copy size={30} />

          </button>

        </div>

        <button
          className="mt-10 w-full bg-blue-600 rounded-xl py-4 text-xl"
        >
          Continue →
        </button>

      </div>

    </div>

  );

}