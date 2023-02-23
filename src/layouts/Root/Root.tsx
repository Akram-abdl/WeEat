import { Flex, Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Root() {
  return (
    <>
      <Header />

      <main style={{ padding: '1em' }}>

        <Suspense fallback={(
          <Flex pt="20" alignItems="center" justifyContent="center">
            {' '}
            <Spinner size="xl" />
          </Flex>
        )}
        >
          <Outlet />
        </Suspense>

      </main>

      <Footer />
    </>
  );
}

export default Root;
