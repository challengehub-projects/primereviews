import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"



// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCznEzFpUkN7YHu0UA-Htcuh1zkqbX7-EY",
  authDomain: "prime-reviews-database-757cb.firebaseapp.com",
  projectId: "prime-reviews-database-757cb",
  storageBucket: "prime-reviews-database-757cb.appspot.com",
  messagingSenderId: "833492883199",
  appId: "1:833492883199:web:9c8cba383de54dcb8e1eca",
  measurementId: "G-5X2Z4GYWLZ",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
