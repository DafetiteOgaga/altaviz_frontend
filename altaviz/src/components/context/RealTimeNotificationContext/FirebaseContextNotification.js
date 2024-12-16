import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";  // Import your firebase setup

const FirebaseContext = createContext();

export const useFirebase = () => {
	return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const dbRef = ref(db, 'notifications/4/'); // Adjust the path as needed
		onValue(dbRef, (snapshot) => {
		const value = snapshot.val();
		setData(value);
		console.log('New value:', value);
		});
	}, []);

	return (
		<FirebaseContext.Provider value={{ data }}>
		{children}
		</FirebaseContext.Provider>
	);
};
