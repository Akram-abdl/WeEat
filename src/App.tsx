import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import router from './router';

import './App.css';

const queryClient = new QueryClient();

const theme = extendTheme({
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
