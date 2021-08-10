import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFvWKGMDd4761njzfP22OmraBnvF-qM0k",
  authDomain: "catetanku-1a316.firebaseapp.com",
  databaseURL:
    "https://catetanku-1a316-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catetanku-1a316",
  storageBucket: "catetanku-1a316.appspot.com",
  messagingSenderId: "281752929977",
  appId: "1:281752929977:web:88e5623514fa5ae1a83d68",
  measurementId: "G-RSZZT6W2F4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
