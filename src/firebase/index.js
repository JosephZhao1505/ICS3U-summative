import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqg83lP0IAywcjo0SypC5DL_quwuFjaJE",
    authDomain: "summative-2ded5.firebaseapp.com",
    projectId: "summative-2ded5",
    storageBucket: "summative-2ded5.firebasestorage.app",
    messagingSenderId: "829247198139",
    appId: "1:829247198139:web:7e5431f7b63273c6cc6a9e"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };