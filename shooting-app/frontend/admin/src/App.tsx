import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  // hier könnte eine genauere Typisierung erfolgen
  [key: string]: any;
}

export default function App() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/scores')
      .then(res => res.json())
      .then(setScores);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live-Ergebnisse</h1>
      <pre className="bg-gray-800 p-2 rounded">
        {JSON.stringify(scores, null, 2)}
      </pre>
    </div>
  );
}
