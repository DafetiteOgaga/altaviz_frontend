import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
// import { useLocation } from 'react-router-dom'
import { useWebSocketNotificationContext } from "../context/RealTimeNotificationContext/useWebSocketNotificationContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullCompleteList(
	urlPath, id,
	variableContext,
	forceTrigger=false,
	role=null,
	// type=null,
	region, wsKey,
	itemsPerPage=10,
) {
	const { setNotifications } = useWebSocketNotificationContext()
	// const keyList = useRef([])
	const notificationCount = useRef(0)
	const isListData = useRef(false)
	const ntracker = useRef(false)
	// const dept = useLocation().pathname.split('/')[1]
	const [pageNum, setPageNum] = useState(1);
	const [theTotalPage, setTheTotalPage] = useState(null);
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	let [arrayData, setArrayData] = useState(null)
	const [arrayError, setArrayError] = useState(null)
	const [getTrigger, setGetTrigger] = useState(false);

	const { getData:listData, getLoading:arrayLoading, getError:listError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/${id}/`, getTrigger
	);
	console.log('start ######################'.toUpperCase())
	if (role) {
		console.log(
			'\nurlPath:', urlPath,
			'\nid:', id,
			'\nvariableContext:', variableContext,
			'\nforceTrigger:', forceTrigger,
			'\nrole:', role,
			// '\ntype:', type,
			'\nregion:', region,
			'\nwsKey:', wsKey,
		)
	}
	// keyList.current = []
	// const keyList = useRef([])
	// useEffect(() => {
	// 	console.log(
	// 		'\nbefore',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 	)
	// 	if (wsKey && !keyList.current.includes(wsKey)) {
	// 		keyList.current.push(wsKey)
	// 		console.log("Updated keyList:", keyList.current);
	// 	}
	// 	console.log(
	// 		'\nafter',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 		'\n1234567890123456789012345678901234567890',
	// 	)
	// }, [wsKey])
	// console.log('\nkeyList.current:', keyList.current)
	useEffect(() => {
		// check and fetch from local storage if the data exist
		let decodedData;
		decodedData = localStorage.getItem(variableContext)
		if (decodedData&&!forceTrigger) {
			console.log('from local storage  ############'.toUpperCase(), 'id:', id)
			decodedData = RotCipher(decodedData, decrypt)
			decodedData = JSON.parse(decodedData)
			setArrayData(decodedData);
		} else if (!decodedData&&!forceTrigger) {
			console.log('fresh from database  ############'.toUpperCase(), 'id:', id)
			setGetTrigger(true)
		} else if (forceTrigger&&role&&region) {
			console.log('update from database  ############'.toUpperCase(), 'id:', id)
			setGetTrigger(true)
		}
		setArrayError(null)
	}, [getTrigger, urlPath, id, variableContext, forceTrigger])

	// fetch complete data from server
	// and set it to local storage
	useEffect(() => {
		if (listData||listError) {
			console.log('fetch from server direct  ############'.toUpperCase(), 'id:', id)
			if (listData) {
				console.log(
					'\nsetting listData:', listData?.length, 'items to arraData of', arrayData?.length, 'items',
					'\nlistData.length:', listData?.length,
					'\narrayData.length:', arrayData?.length,
				)
				setArrayData(listData)
				setArrayError(null)
				// isListData.current = true
				ntracker.current = true
				if (variableContext) {
					let encodedData = RotCipher(JSON.stringify(listData), encrypt)
					localStorage.setItem(variableContext, encodedData)
				}
				// setFreshPull(true)
				if (localStorage.getItem(wsKey)) {
					console.log('removing wsKey ...')
					console.log({wsKey})
					// keyList.current?.forEach(key => {
					// 	console.log('removing key:', key)
					// 	localStorage.removeItem(key);
					// });
					// console.log('\nkeyList.current:', keyList.current)
					// keyList.current = []
					// console.log('set keyList.current to []')
					// localStorage.removeItem(wsKey)
					// console.log('removed wsKey ...')
					setNotifications(null)
					console.log('set websocket Notification to []')
					// console.log(
					// 	'\n00000000000000000000000000000000',
					// 	'\n00000000000000000000000000000000',
					// 	'\n00000000000000000000000000000000',
					// 	'\n00000000000000000000000000000000',
					// 	'\n00000000000000000000000000000000',
					// )
				}
				if (localStorage.getItem('success')) {localStorage.removeItem('success')}
			}
			else if (listError) {setArrayError(listError)}
			setGetTrigger(false)
		}
	}, [listData, listError])

	let updatedData = localStorage.getItem(variableContext)
	// updatedData.length>2 is so because it is a string format
	// so if empty only [] will be counted i.e 2
	if (role) {
		console.log(
			'\nupdateData:', !!updatedData,
			'\nrole:', role,
			'\nupdatedData:', updatedData?.slice(0, 25), '...',
			'\nvariable:', variableContext,
			'\nupdatedData?.length:', updatedData?.length,
		)
	}
	// notificationCount.current = 0
	console.log('notificationCount.current (before):', notificationCount.current)
	// if (isListData) {
	// 	notificationCount.current = 1
	// }
	useEffect(() => {
		if (isListData.current) {
			isListData.current = false
		} else if (listData&&ntracker.current) {
			isListData.current = true
			ntracker.current = false
		}
		console.log('isListData:', isListData)
	}, [listData])
	console.log('notificationCount.current (after):', notificationCount.current)
	if (updatedData?.length>2&&!role) {
		// if (listData&&notificationCount.current) {
		// 	notificationCount.current = 0
		// }
		// freshPull.current = true
		console.log(
			'\n66666666666666666666666666666666666666666',
			'\n66666666666666666666666666666666666666666',
			'\n66666666666666666666666666666666666666666',
			'\n66666666666666666666666666666666666666666',
			'\n66666666666666666666666666666666666666666',
		)
		console.log(
			'\nDone. new lengths are:',
			// '\nlistData.length:', listData?.length,
			'\narrayData.length:', arrayData?.length,
		)
		console.log('fetching new updates from local storage')
		updatedData = RotCipher(updatedData, decrypt)
		updatedData = JSON.parse(updatedData)
		console.log({updatedData})
		arrayData = updatedData
		// isListData.current = true
		console.log(
			'\nDone. new lengths are:',
			'\nupdatedData(listData).length:', updatedData?.length,
			'\narrayData.length:', arrayData?.length,
		)
	}
	if (role) {
		console.log(
			'\nendpoint:', `${baseUrl}/${urlPath}/${id}/`,
			{listData, listError, arrayData, arrayLoading, arrayError},
			'\nrole:', role,
			'\nfor:', variableContext,
			(role?'\nWebsocket Notifications spinning':'\nNormal List notification'), '##############',
			// '\nfreshPull.current:', freshPull.current,
		)
	}

	// sets navigation
	useEffect(() => {
		if (arrayData?.length) {
			console.log(
				'\narrayData:', arrayData,
				'\narrayData.length:', arrayData.length
			)
			setTheTotalPage(Math.ceil(arrayData.length / itemsPerPage))
			console.log('total pages:', theTotalPage)
		}
	}, [arrayData])
	// if (theTotalPage) console.log({theTotalPage})

	// processes items into pages to be served
	const pageHandler = (page, localList) => {
		if (page < 1 || page > theTotalPage) {
			return [];
		}
		console.log({localList})
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return localList.slice(start, end);
	};
	// console.log(
	// 	'\nlistHandler:', pageHandler(pageNum, arrayData),
	// 	'\npageNum:', pageNum,
	// 	'\nrole (argument i.e authData.role):', role,
	// 	'\ndept:', dept,
	// 	'\nwsKey:', wsKey
	// )
	console.log('isListData:', isListData)
	console.log('end ######################'.toUpperCase())
	return {
		arrayData, arrayLoading, arrayError,
		setPageNum, pageNum,
		theTotalPage, setTheTotalPage,
		itemsPerPage,
		pageHandler,
		notificationCount,
		isListData,
		// freshPull,
	}
}

export default usePullCompleteList;
