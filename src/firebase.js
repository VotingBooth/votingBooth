import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC91BM3u0TFtf3aM_9-abe4qlVrpqijuzo",
    authDomain: "votingbooth-693ab.firebaseapp.com",
    databaseURL: "https://votingbooth-693ab-default-rtdb.firebaseio.com",
    projectId: "votingbooth-693ab",
    storageBucket: "votingbooth-693ab.appspot.com",
    messagingSenderId: "254030087225",
    appId: "1:254030087225:web:068f9c1a586c23e97379e8"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();


// signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     // ...
//   }).catch((error) => {
//     // ...
//   });

//   export const signInAnon = async () => {
//     try {
//       await signInAnonymously(auth)
//     } catch (err) {
//       alert(err.message);
//     }
//   };
  
//   export const logout = () => {
//     signOut(auth);
//   };