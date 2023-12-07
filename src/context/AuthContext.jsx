import React, { createContext, useState } from 'react';
import BASE_URL from '../../Constants';
import { useToast } from '@gluestack-ui/themed';
import Toasts from '../components/Toasts';
import { Text } from '@gluestack-ui/themed';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        is_active: 0,
        phone: "",
        email: "",
        emergency_phone: "",
        blood_group: {
            id: 0,
            name: ""
        },
        attended_sessions: [],
        payments: [],
        isSignedIn: false,
    });
    // const [user, setUser] = useState({
    //     id: 0,
    //     isSignedIn: false,
    // });
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
                setUser(
                    (prevCriteria) => ({
                        ...prevCriteria,
                        id: loginResponse.data.customer_id,
                        isSignedIn: true,
                    })
                )
            }
            if (loginResponse.data.status === "failed") {
                toast.show({
                    placement: "bottom",
                    containerStyle: {
                        display: "block"
                    },
                    render: ({ id }) => {
                        return <Toasts
                            id={id}
                            title="Error"
                            body={loginResponse.data.errors.internal_error.map((error, id) => <Text key={id}>{error}</Text>)}
                            variant="accent"
                            action="error"
                        />
                    },
                })
                console.log(loginResponse.data);
            }
        } catch (error) {
            toast.show({
                placement: "bottom",
                containerStyle: {
                    display: "block"
                },
                render: ({ id }) => {
                    return <Toasts
                        id={id}
                        title="Error"
                        body={<Text>{error.response.data.message}</Text>}
                        variant="accent"
                        action="error"
                    />
                },
            })
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
                        duration: null,
                        containerStyle: {
                            display: "block"
                        },
                        render: ({ id }) => {
                            return <Toasts
                                id={id}
                                title="Éxito"
                                body={
                                    <>
                                        <VStack gap={12}>
                                            <Text>{response.data.message}</Text>
                                            <Text>Este es el código que se genero asociada a su cuenta con el que accedera a la aplicación</Text>
                                            <Text>En caso de perderse o olvidarse del código tendra que consultar con un administrador</Text>
                                            <Text fontWeight='bold'>Código: {response.data.code}</Text>
                                            <Button
                                                onPress={() => toast.close(id)}
                                                variant="ghost"
                                            >
                                                <ButtonText>Entendido</ButtonText>
                                            </Button>
                                        </VStack>
                                    </>
                                }
                                variant="accent"
                                action="success"
                            />
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
                    containerStyle: {
                        display: "block"
                    },
                    render: ({ id }) => {
                        return <Toasts
                            id={id}
                            title="Error"
                            body={<Text>{error.response.data.message}</Text>}
                            variant="accent"
                            action="error"
                        />
                    },
                })
            });
    };

    const synchronize = async (email, code, password) => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('code', code);
        formData.append('password', password);
        const headers = {
            headers: {
                'Accept': 'application/json',
            },
        }
        BASE_URL.post("/sync-account", formData, headers)
            .then((response) => {
                if (response.data.status === "success") {
                    toast.show({
                        placement: "bottom",
                        containerStyle: {
                            display: "block"
                        },
                        render: ({ id }) => {
                            return <Toasts
                                id={id}
                                title="Éxito"
                                body={
                                    <>
                                        <Text>{response.data.message}</Text>
                                    </>
                                }
                                variant="accent"
                                action="success"
                            />
                        },
                    })
                    setUser({
                        id: response.data.customer_id,
                        isSignedIn: true,
                    })
                }
                if (response.data.status === "failed") {
                    toast.show({
                        placement: "bottom",
                        containerStyle: {
                            display: "block"
                        },
                        render: ({ id }) => {
                            return <Toasts
                                id={id}
                                title="Error"
                                body={<Text>{response.data.message}</Text>}
                                variant="accent"
                                action="error"
                            />
                        },
                    })
                }
            })
            .catch((error) => {
                console.log(error.response);
                toast.show({
                    placement: "bottom",
                    containerStyle: {
                        display: "block"
                    },
                    render: ({ id }) => {
                        return <Toasts
                            id={id}
                            title="Error"
                            body={<Text>{error.response.data.message}</Text>}
                            variant="accent"
                            action="error"
                        />
                    },
                })
            });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                logIn,
                logOut,
                signUp,
                synchronize,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
