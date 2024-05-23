import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewMedication from '../NewMedication';
import {
  RootStackParamList,
  RootStackScreens,
} from '../types';
import MainStackScreen from '../stacks/Main';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';


const Application = () => {
  const MainStack = createStackNavigator<RootStackParamList>();

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
      <MainStack.Navigator mode="modal">
        <MainStack.Screen
          name={RootStackScreens.Main}
          options={{ headerShown: false }}
          component={MainStackScreen}
        />
        <MainStack.Screen
          name={RootStackScreens.NewMedication}
          options={{ headerShown: true, headerBackTitleVisible: false }}
          component={NewMedication}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Application;
