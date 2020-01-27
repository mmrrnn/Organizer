import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBx8BynuP8lto1vPMIc5i7gnrNMMHWkfac",
    authDomain: "testowa-baza1.firebaseapp.com",
    databaseURL: "https://testowa-baza1.firebaseio.com",
    projectId: "testowa-baza1",
    storageBucket: "testowa-baza1.appspot.com",
    messagingSenderId: "473379311436",
    appId: "1:473379311436:web:ac13b0b80f1a12ecc889e9",
    measurementId: "G-F4WJQQEW0N"
};

firebase.initializeApp(config);

export default firebase;