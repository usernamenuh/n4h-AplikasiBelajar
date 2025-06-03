// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCILktOzLjQILIELO8749c4QMynyepQ_hA",
    authDomain: "catatan-belajar-realtime.firebaseapp.com",
    databaseURL: "https://catatan-belajar-realtime-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "catatan-belajar-realtime",
    storageBucket: "catatan-belajar-realtime.firebasestorage.app",
    messagingSenderId: "60284155336",
    appId: "1:60284155336:web:17bae46f016f26536b7cfd",
    measurementId: "G-F3RT1JYKP1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const statusEl = document.getElementById('status');

// Deteksi device (sederhana)
const isPhone = /Android|iPhone|iPad/i.test(navigator.userAgent);

// Saat web dibuka di HP → kirim sinyal ke database
if (isPhone) {
    const triggerRef = ref(db, 'trigger');
    set(triggerRef, {
        triggeredAt: new Date().toISOString(),
        device: "HP"
    });
}

// Web di laptop mendengarkan sinyal dari database
const listenRef = ref(db, 'trigger');
onValue(listenRef, (snapshot) => {
    const data = snapshot.val();
    if (!isPhone && data?.device === "HP") {
        statusEl.textContent = "📢 HP kamu dibuka! Fokus lagi yuk 💪";

        // Notifikasi browser (minta izin dulu)
        if (Notification.permission === "granted") {
            new Notification("⚠️ HP kamu terbuka", {
                body: "Ayo kembali belajar ✍️",
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification("⚠️ HP kamu terbuka", {
                        body: "Ayo kembali belajar ✍️",
                    });
                }
            });
        }
    }
});
