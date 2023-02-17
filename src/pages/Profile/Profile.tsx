import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { User as UserFirebase } from 'firebase/auth';
import { auth, getUserDocument } from '../../utils/firebaseSetup';
import { User as UserModel } from '../../models/User';

export default function Profile() {
  const currentUser: UserFirebase = auth.currentUser as UserFirebase;
  const [userData, setUserData] = useState<UserModel>();
  const bg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    async function fetchData() {
      const data = await getUserDocument(currentUser.uid);
      // verify if data is not null then set it to userData
      if (data) {
        setUserData(data.data() as UserModel);
      }
    }

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  return (
    <Center py={6}>
      <Box
        maxW="320px"
        w="full"
        bg={bg}
        boxShadow="2xl"
        rounded="lg"
        p={6}
        textAlign="center"
      >

        <Heading fontSize="2xl" fontFamily="body">
          {currentUser.displayName}
        </Heading>
        <Text fontWeight={600} color="gray.500" mb={4}>
          {currentUser.email}
        </Text>

        {userData && (
          <Stack spacing={6} mt={8}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Preference
              </Text>
              <Text fontSize="sm">
                Vegan :
                {userData.isVegan ? 'Yes' : 'No'}
              </Text>

              <Text fontSize="sm" marginTop="2">
                Vegetarian :
                {userData.isVegetarian ? 'Yes' : 'No'}
              </Text>
            </Box>

          </Stack>
        )}
      </Box>
    </Center>
  );
}
