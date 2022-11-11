//import { doc, onSnapshot } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { ChatContext } from '../state/ChatContext';
import Message from './Message';

const Messages: FC = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data!.chatId!), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data?.chatId]);

  console.log(messages);

  return (
    <div className='messages'>
      {messages.map((m) => {
        return <Message message={m} key={m?.id} />;
      })}
    </div>
  );
};

export default Messages;
