//import { doc, onSnapshot } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { observer } from 'mobx-react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { db } from '../lib/firebase/firebase';
import { chatStore } from '../store/ChatStore';
import Message from './Message';

export type ChatsType = {
  id: string;
  img: string;
  senderId: string;
  text: string;
};
const Messages: FC = observer(() => {
  const [messages, setMessages] = useState<ChatsType[]>([]);
  const state = chatStore.state;

  useEffect(() => {
    if (state.chatId) {
      const unSub = onSnapshot(doc(db, 'chats', state.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [state.chatId]);

  return (
    <div className='messages'>
      {messages.map((message) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
});

export default Messages;
