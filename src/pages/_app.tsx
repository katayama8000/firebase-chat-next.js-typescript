import '../styles/globals.css';
import '../styles/style.scss';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { authStore } from '../store/AuthStore';

const App = ({ Component, pageProps }: AppProps) => {
  authStore.getUser;
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
