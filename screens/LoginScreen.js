import React, { useState } from 'react';
import { Box, Button, Link, ButtonText, VStack } from '@gluestack-ui/themed';
import StyledInput from '../components/input';

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
    <VStack px={32} py={48} alignItems="center" minHeight={"$full"}>

      <Box mt={16} width={"$full"} maxWidth={384}>
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

        <Link href="/todo">
          <Button>
            <ButtonText>
              Log In
            </ButtonText>
          </Button>
        </Link>
      </Box>
    </VStack>
  );
};

export default LoginScreen;
