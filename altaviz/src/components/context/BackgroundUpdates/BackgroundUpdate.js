import { RotContext } from "../RotContext";
import { useContext } from "react";
import { setKeyToLocalStorage } from "../../hooks/setToLocalStorage";

const useBackgroundUpdate = async (endpoints, action=false) => {
	const {encrypt, RotCipher} = useContext(RotContext);
	if (!action) return;
	try {
		// Fetch data from all endpoints concurrently using Promise.all
		const responses = await Promise.all(
		endpoints.map((arr) => {
			console.log('arr:'.repeat(25), arr)
			const [key, endpoint] = arr.split('-/');
			console.log(
				'\nkey:'.repeat(30), key,
				'\nendpoint:'.repeat(30), endpoint,
			)
			return (
				fetch(endpoint).then(async (res) => {
				if (!res.ok) {
					throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
				}
				const data = await res.json();
				// const localData = JSON.stringify(data)
				const localData = RotCipher(JSON.stringify(data), encrypt)
				console.log('localData:'.repeat(10), key, ': =>', localData.slice(0, 60))
				// localStorage.setItem(key, localData)
				setKeyToLocalStorage(key, localData)
				const getCurrUpdateValue = localStorage.getItem('updateCounter')
				if (getCurrUpdateValue) {
					const [currNum, totalNum] = getCurrUpdateValue.split('/')
					if (currNum!==totalNum) {
						// localStorage.setItem('updateCounter', Number(currNum)+1+'/'+totalNum)
						setKeyToLocalStorage('updateCounter', Number(currNum)+1+'/'+totalNum)
					} else {
						localStorage.removeItem('updateCounter')
					}
				} else {
					// localStorage.setItem('updateCounter', 1+'/'+endpoints.length)
					setKeyToLocalStorage('updateCounter', 1+'/'+endpoints.length)
				}
				return data;

				})
			)
		}));
		console.log('all endpoints fetched and stored successfully'.repeat(30))
		return responses; // Array of responses, one for each endpoint
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};
export { useBackgroundUpdate };