/* eslint-disable react-hooks/exhaustive-deps */
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { createContext, useEffect, useState } from 'react';

import { auth } from '../lib/firebase/firebase';

type AuthContextProps = {
  currentUser: User | undefined;
};
export const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider: FC<ProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        if (router.pathname !== '/Login' && router.pathname !== '/Register') {
          router.push('/Login');
        }
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
};
