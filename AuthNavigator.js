import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import Fares from './screens/Fares';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const isSignedIn = true; // temporary variable
  return (
    isSignedIn ? (
      <Tab.Navigator>
        <Tab.Screen name="Perfil" component={Profile} />
        <Tab.Screen name="Tarifas" component={Fares} />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    )
  );
};

export default AuthNavigator;
