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
import { auth, signInFirebase } from '../../utils/firebaseSetup';
// function Login() {
//   return (
//     <div>Login</div>
//   );
// }
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      await signInFirebase(auth, email, password);
      navigate('/');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
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
      <Button type="submit" onClick={handleLogin}>
        Log In
      </Button>
    </form>
  );
}
// export default Login;
