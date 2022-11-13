import { Button } from '@chakra-ui/react';

import { authStore } from '../store/AuthStore';

const Demo2 = () => {
  const { currentUser } = authStore.getUser;
  return (
    <div>
      <h1>MobX</h1>
      <Button
        onClick={() => {
          console.log(currentUser);
        }}
      >
        Check User
      </Button>
    </div>
  );
};

export default Demo2;
