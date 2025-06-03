// public/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCILktOzLjQILIELO8749c4QMynyepQ_hA",
    authDomain: "catatan-belajar-realtime.firebaseapp.com",
    databaseURL: "https://catatan-belajar-realtime-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "catatan-belajar-realtime",
    storageBucket: "catatan-belajar-realtime.appspot.com",
    messagingSenderId: "60284155336",
    appId: "1:60284155336:web:17bae46f016f26536b7cfd",
    measurementId: "G-F3RT1JYKP1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);