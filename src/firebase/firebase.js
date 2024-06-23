import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBNtgr5z_QA_KhIlQBkeVmt1F2t57yB1tg",
  authDomain: "house-quest-fc532.firebaseapp.com",
  projectId: "house-quest-fc532",
  storageBucket: "house-quest-fc532.appspot.com",
  messagingSenderId: "708105785027",
  appId: "1:708105785027:web:d122500a16bc917c3a5c76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const googleAuthProvider = new GoogleAuthProvider()

export {app, auth, db, storage, googleAuthProvider}