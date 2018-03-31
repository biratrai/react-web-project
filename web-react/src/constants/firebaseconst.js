import firebase from 'firebase'

const config = {
    apiKey: "your-firebase-api",
    authDomain: "https://firebase-auth-domain",   
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;