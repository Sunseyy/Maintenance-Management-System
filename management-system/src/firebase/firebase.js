import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHucgffUGy-n4MZQvVoGT78NvW46HI0vM",
  authDomain: "manag-car-manif.firebaseapp.com",
  projectId: "manag-car-manif",
  storageBucket: "manag-car-manif.appspot.com",
  messagingSenderId: "7875409597",
  appId: "1:7875409597:web:3962eea41a820c3f5d69d4",
  measurementId: "G-SYK8Q8S1R3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // Initialize Realtime Database
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app);
export { database, storage  ,auth};
