import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAjco_1oCn0mdktTu7DYwh87MWfbv6lAgU',
  appId: '1:1010846027236:web:2d5f13cfca8e4472954bf1',
  authDomain: 'chat-284d4.firebaseapp.com',
  messagingSenderId: '1010846027236',
  projectId: 'chat-284d4',
  storageBucket: 'chat-284d4.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
