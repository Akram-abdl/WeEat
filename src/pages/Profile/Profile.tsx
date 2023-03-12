import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Button,
} from '@chakra-ui/react';
import { User as UserFirebase } from 'firebase/auth';
import { auth } from '../../utils/firebaseSetup';
import { User as UserModel } from '../../interfaces/User';
import UserService from '../../services/UserService';

export default function Profile() {
  const currentUser: UserFirebase = auth.currentUser as UserFirebase;
  const [userData, setUserData] = useState<UserModel>();
  const [diet, setDiet] = useState('');
  const bg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    async function fetchData() {
      const data = await UserService.getUserDocument(currentUser.uid);
      // verify if data is not null then set it to userData
      if (data) {
        setUserData(data.data() as UserModel);
        setDiet(data.data()?.diet || '');
      }
    }

    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleDietChange = (value: string) => {
    setDiet(value);
  };

  const handleSubmit = async () => {
    if (userData) {
      userData.diet = diet;
      await UserService.updateDiet(currentUser.uid, userData.diet);
    }
  };

  return (
    <Center py={6}>
      <Box
        maxW="390px"
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
              <FormControl>
                <FormLabel htmlFor="diet">Diet:</FormLabel>
                <RadioGroup id="diet" value={diet} onChange={handleDietChange}>
                  <HStack spacing="24px">
                    <Radio value="vegetarian">Vegetarian</Radio>
                    <Radio value="vegan">Vegan</Radio>
                    <Radio value=""> No Preference</Radio>
                  </HStack>
                </RadioGroup>
                <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
                  Save
                </Button>
              </FormControl>
            </Box>

          </Stack>
        )}
      </Box>
    </Center>
  );
}
