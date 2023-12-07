import { Box, Button, ButtonText, Center, HStack, Image, Link, LinkText, Text } from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import StyledInput from '../components/Input';
import { AuthContext } from '../context/AuthContext';
import Toasts from '../components/Toasts';
import { useToast } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';

const Login = ({ navigation }) => {
    const { logIn } = useContext(AuthContext);
    const [user, setUser] = useState({
        code: "",
        password: "",
    });
    var [invalidCode, setInvalidCode] = useState(false);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        //validation
        if (id === "code") {
            if (!value.match(/^[0-9]+$/i) || value.length == 0) {
                setInvalidCode(true);
            } else {
                setInvalidCode(false);
            }
        }

        setUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };
    const toast = useToast();

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
                <Button onPress={() => logIn(user.code, user.password)}>
                    <ButtonText>
                        Iniciar Sesión
                    </ButtonText>
                </Button>

                <HStack mt={24} alignSelf='center'>
                    <Text
                        fontSize={14}
                        lineHeight={20}
                        textAlign="center"
                    >
                        No tienes cuenta?
                    </Text>

                    <Link
                        onPress={() => { navigation.navigate('Registro') }}
                    >
                        <LinkText
                            fontSize={14}
                            lineHeight={20}
                            ml={2}
                            textAlign="center"
                            color="$blue"
                        >
                            Registrarse
                        </LinkText>
                    </Link>
                </HStack>
                <Box mt={24} alignSelf='center'>
                    <Text
                        fontSize={14}
                        lineHeight={20}
                        textAlign="center"
                    >
                        Fue registrado en el gimnasio?
                    </Text>

                    <Link
                        onPress={() => { navigation.navigate('Sincronizar') }}
                    >
                        <LinkText
                            fontSize={14}
                            lineHeight={20}
                            textAlign="center"
                            color="$blue"
                        >
                            Sincronizar cuenta
                        </LinkText>
                    </Link>
                </Box>

            </Box>
        </Center >
    );
};

export default Login;
