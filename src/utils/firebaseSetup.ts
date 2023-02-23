// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User as UserFirebase,
} from 'firebase/auth';
import {
  getFirestore, setDoc, getDoc, doc,
} from 'firebase/firestore';
import { User as UserModel } from '../interfaces/User';
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
const createOrUpdateUserDocument = async (myUserFirebase: UserFirebase, myUserModel: UserModel) => {
  try {
    await setDoc(doc(firestore, 'user', myUserFirebase.uid), myUserModel);
  } catch (error) {
    console.error('Error creating user document:', error);
  }
};

const getUserDocument = async (uid: string) => {
  try {
    const userDocument = await getDoc(doc(firestore, 'user', uid));
    return userDocument;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const signInFirebase = signInWithEmailAndPassword;
export const signUpFirebase = createUserWithEmailAndPassword;

// Export the function to create a new user document
export { createOrUpdateUserDocument, getUserDocument };
