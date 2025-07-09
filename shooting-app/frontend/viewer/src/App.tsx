import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  [key: string]: any;
}

export default function App() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3001/scores')
        .then(res => res.json())
        .then(setScores);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rangliste</h1>
      <pre className="bg-gray-800 p-2 rounded">
        {JSON.stringify(scores, null, 2)}
      </pre>
    </div>
  );
}
