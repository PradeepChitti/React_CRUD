import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaTqVsbmKOrNsj-7nv8F7hLOHXU_N5sG4",
  authDomain: "book-app-a114a.firebaseapp.com",
  projectId: "book-app-a114a",
  storageBucket: "book-app-a114a.appspot.com",
  messagingSenderId: "984472308740",
  appId: "1:984472308740:web:bb89d429df948645f6f951",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
