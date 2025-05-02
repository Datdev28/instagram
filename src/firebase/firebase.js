import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZTlGFXc6EatGQ3nklf1dJhpytkoOFqQA",
  authDomain: "instagram-fb8b2.firebaseapp.com",
  projectId: "instagram-fb8b2",
  storageBucket: "instagram-fb8b2.firebasestorage.app",
  messagingSenderId: "1072264189835",
  appId: "1:1072264189835:web:b062744574a024a974818e",
  measurementId: "G-F0S9PRW9PM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
export {app, auth, fireStore};