import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuZ_hUhwhhLoJ98dSV8Dd9Nt7i7fRxSM4",
  authDomain: "notekeeping-156fa.firebaseapp.com",
  projectId: "notekeeping-156fa",
  storageBucket: "notekeeping-156fa.appspot.com",
  messagingSenderId: "889836104060",
  appId: "1:889836104060:web:71eebc402fff0c8ddd5cf9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app);
