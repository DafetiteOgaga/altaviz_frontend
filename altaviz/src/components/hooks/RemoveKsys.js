function RemoveKeys(keys) {
	for (let i = 0; i < keys.length; i++) {
		localStorage.removeItem(keys[i]);
	}
}
export default RemoveKeys