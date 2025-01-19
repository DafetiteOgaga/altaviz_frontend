import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
import { setKeyToLocalStorage } from "../hooks/setToLocalStorage";

function useGetWEncryptionSingleItem(
	storageName='temp',
	refresh=false
) {
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const [getTrigger, setGetTrigger] = useState(false);
	const { getData, getLoading, getError } = useGetDataAPI(
		getTrigger,
	);
	// const [pageNum, setPageNum] = useState(1);
	// const [theTotalPage, setTheTotalPage] = useState(null);
	const [localDataStoreVar, setLocalDataStoreVar] = useState(null);

	useEffect(() => {
		// Load data from localStorage on component mount
		const storedData = localStorage.getItem(storageName);
		// try {
		if (storedData) {
			// console.log('retrieved:', storedData)
			const decodedData = RotCipher(storedData, decrypt)
			console.log('decoded ##*##: storeData exists')
			console.log('decodedData:', decodedData)
			const parsedData = JSON.parse(decodedData);
			if (parsedData) {
				setLocalDataStoreVar(parsedData);
				console.log('parsedData:', parsedData)
			}
		} else {
			if (!storedData || storedData.length === 0 ||
				refresh) {
				setGetTrigger(true);
				const delay = setTimeout(() => {
					if (getTrigger) setGetTrigger(false);
				}, 1000);
				return () => clearTimeout(delay);
			}
		}
		// } catch (e) { console.log('Error:', e); }
	}, [storageName, refresh]);

	useEffect(() => {
		if (localDataStoreVar) {
		console.log('local data store:', localDataStoreVar);
		}
		if (getData) {
			setLocalDataStoreVar(() => {
				console.log('setting data to setLocalDataStoreVar');
				return getData;
			});
		}
	}, [getData]);

	// Update localStorage whenever localDataStoreVar changes
	useEffect(() => {
		if (localDataStoreVar) {
			// console.log('original save:', localDataStoreVar)
			const encodedData = RotCipher(JSON.stringify(localDataStoreVar), encrypt)
			// console.log('encoded:', encodedData)
			// localStorage.setItem(storageName, encodedData);
			setKeyToLocalStorage(storageName, encodedData)
			console.log('updating ##*##: localStorage');
			console.log(`set ${localDataStoreVar.length} to local storage`)
		}
		console.log('retrieving from locaStorage ##*##: localStorage');
		console.log('UPDATE######*****######:', localDataStoreVar)
	}, [localDataStoreVar, storageName]);
	console.log('localDataStoreVar BEFORE RETURN TO CALLING FXN:', localDataStoreVar);
	return {
		getData, getLoading, getError,
		localDataStoreVar
	}
}

export default useGetWEncryptionSingleItem;
