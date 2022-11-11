/* eslint-disable @next/next/no-img-element */
import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import type { FC } from 'react';
import { useContext } from 'react';

import { auth } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';

const Navbar: FC = () => {
  const { currentUser } = useContext(AuthContext) as { currentUser: User };
  console.log(currentUser, 'currentUser222');

  return (
    <div className='navbar'>
      <span className='logo'>Lama Chat</span>
      <div className='user'>
        {/* 後でNext.jsのImageに変更 */}
        {currentUser?.photoURL && <img src={currentUser.photoURL} alt='' />}
        <span>{currentUser?.displayName}</span>
        <button
          onClick={() => {
            return signOut(auth);
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
