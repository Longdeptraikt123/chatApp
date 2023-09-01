// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4MEP9MxSnczT_eX1NOHr-BzIIFKGBxok",
    authDomain: "chatapp-1849d.firebaseapp.com",
    projectId: "chatapp-1849d",
    storageBucket: "chatapp-1849d.appspot.com",
    messagingSenderId: "278542591661",
    appId: "1:278542591661:web:a214d1c758ec8bb835c824",
    measurementId: "G-KSKDQ06227"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();
// const analytics = getAnalytics(app);