// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCAbiFXgn5Prf_ZOzVxZhetvScr3bdJc2c',
    authDomain: 'projeto-01-71ecb.firebaseapp.com',
    projectId: 'projeto-01-71ecb',
    storageBucket: 'projeto-01-71ecb.firebasestorage.app',
    messagingSenderId: '164426573451',
    appId: '1:164426573451:web:0ad5357df50c9147d8d68e',
    measurementId: 'G-P0T9F4L8GG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
