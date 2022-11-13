/* eslint-disable @next/next/no-img-element */
import type { User } from 'firebase/auth';
import { observer } from 'mobx-react';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { authStore } from '../store/AuthStore';
import { chatStore } from '../store/ChatStore';
import type { ChatsType } from './Messages';

type Props = {
  message: ChatsType;
};

const Message: FC<Props> = observer(({ message }) => {
  const { currentUser } = authStore.user as { currentUser: User };
  const state = chatStore.state;

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className='messageInfo'>
        {currentUser.photoURL && state.user && state.user.photoURL && (
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : state.user.photoURL} alt='' />
        )}
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='' />}
      </div>
    </div>
  );
});

export default Message;
