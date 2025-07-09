import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  [key: string]: any;
}

export default function App() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const load = () =>
      fetch('http://localhost:3001/scores')
        .then((res) => res.json())
        .then(setScores);
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rangliste</h1>
      <table className="min-w-full bg-gray-800 rounded">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Schütze</th>
            <th className="px-2 py-1 text-right">Punkte</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, i) => (
            <tr key={i} className="odd:bg-gray-700">
              <td className="px-2 py-1">{s.name}</td>
              <td className="px-2 py-1 text-right">{s.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
