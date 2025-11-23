import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHoYkNyILVdDbk2zCvG3Bm99bZhZtzDwA",
  authDomain: "what-to-play-now.firebaseapp.com",
  projectId: "what-to-play-now",
  storageBucket: "what-to-play-now.firebasestorage.app",
  messagingSenderId: "214184262120",
  appId: "1:214184262120:web:50d8d835436c9c61b68c5d"
};

export const app = initializeApp(firebaseConfig);
