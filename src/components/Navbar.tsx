/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { observer } from 'mobx-react';
import type { FC } from 'react';

import { auth } from '../lib/firebase/firebase';
import { authStore } from '../store/AuthStore';

const Navbar: FC = observer(() => {
  const { currentUser } = authStore.user;

  return (
    <div className='navbar'>
      <span className='logo'>katayama Chat</span>
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
});

export default Navbar;
