import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcUjKPVdE9cZQn2Da6Mp9nE0zX7S6zrv4",
    authDomain: "filmslist-e1454.firebaseapp.com",
    projectId: "filmslist-e1454",
    storageBucket: "filmslist-e1454.appspot.com",
    messagingSenderId: "993554720821",
    appId: "1:993554720821:web:82188db5db4b8fe505697c",
    measurementId: "G-6H3L750PD6"
  };

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
  
  let db = firebase.firestore();
  export default db;