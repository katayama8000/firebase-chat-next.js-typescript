import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { db, storage } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';
import { ChatContext } from '../state/ChatContext';

const Input = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log(data, 'chatContext111');

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                date: Timestamp.now(),
                img: downloadURL,
                senderId: currentUser!.uid,
                text,
              }),
            });
          });
        }
      );
    } else {
      console.log(data.chatId, 'data.chatId');
      await updateDoc(doc(db, 'chats', data!.chatId), {
        messages: arrayUnion({
          id: uuid(),
          date: Timestamp.now(),
          senderId: currentUser!.uid,
          text,
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser!.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user!.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImage(null);
  };
  return (
    <div className='input'>
      <input
        type='text'
        placeholder='Type something...'
        onChange={(e) => {
          return setText(e.target.value);
        }}
        value={text}
      />
      <div className='send'>
        <Image src='/img/attach.png' alt='' width={36} height={36} />
        <input
          type='file'
          style={{ display: 'none' }}
          id='file'
          onChange={(e) => {
            return setImage(e.target.files![0]);
          }}
        />
        <label htmlFor='file'>
          <Image src='/img/img.png' alt='' width={36} height={36} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
