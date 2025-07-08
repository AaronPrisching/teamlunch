# TeamLunch - Internes Bestellsystem

TeamLunch ist eine moderne, benutzerfreundliche Webanwendung im Stil von Lieferando, die speziell für interne Bestellungen in Unternehmen entwickelt wurde. Mit einem eleganten Dark-Mode-Design, 3D-Effekten und einer intuitiven Benutzeroberfläche erleichtert TeamLunch die Organisation von Teamessen und gemeinsamen Bestellungen.

## Features

- **Dunkles Design**: Eleganter Dark-Mode mit modernen UI-Elementen
- **Abstimmungssystem**: Teammitglieder können für Restaurants abstimmen (clientseitig, pro Browser)
- **Bestellverwaltung**: Einfaches Hinzufügen und Verfolgen von Bestellungen (clientseitig, pro Browser)
- **Benutzerverwaltung**: Registrierung und Login (clientseitig, keine echte Sicherheit)
- **Responsive Design**: Optimiert für Mobilgeräte, Tablets und Desktop-PCs
- **Moderne Effekte**: Glasmorphismus, 3D-Animationen und weiche Übergänge
- **Personalisierung**: Einstellungen für Ernährungsvorlieben und Benachrichtigungen (clientseitig)
- **Bestellhistorie**: Übersicht über vergangene Bestellungen im Benutzerprofil (clientseitig)

## Technologien

- HTML5, CSS3, JavaScript
- TailwindCSS für das Styling
- Responsive Design-Ansatz
- Interaktive Benutzeroberfläche
- **Keine Server- oder Python-Komponenten mehr!**

## Seiten

1. **Startseite** (index.html): Landing Page mit den wichtigsten Features
2. **Login/Registrierung** (login.html / register.html): Benutzerauthentifizierung (clientseitig, keine echte Sicherheit)
3. **Abstimmung** (voting.html): Wöchentliche Abstimmung für Restaurants (clientseitig)
4. **Bestellübersicht** (order.html): Menüs und Bestellstatus mit Warenkorb-Funktionalität (clientseitig)
5. **Admin-Bereich** (admin.html): Verwaltung von Bestellungen und Abstimmungen (nur für den aktuellen Browser/Admin sichtbar)
6. **Benutzerprofil** (profile.html): Persönliche Einstellungen, Bestellhistorie und Präferenzen (clientseitig)
7. **FAQ & Hilfe** (faq.html): Häufig gestellte Fragen und Support-Optionen

## Mobile Unterstützung

Die Anwendung bietet eine spezielle mobile Navigation am unteren Bildschirmrand für Smartphones und Tablets, die einen einfachen Zugriff auf die wichtigsten Funktionen ermöglicht:

- Home
- Abstimmung
- Bestellungen
- Benutzerprofil

## Installation und Verwendung

1. Repository klonen:
   ```
   git clone https://github.com/your-username/team-lunch.git
   ```

2. Zum Projektverzeichnis navigieren:
   ```
   cd team-lunch
   ```

3. Die index.html in einem Browser öffnen **oder** auf GitHub Pages deployen:
   - [GitHub Pages Anleitung](https://pages.github.com/)

**Hinweis:**
- Alle Daten werden im LocalStorage des Browsers gespeichert. Es gibt keine serverweite Synchronisation.
- Passwörter werden clientseitig gehasht, bieten aber keine echte Sicherheit.
- Die Anwendung ist als Demo gedacht und nicht für produktive Umgebungen geeignet.

## Weiterentwicklung

Für eine echte Multi-User-Umgebung mit Sicherheit und Synchronisation ist ein Backend erforderlich (z.B. Node.js, Express, Datenbank). Diese Version ist rein clientseitig und für Demos oder kleine Teams gedacht.

## Lizenz

© 2023 TeamLunch. Alle Rechte vorbehalten.

---

*Diese Anwendung läuft jetzt komplett ohne Backend und kann direkt auf GitHub Pages oder jedem beliebigen statischen Webserver betrieben werden.*

---

*Diese Anwendung wurde als moderne, interne Alternative zu herkömmlichen Essensbestellplattformen entwickelt, um die Zusammenarbeit und das gemeinsame Essen im Team zu fördern.* 