import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {getFirestore} from 'firebase/firestore';

import {firebaseConfig} from "../firebase.config"
const app = firebase.initializeApp({
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    measurementId: firebaseConfig.measurementId


});

export const db = getFirestore();
export const auth = app.auth();
export default app;
