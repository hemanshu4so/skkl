// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8CzbYXn6aPfqNgjZfVdcz_3ce3bOfco4",
  authDomain: "skkl-erp.firebaseapp.com",
  projectId: "skkl-erp",
  storageBucket: "skkl-erp.firebasestorage.app",
  messagingSenderId: "539497116006",
  appId: "1:539497116006:web:17d2c3226de01645ef98a7",
  measurementId: "G-9VEP52G71J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;