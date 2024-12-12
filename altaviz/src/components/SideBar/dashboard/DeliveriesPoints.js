import { FetchContext } from "../../context/FetchContext";
import { useContext, useState, useEffect } from "react";
import { useWebSocketNotificationContext } from "../../context/RealTimeNotificationContext/useWebSocketNotificationContext";

function Deliveries({id}) {
	const { notifications } = useWebSocketNotificationContext()
	// const [refresh, setRefresh] = useState(true);
	const [getTrigger, setGetTrigger] = useState(false);
	const [deliveries, setDeliveries] = useState(null);
	const [error, setError] = useState(null);
	const { useGetDataAPI } = useContext(FetchContext);
	const { getData, getLoading, getError } = useGetDataAPI(
		`deliveries/${id}/`, getTrigger,
	)
	useEffect(() => {setGetTrigger(true)}, [])
	useEffect(() => {
		console.log(
			'\n09090909090909090909090909090909',
			'\n09090909090909090909090909090909',
		)
		if (notifications?.split('-')[0]==='deliveries point') {
			setGetTrigger(true)
			localStorage.removeItem(theString);
		}
	}, [notifications])
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
	const theString = notifications?.split('-')[0]
	console.log(
		'\nnotifications:', notifications,
		'\ntheString:', theString,
	)
	// console.log({refresh})
	return (
		<>
			{getLoading && <span style={{
				// padding: '1rem',
				color: '#888',
				// fontSize: '1.2rem',
				textAlign: 'center',
			}}>Loading ...</span>}
			{error && <span>{error?.msg}</span>}
			{deliveries && <span>{deliveries?.msg?deliveries?.msg:deliveries?.deliveries}</span>}
		</>
	);
}

export default Deliveries;
