import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBTxZ8pWxh8XgzELBr-yu4glp5Izoh1Gls",
    authDomain: "e-furniture-d1430.firebaseapp.com",
    projectId: "e-furniture-d1430",
    storageBucket: "e-furniture-d1430.appspot.com",
    messagingSenderId: "295521537128",
    appId: "1:295521537128:web:bf2d896813e4006aacbfdd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;