# TeamLunch Mobile Apps 📱

Willkommen zur TeamLunch App-Entwicklung! Diese README erklärt, wie du die TeamLunch Web-App in native mobile Apps für Android, iOS und Desktop-Plattformen konvertieren kannst.

## 🚀 Quick Start

### Voraussetzungen
- Node.js 16+ und npm 8+
- Android Studio (für Android)
- Xcode (für iOS, nur auf macOS)
- Visual Studio (für Windows)

### Installation
```bash
# Repository klonen
git clone https://github.com/teamlunch/app.git
cd teamlunch-app

# Dependencies installieren
npm install

# Capacitor initialisieren
npx cap init

# Plattformen hinzufügen
npx cap add android
npx cap add ios
```

## 📱 Plattform-Setup

### Android
```bash
# Android Studio installieren
# https://developer.android.com/studio

# Android SDK konfigurieren
# Tools > SDK Manager > Android SDK

# App bauen und testen
npm run dev

# APK erstellen
npm run build
npx cap copy android
npx cap open android
# In Android Studio: Build > Generate Signed Bundle/APK
```

### iOS
```bash
# Xcode installieren (nur macOS)
# https://developer.apple.com/xcode/

# iOS Simulator testen
npm run dev:ios

# App Store Build
npm run build
npx cap copy ios
npx cap open ios
# In Xcode: Product > Archive
```

### Windows
```bash
# Electron für Desktop
npm install electron electron-builder --save-dev

# Windows App erstellen
npm run build:electron
```

## 🛠️ Entwicklung

### Lokale Entwicklung
```bash
# Web-App entwickeln
npm run serve

# Mobile App testen
npm run dev        # Android
npm run dev:ios    # iOS

# Änderungen synchronisieren
npm run sync
```

### Build-Prozess
```bash
# Web-App bauen
npm run build:web

# Native Apps synchronisieren
npx cap sync

# Plattform-spezifische Builds
npx cap build android
npx cap build ios
```

## 📦 App Store Deployment

### Google Play Store

#### 1. Vorbereitung
- Google Play Console Account ($25 einmalig)
- Keystore für App-Signierung erstellen
- App-Metadaten vorbereiten

#### 2. Build erstellen
```bash
# Release Build
npm run build
npx cap copy android
npx cap open android

# In Android Studio:
# Build > Generate Signed Bundle/APK > Android App Bundle
```

#### 3. Upload
1. Google Play Console öffnen
2. "Neue App erstellen"
3. App Bundle hochladen
4. Store Listing ausfüllen
5. Review einreichen

### Apple App Store

#### 1. Vorbereitung
- Apple Developer Account ($99/Jahr)
- App Store Connect Account
- Provisioning Profiles erstellen

#### 2. Build erstellen
```bash
# Release Build
npm run build
npx cap copy ios
npx cap open ios

# In Xcode:
# Product > Archive
# Window > Organizer > Distribute App
```

#### 3. Upload
1. App Store Connect öffnen
2. Neue App erstellen
3. Build hochladen
4. App-Informationen ausfüllen
5. Review einreichen

### Microsoft Store

#### 1. Electron App erstellen
```bash
# Electron Setup
npm install electron electron-builder --save-dev

# Windows Build
npm run build:electron:win

# MSIX Package erstellen
npm run package:win
```

#### 2. Upload
1. Microsoft Partner Center
2. Neue App-Einreichung
3. MSIX Package hochladen
4. Store Listing ausfüllen

## 🔧 Konfiguration

### Capacitor Config
```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.teamlunch.app',
  appName: 'TeamLunch',
  webDir: 'dist',
  // ... weitere Konfiguration
};
```

### Android Manifest
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
```

### iOS Info.plist
```xml
<!-- ios/App/App/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>TeamLunch benötigt Kamera-Zugriff für Profilbilder</string>
```

## 🔔 Push Notifications

### Firebase Setup
```bash
# Firebase SDK hinzufügen
npm install firebase

# Android: google-services.json hinzufügen
# iOS: GoogleService-Info.plist hinzufügen
```

### Implementation
```javascript
// js/notifications.js
import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });
};
```

## 💾 Offline Storage

### Capacitor Storage
```javascript
// js/storage.js
import { Storage } from '@capacitor/storage';

// Daten speichern
const setItem = async (key, value) => {
  await Storage.set({
    key: key,
    value: JSON.stringify(value)
  });
};

// Daten laden
const getItem = async (key) => {
  const { value } = await Storage.get({ key: key });
  return JSON.parse(value);
};
```

## 🎨 App Icons & Splash Screens

### Icon Generator
```bash
# Capacitor Assets Plugin
npm install @capacitor/assets --save-dev

# Icons generieren
npx capacitor-assets generate --iconBackgroundColor '#0F172A' --iconBackgroundColorDark '#0F172A' --splashBackgroundColor '#0F172A' --splashBackgroundColorDark '#0F172A'
```

### Manuelle Erstellung
- **Android**: `android/app/src/main/res/mipmap-*/ic_launcher.png`
- **iOS**: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

## 🧪 Testing

### Unit Tests
```bash
# Jest Setup
npm install jest @capacitor/core --save-dev

# Tests ausführen
npm test
```

### E2E Tests
```bash
# Appium Setup
npm install appium --save-dev

# Tests ausführen
npm run test:e2e
```

### Device Testing
```bash
# Android Emulator
npx cap run android

# iOS Simulator
npx cap run ios

# Echtes Gerät
npx cap run android --target=device
npx cap run ios --target=device
```

## 📊 Analytics

### Firebase Analytics
```javascript
// js/analytics.js
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';

// Event tracken
const logEvent = async (name, parameters) => {
  await FirebaseAnalytics.logEvent({
    name: name,
    parameters: parameters
  });
};
```

## 🔒 Sicherheit

### App Security
- SSL Pinning implementieren
- Root/Jailbreak Detection
- Code Obfuscation
- API-Keys sicher speichern

### DSGVO Compliance
- Datenschutzerklärung in App
- Consent Management
- Datenexport-Funktion
- Löschung auf Anfrage

## 🚀 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/mobile.yml
name: Mobile App Build

on:
  push:
    branches: [ main ]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build web app
        run: npm run build
      - name: Sync Capacitor
        run: npx cap sync android
      - name: Build Android APK
        run: |
          cd android
          ./gradlew assembleRelease
```

## 📈 Performance Optimization

### Bundle Size
```bash
# Bundle Analyzer
npm install webpack-bundle-analyzer --save-dev
npm run analyze
```

### Lazy Loading
```javascript
// Lazy Loading für große Komponenten
const RestaurantMenu = lazy(() => import('./components/RestaurantMenu'));
```

### Image Optimization
```bash
# WebP Konvertierung
npm install imagemin imagemin-webp --save-dev
```

## 🐛 Debugging

### Chrome DevTools
```bash
# Android WebView debuggen
chrome://inspect/#devices
```

### Safari Web Inspector
```bash
# iOS WebView debuggen
# Safari > Develop > [Device] > [App]
```

### Native Debugging
- **Android**: Android Studio Logcat
- **iOS**: Xcode Console

## 📚 Ressourcen

### Dokumentation
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Ionic Framework](https://ionicframework.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [iOS Developer Guide](https://developer.apple.com/documentation/)

### Tools
- [Capacitor VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ionic.ionic)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/)

### Community
- [Capacitor Discord](https://discord.gg/UPYYRhtyzp)
- [Ionic Forum](https://forum.ionicframework.com/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/capacitor)

## 🆘 Troubleshooting

### Häufige Probleme

#### Android Build Fehler
```bash
# Gradle Cache leeren
cd android
./gradlew clean

# Android SDK aktualisieren
# Android Studio > Tools > SDK Manager
```

#### iOS Build Fehler
```bash
# CocoaPods Cache leeren
cd ios
pod deintegrate
pod install

# Xcode Cache leeren
# Xcode > Product > Clean Build Folder
```

#### Capacitor Sync Probleme
```bash
# Capacitor neu installieren
npm uninstall @capacitor/core @capacitor/cli
npm install @capacitor/core @capacitor/cli
npx cap sync
```

## 📞 Support

Bei Fragen oder Problemen:
- 📧 Email: dev@teamlunch.app
- 💬 Discord: [TeamLunch Community](https://discord.gg/teamlunch)
- 🐛 Issues: [GitHub Issues](https://github.com/teamlunch/app/issues)

---

**Happy Coding! 🚀**

*Erstellt mit ❤️ vom TeamLunch Team* 