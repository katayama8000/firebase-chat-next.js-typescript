/* eslint-disable @next/next/no-img-element */
import type { DocumentData } from 'firebase/firestore';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { observer } from 'mobx-react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { authStore } from '../store/AuthStore';

const Search: FC = observer(() => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState<DocumentData | null>();
  const [err, setErr] = useState<boolean>(false);

  const { currentUser } = authStore.user;

  const handleSearch = useCallback(async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  }, [username]);

  const handleKey = useCallback(
    (e: { code: string }) => {
      e.code === 'Enter' && handleSearch();
    },
    [handleSearch]
  );

  const handleSelect = useCallback(async () => {
    const combinedId = (() => {
      if (user && currentUser) {
        return currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
      }
    })() as string;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists() && user && currentUser) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername('');
  }, [currentUser, user]);
  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user'
          onKeyDown={handleKey}
          onChange={(e) => {
            return setUsername(e.target.value);
          }}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Search;
