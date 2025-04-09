// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyANPHU0GXrOMDeEjpdXlbm0oregBIuDxWc",
  authDomain: "prepwise-e0572.firebaseapp.com",
  databaseURL: "https://prepwise-e0572-default-rtdb.firebaseio.com",
  projectId: "prepwise-e0572",
  storageBucket: "prepwise-e0572.firebasestorage.app",
  messagingSenderId: "682476912529",
  appId: "1:682476912529:web:d258110d7df8b27426a430",
  measurementId: "G-JRRTEFQB44"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);