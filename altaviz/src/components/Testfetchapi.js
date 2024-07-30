import useFetch from "../hooks/useFetch";

function Testfetchapi() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			<h2>working ...</h2>
			<h2>{data ? data['home'] : 'Retrieving'}</h2>
		</>
	);
}
export default Testfetchapi;