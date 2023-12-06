import React, { createContext, useState, useEffect } from 'react';
import BASE_URL from '../../Constants';
import { Toast, VStack } from '@gluestack-ui/themed';
import { ToastTitle } from '@gluestack-ui/themed';
import { ToastDescription } from '@gluestack-ui/themed';
import { useToast } from '@gluestack-ui/themed';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    /* const [user, setUser] = useState({
        id: 0,
        name: '',
        code: '',
        phone: '',
        emergencyPhone: '',
        email: '',
        bloodGroup: {
            id: 0,
            name: '',
        },
        isActive: 0,
        payments: [],
        attended_sessions: [],
    }); */
    const [user, setUser] = useState({
        id: 0,
        isSignedIn: false,
    });
    const toast = useToast();

    const logIn = async (code, password) => {
        const formData = new FormData();
        formData.append('code', code);
        formData.append('password', password);
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        }
        try {
            const loginResponse = await BASE_URL.post('/login', formData, headers);
            if (loginResponse.data.status === "success") {
                setUser({
                    id: loginResponse.data.customer_id,
                    isSignedIn: true,
                })
            }
            console.log(loginResponse.data);
        } catch (error) {
            alert('Datos incorrectos', 'Por favor, verifica tus datos');
            console.log(error);
        }
    };

    const logOut = async () => {
        try {
            setUser({
                id: 0,
                isSignedIn: false,
            })
        } catch (error) {
            console.error(error);
        }
    };

    const signUp = async (user) => {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('phone', user.phone);
        formData.append('emergency_phone', user.emergency_phone);
        formData.append('email', user.email);
        formData.append('blood_group_id', user.blood_group_id);
        formData.append('password', user.password);
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        }
        BASE_URL.post("/sign-up", formData, headers)
            .then((response) => {
                if (response.data.status === "success") {
                    toast.show({
                        placement: "bottom",
                        render: ({ id }) => {
                            return (
                                <Toast nativeId={id} action="success" variant="accent">
                                    <VStack space="xs">
                                        <ToastTitle>Éxito</ToastTitle>
                                        <ToastDescription>
                                            {response.data.message}
                                            Codigo: {response.data.code}
                                        </ToastDescription>
                                    </VStack>
                                </Toast>
                            );
                        },
                    })
                    setUser({
                        id: response.data.customer_id,
                        isSignedIn: true,
                    })
                }
            })
            .catch((error) => {
                console.log(error.response);
                toast.show({
                    placement: "bottom",
                    render: ({ id }) => {
                        return (
                            <Toast nativeId={id} action="error" variant="accent">
                                <VStack space="xs">
                                    <ToastTitle>Error</ToastTitle>
                                    <ToastDescription>
                                        {error.response.data.message}
                                    </ToastDescription>
                                </VStack>
                            </Toast>
                        );
                    },
                })
            });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                logIn,
                logOut,
                signUp
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
