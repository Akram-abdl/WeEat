import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebaseSetup';
import SearchBar from './SearchBar/SearchBar';

function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleProfile = async () => {
    try {
      navigate('/profile');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const { currentUser } = auth;
  const isUserLoggedIn = !!currentUser;

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center" width="100%">
          <NavLink to="/"><Text as="h1" fontSize="xl">{t('we-eat')}</Text></NavLink>
          <SearchBar />
        </HStack>
        <Flex alignItems="center" ml={8}>
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            mr={4}
          >
            {t('my-recipes')}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                // eslint-disable-next-line max-len
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              />
            </MenuButton>
            <MenuList>
              <MenuDivider />
              {isUserLoggedIn ? (
                <MenuItem onClick={handleSignOut}>{t('logout')}</MenuItem>
              ) : (
                <MenuItem onClick={() => navigate('/login')}>{t('login')}</MenuItem>
              )}
              <MenuItem onClick={handleProfile}>{t('profile')}</MenuItem>
              <MenuDivider />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;
