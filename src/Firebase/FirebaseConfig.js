

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCctcIYOJtlXItfbwhBRiRK3diW4mASajk",
  authDomain: "inmed-b81d1.firebaseapp.com",
  projectId: "inmed-b81d1",
  storageBucket: "inmed-b81d1.appspot.com", // ✅ fix: use appspot.com, not firebasestorage.app
  messagingSenderId: "183047134711",
  appId: "1:183047134711:web:f02f4acae9b5368edb22f2",
  measurementId: "G-8VYZPNX6YM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, storage, analytics };


