/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import type { FC } from 'react';
import { useContext } from 'react';

import { auth } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';

const Navbar: FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='logo'>Lama Chat</span>
      <div className='user'>
        {/* 後でNext.jsのImageに変更 */}
        {currentUser?.photoURL && <img src={currentUser.photoURL} alt='' />}
        <span>{currentUser?.displayName}</span>
        <Button
          size='xs'
          onClick={() => {
            signOut(auth);
          }}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
