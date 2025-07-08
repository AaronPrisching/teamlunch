# TeamLunch - Offline-Funktionalität

## Übersicht

TeamLunch unterstützt jetzt umfassende Offline-Funktionalität durch die Implementierung einer Progressive Web App (PWA) mit Service Worker-Technologie.

## Features

### 🔄 Service Worker
- **Automatisches Caching**: Wichtige Ressourcen werden automatisch gecacht
- **Offline-Fallback**: Zeigt eine dedizierte Offline-Seite bei fehlender Internetverbindung
- **Update-Management**: Benachrichtigt Benutzer über verfügbare App-Updates

### 📱 Progressive Web App (PWA)
- **Installierbar**: App kann auf dem Homescreen installiert werden
- **App-ähnliche Erfahrung**: Vollbild-Modus ohne Browser-UI
- **Plattformübergreifend**: Funktioniert auf Desktop und Mobile

### 🌐 Offline-Erkennung
- **Echtzeit-Status**: Zeigt aktuellen Verbindungsstatus an
- **Automatische Benachrichtigungen**: Informiert über Verbindungsänderungen
- **Funktionsbeschränkungen**: Deaktiviert Online-Features bei fehlender Verbindung

## Implementierte Dateien

### Core-Dateien
- `sw.js` - Service Worker für Caching und Offline-Funktionalität
- `js/offline.js` - Offline-Manager-Klasse
- `offline.html` - Dedizierte Offline-Seite
- `manifest.json` - Web App Manifest für PWA-Features
- `browserconfig.xml` - Windows-Tile-Konfiguration

### Erweiterte Seiten
- `login.html` - Mit Offline-Warnungen und PWA-Meta-Tags
- `restaurant_menu.html` - Mit Offline-Checks für Warenkorb und Bestellungen

## Funktionalität im Detail

### 1. Service Worker (sw.js)
```javascript
// Cached Ressourcen
- Hauptseiten (/, /offline.html)
- CSS und JavaScript Dateien
- Google Fonts und Tailwind CSS
- Bilder und Icons
```

### 2. Offline Manager (js/offline.js)
```javascript
// Hauptfunktionen
- Service Worker Registrierung
- Netzwerk-Status-Überwachung
- Update-Benachrichtigungen
- Cache-Management
- Verbindungsindikator
```

### 3. Offline-Seite (offline.html)
- Benutzerfreundliche Offline-Nachricht
- Verbindungstest-Funktionalität
- Tipps zur Fehlerbehebung
- Automatische Weiterleitung bei Verbindungswiederherstellung

### 4. PWA-Features (manifest.json)
- App-Name und Beschreibung
- Icons in verschiedenen Größen
- Shortcuts zu wichtigen Seiten
- Standalone-Display-Modus
- Theme-Farben

## Benutzerinteraktion

### Online-Status-Anzeige
- **Grüner Punkt**: Online und verbunden
- **Roter Punkt**: Offline oder keine Verbindung
- **Benachrichtigungen**: Bei Statusänderungen

### Offline-Beschränkungen
- **Login**: Nicht möglich ohne Internetverbindung
- **Warenkorb**: Artikel können nicht hinzugefügt werden
- **Bestellungen**: Checkout ist deaktiviert
- **Abstimmungen**: Nicht verfügbar

### Automatische Funktionen
- **Caching**: Seiten werden automatisch für Offline-Nutzung gespeichert
- **Updates**: Benutzer werden über App-Updates benachrichtigt
- **Wiederherstellung**: Automatische Weiterleitung bei Verbindungswiederherstellung

## Installation als PWA

### Desktop (Chrome/Edge)
1. Besuche die TeamLunch-Website
2. Klicke auf das "Installieren"-Symbol in der Adressleiste
3. Bestätige die Installation
4. App erscheint als eigenständige Anwendung

### Mobile (Android/iOS)
1. Öffne die Website im Browser
2. Tippe auf "Zum Homescreen hinzufügen" (Android) oder "Teilen" → "Zum Home-Bildschirm" (iOS)
3. Bestätige die Installation
4. App-Icon erscheint auf dem Homescreen

## Technische Details

### Cache-Strategie
- **Cache First**: Für statische Ressourcen (CSS, JS, Bilder)
- **Network First**: Für dynamische Inhalte (API-Aufrufe)
- **Offline Fallback**: Für nicht gecachte Seiten

### Update-Mechanismus
- Service Worker prüft automatisch auf Updates
- Benutzer werden über verfügbare Updates benachrichtigt
- Updates können manuell angewendet werden

### Speicher-Management
- Automatische Cache-Bereinigung bei Updates
- Speicherplatz-Überwachung
- Cache-Größen-Reporting

## Browser-Unterstützung

### Vollständig unterstützt
- Chrome 67+
- Firefox 63+
- Safari 11.1+
- Edge 79+

### Teilweise unterstützt
- Internet Explorer (keine Service Worker-Unterstützung)
- Ältere Browser-Versionen

## Entwicklung und Debugging

### Service Worker Debugging
1. Öffne Chrome DevTools
2. Gehe zu "Application" → "Service Workers"
3. Überprüfe Status und Cache-Inhalte

### Cache-Inspektion
1. DevTools → "Application" → "Storage"
2. Überprüfe "Cache Storage" für gecachte Ressourcen

### Offline-Simulation
1. DevTools → "Network"
2. Aktiviere "Offline"-Checkbox
3. Teste Offline-Funktionalität

## Zukünftige Erweiterungen

### Geplante Features
- **Background Sync**: Synchronisation von Daten bei Verbindungswiederherstellung
- **Push Notifications**: Benachrichtigungen über neue Bestellungen
- **Offline-Warenkorb**: Lokale Speicherung von Warenkorb-Inhalten
- **Offline-Abstimmungen**: Lokale Abstimmungen mit späterer Synchronisation

### Performance-Optimierungen
- **Selective Caching**: Intelligentere Cache-Strategien
- **Compression**: Komprimierung von gecachten Ressourcen
- **Lazy Loading**: Verzögertes Laden von nicht-kritischen Ressourcen

## Support und Fehlerbehebung

### Häufige Probleme
1. **Service Worker lädt nicht**: Browser-Cache leeren und neu laden
2. **Offline-Seite wird nicht angezeigt**: Service Worker-Registrierung prüfen
3. **Updates werden nicht angezeigt**: Hard-Refresh (Ctrl+F5) durchführen

### Debugging-Tipps
- Überprüfe Browser-Konsole auf Fehler
- Teste in verschiedenen Browsern
- Verwende DevTools für Service Worker-Debugging
- Prüfe Netzwerk-Tab für fehlgeschlagene Requests

---

*Diese Dokumentation wird regelmäßig aktualisiert, um neue Features und Verbesserungen zu reflektieren.* 