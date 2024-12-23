// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, off, set, push, onValue } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig2 = {
	apiKey: "AIzaSyAkSCqmpzCf3GjGME7tnhdP1wPqWupkhdI",
	authDomain: "altaviz-chat-notification.firebaseapp.com",
	databaseURL: "https://altaviz-chat-notification-default-rtdb.firebaseio.com",
	projectId: "altaviz-chat-notification",
	storageBucket: "altaviz-chat-notification.firebasestorage.app",
	messagingSenderId: "449361606829",
	appId: "1:449361606829:web:beae786c17b3a639156e24",
	measurementId: "G-NHRWK8GMNC"
};

// Check if Firebase has already been initialized to avoid the conflict
let app2;
if (!getApps().some(app => app.name === 'altaviz-chat-notification')) {
	app2 = initializeApp(firebaseConfig2, 'altaviz-chat-notification');
} else {
	console.log('Firebase already initialized');
	console.log('lists of apps:', getApps())
	app2 = getApps().find(app => app.name === 'altaviz-chat-notification');
}

// Initialize Realtime Database instance
console.log("Initializing Firebase Realtime Database...");
const database = getDatabase(app2);
console.log("Firebase Realtime Database initialized:", database);


// listenForUpdates(123)

export {database};