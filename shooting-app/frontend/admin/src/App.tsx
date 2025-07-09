import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  // hier könnte eine genauere Typisierung erfolgen
  [key: string]: any;
}

export default function App() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('');

  const login = () => {
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass }),
    })
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  };

  const loadScores = () => {
    fetch('http://localhost:3001/scores')
      .then((res) => res.json())
      .then(setScores);
  };

  useEffect(() => {
    if (role) {
      loadScores();
    }
  }, [role]);

  return (
    <div className="p-4">
      {!role ? (
        <div className="max-w-sm mx-auto space-y-2">
          <h1 className="text-xl font-bold mb-2">Login</h1>
          <input
            className="w-full p-2 rounded text-black"
            placeholder="Benutzer"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="w-full p-2 rounded text-black"
            type="password"
            placeholder="Passwort"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            className="bg-blue-600 px-3 py-2 rounded"
            onClick={login}
          >
            Anmelden
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Live-Ergebnisse ({role})</h1>
          <button
            className="mb-2 bg-blue-600 px-3 py-2 rounded"
            onClick={loadScores}
          >
            Aktualisieren
          </button>
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
      )
    </div>
  );
}
