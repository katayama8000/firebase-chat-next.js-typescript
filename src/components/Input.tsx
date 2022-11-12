import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { db, storage } from '../lib/firebase/firebase';
import { AuthContext } from '../state/AuthContext';
import { ChatContext } from '../state/ChatContext';

const Input = () => {
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null | undefined>(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed', () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          if (data.chatId && currentUser) {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                date: Timestamp.now(),
                img: downloadURL,
                senderId: currentUser.uid,
                text,
              }),
            });
          }
        });
      });
    } else {
      if (data.chatId && currentUser) {
        if (text === '') {
          alert('Please enter a message');
          return;
        }

        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            date: Timestamp.now(),
            senderId: currentUser.uid,
            text,
          }),
        });
      }
    }

    if (currentUser) {
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }

    if (data.user && data.user.uid) {
      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }

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
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            return setImage(e.target.files?.[0]);
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
