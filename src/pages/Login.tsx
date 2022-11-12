import { Button, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { auth } from '../lib/firebase/firebase';
import type { LoginInput } from '../types/Input.model';

const validateEmail = (email: string) => {
  if (!email) {
    return 'メールアドレスを入力してください';
  }
  if (!email.includes('@')) {
    return 'メールアドレスの形式が正しくありません';
  }
};

const Login: NextPage = () => {
  const [error, setError] = useState<string>('');
  const { push } = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      push('/');
    } catch (err) {
      setError('メールアドレスまたはパスワードが間違っています');
    } finally {
      reset();
    }
  };

  console.log(watch('email'));
  console.log(watch('password'));

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Login</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.email && (
            <Text bgClip='text' fontWeight='extrabold' color={'red'}>
              {errors.email.message}
            </Text>
          )}
          <input
            type='email'
            placeholder='email'
            {...register('email', {
              required: 'Email is required',
              validate: validateEmail,
            })}
          />
          {errors.password && (
            <Text bgClip='text' fontWeight='extrabold' color={'red'}>
              {errors.password.message}
            </Text>
          )}
          <input
            type='password'
            placeholder='password'
            {...register('password', {
              minLength: {
                message: 'Password must have at least 4 characters',
                value: 4,
              },
              required: 'Password is required',
            })}
          />
          <Button type='submit'>Sign in</Button>
        </form>
        {error && (
          <Text bgClip='text' fontWeight='extrabold' color={'red'} style={{ color: 'red' }}>
            {error}
          </Text>
        )}
        <p>
          You do not have an account? <Link href='/Register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
