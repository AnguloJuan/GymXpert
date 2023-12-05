import React, { createContext, useState, useEffect } from 'react';
import { BASE_URL } from '../../Constants';

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
    const signIn = async (code, password) => {
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
            console.log(loginResponse.data.customer_id);
            if (loginResponse.data.status === "success") {
                setUser({
                    id: loginResponse.data.customer_id,
                    isSignedIn: true,
                })
            }
        } catch (error) {
            alert('Datos incorrectos', 'Por favor, verifica tus datos');
            console.error(error);
        }
    };

    const signOut = async () => {
        try {
            const response = await BASE_URL.post('/logout', {}, {
            });
            console.log(response.data);
            if (response.data.status === "success") {
                setUser({
                    id: 0,
                    isSignedIn: false,
                })
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
