const localstorageList = () => {
	let localList = localStorage.getItem('altavizKeys') // get local keys
	return localList?JSON.parse(localList):[]
}

const processList = (localList) => {
	if (!localList || localList.length === 0) return;
	for (const key of localList) {
		localStorage.removeItem(key);  // Remove local keys and their values from localStorage
		console.log(`removed key: ${key}`);    // Log the key that was removed
	}
}

// for specific array of keys
function RemoveKeys(keysList) {
	if (!keysList || keysList.length === 0) return;
	for (let i = 0; i < keysList.length; i++) {
		localStorage.removeItem(keysList[i]);
	}
}
export default RemoveKeys

// to remove all keys
export function RemoveAllKeys () {
	const localList = localstorageList()
	if (!localList || localList.length === 0) return;
	console.log(localList.map(key => `key: ${key}`))
	processList(localList)
}

// to remove all keys except authData
export function RemoveAllKeysButAuth () {
	let localList = localstorageList()
	if (!localList || localList.length === 0) return;
	localList = localList.filter(key => key !== 'authData')
	console.log(localList.map(key => `key: ${key}`))
	processList(localList)
}

// clean up up
function cleanUpLocalStorage() {
	const localList = localstorageList()
	if (!localList || localList.length === 0) return;
	const total = localList.length
	let counter = 0
	for (const key of localList) {
		const checkKey = localStorage.getItem(key);  // Remove local keys and their values from localStorage
		console.log(`checking for: ${key}`);    // Log the key that was removed
		if (!checkKey) counter += 1
	}
	if (counter === total) {
		localStorage.removeItem('altavizKeys')
		console.log('clean up completed.')
	}
}
export { cleanUpLocalStorage }