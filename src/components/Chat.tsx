import Image from 'next/image';
import type { FC } from 'react';
import { useContext } from 'react';

import { ChatContext } from '../state/ChatContext';
import Input from './Input';
import Messages from './Messages';

const Chat: FC = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data?.user?.displayName}</span>
        <div className='chatIcons'>
          <Image src='/img/cam.png' alt='cam' width={24} height={24} />
          <Image src='/img/more.png' alt='more' width={24} height={24} />
          <Image src='/img/add.png' alt='add' width={24} height={24} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
