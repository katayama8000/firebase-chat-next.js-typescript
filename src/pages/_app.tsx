import '../styles/globals.css';
import '../styles/style.scss';

import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../state/AuthContext';
import { ChatContextProvider } from '../state/ChatContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

export default App;
