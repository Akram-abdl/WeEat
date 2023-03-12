import React from 'react';
import {
  Heading, Text, Button, Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Flex pt="20" flexDirection="column" alignItems="center" justifyContent="center">
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color="gray.500" mb={6}>
        The page you are looking for does not seem to exist
      </Text>

      <Button
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => {
          navigate('/');
        }}
      >
        Go to Home
      </Button>
    </Flex>
  );
}

export default PageNotFound;
