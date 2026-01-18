import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';

interface SpeechResultsEvent {
  value?: string[];
}

interface SpeechErrorEvent {
  error?: {
    message?: string;
    code?: string;
  };
}

const SpeechScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languages = [
    {code: 'en-US', label: 'English'},
    {code: 'hi-IN', label: 'Hindi'},
    {code: 'mr-IN', label: 'Marathi'},
  ];

  const onSpeechStart = useCallback(() => {
    setIsListening(true);
  }, []);

  const onSpeechEnd = useCallback(() => {
    setIsListening(false);
  }, []);

  const onSpeechResults = useCallback((event: SpeechResultsEvent) => {
    if (event.value && event.value.length > 0) {
      setText(event.value[0]);
    }
  }, []);

  const onSpeechError = useCallback((event: SpeechErrorEvent) => {
    console.error('Speech error:', event.error);
    setIsListening(false);
    Alert.alert('Error', `Speech recognition error: ${event.error?.message || 'Unknown error'}`);
  }, []);

  useEffect(() => {
    // Initialize Voice
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Initialize TTS
    Tts.setDefaultLanguage(selectedLanguage);
    Tts.addEventListener('tts-start', () => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', () => setIsSpeaking(false));
    Tts.addEventListener('tts-cancel', () => setIsSpeaking(false));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
    };
  }, [selectedLanguage, onSpeechStart, onSpeechEnd, onSpeechResults, onSpeechError]);

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to recognize speech.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Microphone permission is required for speech recognition.');
        return;
      }

      setText('');
      await Voice.start(selectedLanguage);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      Alert.alert('Error', 'Failed to start speech recognition');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const handleSpeechToText = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const handleTextToSpeech = async () => {
    if (!text.trim()) {
      Alert.alert('No Text', 'Please enter some text to convert to speech.');
      return;
    }

    try {
      if (isSpeaking) {
        await Tts.stop();
      } else {
        await Tts.speak(text);
      }
    } catch (error) {
      console.error('Error with text to speech:', error);
      Alert.alert('Error', 'Failed to convert text to speech');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Speech Recognition & TTS</Text>

        {/* Language Selection */}
        <View style={styles.languageContainer}>
          <Text style={styles.label}>Select Language:</Text>
          <View style={styles.languageButtons}>
            {languages.map(lang => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === lang.code && styles.languageButtonActive,
                ]}
                onPress={() => setSelectedLanguage(lang.code)}>
                <Text
                  style={[
                    styles.languageButtonText,
                    selectedLanguage === lang.code &&
                      styles.languageButtonTextActive,
                  ]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Speech to Text Button */}
        <TouchableOpacity
          style={[
            styles.speechButton,
            isListening && styles.speechButtonActive,
          ]}
          onPress={handleSpeechToText}>
          <Text style={styles.speechButtonText}>
            {isListening ? '🎤 Listening...' : '🎤 Start Speech Recognition'}
          </Text>
        </TouchableOpacity>

        {/* Editable Text Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Recognized Text:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            value={text}
            onChangeText={setText}
            placeholder="Tap the microphone button above to start speech recognition or type here..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Text to Speech Button */}
        <TouchableOpacity
          style={[
            styles.ttsButton,
            isSpeaking && styles.ttsButtonActive,
          ]}
          onPress={handleTextToSpeech}
          disabled={!text.trim()}>
          <Text style={styles.ttsButtonText}>
            {isSpeaking ? '🔊 Speaking...' : '🔊 Convert to Speech'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  languageButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  languageButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  languageButtonText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  languageButtonTextActive: {
    color: '#fff',
  },
  speechButton: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  speechButtonActive: {
    backgroundColor: '#FF3B30',
  },
  speechButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 150,
  },
  ttsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ttsButtonActive: {
    backgroundColor: '#FF9500',
  },
  ttsButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SpeechScreen;
