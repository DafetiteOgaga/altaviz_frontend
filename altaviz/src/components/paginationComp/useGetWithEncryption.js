import { useState, useEffect, useContext } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
import { AuthContext } from "../context/checkAuth/AuthContext";
import { useLocation } from 'react-router-dom';
import { setKeyToLocalStorage } from "../hooks/setToLocalStorage";

const checkNull = (url) => url.split('/').some?.(part => part === 'null')

function useGetWithEncryption(
	baseUrl,
	storageName='temp',
	refresh=false
) {
	console.log('3333333333')
	console.log({baseUrl})
	const { authData } = useContext(AuthContext);
	const dept = useLocation().pathname.split('/')[1];
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const [getTrigger, setGetTrigger] = useState(false);
	// const [pageUrl, setPageUrl] = useState(baseUrl);
	const { getData, getLoading, getError } = useGetDataAPI(
		baseUrl, getTrigger,
	);
	// const [pageNum, setPageNum] = useState(1);
	// const [theTotalPage, setTheTotalPage] = useState(null);
	const [localDataStoreVar, setLocalDataStoreVar] = useState(null);

	
	useEffect(() => {
		// Load data from localStorage on component mount
		const storedData = localStorage.getItem(storageName);
		let isCustodian
		const urlToCheck = baseUrl.split('/')[0]
		if (urlToCheck === 'custodian-details-update' || urlToCheck === 'others-details-update') {
			console.log('isbaseurl '.repeat(30))
			if (storageName === 'custodian') {
				console.log('iscustodian '.repeat(30))
				isCustodian = authData.role === 'custodian';
			} else if (storageName === 'notCustodian') {
				console.log('isnotcustodian '.repeat(30))
				isCustodian = authData.role !== 'custodian';
			} else {
				console.log('isnotcustodian and not not custodian '.repeat(30))
				isCustodian = false;
			}
		} else {console.log('is not baseurl '.repeat(30)); isCustodian = true}
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
			if ((!storedData||storedData.length === 0||
				refresh) && !checkNull(baseUrl) && isCustodian) {
				setGetTrigger(true);
			}
		}
		// } catch (e) { console.log('Error:', e); }
	}, [storageName, refresh]);

	useEffect(() => {
		if (localDataStoreVar) {
			console.log('local data store:', localDataStoreVar);
		}
		if (getData) {
			console.log('previous locaStorage:', localDataStoreVar);
			// Update localDataStoreVar with new data
			if (!localDataStoreVar) {
				setLocalDataStoreVar(getData)
			} else {
				setLocalDataStoreVar(prevData => {
					const newData = prevData ? [...prevData] : [];
					getData.forEach(item => {
						if (!newData.some?.(existingItem => existingItem.id === item.id)) {
							newData.push(item);
						}
					});
					return newData;
				});
			}
			setGetTrigger(false);
		}
	}, [getData]);

	// Update localStorage whenever localDataStoreVar changes
	useEffect(() => {
		if (localDataStoreVar) {
			// console.log('original save:', localDataStoreVar)
			const encodedData = RotCipher(JSON.stringify(localDataStoreVar), encrypt)
			// console.log('encoded:', encodedData)
			// localStorage.setItem(storageName, encodedData);
			setKeyToLocalStorage(storageName, encodedData);
			console.log('updating ##*##: localStorage');
			console.log(`set ${localDataStoreVar.length} to local storage`)
		}
		console.log('retrieving from locaStorage ##*##: localStorage');
		console.log('UPDATE######*****######:', localDataStoreVar)
	}, [localDataStoreVar, storageName]);
	console.log(
		'\nauthData.role:', authData.role,
		'\ndepartment:', dept,
		'\nstorageName:', storageName,
		'\nbaseUrl:', baseUrl,
		'\nurlToCheck:', baseUrl.split('/')[0],
		'\ncustodian or notcustodian:', (baseUrl.split('/')[0] === 'custodian-details-update' || baseUrl.split('/')[0] === 'others-details-update'),
	)
	console.log('localDataStoreVar BEFORE RETURN TO CALLING FXN:', localDataStoreVar);
	return {
		getData, getLoading, getError,
		localDataStoreVar
	}
}

export default useGetWithEncryption;
