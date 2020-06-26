import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
let config = {
  apiKey: "AIzaSyDCVzkwnj_REsSfWsJ9PYnZHwfqdticX7w",
  authDomain: "aprendepoqomam.firebaseapp.com",
  databaseURL: "https://aprendepoqomam.firebaseio.com",
  projectId: "aprendepoqomam",
  storageBucket: "aprendepoqomam.appspot.com",
  messagingSenderId: "993476070588",
  appId: "1:993476070588:web:8ca3c2226d01493c8a94b9",
  measurementId: "G-684GYM1BCV",
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();
export const db = firebase.firestore();
