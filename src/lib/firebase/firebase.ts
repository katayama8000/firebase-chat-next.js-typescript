import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDnsnz6h1QINpmcXnILsKg2AHnpD7QTk2M',
  appId: '1:912719243171:web:6e977987005185c3179c16',
  authDomain: 'react-firebase-test-27305.firebaseapp.com',
  messagingSenderId: '912719243171',
  projectId: 'react-firebase-test-27305',
  storageBucket: 'react-firebase-test-27305.appspot.com',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
