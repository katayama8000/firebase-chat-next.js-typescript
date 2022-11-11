import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDzqaigsr9xNyQfxIkfUdwxxG9fd5whsF0',
  appId: '1:827686403115:web:62085d38289e86b199be6e',
  authDomain: 'chat-c649c.firebaseapp.com',
  messagingSenderId: '827686403115',
  projectId: 'chat-c649c',
  storageBucket: 'chat-c649c.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export type User = {
  uid: string | null | undefined;
};
