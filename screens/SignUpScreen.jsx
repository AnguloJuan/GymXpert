import { Box, Button, ButtonText, Center, ChevronDownIcon, Icon, Image, Link, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import StyledInput from '../components/Input';
import { ScrollView } from '@gluestack-ui/themed';
import { LinkText } from '@gluestack-ui/themed';

const SignUpScreen = ({ navigation }) => {
    const [user, setUser] = useState({
        name: "",
        status: 0,
        phone: "",
        email: "",
        emergency: "",
        blood: 0,
    });
    const [invalidName, setInvalidName] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPhone, setInvalidPhone] = useState(false);
    const [invalidEmergency, setInvalidEmergency] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Validations
        if (id === "name") {
            if (!value.match(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s']+$/i)) {
                setInvalidName(true);
            } else {
                setInvalidName(false);
            }
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
        if (id === "phone") {
            if (!value.match(/^[0-9]+$/i)) {
                setInvalidPhone(true);
            } else {
                setInvalidPhone(false);
            }
        }
        if (id === "emergency") {
            if (!value.match(/^[0-9]+$/i)) {
                setInvalidEmergency(true);
            } else {
                setInvalidEmergency(false);
            }
        }

        setUser((prevCriteria) => ({ ...prevCriteria, [id]: value }));
    };

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

                    <StyledInput
                        id="name"
                        label="Nombre completo"
                        type="text"
                        contentType="name"
                        placeholder="Nombre completo"
                        autoComplete="name"
                        color="#5d596c"
                        invalid={invalidName}
                        onChange={handleInputChange}
                    />
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
                        id="phone"
                        label="Telefono"
                        type="text"
                        contentType="telephoneNumber"
                        placeholder="Telefono"
                        autoComplete="phone"
                        color="#5d596c"
                        invalid={invalidPhone}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        id="emergency"
                        label="Contacto de emergencia"
                        type="text"
                        contentType="telephoneNumber"
                        placeholder="Telefono de emergencia"
                        autoComplete="emergency"
                        color="#5d596c"
                        invalid={invalidEmergency}
                        onChange={handleInputChange}
                    />

                    <Text color="#5d596c" fontSize={14} lineHeight={24} >
                        Tipo de Sangre
                    </Text>
                    <Select
                        id="blood"
                        onValueChange={(e) => {
                            console.log(e);
                            setUser((prevCriteria) => ({ ...prevCriteria, blood: e }));
                        }}
                        my={"$2"}
                    >
                        <SelectTrigger variant="outline" size="md" >
                            <SelectInput placeholder="Tipo de sangre" />
                            <SelectIcon mr="$3">
                                <Icon as={ChevronDownIcon} />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="O-" value="O-" />
                                <SelectItem label="O+" value="O+" />
                                <SelectItem label="A-" value="A-" />
                                <SelectItem label="A+" value="A+" />
                                <SelectItem label="B-" value="B-" />
                                <SelectItem label="B+" value="B+" />
                                <SelectItem label="AB-" value="AB-" />
                                <SelectItem label="AB+" value="AB+" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>

                    <Text color="#5d596c" fontSize={14} lineHeight={24} >
                        Status
                    </Text>
                    <Select
                        id="status"
                        onValueChange={(e) => {
                            setUser((prevCriteria) => ({ ...prevCriteria, status: e }));
                        }}
                        my={"$2"}
                    >
                        <SelectTrigger variant="outline" size="md" >
                            <SelectInput placeholder="Status" />
                            <SelectIcon mr="$3">
                                <Icon as={ChevronDownIcon} />
                            </SelectIcon>
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            <SelectContent>
                                <SelectDragIndicatorWrapper>
                                    <SelectDragIndicator />
                                </SelectDragIndicatorWrapper>
                                <SelectItem label="Inactivo" value="Inactivo" />
                                <SelectItem label="Activo" value="Activo" />
                            </SelectContent>
                        </SelectPortal>
                    </Select>

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

                    <Link mt={16}>
                        <Button>
                            <ButtonText>
                                Registrarse
                            </ButtonText>
                        </Button>
                    </Link>

                    <Text
                        mt={24}
                        fontSize={14}
                        lineHeight={20}
                        textAlign="center"
                    >
                        o
                    </Text>

                    <Link
                        onPress={() => { navigation.navigate('Iniciar Sesión') }}

                    >
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

export default SignUpScreen;
