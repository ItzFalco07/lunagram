import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from  'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyABx1u0qg975bq5eIWgzeTB4YywrYrkrqM",
    authDomain: "auragram-3c19d.firebaseapp.com",
    projectId: "auragram-3c19d",
    storageBucket: "auragram-3c19d.firebasestorage.app",
    messagingSenderId: "102604832207",
    appId: "1:102604832207:web:07cc8c66be47857829a6ba",
    measurementId: "G-63470GWWFP"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {auth, db, storage}