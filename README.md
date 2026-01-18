This is a [**React Native**](https://reactnative.dev) project with speech-to-text and text-to-speech capabilities, supporting multiple languages (English, Hindi, and Marathi).

# Speech Text App

A React Native application that enables:
- **Speech-to-Text**: Convert spoken words into editable text
- **Text-to-Speech**: Convert written text into spoken words
- **Multi-Language Support**: English, Hindi, and Marathi

## Features

- 🎤 Real-time speech recognition
- 🔊 Text-to-speech playback
- 🌍 Multi-language support (English, Hindi, Marathi)
- ✏️ Editable text input
- 📱 Works on both Android and iOS

## Technologies Used

- React Native 0.83.1
- [@react-native-voice/voice](https://github.com/react-native-voice/voice) - Speech recognition
- [react-native-tts](https://github.com/ak1394/react-native-tts) - Text-to-speech
- React Navigation - Navigation between screens

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install Dependencies

First, install the project dependencies:

```sh
npm install
```

For iOS, you also need to install CocoaPods dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
npm start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

Make sure you have an Android emulator running or a device connected, then:

```sh
npm run android
```

### iOS

For iOS (macOS only):

```sh
npm run ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

## How to Use

1. **Home Screen**: Launch the app to see the home screen with a button to open the Speech screen.

2. **Speech Screen**:
   - **Select Language**: Choose from English, Hindi, or Marathi using the language buttons.
   - **Speech Recognition**: Tap the "🎤 Start Speech Recognition" button and speak. Your speech will be converted to text in the input field.
   - **Edit Text**: The recognized text is editable - you can modify it as needed.
   - **Text to Speech**: Tap the "🔊 Convert to Speech" button to hear the text read aloud.

## Permissions

The app requires the following permissions:

### Android
- `RECORD_AUDIO` - For speech recognition
- `MODIFY_AUDIO_SETTINGS` - For audio processing

These permissions are automatically requested when you first use the speech recognition feature.

### iOS
- `NSMicrophoneUsageDescription` - For microphone access
- `NSSpeechRecognitionUsageDescription` - For speech recognition

These permissions are prompted when you first use the speech recognition feature.

## Step 4: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully set up and run the Speech Text App. :partying_face:

## Documentation

For detailed information, see:
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [USAGE.md](USAGE.md) - Complete usage guide with tips and troubleshooting

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
