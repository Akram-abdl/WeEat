import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import SocialButton from '../SocialButton/SocialButton';

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2022 WeEat. All rights reserved</Text>
        <Stack direction="row" spacing={6}>
          <SocialButton label="Github WeEat" href="https://github.com/Akram-abdl/WeEat">
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
