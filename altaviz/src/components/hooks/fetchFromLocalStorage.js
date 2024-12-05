import { RotContext } from "../context/RotContext";
import { useContext } from "react";
import usePaginationWithEncryption from "../paginationComp/usePaginationWithEncryption";
import { AuthContext } from "../context/checkAuth/AuthContext";

function FetchFromLocalStorageOrDB(key, id=null) {
	const { decrypt, RotCipher } = useContext(RotContext);
	const storedData = localStorage.getItem(key);
	// console.log(`Fetching ${key} from local storage`);
	try {
		// console.log(`Fetching ${key} from local storage`);
		const decodedData = RotCipher(storedData, decrypt)
		let parsed = JSON.parse(decodedData)
		if (id) {parsed = parsed.filter(faults => faults.id === id)[0].faults}
		// console.log('parsed:', parsed);
		return parsed;
	} catch (e) {
		// console.log('Error:', e);
		console.log(`${key}`);
		console.log(`Fetching ${key} from database`);
		console.log(
			// 'items:', !!items,
		)
		return null;
	}
}
export default FetchFromLocalStorageOrDB;

// function FetchFromLocalStorageOrDBForEngineer(url, key) {
// 	const { decrypt, RotCipher } = useContext(RotContext);
// 	const storedData = localStorage.getItem(key);
// 	const pendingItems = usePaginationWithEncryption(
// 		`http://127.0.0.1:8000/${url}/`,
// 	10, `${key}`,
// 		// isRefresh
// 	)
// 	console.log(`Fetching ${key} from local storage`);
// 	try {
// 		console.log(`Fetching ${key} from local storage`);
// 		const decodedData = RotCipher(storedData, decrypt)
// 		const parsed = JSON.parse(decodedData)
// 		console.log('parsed:', parsed);
// 		return parsed;
// 	} catch (e) {
// 		console.log(`Fetching ${key} from database`);
// 		console.log('Error:', e);
// 		console.log(`${key}`);
// 		return pendingItems;
// 	}
// }
// export { FetchFromLocalStorageOrDBForEngineer };


// import { useContext, useEffect, useState } from "react";
// import { RotContext } from "../context/RotContext";
// import usePaginationWithEncryption from "../paginationComp/usePaginationWithEncryption";

// function FetchFromLocalStorageOrDB(key, url) {
//     const { decrypt, RotCipher } = useContext(RotContext);
//     const [localData, setLocalData] = useState(null);
//     const [apiData, setApiData] = useState(null);
//     const storedData = localStorage.getItem(key);

//     useEffect(() => {
//         // Try fetching from local storage
//         if (storedData) {
//             try {
//                 const decodedData = RotCipher(storedData, decrypt);
//                 const parsed = JSON.parse(decodedData);
//                 console.log('Parsed from local storage:', parsed);
//                 setLocalData(parsed); // Set local data if found
//             } catch (e) {
//                 console.log('Local storage error:', e);
//             }
//         }
//     }, [storedData, RotCipher, decrypt, key]);

//     // Fallback to fetch from API
//     const items = usePaginationWithEncryption(`http://127.0.0.1:8000/${url}/`, 10, `${key}`);

//     useEffect(() => {
//         if (items) {
//             console.log("Fetched from API:", items);
//             setApiData(items.localDataStoreVar); // Set API data when available
//         }
//     }, [items]);

//     // Return both local and API data
//     return { localData, apiData };
// }

// export default FetchFromLocalStorageOrDB;
