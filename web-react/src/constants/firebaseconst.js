import firebase from 'firebase'

const config = {
  apiKey: "your-firebase-api",
  authDomain: "your-firebase-project.firebaseapp.com",
  databaseURL: "https://your-firebase-project.firebaseio.com",
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const database = firebase.database();
export const firebaseAuth = firebase.auth;
