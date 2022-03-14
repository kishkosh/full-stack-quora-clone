import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZoEz338GNL8J7w8S-B96z4gF_enHur2w",
  authDomain: "startupbooster-6d27e.firebaseapp.com",
  databaseURL: "https://startupbooster-6d27e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "startupbooster-6d27e",
  storageBucket: "startupbooster-6d27e.appspot.com",
  messagingSenderId: "685323668089",
  appId: "1:685323668089:web:8786dabe8eff7f237f22a8",
  measurementId: "G-LZJV6KM1V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, app };
