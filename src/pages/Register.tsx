import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Register = () => {
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
    setLoading(true);
    setErr(false);
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
          <button disabled={loading}>Sign up</button>
          {loading && 'Uploading and compressing the image please wait...'}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link href='Login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
