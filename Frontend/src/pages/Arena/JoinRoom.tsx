import { useState } from "react";

export default function JoinRoom() {

  const [code,setCode]=useState("");

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="bg-slate-900 rounded-3xl p-10 w-[600px]">

        <h1 className="text-4xl font-bold">
          Join Arena
        </h1>

        <input
          value={code}
          onChange={(e)=>setCode(e.target.value.toUpperCase())}
          placeholder="Enter Room Code"
          className="w-full mt-10 p-5 rounded-xl bg-slate-800 text-3xl tracking-widest text-center"
        />

        <button
          className="w-full mt-8 bg-green-600 py-4 rounded-xl"
        >
          Join Room
        </button>

      </div>

    </div>

  );

}