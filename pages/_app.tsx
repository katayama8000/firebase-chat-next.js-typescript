import '../styles/globals.css';

import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Box maxW='840px'>
        <Link href='/'>
          <Button ml={20} my={20}>
            戻る
          </Button>
        </Link>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
