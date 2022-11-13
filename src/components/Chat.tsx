import { observer } from 'mobx-react';
import Image from 'next/image';
import type { FC } from 'react';

import { chatStore } from '../store/ChatStore';
import Input from './Input';
import Messages from './Messages';

const Chat: FC = observer(() => {
  const state = chatStore.state;

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span style={{ color: 'orange' }}>{state.user ? state.user.displayName : 'select your freinds'}</span>
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
});

export default Chat;
