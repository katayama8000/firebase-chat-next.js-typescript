import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import type { FC } from 'react';
import { useContext, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';

const Search: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser, 'currentUser');

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
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
  };
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
};

export default Search;
