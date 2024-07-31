import { useEffect, useState } from "react";

function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
			throw new Error("could not connect");
			}
			const data = await response.json();
			setData(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
		};

		fetchData();
	}, [url]);

	return { data, loading, error };
}

export default useFetch;
