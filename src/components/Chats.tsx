import { doc, onSnapshot } from 'firebase/firestore';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';
import { ChatContext } from '../state/ChatContext';

const Chats: FC = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u) => {
    dispatch({ payload: u, type: 'CHANGE_USER' });
  };

  return (
    <div className='chats'>
      {Object.entries(chats)
        ?.sort((a, b) => {
          return b[1].date - a[1].date;
        })
        .map((chat) => {
          return (
            <div
              className='userChat'
              key={chat[0]}
              onClick={() => {
                return handleSelect(chat[1].userInfo);
              }}
            >
              <img src={chat[1].userInfo.photoURL} alt='' />
              <div className='userChatInfo'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
