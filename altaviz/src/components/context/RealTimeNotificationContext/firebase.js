// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB5YBYF88go-VY4rxZfTTBTmLYYdp8fpmU",
	authDomain: "altaviz-notifications.firebaseapp.com",
	databaseURL: "https://altaviz-notifications-default-rtdb.firebaseio.com", // This is the URL of your Realtime Database
	projectId: "altaviz-notifications",
	storageBucket: "altaviz-notifications.firebasestorage.app",
	messagingSenderId: "192925899002",
	appId: "1:192925899002:web:59f54a113d773957d39143",
	measurementId: "G-T02XBFS1KQ"
};

console.log('firebaseConfig:', firebaseConfig)
console.log('Initializing Firebase')
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

console.log('Initializing Firebase Realtime Database')
// Initialize Firebase Realtime Database
const db = getDatabase(app);

// Example listener function
const listenForChanges = () => {
	console.log('inside listenForChanges fxn')
	const dbRef = ref(db, 'notifications/5/');  // Change 'notifications/' to your desired path in the database
		onValue(dbRef, (snapshot) => {
			const data = snapshot.val();
			console.log('New data:', data); // Do something with the new data, like updating your state
		});
};

// Call this function to start listening
listenForChanges();

export { db, listenForChanges };

