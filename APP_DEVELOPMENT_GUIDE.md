# TeamLunch - Native App Entwicklung

## Übersicht

Dieser Leitfaden erklärt, wie TeamLunch als native App für verschiedene Plattformen entwickelt werden kann, um eine echte App-Store-Präsenz zu erreichen.

## 🎯 Zielplattformen

### 1. **Android (Google Play Store)**
### 2. **iOS (Apple App Store)**
### 3. **Windows (Microsoft Store)**
### 4. **macOS (Mac App Store)**
### 5. **Linux (Snap Store, Flatpak)**

---

## 🛠️ Entwicklungsansätze

### Option 1: Cross-Platform Framework (Empfohlen)

#### **Flutter (Google)**
```yaml
# pubspec.yaml
name: teamlunch
description: Gemeinsam bestellen war nie einfacher

dependencies:
  flutter:
    sdk: flutter
  http: ^0.13.5
  shared_preferences: ^2.0.15
  firebase_core: ^2.4.1
  firebase_messaging: ^14.2.1
  sqflite: ^2.2.6
  provider: ^6.0.5
```

**Vorteile:**
- Ein Codebase für alle Plattformen
- Native Performance
- Große Community und Google-Support
- Einfache Integration mit bestehender Web-API

**Entwicklungsschritte:**
1. Flutter SDK installieren
2. Bestehende Web-UI in Flutter Widgets konvertieren
3. HTTP-Client für API-Integration
4. Offline-Speicherung mit SQLite
5. Push-Notifications implementieren
6. App Store Deployment

#### **React Native (Meta)**
```json
{
  "name": "teamlunch",
  "version": "1.0.0",
  "dependencies": {
    "react-native": "^0.72.0",
    "@react-navigation/native": "^6.1.0",
    "@react-native-async-storage/async-storage": "^1.19.0",
    "react-native-push-notification": "^8.1.1",
    "axios": "^1.4.0"
  }
}
```

**Vorteile:**
- Wiederverwendung von React/JavaScript-Kenntnissen
- Große Entwickler-Community
- Hot Reload für schnelle Entwicklung
- Viele Third-Party-Libraries

### Option 2: Progressive Web App (PWA) zu Native

#### **Capacitor (Ionic)**
```json
{
  "name": "teamlunch",
  "version": "1.0.0",
  "dependencies": {
    "@capacitor/core": "^5.0.0",
    "@capacitor/android": "^5.0.0",
    "@capacitor/ios": "^5.0.0",
    "@capacitor/push-notifications": "^5.0.0",
    "@capacitor/storage": "^1.2.5"
  }
}
```

**Vorteile:**
- Bestehende Web-App direkt verwenden
- Minimaler zusätzlicher Code
- Zugriff auf native Device-Features
- Schnelle Markteinführung

#### **Electron (Desktop)**
```json
{
  "name": "teamlunch-desktop",
  "main": "main.js",
  "dependencies": {
    "electron": "^25.0.0",
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "com.teamlunch.app",
    "productName": "TeamLunch",
    "directories": {
      "output": "dist"
    },
    "files": [
      "build/**/*",
      "node_modules/**/*"
    ]
  }
}
```

### Option 3: Native Entwicklung

#### **Android (Kotlin/Java)**
```kotlin
// MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // WebView für bestehende Web-App
        val webView = findViewById<WebView>(R.id.webview)
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("https://teamlunch.app")
    }
}
```

#### **iOS (Swift)**
```swift
// ViewController.swift
import UIKit
import WebKit

class ViewController: UIViewController {
    @IBOutlet weak var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let url = URL(string: "https://teamlunch.app") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
}
```

---

## 📱 Plattform-spezifische Implementierung

### Android Development

#### **1. Projekt Setup**
```bash
# Android Studio Projekt erstellen
flutter create teamlunch_android
cd teamlunch_android

# Dependencies hinzufügen
flutter pub add http shared_preferences firebase_core
```

#### **2. Manifest Konfiguration**
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    
    <application
        android:name=".MainApplication"
        android:label="TeamLunch"
        android:icon="@mipmap/ic_launcher">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme">
            
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
```

#### **3. Build & Release**
```bash
# Debug Build
flutter build apk --debug

# Release Build
flutter build apk --release

# App Bundle für Play Store
flutter build appbundle --release
```

### iOS Development

#### **1. Xcode Konfiguration**
```bash
# iOS Projekt öffnen
open ios/Runner.xcworkspace

# CocoaPods installieren
cd ios && pod install
```

#### **2. Info.plist Konfiguration**
```xml
<!-- ios/Runner/Info.plist -->
<dict>
    <key>CFBundleName</key>
    <string>TeamLunch</string>
    <key>CFBundleIdentifier</key>
    <string>com.teamlunch.app</string>
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
</dict>
```

#### **3. Build & Release**
```bash
# iOS Build
flutter build ios --release

# Archive für App Store
# In Xcode: Product > Archive
```

### Windows Development

#### **1. MSIX Package**
```yaml
# pubspec.yaml
msix_config:
  display_name: TeamLunch
  publisher_display_name: TeamLunch GmbH
  identity_name: com.teamlunch.app
  msix_version: 1.0.0.0
  logo_path: assets/logo.png
```

#### **2. Build für Microsoft Store**
```bash
# Windows App erstellen
flutter build windows

# MSIX Package erstellen
flutter pub run msix:create
```

---

## 🔧 Technische Integration

### API Integration

#### **HTTP Client Setup**
```dart
// lib/services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'https://teamlunch.app/api';
  
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );
    
    return json.decode(response.body);
  }
  
  static Future<List<dynamic>> getRestaurants() async {
    final response = await http.get(
      Uri.parse('$baseUrl/restaurants'),
      headers: {'Authorization': 'Bearer $token'},
    );
    
    return json.decode(response.body);
  }
}
```

### Offline Storage

#### **SQLite Integration**
```dart
// lib/database/database_helper.dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static Database? _database;
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'teamlunch.db');
    
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE orders(id INTEGER PRIMARY KEY, restaurant_id TEXT, items TEXT, total REAL, created_at TEXT)',
        );
      },
    );
  }
}
```

### Push Notifications

#### **Firebase Setup**
```dart
// lib/services/notification_service.dart
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  static final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  
  static Future<void> initialize() async {
    await _messaging.requestPermission();
    
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      // Handle foreground messages
      print('Received message: ${message.notification?.title}');
    });
    
    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  }
  
  static Future<String?> getToken() async {
    return await _messaging.getToken();
  }
}

Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  print('Background message: ${message.notification?.title}');
}
```

---

## 📦 App Store Deployment

### Google Play Store

#### **1. Vorbereitung**
```bash
# Keystore erstellen
keytool -genkey -v -keystore teamlunch-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias teamlunch

# key.properties erstellen
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=teamlunch
storeFile=teamlunch-key.jks
```

#### **2. Build Konfiguration**
```gradle
// android/app/build.gradle
android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

#### **3. Play Console Upload**
1. Google Play Console öffnen
2. Neue App erstellen
3. App Bundle hochladen
4. Store Listing ausfüllen
5. Content Rating durchführen
6. Preise & Vertrieb festlegen
7. Review einreichen

### Apple App Store

#### **1. App Store Connect**
1. Apple Developer Account benötigt ($99/Jahr)
2. App Store Connect öffnen
3. Neue App erstellen
4. Bundle ID registrieren
5. App-Informationen ausfüllen

#### **2. Xcode Archive**
```bash
# Provisioning Profile erstellen
# In Xcode: Signing & Capabilities

# Archive erstellen
# Product > Archive

# App Store Connect Upload
# Window > Organizer > Distribute App
```

### Microsoft Store

#### **1. Partner Center**
1. Microsoft Partner Center Account
2. Neue App-Einreichung
3. MSIX Package hochladen
4. Store Listing ausfüllen
5. Zertifizierung durchführen

---

## 🚀 Deployment Automatisierung

### GitHub Actions CI/CD

#### **Android Deployment**
```yaml
# .github/workflows/android.yml
name: Android Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Java
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
    
    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.10.0'
    
    - name: Build APK
      run: flutter build apk --release
    
    - name: Upload to Play Store
      uses: r0adkll/upload-google-play@v1
      with:
        serviceAccountJsonPlainText: ${{ secrets.SERVICE_ACCOUNT_JSON }}
        packageName: com.teamlunch.app
        releaseFiles: build/app/outputs/bundle/release/app-release.aab
        track: production
```

#### **iOS Deployment**
```yaml
# .github/workflows/ios.yml
name: iOS Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: macos-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.10.0'
    
    - name: Build iOS
      run: |
        flutter build ios --release --no-codesign
        
    - name: Archive & Upload
      run: |
        xcodebuild -workspace ios/Runner.xcworkspace \
                   -scheme Runner \
                   -configuration Release \
                   -archivePath build/Runner.xcarchive \
                   archive
```

---

## 📊 Analytics & Monitoring

### Firebase Analytics
```dart
// lib/services/analytics_service.dart
import 'package:firebase_analytics/firebase_analytics.dart';

class AnalyticsService {
  static final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;
  
  static Future<void> logEvent(String name, Map<String, dynamic> parameters) async {
    await _analytics.logEvent(name: name, parameters: parameters);
  }
  
  static Future<void> setUserId(String userId) async {
    await _analytics.setUserId(id: userId);
  }
}
```

### Crash Reporting
```dart
// lib/services/crash_service.dart
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

class CrashService {
  static Future<void> initialize() async {
    FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;
  }
  
  static Future<void> recordError(dynamic exception, StackTrace stack) async {
    await FirebaseCrashlytics.instance.recordError(exception, stack);
  }
}
```

---

## 💰 Monetarisierung & Business Model

### In-App Purchases
```dart
// lib/services/purchase_service.dart
import 'package:in_app_purchase/in_app_purchase.dart';

class PurchaseService {
  static const String premiumId = 'teamlunch_premium';
  
  static Future<void> buyPremium() async {
    final ProductDetailsResponse response = await InAppPurchase.instance.queryProductDetails({premiumId});
    
    if (response.productDetails.isNotEmpty) {
      final PurchaseParam purchaseParam = PurchaseParam(
        productDetails: response.productDetails.first,
      );
      
      await InAppPurchase.instance.buyNonConsumable(purchaseParam: purchaseParam);
    }
  }
}
```

### Subscription Model
- **Basic**: Kostenlos (bis 5 Benutzer)
- **Pro**: 9,99€/Monat (unbegrenzte Benutzer)
- **Enterprise**: 29,99€/Monat (erweiterte Features)

---

## 🔒 Sicherheit & Compliance

### App Security
```dart
// lib/security/security_service.dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecurityService {
  static const _storage = FlutterSecureStorage();
  
  static Future<void> storeToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }
  
  static Future<String?> getToken() async {
    return await _storage.read(key: 'auth_token');
  }
}
```

### DSGVO Compliance
- Datenschutzerklärung in App
- Cookie-Consent
- Datenexport-Funktion
- Löschung auf Anfrage

---

## 📈 Marketing & ASO (App Store Optimization)

### Keywords
- "Team Lunch"
- "Gemeinsam bestellen"
- "Office Food"
- "Mittagspause"
- "Teambestellung"

### Screenshots
1. Hauptbildschirm mit Restaurants
2. Abstimmungs-Interface
3. Warenkorb und Checkout
4. Team-Dashboard
5. Bestellhistorie

### App Description
```
TeamLunch - Die einfache Art, gemeinsam zu bestellen!

🍕 Gemeinsam abstimmen
👥 Als Team bestellen
⚡ Schnell und einfach
🔔 Push-Benachrichtigungen
📱 Für alle Geräte

Perfekt für Büros, Teams und Gruppen!
```

---

## 🎯 Roadmap & Nächste Schritte

### Phase 1: MVP (Minimum Viable Product)
- [ ] Flutter App Setup
- [ ] Basic UI Implementation
- [ ] API Integration
- [ ] Android Release
- [ ] iOS Release

### Phase 2: Enhanced Features
- [ ] Push Notifications
- [ ] Offline Mode
- [ ] In-App Purchases
- [ ] Windows/macOS Apps

### Phase 3: Advanced Features
- [ ] AI-powered Recommendations
- [ ] Social Features
- [ ] Advanced Analytics
- [ ] Enterprise Features

---

## 📞 Support & Ressourcen

### Entwickler-Ressourcen
- [Flutter Documentation](https://flutter.dev/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Capacitor Docs](https://capacitorjs.com/docs)

### App Store Guidelines
- [Google Play Policies](https://play.google.com/about/developer-policy/)
- [Apple App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Microsoft Store Policies](https://docs.microsoft.com/en-us/windows/uwp/publish/store-policies)

### Tools & Services
- **Design**: Figma, Adobe XD
- **Development**: VS Code, Android Studio, Xcode
- **Testing**: Firebase Test Lab, TestFlight
- **Analytics**: Firebase Analytics, App Annie
- **Monitoring**: Crashlytics, Sentry

---

*Diese Dokumentation wird kontinuierlich aktualisiert, um neue Entwicklungen und Best Practices zu reflektieren.* 