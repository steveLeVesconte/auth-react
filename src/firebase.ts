import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {getFirestore} from 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDczQXdFYjCretQ1ChFgUvqs4BoT4fBknY",
    authDomain: "auth-react-dev-29188.firebaseapp.com",
    projectId:"auth-react-dev-29188",
    storageBucket: "auth-react-dev-29188.appspot.com",
    messagingSenderId: "804238099102",
    appId: "1:804238099102:web:19341e92a8b2d8e56f318f",
    measurementId: "G-277T050RYG"

    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

//const analytics = getAnalytics(app);

export const db = getFirestore();
export const auth = app.auth();
export default app;
