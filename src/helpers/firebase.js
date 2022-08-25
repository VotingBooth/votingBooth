// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// export default firebase

// export const database = getDatabase();