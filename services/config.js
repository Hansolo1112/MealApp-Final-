// firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 7S6Xrot49LolH67OL6gs

const firebaseConfig = {
    apiKey: "AIzaSyB1ndMNnFOIwW_hGjoYUvKpitCbRoey1po",
  authDomain: "food-app-2146c.firebaseapp.com",
  projectId: "food-app-2146c",
  storageBucket: "food-app-2146c.appspot.com",
  messagingSenderId: "134684766946",
  appId: "1:134684766946:web:3a6630ace7ab6b5beae4bb",
  measurementId: "G-1ZF1W5WX3R"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = getFirestore();
const storage = getStorage();

export { firebase };
export { storage };
export { db };