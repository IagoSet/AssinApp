// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5D2oYNwNk-JcFf-vRfkwq60l_cxPG_dk",
  authDomain: "app-financas-6241a.firebaseapp.com",
  projectId: "app-financas-6241a",
  storageBucket: "app-financas-6241a.firebasestorage.app",
  messagingSenderId: "138282268314",
  appId: "1:138282268314:web:e74435a89b486abc04d123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };



