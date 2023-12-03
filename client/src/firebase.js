// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "room-radaar.firebaseapp.com",
  projectId: "room-radaar",
  storageBucket: "room-radaar.appspot.com",
  messagingSenderId: "235906789868",
  appId: "1:235906789868:web:21e64ef7135846440ed0c9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
