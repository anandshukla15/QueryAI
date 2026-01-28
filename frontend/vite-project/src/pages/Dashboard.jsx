import { useState } from "react";
import { askAi } from "../services/api";

export default function Dashboard() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState(null);

    const token= localStorage.getItem("token");

    const handleAsk = async () => {
        const response = await askAi(question, token);
        setAnswer(response.data);
    };




    
  return (
    <div style={{ padding: 40 }}>
      <h2>AI Analytics Dashboard</h2>

      <input
        placeholder="Ask business question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={handleAsk}>Ask AI</button>

      {result && (
        <>
          <h3>SQL Generated:</h3>
          <pre>{result.sql}</pre>

          <h3>Result:</h3>
          <pre>{JSON.stringify(result.rows, null, 2)}</pre>

          <h3>Explanation:</h3>
          <p>{result.explanation}</p>
        </>
      )}
    </div>
  );

}