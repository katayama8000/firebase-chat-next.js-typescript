import { Button, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const validateEmail = (email: string) => {
  if (!email) {
    return 'メールアドレスを入力してください';
  }
  if (!email.includes('@')) {
    return 'メールアドレスの形式が正しくありません';
  }
};

const Index3 = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });
  return (
    <VStack>
      <form onSubmit={onSubmit}>
        <VStack w='30vw'>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            type='email'
            id='email'
            {...register('email', {
              required: 'Email is required',
              validate: validateEmail,
            })}
          />
          {errors.email && (
            <Text bgClip='text' fontWeight='extrabold' color={'red'}>
              {errors.email.message}
            </Text>
          )}

          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            type='password'
            id='password'
            {...register('password', {
              minLength: {
                message: 'Password must have at least 4 characters',
                value: 4,
              },
              required: 'Password is required',
            })}
          />
          {errors.password && (
            <Text bgClip='text' fontWeight='extrabold' color={'red'}>
              {errors.password.message}
            </Text>
          )}

          <Button type='submit'>登録</Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default Index3;
