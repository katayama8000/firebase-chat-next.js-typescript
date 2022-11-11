import type { NextPage } from 'next/types';

import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
