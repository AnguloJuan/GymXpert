import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Clases from './screens/ClasesScreen';
import ClassDetails from './screens/ClassDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClasesNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Iniciar Sesión'>
            <Stack.Screen name="Clases" component={Clases} />
            <Stack.Screen name="Detalles de la clase" component={ClassDetails} />
        </Stack.Navigator>
    )
}

export default ClasesNavigation;
