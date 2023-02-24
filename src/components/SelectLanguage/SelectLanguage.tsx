import React from 'react';
import { Flex } from '@chakra-ui/react';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import './SelectLanguage.css';

const LANGUAGES_FLAG = {
  fr: 'FR',
  en: 'GB',
};

function SelectLanguage() {
  const { i18n } = useTranslation();

  const handleClick = (language: string) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <Flex gap={3}>
      {Object.entries(LANGUAGES_FLAG).map(([language, flag]) => (
        <Flag
          className={`flag ${language === currentLanguage ? 'activated' : 'deactivated'}`}
          code={flag}
          width={28}
          onClick={() => handleClick(language)}
        />
      ))}
    </Flex>
  );
}

export default SelectLanguage;
