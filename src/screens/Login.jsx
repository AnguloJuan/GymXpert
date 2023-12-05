import React, { useContext, useState } from 'react';
import { Box, Button, Link, ButtonText, Center, Image, Text, LinkText } from '@gluestack-ui/themed';
import StyledInput from '../components/Input';
import { AuthContext } from '../context/AuthContext';

const Login = ({ navigation }) => {
    const { signIn } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    var [invalidEmail, setInvalidEmail] = useState(false);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        //validation
        if (
            id === "email" &&
            !value.match(
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            )
        ) {
            setInvalidEmail(true);
            return;
        } else {
            setInvalidEmail(false);
        }

        setUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };

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
                    id="email"
                    label="Correo electrónico"
                    type="text"
                    contentType="emailAddress"
                    placeholder="Correo electrónico"
                    autoComplete="email"
                    color="#5d596c"
                    invalid={invalidEmail}
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
                <Button onPress={() => signIn(user.email, user.password)}>
                    <ButtonText>
                        Iniciar Sesión
                    </ButtonText>
                </Button>

                <Text
                    mt={24}
                    fontSize={14}
                    lineHeight={20}
                    textAlign="center"
                >
                    o
                </Text>

                <Link
                    onPress={() => { navigation.navigate('Registro') }}
                >
                    <LinkText
                        mt={12}
                        fontSize={14}
                        lineHeight={20}
                        textAlign="center"
                        color="$blue"
                    >
                        Registrarse
                    </LinkText>
                </Link>

            </Box>
        </Center>
    );
};

export default Login;
