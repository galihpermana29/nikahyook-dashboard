import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const config = {
  apiKey: 'AIzaSyCDVO_dvQCXre3XVES7pYBJYhutlvHf3EQ',
  authDomain: 'nikahyook-191b0.firebaseapp.com',
  projectId: 'nikahyook-191b0',
  storageBucket: 'nikahyook-191b0.appspot.com',
  messagingSenderId: '945320233773',
  appId: '1:945320233773:web:868e0d10b96e5f3ef8e1a4',
  measurementId: 'G-02ZEXVFSZ5',
};

export const app = initializeApp(config);
export const db = getFirestore();
