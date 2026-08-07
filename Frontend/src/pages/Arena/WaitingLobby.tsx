export default function WaitingLobby(){

const players=[
"Isha",
"Rahul",
"Aman"
];

return(

<div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">

<div className="bg-slate-900 rounded-3xl p-10 w-[700px]">

<h1 className="text-4xl font-bold">
Waiting Lobby
</h1>

<p className="text-slate-400 mt-3">
Waiting for all players...
</p>

<div className="mt-10 space-y-4">

{players.map(player=>(

<div
key={player}
className="bg-slate-800 rounded-xl p-5 flex justify-between"
>

<span>{player}</span>

<span className="text-green-400">
Ready
</span>

</div>

))}

</div>

<button
className="mt-10 bg-red-600 w-full py-4 rounded-xl"
>

Start Battle

</button>

</div>

</div>

);

}