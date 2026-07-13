function Navbar() {
  return (
    <nav className="bg-slate-950 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚔️</span>

          <h1 className="text-xl font-bold text-blue-500">
            AlgoQuest AI
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>

          <a href="#" className="hover:text-blue-400">
            Worlds
          </a>

          <a href="#" className="hover:text-blue-400">
            Roadmaps
          </a>

          <a href="#" className="hover:text-blue-400">
            AI Mentor
          </a>

          <a href="#" className="hover:text-blue-400">
            About
          </a>
        </div>

        {/* Right Side Buttons */}
        <div className="flex gap-3">
          <button className="rounded-lg px-4 py-2 hover:bg-slate-800">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700">
            Sign Up
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;