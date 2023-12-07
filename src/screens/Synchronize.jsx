import React, { useContext, useState } from 'react';
import { Box, Button, Link, ButtonText, Center, Image, Text, LinkText, Toast, VStack, ToastTitle, useToast } from '@gluestack-ui/themed';
import StyledInput from '../components/Input';
import { AuthContext } from '../context/AuthContext';
import { ToastDescription } from '@gluestack-ui/themed';
import Toasts from '../components/Toasts';

const Synchronize = ({ navigation }) => {
    const { synchronize } = useContext(AuthContext);
    const [user, setUser] = useState({
        code: "",
        email: "",
        password: "",
    });
    const [invalidCode, setInvalidCode] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const toast = useToast();

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        //validation
        if (id === "code" && !value.match(/^[0-9]+$/i)) {
            setInvalidCode(true);
            return;
        } else {
            setInvalidCode(false);
        }
        if (id === "email") {
            if (!value.match(
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            )) {
                setInvalidEmail(true);
            } else {
                setInvalidEmail(false);
            }
        }

        setUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };

    const sync = () => {
        if (invalidCode || invalidEmail || user.password.length == 0 || user.code.length == 0 || user.email.length == 0) {
            toast.show({
                placement: "bottom",
                containerStyle: {
                    display: "block"
                },
                render: ({ id }) => {
                    return <Toasts
                        id={id}
                        title="Error"
                        body={<Text>Por favor, llena todos los campos correctamente</Text>}
                        variant="accent"
                        action="error"
                    />
                },
            })
            return;
        }
        synchronize(user.email, user.code, user.password);
    }

    return (
        <Center minHeight={'$full'} p={24} bgColor='$white'>
            <Box width={"$full"} maxWidth={384}>
                <Center>
                    <Image
                        size="md" borderRadius="$none"
                        source={require('../assets/gimnasio.png')}
                        alt='GymXpert logo'
                    />
                </Center>

                <Text fontSize={24} fontWeight={"$medium"} mt={16} mb={16}>
                    Bienvenido a GymXpert! 🏋️‍♀️
                </Text>

                <StyledInput
                    id="code"
                    label="Codigo de acceso"
                    type="text"
                    contentType=""
                    placeholder="Ingresa codigo de acceso"
                    autoComplete="code"
                    required
                    invalid={invalidCode}
                    value={user.code}
                    onChange={handleInputChange}
                />

                <StyledInput
                    id="email"
                    label="Correo electrónico"
                    type="text"
                    contentType="emailAddress"
                    placeholder="Ingrese su correo electrónico"
                    autoComplete="email"
                    required
                    invalid={invalidEmail}
                    value={user.email}
                    onChange={handleInputChange}
                />

                <StyledInput
                    label={"Contraseña"}
                    id={"password"}
                    type={"password"}
                    contentType={"password"}
                    placeholder={"Ingresa tu contraseña"}
                    autoComplete={"password"}
                    required
                    value={user.password}
                    onChange={handleInputChange}
                />
                <Button onPress={() => sync()}>
                    <ButtonText>
                        Sincronizar
                    </ButtonText>
                </Button>

                <Text
                    fontSize={14}
                    lineHeight={20}
                    mt={24}
                    textAlign="center"
                >
                    o
                </Text>

                <Link
                    onPress={() => { navigation.navigate('Iniciar Sesión') }}
                    mt={12}
                >
                    <LinkText
                        fontSize={14}
                        lineHeight={20}
                        textAlign="center"
                        color="$blue"
                    >
                        Iniciar sesión
                    </LinkText>
                </Link>

            </Box>
        </Center >
    );
};

export default Synchronize;
