/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/react';
import type { User } from 'firebase/auth';
import type { DocumentData } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { observer } from 'mobx-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import type { PickedUserType } from '../state/ChatContext';
import { authStore } from '../store/AuthStore';
import { chatStore } from '../store/ChatStore';

const Chats: FC = observer(() => {
  const [chats, setChats] = useState<DocumentData>([]);

  const { currentUser } = authStore.user as { currentUser: User };

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
    if (currentUser) {
      chatStore.dispatch(u, currentUser);
    }
  };

  return (
    <div className='chats'>
      {/* ユーザーの表示順を更新日順で表示する */}
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
});

export default Chats;
