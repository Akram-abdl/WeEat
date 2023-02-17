import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { User as UserFirebase } from 'firebase/auth';
import { auth, createOrUpdateUserDocument, signUpFirebase } from '../../utils/firebaseSetup';
import { User as UserModel } from '../../models/User';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      await signUpFirebase(auth, email, password);
      const myUser: UserFirebase = auth.currentUser as UserFirebase;
      // create a new user in Firebase Firestore with default values
      const newUser: UserModel = {
        favorites: [''],
        intolerances: [''],
        isVegan: false,
        isVegetarian: false,
      };

      console.log('newUser', newUser, 'myUser', myUser);
      createOrUpdateUserDocument(myUser, newUser);
      navigate('/login');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    navigate('/login');
  };
  return (
    <form>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button type="submit" onClick={handleRegister}>
        Register
      </Button>
      <Button variant="link" onClick={handleLogin} mt="2">
        Log in
      </Button>
    </form>
  );
}
