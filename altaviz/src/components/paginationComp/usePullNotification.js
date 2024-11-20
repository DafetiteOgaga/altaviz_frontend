import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullNotification(
	urlPath, id,
	variableContext,
	forceTrigger=false, role
) {
	// const [isDone, setIsDone] = useState(false)
	// const [count, setCount] = useState(2)
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const [totalData, setTotalData] = useState(0);
	const [arrayData, setArrayData] = useState(null)
	const [arrayError, setArrayError] = useState(null)
	const [totalError, settotalError] = useState(null)
	const [getTrigger, setGetTrigger] = useState(false);
	const totalArrayContext = `total${variableContext}`

	console.log('start ######################'.toUpperCase())
	const { getData:notificationData, getLoading:arrayLoading, getError:notificationError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/notification/${id}/`, getTrigger
	);
	const { getData:totalNumData, getLoading:totaLoading, getError:totalNumError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/${id}/total/`, getTrigger
	);
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
			console.log('from local storage  ############'.toUpperCase())
			decodedData = RotCipher(decodedData, decrypt)
			decodedData = JSON.parse(decodedData)
			setArrayData(decodedData);
			totaldecodedData = RotCipher(totaldecodedData, decrypt)
			totaldecodedData = JSON.parse(totaldecodedData)
			setTotalData(totaldecodedData)

		} else {
			console.log('from database  ############'.toUpperCase())
			setGetTrigger(true)
		}
	}, [getTrigger, urlPath, id, variableContext, totalArrayContext])

	// fetch data and total data from server as notification
	// and set it to local storage
	useEffect(() => {
		if (notificationData||notificationError) {
			console.log('fetch from server direct  ############'.toUpperCase())
			if (notificationData) {
				setArrayData(notificationData)
				let encodedData = RotCipher(JSON.stringify(notificationData), encrypt)
				localStorage.setItem(variableContext, encodedData)
				console.log('removing role ...')
				console.log({role})
				localStorage.removeItem(role)
				console.log('removed role ...')
			}
			else if (notificationError) setArrayError(notificationError)
		}
		if (totalNumData||totalNumError) {
			if (totalNumData) {
				setTotalData(totalNumData)
				let totalEncodedData = RotCipher(JSON.stringify(totalNumData), encrypt)
				localStorage.setItem(totalArrayContext, totalEncodedData)
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

	console.log(
		'\nnoti url:', `${baseUrl}/${urlPath}/notification/${id}/`,
		'\nnoti-total url:', `${baseUrl}/${urlPath}/${id}/total/`,
		{notificationData, arrayData},
		{totalNumData, totalData},
		{totaLoading, arrayLoading},
		{role},
	)
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
