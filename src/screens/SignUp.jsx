import { Box, Button, ButtonText, Center, Image, Link, LinkText, ScrollView, Text, useToast } from '@gluestack-ui/themed';
import React, { useContext, useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import Toasts from '../components/Toasts';
import { AuthContext } from '../context/AuthContext';

const SignUp = ({ navigation }) => {
    const [user, setUser] = useState({
        name: "",
        phone: "",
        emergency_phone: "",
        email: "",
        blood_group_id: 0,
        password: "",
    });
    const [invalidName, setInvalidName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmergency, setInvalidEmergency] = useState(false);
    const toast = useToast();
    const { signUp } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Validations
        if (id === "name") {
            if (!value.match(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s']+$/i) || value.length == 0) {
                setInvalidName(true);
            } else {
                setInvalidName(false);
            }
        }
        if (id === "email") {
            if (!value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
                || value.length == 0) {
                setInvalidEmail(true);
            } else {
                setInvalidEmail(false);
            }
        }
        if (id === "phone") {
            if (!value.match(/^[0-9]+$/i) || value.length == 0) {
                setInvalidPhone(true);
            } else {
                setInvalidPhone(false);
            }
        }
        if (id === "emergency_phone") {
            if (!value.match(/^[0-9]+$/i) || value.length == 0) {
                setInvalidEmergency(true);
            } else {
                setInvalidEmergency(false);
            }
        }

        setUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };

    const sign = () => {
        if (invalidName || invalidEmail || invalidPhone || invalidEmergency
            || user.name.length == 0 || user.email.length == 0 || user.phone.length == 0 || user.emergency_phone.length == 0 ||
            user.password.length == 0 || user.blood_group_id === 0) {
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
        signUp(user);
    }

    return (
        <ScrollView>
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

                    <SignUpForm
                        user={user}
                        setUser={setUser}
                        invalidName={invalidName}
                        invalidEmail={invalidEmail}
                        invalidPhone={invalidPhone}
                        invalidEmergency={invalidEmergency}
                        handleInputChange={handleInputChange}
                    />

                    <Button onPress={sign}>
                        <ButtonText>
                            Registrarse
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

                    <Link onPress={() => { navigation.navigate('Iniciar Sesión') }}>
                        <LinkText
                            mt={12}
                            fontSize={14}
                            lineHeight={20}
                            textAlign="center"
                        >
                            Iniciar Sesión
                        </LinkText>
                    </Link>
                </Box>
            </Center>
        </ScrollView>
    );
};

export default SignUp;
