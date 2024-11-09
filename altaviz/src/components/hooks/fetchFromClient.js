import FetchFromLocalStorageOrDB from "./fetchFromLocalStorage"
import usePullCompleteList from "../paginationComp/usePullCompleteList"

function CheckAndFetchFromStorage (localKey, id=null) {
	let localFault = []
	console.log(
		'\nlocalKey:', localKey,
		'\nid:', id,
	)
	// Check if there's search data in local storage and
	// sends the data
	if (localStorage.getItem('searchData')) {
		console.log('222222222222222222')
		const searchData = FetchFromLocalStorageOrDB('searchData') || [];
		console.log('searchData:', searchData);
		localFault = [
			...localFault,
			...searchData,
		]
	} else {
		// else fetches data from the local storage and
		// sends the data
		for (let i = 0; i < localKey.length; i++) {
			if (!localStorage.getItem(localKey[i])) continue
			// Fetch faults from local storage and create a new array
			if (id) {
				const engineerFaults = FetchFromLocalStorageOrDB(localKey[i], id)
				console.log('engineerFaults:', engineerFaults);
				localFault = [...localFault, ...FetchFromLocalStorageOrDB(
					localKey[i]
				).filter(user => user.id === Number(id))[0].faults]
			} else {
				localFault = [...localFault, ...FetchFromLocalStorageOrDB(localKey[i])]
			}
		}
	}
	return localFault;
}
export { CheckAndFetchFromStorage }