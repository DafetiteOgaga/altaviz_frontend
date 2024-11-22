import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";
import { useLocation } from 'react-router-dom';
import { useWebSocketNotificationContext } from "../context/RealTimeNotificationContext/useWebSocketNotificationContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullNotification(
	urlPath, id,
	variableContext,
	forceTrigger=false,
	role=null, type=null,
) {
	const { setNotifications } = useWebSocketNotificationContext()
	const dept = useLocation().pathname.split('/')[1]
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	let [totalData, setTotalData] = useState(0);
	let [arrayData, setArrayData] = useState(null)
	const [arrayError, setArrayError] = useState(null)
	const [totalError, settotalError] = useState(null)
	const [getTrigger, setGetTrigger] = useState(false);
	const totalArrayContext = `total${variableContext}`

	const { getData:notificationData, getLoading:arrayLoading, getError:notificationError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/notification/${id}/`, getTrigger
	);
	const { getData:totalNumData, getLoading:totaLoading, getError:totalNumError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/${id}/total/`, getTrigger
	);
	console.log('start ######################'.toUpperCase())
	// console.log(
	// 	'\nnoti url:', `${baseUrl}/${urlPath}/notification/${id}/`,
	// 	'\nnoti-total url:', `${baseUrl}/${urlPath}/${id}/total/`,
	// )
	// console.log()

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

		} else {
			console.log('from database  ############'.toUpperCase(), 'id:', id)
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
				if (variableContext) {
					let encodedData = RotCipher(JSON.stringify(notificationData), encrypt)
					localStorage.setItem(variableContext, encodedData)
				}
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
				if (totalArrayContext) {
					let totalEncodedData = RotCipher(JSON.stringify(totalNumData), encrypt)
					localStorage.setItem(totalArrayContext, totalEncodedData)
				}
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
		{notificationData, notificationError, totalData, totalError, arrayData, arrayLoading, arrayError},
		'\nrole:', role,
		(role?'\nWebsocket Notifications spinning':'\nNormal List notification'), '##############',
		// '\nfreshPull.current:', freshPull.current,
	)



	// console.log(
	// 	'\nnoti url:', `${baseUrl}/${urlPath}/notification/${id}/`,
	// 	'\nnoti-total url:', `${baseUrl}/${urlPath}/${id}/total/`,
	// 	{notificationData, arrayData},
	// 	{totalNumData, totalData},
	// 	{totaLoading, arrayLoading},
	// 	{role},
	// )
	// console.log({})
	// console.log()
	// console.log({})
	// console.log({})
	console.log('end ######################'.toUpperCase())
	return {
		arrayData, arrayLoading, arrayError,
		totalData, totaLoading, totalError,
	}
}

export default usePullNotification;
