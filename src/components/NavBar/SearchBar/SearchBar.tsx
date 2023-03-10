import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Button, Input, InputGroup, InputLeftElement, InputRightElement,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SearchBar() {
  const { t } = useTranslation();

  const [queryParameters] = useSearchParams();

  const searchTermFromUrl = queryParameters.get('searchTerm') ?? '';

  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);

  const navigate = useNavigate();

  const onSearch = () => {
    if (searchTerm === '' || searchTerm.trim() === '') return;

    navigate(`/search?searchTerm=${searchTerm}`);
  };

  useEffect(() => {
    setSearchTerm(searchTermFromUrl);
  }, [searchTermFromUrl]);

  return (
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
        value={searchTerm}
      />
      <InputRightElement mr={1}>
        <Button size="sm" variant="solid" onClick={onSearch}>
          <SearchIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;
