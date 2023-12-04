import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Sessions from './screens/SessionsScreen';
import SessionDetails from './screens/SessionDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SessionsNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Iniciar Sesión'>
            <Stack.Screen name="Clases" component={Sessions} />
            <Stack.Screen name="Detalles de la clase" component={SessionDetails} />
        </Stack.Navigator>
    )
}

export default SessionsNavigation;
