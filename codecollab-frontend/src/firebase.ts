// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfQMG2IEBl3g9Da1scsWYkCjOMrHynNyI",
  authDomain: "code-collab-gu.firebaseapp.com",
  projectId: "code-collab-gu",
  storageBucket: "code-collab-gu.appspot.com",
  messagingSenderId: "646352467156",
  appId: "1:646352467156:web:7cced5af2d44e76e7c7741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth}