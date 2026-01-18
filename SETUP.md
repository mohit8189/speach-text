# Setup Guide

This document provides detailed instructions for setting up and running the Speech Text App.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20 or higher)
- **npm** or **yarn**
- **React Native development environment**
  - For detailed setup instructions, visit: https://reactnative.dev/docs/set-up-your-environment

### For iOS Development (macOS only)
- **Xcode** (latest version)
- **CocoaPods** (will be installed via bundler)
- **Ruby** (comes with macOS)

### For Android Development
- **Android Studio**
- **Android SDK**
- **Java Development Kit (JDK)**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/mohit8189/speach-text.git
cd speach-text
```

### 2. Install Dependencies

```bash
npm install
```

### 3. iOS Setup (macOS only)

Navigate to the iOS directory and install CocoaPods:

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### 4. Android Setup

No additional setup required for Android. The project is ready to build once you've installed the npm dependencies.

## Running the App

### Start Metro Bundler

In your terminal, run:

```bash
npm start
```

This will start the Metro bundler, which is the JavaScript bundler for React Native.

### Run on Android

With Metro running, open a new terminal window and run:

```bash
npm run android
```

Make sure you have:
- An Android emulator running, OR
- A physical Android device connected via USB with USB debugging enabled

### Run on iOS (macOS only)

With Metro running, open a new terminal window and run:

```bash
npm run ios
```

This will build and run the app on the iOS Simulator.

## Troubleshooting

### Android Issues

1. **Build Failed**: Make sure Android Studio is installed and the Android SDK is properly configured.
2. **App doesn't load**: Clear the Metro cache: `npm start -- --reset-cache`
3. **Permission errors**: Ensure USB debugging is enabled on your Android device.

### iOS Issues

1. **Pod install fails**: Try running `bundle exec pod install --repo-update`
2. **Build fails in Xcode**: Clean the build folder (Product > Clean Build Folder)
3. **Simulator not found**: Open Xcode and install additional simulators

### Speech Recognition Issues

1. **Microphone not working**: Make sure you've granted microphone permissions
2. **Recognition fails**: Ensure you have an active internet connection (some speech recognition services require internet)
3. **No audio output**: Check device volume and ensure TTS is properly initialized

## Features

### Language Support

The app supports three languages:
- **English** (en-US)
- **Hindi** (hi-IN)
- **Marathi** (mr-IN)

### Permissions

#### Android
The app will request the following permissions at runtime:
- `RECORD_AUDIO` - Required for speech recognition

#### iOS
The app will request permissions when you first use speech recognition:
- Microphone access
- Speech recognition

## Development

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

## Project Structure

```
├── src/
│   └── screens/
│       ├── HomeScreen.tsx      # Main home screen
│       └── SpeechScreen.tsx    # Speech recognition and TTS screen
├── android/                    # Android native code
├── ios/                        # iOS native code
├── App.tsx                     # Main app component with navigation
├── index.js                    # Entry point
└── package.json               # Dependencies and scripts
```

## Libraries Used

- **@react-native-voice/voice** - Speech recognition
- **react-native-tts** - Text-to-speech
- **@react-navigation/native** - Navigation
- **@react-navigation/native-stack** - Stack navigator

## Support

For issues and questions:
- Check the [React Native documentation](https://reactnative.dev/docs/getting-started)
- Visit the [GitHub repository](https://github.com/mohit8189/speach-text)
