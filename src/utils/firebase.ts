// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCG1_qjUdi6BYxE01I7LmGEM4sKUIIHZGY',
  authDomain: 'weshare-d529b.firebaseapp.com',
  projectId: 'weshare-d529b',
  storageBucket: 'weshare-d529b.appspot.com',
  messagingSenderId: '158310222189',
  appId: '1:158310222189:web:a59b273326f75c9c5f3264',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
