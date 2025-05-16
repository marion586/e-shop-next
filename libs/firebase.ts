// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE8gmL7utrBuGTw8id_aHxLIIwGF9quXg",
  authDomain: "nba-full-582e8.firebaseapp.com",
  databaseURL: "https://nba-full-582e8-default-rtdb.firebaseio.com",
  projectId: "nba-full-582e8",
  storageBucket: "nba-full-582e8.appspot.com",
  messagingSenderId: "671915725634",
  appId: "1:671915725634:web:97edcc2307929028b82edb",
  measurementId: "G-6QGWSMWR8D",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
