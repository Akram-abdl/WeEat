import React, { useState } from 'react';
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
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../utils/firebaseSetup';

function NavBar() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const onSearch = () => {
    if (searchTerm === '' || searchTerm.trim() === '') return;

    navigate(`/search?searchTerm=${searchTerm}`);
  };

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

  const handleFavorite = async () => {
    try {
      navigate('/favorites');
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
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>

            <Input
              placeholder={t('main-searchbar-placeholder')}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onSearch();
                }
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor="gray.300"
            />
            <InputRightElement mr={1}>
              <Button size="sm" variant="solid" colorScheme="teal" onClick={onSearch}>
                <SearchIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
        <Flex alignItems="center" ml={8}>
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            mr={4}
            onClick={handleFavorite}
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
              <MenuItem onClick={handleFavorite}>Favoris</MenuItem>
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
