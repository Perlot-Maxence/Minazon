import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: "minazone-2930a.firebaseapp.com",
    projectId: "minazone-2930a",
    storageBucket: "minazone-2930a.firebasestorage.app",
    messagingSenderId: "413864446319",
    appId: "1:413864446319:web:27324555b4d3e14b00809a"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();