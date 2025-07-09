# Schießergebnisse Webanwendung

Dies ist eine vereinfachte Beispielimplementierung einer Anwendung zur Anzeige und Verwaltung von Schießergebnissen. Sie besteht aus einem Node.js-Backend und zwei React-Frontends (Admin und Zuschauer).

* Backend: `backend` (Express, XML-Import)
* Admin-Frontend: `frontend/admin` (React/TypeScript)
* Zuschauer-Frontend: `frontend/viewer` (React/TypeScript)

Alle Texte sind auf Deutsch gehalten. Die React-Komponenten zeigen lediglich die geladenen XML-Daten an und können als Ausgangsbasis für eine vollständige Umsetzung dienen.

## Schnellstart

1. Backend starten:

   ```bash
   cd shooting-app/backend
   npm install
   npm start
   ```

2. Admin-Frontend starten:

   ```bash
   cd shooting-app/frontend/admin
   npm install
   npm start
   ```

3. Zuschauer-Frontend starten:

   ```bash
   cd shooting-app/frontend/viewer
   npm install
   npm start
   ```

Alle Anwendungen laufen lokal (“Admin” auf http://localhost:5173, “Zuschauer” auf einem zweiten Port). Das Backend stellt die API auf Port 3001 bereit.
