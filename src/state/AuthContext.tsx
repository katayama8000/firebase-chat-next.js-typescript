import { onAuthStateChanged } from 'firebase/auth';
import type { FC } from 'react';
import { createContext, useEffect, useState } from 'react';

import { auth } from '../lib/firebase/firebase';

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext();

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user!);
      console.log(user, 'user');
    });

    return () => {
      unsub();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
