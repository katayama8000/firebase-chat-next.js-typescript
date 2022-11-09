import Link from 'next/link';

const Register = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit');
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
            {/* <img src={Add} alt='' /> */}
            <span>Add an avatar</span>
          </label>
          {/* <button disabled={loading}>Sign up</button>
          {loading && 'Uploading and compressing the image please wait...'}
          {err && <span>Something went wrong</span>} */}
        </form>
        <p>
          You do have an account? <Link href='login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
