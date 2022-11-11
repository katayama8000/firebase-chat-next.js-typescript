import { Button } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { auth } from '../lib/firebase/firebase';

const Login: NextPage = () => {
  const [err, setErr] = useState<boolean>(false);
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      push('/');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama Chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <Button type='submit'>Sign in</Button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do not have an account? <Link href='/Register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
