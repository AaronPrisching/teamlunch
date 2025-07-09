# Shooting Backend (Schießergebnisse)

Ein einfacher Express-Server zur Verwaltung und zum Import von DISAG-XML-Daten.
Im Ordner `data` liegt eine Beispiel-XML (`results.xml`). Beim Start wird diese
Datei eingelesen und über die REST-Schnittstelle bereitgestellt.

## Starten

```bash
npm install
npm start
```

Der Server läuft standardmäßig auf Port **3001** und lädt die XML-Datei aus `config.json`.
