import { FetchContext } from "../../context/FetchContext";
import { useContext, useState, useEffect } from "react";

function Deliveries({id}) {
	// const [getTrigger, setGetTrigger] = useState(true);
	const [deliveries, setDeliveries] = useState(null);
	const [error, setError] = useState(null);
	const { useGetDataAPI } = useContext(FetchContext);
	const { getData, getLoading, getError } = useGetDataAPI(
		`http://127.0.0.1:8000/deliveries/${id}/`, true,
	)
	useEffect(() => {
		if (getData) {
            setDeliveries(getData);
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
