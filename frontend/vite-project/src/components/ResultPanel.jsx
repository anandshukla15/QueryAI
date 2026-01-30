export default function ResultPanel({ result, loading }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-full">
      <h3 className="text-lg font-semibold mb-4">Results</h3>

      {loading && (
        <p className="text-slate-400 animate-pulse">
          Analyzing your data...
        </p>
      )}

      {!loading && !result && (
        <p className="text-slate-500 text-sm">
          Your AI-generated insights will appear here.
        </p>
      )}

      {result && (
        <div className="space-y-5 text-sm">
          <div>
            <p className="text-slate-400 mb-1">Generated SQL</p>
            <pre className="bg-black/40 rounded-lg p-3 overflow-x-auto">
              {result.sql}
            </pre>
          </div>

          <div>
            <p className="text-slate-400 mb-1">Result Rows</p>
            <pre className="bg-black/40 rounded-lg p-3 overflow-x-auto">
              {JSON.stringify(result.rows, null, 2)}
            </pre>
          </div>

          <div>
            <p className="text-slate-400 mb-1">Explanation</p>
            <p className="leading-relaxed text-gray-200">
              {result.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
