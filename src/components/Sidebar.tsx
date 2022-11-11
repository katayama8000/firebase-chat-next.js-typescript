import type { FC } from 'react';

import Chats from './Chats';
import Navbar from './Navbar';
import Search from './Search';

const Sidebar: FC = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
