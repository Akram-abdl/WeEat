import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  AlertIcon,
  Alert,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { User as UserFirebase } from 'firebase/auth';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { auth, createOrUpdateUserDocument, signUpFirebase } from '../../utils/firebaseSetup';
import { User } from '../../interfaces/User';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      await signUpFirebase(auth, email, password);
      const myUser: UserFirebase = auth.currentUser as UserFirebase;
      // create a new user in Firebase Firestore with default values
      const newUser: User = {
        favorites: [''],
        intolerances: [''],
        isVegan: false,
        isVegetarian: false,
      };

      createOrUpdateUserDocument(myUser, newUser);
      navigate('/login');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Flex pt="20" flexDirection="column" alignItems="center" justifyContent="center">
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="gray.200"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaUserAlt color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email address" bg="whiteAlpha.900" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">

                    <CFaLock color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    bg="whiteAlpha.900"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account ?
        {' '}
        <Link color="teal.500" href="/login">
          Login
        </Link>
      </Box>
    </Flex>
  );
}

export default Register;
