import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calendar, CreditCard, User } from 'lucide-react-native';
import React, { useContext } from 'react';
import SessionsNavigation from './SessionsNavigation';
import Fares from './src/screens/Fares';
import Login from './src/screens/Login';
import Profile from './src/screens/Profile';
import SignUp from './src/screens/SignUp';
import { AuthContext } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
    const { user } = useContext(AuthContext);
    return (
        user.isSignedIn ? (
            <Tab.Navigator
                initialRouteName='Clases'
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
                <Tab.Screen name="Clases" component={SessionsNavigation} options={{ headerShown: false }} />
            </Tab.Navigator>
        ) : (
            <Stack.Navigator initialRouteName='Iniciar Sesión'>
                <Stack.Screen name="Iniciar Sesión" component={Login} />
                <Stack.Screen name="Registro" component={SignUp} />
            </Stack.Navigator>
        )
    );
};

export default AuthNavigator;
