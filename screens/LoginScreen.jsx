import React, { useState } from 'react';
import { Box, Button, Link, ButtonText, Center, Image, Text } from '@gluestack-ui/themed';
import StyledInput from '../components/Input';

const LoginScreen = ({ navigation }) => {
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
    <Center minHeight={'$full'}>

      <Box width={"$full"} maxWidth={384}>

        <Center>
          <Image
            size="md" borderRadius="$none"
            source={require('../assets/gimnasio.png')}
          />
        </Center>

        <Text fontSize={24} fontWeight={"bold"} mt={16} mb={16}>
          Bienvenido a GymXpert! 🏋️‍♀️
        </Text>

        <StyledInput
          label={"Correo electrónico"}
          id={"email"}
          type={"email"}
          placeholder={"Ingresa tu correo electrónico"}
          autoComplete={"email"}
          required
          value={user.email}
          onChange={handleInputChange}
          invalid={invalidEmail}
        />

        <StyledInput
          label={"Contraseña"}
          id={"password"}
          type={"password"}
          placeholder={"Ingresa tu contraseña"}
          autoComplete={"password"}
          required
          value={user.password}
          onChange={handleInputChange}
        />

        <Link mt={16}>
          <Button>
            <ButtonText>
              Log In
            </ButtonText>
          </Button>
        </Link>
      </Box>
    </Center>
  );
};

export default LoginScreen;
