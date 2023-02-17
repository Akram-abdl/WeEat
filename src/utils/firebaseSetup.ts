// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential,
} from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { User } from '../models/User';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAdb8-mB35cahKwXOqBxefzPMWL9P1fHqw',
  authDomain: 'weeat-e9c21.firebaseapp.com',
  projectId: 'weeat-e9c21',
  storageBucket: 'weeat-e9c21.appspot.com',
  messagingSenderId: '871361007505',
  appId: '1:871361007505:web:794f4851f2f6e3878fd430',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

// Create a new user document in Firestore
const createUserDocument = async (userCredential: UserCredential, userFirebase: User) => {
  try {
    await setDoc(doc(firestore, 'user', userCredential.user.uid), userFirebase);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const signInFirebase = signInWithEmailAndPassword;
export const signUpFirebase = createUserWithEmailAndPassword;

// Export the function to create a new user document
export { createUserDocument };
