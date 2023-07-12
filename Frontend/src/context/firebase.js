import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCV2ylUXKADmaVVjw2Z5XXi3-N_KJNh8mo",
    authDomain: "website-like-twitter.firebaseapp.com",
    projectId: "website-like-twitter",
    storageBucket: "website-like-twitter.appspot.com",
    messagingSenderId: "1091167626885",
    appId: "1:1091167626885:web:9e6bf2d816edea7459abec",
    measurementId: "G-6SSBNF8T4K"
};

let firebaseApp

if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(firebaseConfig)
} else {
    firebaseApp = firebase.app()
}

const auth = firebase.auth()
export { auth, firebaseApp }
