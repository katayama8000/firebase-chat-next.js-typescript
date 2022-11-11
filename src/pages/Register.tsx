import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { NextPage } from 'next/types';
import { useState } from 'react';

import { auth, db, storage } from '../lib/firebase/firebase';

const Register: NextPage = () => {
  const [err, setErr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    console.log(e, 'event');
    setIsLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, 'users', res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            push('/');
          } catch (err) {
            console.log(err);
            setErr(true);
            setIsLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setIsLoading(false);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>katayama Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input required type='text' placeholder='display name' />
          <input required type='email' placeholder='email' />
          <input required type='password' placeholder='password' />
          <input required style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file'>
            <Image src='/img/addAvatar.png' alt='' width={36} height={36} />
            <span>Add an avatar</span>
          </label>
          <button disabled={isLoading}>Sign up</button>
          {isLoading && 'Uploading and compressing the image please wait...'}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link href='./Login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
