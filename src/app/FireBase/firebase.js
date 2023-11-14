import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATFsdIvHQUFr8MnUkbCAThfOqSYeqVaLQ",
  authDomain: "nsauto-a4477.firebaseapp.com",
  projectId: "nsauto-a4477",
  storageBucket: "nsauto-a4477.appspot.com", 
  messagingSenderId: "648618796427",
  appId: "1:648618796427:web:f58c4b23a3f605510abb8e",
  measurementId: "G-V0JBZ47KKN"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();

