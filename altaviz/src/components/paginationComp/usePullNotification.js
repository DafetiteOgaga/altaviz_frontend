import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
// import { useLocation } from 'react-router-dom';
import { useWebSocketNotificationContext } from "../context/RealTimeNotificationContext/useWebSocketNotificationContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullNotification(
	urlPath, id,
	variableContext,
	forceTrigger=false,
	role=null,
	// type=null,
	region, wsKey,
) {
	const { setNotifications } = useWebSocketNotificationContext()
	// const dept = useLocation().pathname.split('/')[1]
	const isListData = useRef(false)
	const ntracker = useRef(false)
	const notificationCount = useRef(0)
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	let [totalData, setTotalData] = useState(0);
	let [arrayData, setArrayData] = useState(null)
	const [arrayError, setArrayError] = useState(null)
	const [totalError, settotalError] = useState(null)
	const [getTrigger, setGetTrigger] = useState(false);
	const totalArrayContext = `total${variableContext}`
	const isRole = wsKey?role:null

	const { getData:notificationData, getLoading:arrayLoading, getError:notificationError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/notification/${id}/`, getTrigger
	);
	const { getData:totalNumData, getLoading:totaLoading, getError:totalNumError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/${id}/total/`, getTrigger
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
			'\nisRole:', isRole
		)
	}

	useEffect(() => {
		// check and fetch from local storage if the data exist
		let decodedData;
		let totaldecodedData;
		decodedData = localStorage.getItem(variableContext)
		totaldecodedData = localStorage.getItem(totalArrayContext)
		if (decodedData&&totaldecodedData&&!getTrigger&&!forceTrigger) {
			console.log('from local storage  ############'.toUpperCase(), 'id:', id)
			decodedData = RotCipher(decodedData, decrypt)
			decodedData = JSON.parse(decodedData)
			setArrayData(decodedData);
			totaldecodedData = RotCipher(totaldecodedData, decrypt)
			totaldecodedData = JSON.parse(totaldecodedData)
			setTotalData(totaldecodedData)
		} else if (!decodedData&&!forceTrigger) {
			console.log('fresh from database  ############'.toUpperCase(), 'id:', id)
			setGetTrigger(true)
		} else if (forceTrigger&&role&&region) {
			console.log('update from database  ############'.toUpperCase(), 'id:', id)
			setGetTrigger(true)
		}
	}, [getTrigger, urlPath, id, variableContext, totalArrayContext])

	// fetch data and total data from server as notification
	// and set it to local storage
	useEffect(() => {
		if (notificationData||notificationError) {
			console.log('fetch from server direct  ############'.toUpperCase(), 'id:', id)
			if (notificationData) {
				console.log(
					'\nsetting notificationData:', notificationData?.length, 'items to arraData of', arrayData?.length, 'items',
					'\nnotificationData.length:', notificationData?.length,
					'\narrayData.length:', arrayData?.length,
				)
				setArrayData(notificationData)
				setArrayError(null)
				ntracker.current = true
				if (variableContext) {
					let encodedData = RotCipher(JSON.stringify(notificationData), encrypt)
					localStorage.setItem(variableContext, encodedData)
				}
				if (localStorage.getItem(wsKey)) {
					// console.log('removing wsKey ...')
					// console.log({wsKey})
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
			else if (notificationError) setArrayError(notificationError)
		}
		if (totalNumData||totalNumError) {
			if (totalNumData) {
				console.log(
					'\nsetting totalNumData:', totalNumData?.length, 'items to arraData of', arrayData?.length, 'items',
					'\ntotalNumData.length:', totalNumData?.length,
					'\narrayData.length:', arrayData?.length,
				)
				setTotalData(totalNumData)
				settotalError(null)
				if (totalArrayContext&&variableContext) {
					let totalEncodedData = RotCipher(JSON.stringify(totalNumData), encrypt)
					localStorage.setItem(totalArrayContext, totalEncodedData)
				}
				if (localStorage.getItem(wsKey)) {
					// console.log('removing wsKey ...')
					// console.log({wsKey})
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
			else if (totalNumError) settotalError(totalNumError)
		}
		if ((notificationData&&totalNumData)||(notificationError&&totalNumError)) {
            setGetTrigger(false)
		}
		// if (getTrigger) {
        //     localStorage.setItem(variableContext, JSON.stringify(arrayData))
        //     localStorage.setItem(totalArrayContext, totalData)
        // }
	}, [notificationData, notificationError, totalNumData, totalNumError])

	let updatedData = localStorage.getItem(variableContext)
	let totalUpdatedData = localStorage.getItem(totalArrayContext)
	if (role) {
		console.log(
			'\nupdateData:', !!updatedData,
			'\nrole:', role,
			'\nupdatedData:', updatedData?.slice(0, 25), '...',
			'\ntotalUpdatedData:', totalUpdatedData,
			'\nvariable:', variableContext,
			'\nupdatedData?.length:', updatedData?.length,
			'\ntotalUpdatedData?.length:', totalUpdatedData?.length
		)
	}
	// notificationCount.current = 0
	useEffect(() => {
		if (isListData.current) {
			isListData.current = false
		} else if (notificationData&&totalNumData&&ntracker.current) {
			isListData.current = true
			ntracker.current = false
		}
		console.log('isListData:', isListData)
	}, [notificationData, totalNumData])
	console.log('notificationCount.current (before):', notificationCount.current)
	if (notificationData&&totalData) {notificationCount.current = 1}
	console.log('notificationCount.current (after):', notificationCount.current)
	if (updatedData?.length>2&&totalUpdatedData?.length>2&&!role) {
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
			'\ntotalData:', totalData,
		)
		console.log('fetching new updates from local storage')
		updatedData = RotCipher(updatedData, decrypt)
		updatedData = JSON.parse(updatedData)
		console.log({updatedData})
		arrayData = updatedData

		totalUpdatedData = RotCipher(totalUpdatedData, decrypt)
		totalUpdatedData = JSON.parse(totalUpdatedData)
		console.log({totalUpdatedData})
		totalData = totalUpdatedData
		console.log(
			'\nDone. new lengths are:',
			'\nupdatedData(notificationData).length:', updatedData?.length,
			'\narrayData.length:', arrayData?.length,
			'\ntotalUpdatedData.total:', totalUpdatedData?.total,
			'\ntotalData.total:', totalData?.total,
		)
	}
	console.log(
		'\nendpoint (data):', `${baseUrl}/${urlPath}/notification/${id}/`,
		'\nendpoint (data):', `${baseUrl}/${urlPath}/${id}/total/`,
		'\n', {notificationData, notificationError, totalNumData, totalNumError},
		'\n', {arrayData, arrayError, totalData, totalError},
		'\n', {arrayLoading, totaLoading},
		'\nrole:', role,
		(role?'\nWebsocket Notifications spinning':'\nNormal List notification'), '##############',
		'\nwsKey:', wsKey
	)
	console.log('isListData:', isListData)
	console.log('end ######################'.toUpperCase())
	return {
		arrayData, arrayLoading, arrayError,
		totalData, totaLoading, totalError,
		notificationCount, isListData
	}
}

export default usePullNotification;
