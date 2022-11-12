import { Button } from '@chakra-ui/react';

import { authStore } from '../store/AuthStore';

const Demo2 = () => {
  const user = authStore.getUser;
  console.log(user, 'ここが見たい');
  return (
    <div>
      <h1>MobX</h1>
      <Button
        onClick={() => {
          console.log(user);
        }}
      >
        Check User
      </Button>
    </div>
  );
};

export default Demo2;
