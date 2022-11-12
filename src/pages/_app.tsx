import '../styles/globals.css';
import '../styles/style.scss';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../state/AuthContext';
import { ChatContextProvider } from '../state/ChatContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default App;
