export default function AIChat({ question, setQuestion, onAsk, loading }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <h3 className="text-lg font-semibold mb-1">Ask AI</h3>
      <p className="text-sm text-slate-400 mb-4">
        Ask business questions in natural language
      </p>

      <textarea
        rows={4}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
        placeholder="e.g. What were top 5 products by revenue last month?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={() => onAsk(question)}
        disabled={loading}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 py-2.5 rounded-xl font-medium transition"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </div>
  );
}
