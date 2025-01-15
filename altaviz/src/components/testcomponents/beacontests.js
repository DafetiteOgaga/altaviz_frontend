function useBeaconTests () {
console.log('sending beacon ...')
	const formData = new FormData();
	formData.append('username', 'testuser');
	formData.append('test', 'Test beacon');
	navigator.sendBeacon('http://127.0.0.1:8000/check-auth/', formData)
	console.log('beacon sent')
	if (navigator.onLine) {
		console.log('you are online')
	} else {
		console.log('you are offline')
	}
	console.log('beacon test working working')
}
export default useBeaconTests;