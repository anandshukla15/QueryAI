import { useState } from "react";
import { askAi } from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StateCard";
import AIChat from "../components/AiChat";
import ResultPanel from "../components/ResultPanel";

export default function Dashboard() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleAsk = async (q) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const response = await askAi(q, token);
      setResult(response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="p-8 space-y-8">
          {/* STATS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Revenue" value="₹1.2M" icon="💰" />
            <StatCard title="Monthly Growth" value="+18%" icon="📈" />
            <StatCard title="Active Customers" value="3,240" icon="👥" />
          </section>

          {/* AI AREA */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <AIChat
                question={question}
                setQuestion={setQuestion}
                onAsk={handleAsk}
                loading={loading}
              />
            </div>

            <div className="lg:col-span-3">
              <ResultPanel result={result} loading={loading} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
