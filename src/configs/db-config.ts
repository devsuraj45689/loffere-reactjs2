// firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDCdlpZhaEdrxffign8j6SuKLpmI4LI8UY',
  authDomain: 'loffre-ma.firebaseapp.com',
  projectId: 'loffre-ma',
  storageBucket: 'loffre-ma.appspot.com',
  messagingSenderId: '1006086451707',
  appId: '1:1006086451707:web:7ec09c3a3c4cec532f9b5e',
  measurementId: 'G-03Q45C5N64',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export { app, auth, provider, FacebookAuthProvider, fbProvider };
