import express from 'express';
import fs from 'fs';
import { parseStringPromise } from 'xml2js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let config = { xmlPath: './data/results.xml', interval: 5000 };

try {
  const data = fs.readFileSync('./config.json', 'utf8');
  config = JSON.parse(data);
} catch (e) {
  fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
}

let scores = [];
async function importXml() {
  try {
    const xml = fs.readFileSync(config.xmlPath, 'utf8');
    const result = await parseStringPromise(xml);
    scores = (result.results.shooter || []).map((s) => ({
      name: s.name[0],
      score: parseInt(s.score[0], 10) || 0,
    }));
    console.log('XML importiert:', new Date());
  } catch (err) {
    console.error('Fehler beim Import:', err.message);
  }
}

app.post('/login', (req, res) => {
  const {user, pass} = req.body;
  // Dummy-Login
  if (user === 'admin' && pass === 'admin') {
    res.json({role: 'admin'});
  } else if (user === 'auswerter') {
    res.json({role: 'auswerter'});
  } else {
    res.json({role: 'betrachter'});
  }
});

app.get('/scores', (req, res) => {
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  res.json(sorted);
});

app.post('/config/xml-path', (req, res) => {
  const {path} = req.body;
  if (path) {
    config.xmlPath = path;
    fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
    res.json({ok: true});
  } else {
    res.status(400).json({error: 'Pfad fehlt'});
  }
});

app.post('/import', async (req, res) => {
  await importXml();
  res.json({ok: true});
});

setInterval(importXml, config.interval);
importXml();

app.listen(3001, () => console.log('Server laeuft auf Port 3001'));
