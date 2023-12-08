import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LogOutButton from './src/components/LogOutButton';
import SessionDetails from './src/screens/SessionDetails';
import Sessions from './src/screens/Sessions';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SessionsNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Clases' screenOptions={{
            headerRight: () => (
                <LogOutButton />
            ),
        }}>
            <Stack.Screen name="Clases" component={Sessions} />
            <Stack.Screen name="Detalles de la clase" component={SessionDetails} />
        </Stack.Navigator>
    )
}

export default SessionsNavigation;
