// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/functions"



const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig);

firebase.auth().signInWithEmailAndPassword('aguirregzz97@gmail.com', 'Blacky7890#').catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  })

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const functions = firebase.functions();

export { auth, firestore, storage, functions };