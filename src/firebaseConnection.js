// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5YjTNEayZhRxi6o8oOiJmUqqZqx74HT0",
  authDomain: "assinapp-3694a.firebaseapp.com",
  projectId: "assinapp-3694a",
  storageBucket: "assinapp-3694a.firebasestorage.app",
  messagingSenderId: "249419267348",
  appId: "1:249419267348:web:9752777e5f0bcf7c2f1601"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };



