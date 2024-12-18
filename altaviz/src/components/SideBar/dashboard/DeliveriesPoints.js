import { FetchContext } from "../../context/FetchContext";
import { useContext, useRef, useState, useEffect } from "react";
// import { useWebSocketNotificationContext } from "../../context/RealTimeNotificationContext/useWebSocketNotificationContext";
import { useFirebase } from "../../context/RealTimeNotificationContext/FirebaseContextNotification";

function Deliveries({id}) {
	// const { notifications } = useWebSocketNotificationContext()
	const { data:firebaseNotification } = useFirebase()
	// const [refresh, setRefresh] = useState(true);
	const firebaseNotificationKey = useRef(null)
	const [getTrigger, setGetTrigger] = useState(false);
	const [deliveries, setDeliveries] = useState(null);
	const [error, setError] = useState(null);
	const { useGetDataAPI } = useContext(FetchContext);
	const { getData, getLoading, getError } = useGetDataAPI(
		`deliveries/${id}/`, getTrigger,
	)
	console.log('firebaseNotification:', firebaseNotification)
	let firebaseKey = Object.keys?.(firebaseNotification||{})?.find?.(key => key)
	console.log(
		'\nfirebaseKey:', firebaseKey,
		'\nfirebaseNotificationKey.current:', firebaseNotificationKey.current,
		'\nfirebaseNotificationKey === firebaseKey:', firebaseNotificationKey.current === firebaseKey,
		'\nfirebaseNotificationKey === null:', firebaseKey === null,
		'\nfirebaseNotificationKey === undefined:', firebaseKey === undefined
	)
	let notificationText;
	// let timestamp;
	// let dateAndTime;
	if (firebaseKey) {
		notificationText = firebaseNotification[firebaseKey].message
		// const timestamp = firebaseNotification[firebaseKey].timestamp
		// Trim microseconds (last 3 digits)
		// const cleanTimestamp = timestamp.slice(0, 23) + "Z";
		// Convert to a JavaScript Date object
		// dateAndTime = new Date(cleanTimestamp);
	}
	const theString = notificationText?.split('-')[0]
	console.log(
		// '\nnotifications:', notifications,
		'\ntheString:', theString,
	)
	useEffect(() => {setGetTrigger(true)}, [])
	useEffect(() => {
		console.log(
			'\n09090909090909090909090909090909',
			'\n09090909090909090909090909090909',
		)
		if (![undefined, firebaseNotificationKey.current].includes(firebaseKey) && (notificationText?.split('-')[0]==='deliveries point')) {
			setGetTrigger(true)
			localStorage.removeItem(theString);
			console.log({firebaseKey})
			firebaseNotificationKey.current = firebaseKey
			// firebaseKey = null
			console.log({firebaseKey})
		}
	}, [firebaseKey, notificationText, theString])
	useEffect(() => {
		if (getData) {
            setDeliveries(getData);
			setGetTrigger(false)
        }
        if (getError) {
			setError('Error fetching value')
            console.error("Error fetching data:", getError);
        }
	}, [getData, getLoading, getError])
	if (deliveries) {
		console.log(
			'\nresponse:', deliveries,
			'\nresponse:', deliveries.deliveries,
			'\nresponse:', deliveries.msg,
			'\nerror:', error
		)
	}
	// console.log({refresh})
	return (
		<>
			{getLoading && <span style={{
				color: '#888',
				// textAlign: 'center',
			}}>Loading ...</span>}
			{error && <span style={{color: 'red'}}>{error?.msg}</span>}
			{deliveries && <span>{deliveries?.msg?deliveries?.msg:deliveries?.deliveries}</span>}
		</>
	);
}

export default Deliveries;
