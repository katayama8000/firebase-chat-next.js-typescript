/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import type { DocumentData } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';
import type { PickedUserType } from '../state/ChatContext';
import { ChatContext } from '../state/ChatContext';

const Chats: FC = () => {
  const [chats, setChats] = useState<DocumentData>([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser) {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
          if (doc.exists()) {
            setChats(doc.data());
          }
        });

        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser, currentUser?.uid]);

  const handleSelect = (u: PickedUserType) => {
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
              <Button
                colorScheme='teal'
                onClick={() => {
                  console.log(chat);
                }}
              >
                check
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
