/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import SpeechScreen from './src/screens/SpeechScreen';

export type RootStackParamList = {
  Home: undefined;
  Speech: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Speech Text App'}}
        />
        <Stack.Screen
          name="Speech"
          component={SpeechScreen}
          options={{title: 'Speech Recognition'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

