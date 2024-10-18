// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyC-YshCD_Os1dyXeKlxs2nSwwEMlV_QB3U',
    authDomain: 'techu-dsa.firebaseapp.com',
    projectId: 'techu-dsa',
    storageBucket: 'techu-dsa.appspot.com',
    messagingSenderId: '182506889800',
    appId: '1:182506889800:web:8b5a1de71bef2485d9ee7d',
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };