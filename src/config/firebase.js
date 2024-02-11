// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9CclhqmihfkiZ6PnHI_MpWeNMC1gdvyo",
  authDomain: "chatroom-6f94d.firebaseapp.com",
  projectId: "chatroom-6f94d",
  storageBucket: "chatroom-6f94d.appspot.com",
  messagingSenderId: "96481816083",
  appId: "1:96481816083:web:0bf61c61ea7860a92919e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
