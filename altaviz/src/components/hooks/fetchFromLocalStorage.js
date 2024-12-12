import { RotContext } from "../context/RotContext";
import { useContext } from "react";
// import usePaginationWithEncryption from "../paginationComp/usePaginationWithEncryption";
// import { AuthContext } from "../context/checkAuth/AuthContext";

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
