import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBc95JlD137ulM_lqFFts_gjSTnmkpOwfI",
  authDomain: "clientes-4b3e9.firebaseapp.com",
  projectId: "clientes-4b3e9",
  storageBucket: "clientes-4b3e9.appspot.com",
  messagingSenderId: "455030873497",
  appId: "1:455030873497:web:da8d0afbf78ab4c22d4708"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)