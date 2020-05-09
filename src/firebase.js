import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBqLYo-c_NWFqsFCpJ_1X-VwbdqXJSnfw",
    authDomain: "fitness-bcc01.firebaseapp.com",
    databaseURL: "https://fitness-bcc01.firebaseio.com",
    projectId: "fitness-bcc01",
    storageBucket: "fitness-bcc01.appspot.com",
    messagingSenderId: "114678639191",
    appId: "1:114678639191:web:67a98f41749d33ffc59112",
    measurementId: "G-75QSFDF5TV"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = event => {
  event.preventDefault();
  auth.signInWithPopup(provider);
};

export const firestore = firebase.firestore();