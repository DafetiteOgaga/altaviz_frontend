import useFetch from "../hooks/useFetch";

function Product3() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			<h2>Product 3</h2>
		</>
	);
}
export default Product3;