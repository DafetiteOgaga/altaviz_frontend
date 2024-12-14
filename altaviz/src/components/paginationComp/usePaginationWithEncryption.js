import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";

function usePaginationWithEncryption(
	baseUrl,
	itemsPerPage=10,
	storageName='temp',
	trigger=false
) {
	const [isDone, setIsDone] = useState(false)
	const [triggerAdd, setTriggerAdd] = useState(true)
	const [count, setCount] = useState(2)
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const [PaginationDetails, setPaginationDetails] = useState(null);
	const [pageUrl, setPageUrl] = useState(baseUrl);
	const [getTrigger, setGetTrigger] = useState(false);
	const { getData, getLoading, getError } = useGetDataAPI(
		pageUrl,
		getTrigger
	);
	const [pageNum, setPageNum] = useState(1);
	const [theTotalPage, setTheTotalPage] = useState(null);
	const [localDataStoreVar, setLocalDataStoreVar] = useState(null);
	const [nextNext, setNextNext] = useState(false);
	let allItems = useRef([]);

	console.log('start ######################'.toUpperCase())
	useEffect(() => {
		// Load data from localStorage on component mount
		// console.log('Loading data from localStorage'.toUpperCase())
		const storedData = localStorage.getItem(storageName);
		const storedPaginationDetailsData = localStorage.getItem(`pagi-${storageName}`);

		// delete
		const decodePaginationDetailsData = RotCipher(storedPaginationDetailsData, decrypt)
		console.log('decoded pagi data:', decodePaginationDetailsData)
		// end delete

		console.log(
			'\nlocalStorage key:', storageName,
			'\ntrigger:', trigger,
			'\npageUrl:', pageUrl,
		);

		// force pull from db, first db pull, and pull from local storage
		if (trigger) {
			console.log('force fresh pull from db')
			setGetTrigger(() => {
				console.log('setting trigger from', getTrigger, 'to', !getTrigger)
				return trigger;
			})
		} else if (!storedData) {
			console.log('first db hit')
			setGetTrigger(() => {
				console.log('setting trigger from', getTrigger, 'to', !getTrigger)
				return true;
			})
		} else if (storedData) {
			console.log('pulling from local storage')
			if (storedPaginationDetailsData) {
				console.log('retrieved pagi data:', storedPaginationDetailsData)
				const decodePaginationDetailsData = RotCipher(storedPaginationDetailsData, decrypt)
				console.log('decoded pagi data:', decodePaginationDetailsData)
				setPaginationDetails(JSON.parse(decodePaginationDetailsData));
				console.log('parsed pagi data:', JSON.parse(decodePaginationDetailsData))
			}
			const decodedData = RotCipher(storedData, decrypt)
			setLocalDataStoreVar(JSON.parse(decodedData));
		}
	}, [storageName, trigger, pageUrl]);

	// add new items to the existing items in the local storage
	// get item count from db response
	useEffect(() => {
		console.log('getData:', getData)
		if (getData?.results) {
			console.log('total server pages:', getData.count);
			console.log(
				`current server\nnext ${getData.next && getData.next.split('?')[1]}\nprevious ${getData.previous && getData.previous.split('?')[1]}`
			);
			console.log('itemsPerPage:', itemsPerPage);
			console.log('localDataStoreVar:', localDataStoreVar);
			console.log(
				'\n333333333333333333333333333333333333333333333333333333333333333333333333',
				'\n333333333333333333333333333333333333333333333333333333333333333333333333',
				'\n333333333333333333333333333333333333333333333333333333333333333333333333'
			)
			if (getData) {
				const ids = getData.results.map(item => item.id)
				console.log('ids:', ids)
			}

			allItems.current = [...allItems.current, ...getData.results]
			console.log('allItems.current:', allItems.current);

			// Update localDataStoreVar with new data from db
			setLocalDataStoreVar(prevData => {
				const newData = prevData ? [...prevData, ...getData.results] : [...getData.results];
				console.log('Merging new data with previous data:', {
					prevDataLength: prevData?.length,
					newDataLength: getData.results.length,
					mergedDataLength: newData.length
				});
				return newData;
			});
			const newPagiDetails = {
				count: getData.count,
				next: getData.next,
                previous: getData.previous,
                currentPage: pageNum,
			}
			console.log('new pagination details:', newPagiDetails)
			setPaginationDetails((prev) => ({...prev, ...newPagiDetails}))
			setTriggerAdd(!triggerAdd)
		}
		if (getData) setGetTrigger(false);
	}, [getData, itemsPerPage]);

	// encodes and updates localStorage with data from getData(db via
	// localDataStoreVar) whenever localDataStoreVar changes
	useEffect(() => {
		if (localDataStoreVar) {
			console.log(
				'\noriginal data:', localDataStoreVar,
				// '\nstored allItems instead of localDataStoreVar',
				// '\nlngth of allItems:', allItems.current.length
			)
			// console.log()
			const encodedData = RotCipher(JSON.stringify(localDataStoreVar), encrypt)
			const encodedPaginationDetails = RotCipher(JSON.stringify(PaginationDetails), encrypt)
			// console.log('encoded data:', encodedData)
			localStorage.setItem(storageName, encodedData);
			localStorage.setItem(`pagi-${storageName}`, encodedPaginationDetails);
			console.log(
				'\n888888888888888888888888888888888888888888888888',
				'\n888888888888888888888888888888888888888888888888',
				'\n888888888888888888888888888888888888888888888888',
				'\n888888888888888888888888888888888888888888888888',
				'\n888888888888888888888888888888888888888888888888',
			)
			console.log(`Updated localStorage with ${localDataStoreVar.length} items`);
			console.log(
				'\nUPDATED localDataStoreVar:', !!localDataStoreVar,
				'\nUPDATED PaginationDetails:', !!PaginationDetails
			)
		}
		console.log(
			'\nlocalDataStoreVar (outside):', !!localDataStoreVar,
			'\nPaginationDetails (outside):', !!PaginationDetails
		)
	}, [localDataStoreVar, storageName, triggerAdd]);

	// pulls the next page (if any) from the db (create the illusion of speed)
	useEffect(() => {
		console.log('getting next data...');
		if (getData?.next && Number(getData.next.split('=')[1]) === count) {
			setPageUrl(getData.next);
			setGetTrigger(true);
			console.log(
				'\npage'.toUpperCase(),
				'\n222222222222222222222222222222222222222222222222222222222222222222222222',
				'\n222222222222222222222222222222222222222222222222222222222222222222222222',
				'\n222222222222222222222222222222222222222222222222222222222222222222222222',
				'\nnext:', getData.next,
			)
			console.log('count (before):', count)
			console.log('next page num:', Number(getData.next.split('=')[1]))
			setCount(prev => {
				console.log('setting count from', prev, 'to', prev + 1)
				return prev + 1
			})
			// console.log('count (after):', count)
		}
		if (getData && !getData.next) {
			setIsDone(true)
		}
	}, [getData])

	// handles page navigation
	useEffect(() => {
		console.log('checking for page navigation')
		if (PaginationDetails) {
			console.log('PaginationDetails:', !!PaginationDetails)
			// const total = Math.ceil((PaginationDetails.count/itemsPerPage))
			for (let i =1; i <= theTotalPage; i++) {
				console.log('333333333333')
				console.log(
					'pageNum:', pageNum,
					'\nindex:', i,
					'\nPaginationDetails.next', PaginationDetails.next,
					'\ntheTotalPage', theTotalPage,
				)
				if (i === pageNum && PaginationDetails.next) {
					console.log('444444444444')
					let next = PaginationDetails.next.split('=')
					const num = Number(next[1])
					next = next[0]
					console.log(
						'num:', num,
						'\nnext:', next,
					)
					next = [next, num]
					next = next.join('=')
					setPageUrl(next)
					if (Math.ceil((PaginationDetails.count)/itemsPerPage) > theTotalPage) {
						setGetTrigger(true)
						console.log('next inside:'.toUpperCase(), next);
					} else {
						console.log('no database hit:'.toUpperCase())
					}
					console.log('next outside:'.toUpperCase(), next);
				} else {
					console.log('no database hit no next:'.toUpperCase())
				}
			}
		} else {
			console.log('no database hit'.toUpperCase())
		}
	}, [nextNext])

	// sets the total page size
	useEffect(() => {
		if (localDataStoreVar) {
			console.log('local item size:', localDataStoreVar.length);
			const division = Math.ceil(localDataStoreVar.length / itemsPerPage);
			setTheTotalPage(division);
		}
		if (theTotalPage) console.log('total local pages:', theTotalPage);
	}, [localDataStoreVar, theTotalPage])

	// processes items into final list and serve it per page
	const LocalListHandler = (page, localList) => {
		if (page < 1 || page > theTotalPage) {
			return [];
		}
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return localList.slice(start, end);
	};

	console.log(
		'\nlistHandler:', LocalListHandler(pageNum, localDataStoreVar),
		'\npageNum:', pageNum,
		'\nsetPageUrl:', pageUrl,
		'\nPaginationDetails:', PaginationDetails
	);
	const handleNextPage = () => {
		setNextNext(!nextNext)
		// setForceRender(!forceRender);
		console.log('toggle nextpage::::::::::::::')
		console.log('setPageUrl:', pageUrl);
		console.log('PaginationDetails:', PaginationDetails);
	};
	// const handlePreviousPage = () => {
	// 	if (getData.previous) {
	// 		setPageUrl(getData.previous);
	// 	}
	// };
	console.log(
		'\nlocalDataStoreVar:', localDataStoreVar,
		'\ncount (server page):', count,
		`\ntotal pages from server: ${(getData?.count)?getData.count:0}`,
		'\nallItems.current', allItems.current,
		'\nlocalStorage key:', storageName,
		'\nis done:', isDone,
	)
	// delete
	const storedData = localStorage.getItem(storageName);
	const decodeLocalDataStoreVar = RotCipher(storedData, decrypt)
	if (decodeLocalDataStoreVar)
		console.log('decoded localDataStoreVar:', JSON.parse(decodeLocalDataStoreVar))
	// end delete
	console.log('end ######################'.toUpperCase())
	return {
		getData, getLoading, getError, pageNum,
		localDataStoreVar, theTotalPage, isDone,
		handleNextPage,
		LocalListHandler, setPageNum
	}
}

export default usePaginationWithEncryption;
