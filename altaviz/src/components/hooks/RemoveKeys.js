
const localstorageList = () => {
	let localList = [] // gather local keys
	for (let i = 0; i < localStorage.length; i++) {
		console.log('appending localkey:'.toUpperCase(), localStorage.key(i));
		localList.push(localStorage.key(i));
	}
	return localList
}

function RemoveKeys(keys) {
	for (let i = 0; i < keys.length; i++) {
		localStorage.removeItem(keys[i]);
	}
}
export default RemoveKeys

export function RemoveAllKeys () {
	const localList = localstorageList()
	console.log(localList.map(key => `key: ${key}`))
	for (const key of localList) {
		localStorage.removeItem(key);  // Remove local keys and their values from localStorage
		console.log(`removed key: ${key}`);    // Log the key that was removed
	}
}

export function RemoveAllKeysButAuth () {
	let localList = localstorageList()
	localList = localList.filter(key => key !== 'authData')
	// let localList = [] // gather local keys
	// for (let i = 0; i < localStorage.length; i++) {
	// 	if (localStorage.key(i) === 'authData') continue // exempt authentication date
	// 	console.log('appending localkey:'.toUpperCase(), localStorage.key(i));
	// 	localList.push(localStorage.key(i));
	// 	// localStorage.removeItem(localStorage.key(i));
	// }
	console.log(localList.map(key => `key: ${key}`))
	for (const key of localList) {
		localStorage.removeItem(key);  // Remove local keys and their values from localStorage
		console.log(`removed key: ${key}`);    // Log the key that was removed
	}
}