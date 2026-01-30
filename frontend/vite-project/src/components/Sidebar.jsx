export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 text-white">
      <h1 className="text-2xl font-bold text-indigo-400 mb-10">
        AI Dashboard
      </h1>

      <nav className="space-y-3 text-gray-300">
        <button className="block w-full text-left px-4 py-2 rounded-lg bg-indigo-500/20 text-white">
          📊 Dashboard
        </button>
        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">
          🤖 AI Analytics
        </button>
        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">
          📁 Datasets
        </button>
        <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-white/10">
          ⚙ Settings
        </button>
      </nav>
    </aside>
  );
}
