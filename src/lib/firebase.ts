import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - replace with your config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrSD-d5MZ7_2OhBKjlGG89WvNdh4vLvrg",
  authDomain: "civic-issue-reporting-adi-2358.firebaseapp.com",
  projectId: "civic-issue-reporting-adi-2358",
  storageBucket: "civic-issue-reporting-adi-2358.firebasestorage.app",
  messagingSenderId: "841848355129",
  appId: "1:841848355129:web:2b7dfab1da4251572650e8",
  measurementId: "G-LKYMCB6XKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;