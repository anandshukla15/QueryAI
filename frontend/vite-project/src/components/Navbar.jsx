export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <h2 className="text-lg font-semibold tracking-wide">
        AI-Powered Analytics
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-gray-300 flex items-center gap-1">
          👤 Anand
        </span>
        <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg text-sm transition">
          Logout
        </button>
      </div>
    </header>
  );
}
