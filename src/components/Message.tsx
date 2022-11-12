/* eslint-disable @next/next/no-img-element */
import type { User } from 'firebase/auth';
import type { FC } from 'react';
import { useContext, useEffect, useRef } from 'react';

import { AuthContext } from '../state/AuthContext';
import { ChatContext } from '../state/ChatContext';
import type { ChatsType } from './Messages';

type Props = {
  message: ChatsType;
};

const Message: FC<Props> = ({ message }) => {
  const { currentUser } = useContext(AuthContext) as { currentUser: User };
  const { data } = useContext(ChatContext);

  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className='messageInfo'>
        {currentUser.photoURL && data.user && data.user.photoURL && (
          <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' />
        )}
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt='' />}
      </div>
    </div>
  );
};

export default Message;
