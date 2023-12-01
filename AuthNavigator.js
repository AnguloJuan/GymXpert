import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen';
import Profile from './screens/Profile';
import Fares from './screens/Fares';
import { Calendar, CreditCard, User } from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const isSignedIn = true; // temporary variable
  return (
    isSignedIn ? (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Perfil') {
              return <User color={color} />;
            } else if (route.name === 'Tarifas') {
              return <CreditCard color={color} />;
            } else if (route.name === 'Clases') {
              return <Calendar color={color} />;
            }
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#5d596c',
          tabBarActiveBackgroundColor: '#0077e6',
          tabBarInactiveBackgroundColor: '#fff',
        })}>
        <Tab.Screen name="Perfil" component={Profile} />
        <Tab.Screen name="Tarifas" component={Fares} />
        <Tab.Screen name="Clases" component={Fares} />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    )
  );
};

export default AuthNavigator;
