import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ currentUser: currentUser }}>{children}</AuthContext.Provider>;
};
