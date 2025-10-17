# Alarm Clock PWA & Android App

A fully offline-capable Progressive Web App (PWA) and Android alarm clock application that displays the current time and allows you to set alarms with voice notifications.

## Features

- Real-time clock display
- Set custom alarm times
- Text-to-speech wake-up message: "Hey! It's morning, wake up now!"
- Audio alarm sound
- Browser notifications (when permitted)
- Responsive design with modern UI
- Auto-snooze functionality (repeats every minute until dismissed)
- **Fully offline capable** - works without internet connection
- **Installable as PWA** on mobile and desktop
- **Android APK builds** via GitHub Actions

## Technologies Used

- HTML5
- CSS3 (with modern styling and glassmorphism effects)
- JavaScript (ES6+)
- Web Speech API for text-to-speech
- Web Audio API for alarm sounds
- Notification API for browser notifications
- Service Worker for offline functionality
- Capacitor for Android app packaging
- GitHub Actions for automated APK builds

## How to Use

### Web Version
1. Open `index.html` in a modern web browser
2. The current time will be displayed
3. Enter your desired alarm time using the time input
4. Click "Set Alarm" to activate the alarm
5. When the alarm time is reached, you'll hear the wake-up message and see a notification
6. Click "Clear Alarm" to disable the alarm

### PWA Installation
1. Open the app in Chrome/Chromium browser
2. Click the install icon in the address bar or use the menu
3. The app will be installed and work offline

### Android APK
Download the latest APK from the GitHub Releases page.

## Browser Compatibility

- Chrome/Chromium-based browsers: Full support
- Firefox: Full support
- Safari: Limited support (speech synthesis may vary)
- Edge: Full support

## Permissions

The app requests permission for:
- Browser notifications on first use
- Speech synthesis (works without additional permissions)

## Offline Functionality

The app uses a Service Worker to cache all necessary files, allowing it to work completely offline after the first load.

## Deployment

### Web Deployment
This app can be deployed to any web server or static hosting service like:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### Android APK Build
The app includes automated APK building via GitHub Actions:
1. Push to main/master branch
2. GitHub Actions will automatically build and release the APK
3. Download from the Releases page

## Local Development

### Web Development
Simply open `index.html` in your browser. No build process or server required.

### Android Development
1. Install dependencies: `npm install`
2. Copy files to www directory
3. Sync with Capacitor: `npx cap sync android`
4. Open in Android Studio: `npx cap open android`

## Building APK Locally

```bash
# Install dependencies
npm install

# Copy web files to www directory
mkdir -p www
cp index.html styles.css script.js manifest.json sw.js www/

# Sync with Android
npx cap sync android

# Build APK
cd android
./gradlew assembleDebug
```

The APK will be available at `android/app/build/outputs/apk/debug/app-debug.apk`

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker for offline functionality
├── www/               # Web assets for Capacitor
├── android/           # Android project (generated)
├── capacitor.config.json  # Capacitor configuration
├── package.json       # Node.js dependencies
├── .github/workflows/ # GitHub Actions workflows
└── README.md          # This file
```

## License

This project is open source and available under the MIT License.