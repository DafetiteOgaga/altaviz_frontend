import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
import { useLocation } from 'react-router-dom'
import { useWebSocketNotificationContext } from "../context/RealTimeNotificationContext/useWebSocketNotificationContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullCompleteList(
	urlPath, id,
	variableContext,
	forceTrigger=false,
	role=null, type=null,
	itemsPerPage=10,
	// type='notification'
) {
	const { setNotifications } = useWebSocketNotificationContext()
	// const freshPull = useRef(false)
	const dept = useLocation().pathname.split('/')[1]
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

	useEffect(() => {
		// check and fetch from local storage if the data exist
		let decodedData;
		decodedData = localStorage.getItem(variableContext)
		if (decodedData&&!forceTrigger) {
			console.log('from local storage  ############'.toUpperCase(), 'id:', id)
			decodedData = RotCipher(decodedData, decrypt)
			decodedData = JSON.parse(decodedData)
			setArrayData(decodedData);
		} else {
			console.log('from database  ############'.toUpperCase(), 'id:', id)
			setGetTrigger(true)
			// setArrayData(null)
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
				if (variableContext) {
					let encodedData = RotCipher(JSON.stringify(listData), encrypt)
					localStorage.setItem(variableContext, encodedData)
				}
				// setFreshPull(true)
				if (localStorage.getItem(dept)&&!type) {
					console.log('removing dept ...')
					console.log({dept})
					localStorage.removeItem(dept)
					console.log('removed dept ...')
					setNotifications(null)
					console.log('set websocket Notification to []')
					console.log(
						'\n00000000000000000000000000000000',
						'\n00000000000000000000000000000000',
						'\n00000000000000000000000000000000',
						'\n00000000000000000000000000000000',
						'\n00000000000000000000000000000000',
					)
				}
				if (localStorage.getItem('success')) {localStorage.removeItem('success')}
			}
			else if (listError) {setArrayError(listError)}
			setGetTrigger(false)
		}
	}, [listData, listError])

	let updatedData = localStorage.getItem(variableContext)
	if (updatedData&&!role) {
		// freshPull.current = true
		console.log(
			'\nupdateData:', !!updatedData,
			'\nrole:', role,
		)
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
		console.log(
			'\nDone. new lengths are:',
			'\nupdatedData(listData).length:', updatedData?.length,
			'\narrayData.length:', arrayData?.length,
		)
	}
	console.log(
		'\nendpoint:', `${baseUrl}/${urlPath}/${id}/`,
		{listData, listError, arrayData, arrayLoading, arrayError},
		'\nrole:', role,
		(role?'\nWebsocket Notifications spinning':'\nNormal List notification'), '##############',
		// '\nfreshPull.current:', freshPull.current,
	)

	// sets navigation
	useEffect(() => {
		if (arrayData?.length) {
			setTheTotalPage(Math.ceil(arrayData.length / itemsPerPage))
			console.log('total pages:', theTotalPage)
		}
	}, [arrayData])
	if (theTotalPage) console.log({theTotalPage})

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
	console.log(
		'\nlistHandler:', pageHandler(pageNum, arrayData),
		'\npageNum:', pageNum,
		'\nrole (argument i.e authData.role):', role,
		'\ndept:', dept,
	)
	console.log('end ######################'.toUpperCase())
	return {
		arrayData, arrayLoading, arrayError,
		setPageNum, pageNum,
		theTotalPage, setTheTotalPage,
		itemsPerPage,
		pageHandler,
		// freshPull,
	}
}

export default usePullCompleteList;
