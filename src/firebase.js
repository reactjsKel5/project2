// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_neTw3irqZ3eI33w8xUYjM7t-Zy2YthM",
    authDomain: "coller-me.firebaseapp.com",
    projectId: "coller-me",
    storageBucket: "coller-me.appspot.com",
    messagingSenderId: "214452480553",
    appId: "1:214452480553:web:8afeec1549fa6b2db38a38",
    measurementId: "G-Y94G6MENJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app



