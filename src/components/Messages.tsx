//import { doc, onSnapshot } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { ChatContext } from '../state/ChatContext';
import Message from './Message';

export type ChatsType = {
  id: string;
  img: string;
  senderId: string;
  text: string;
};
const Messages: FC = () => {
  const [messages, setMessages] = useState<ChatsType[]>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  return (
    <div className='messages'>
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
};

export default Messages;
