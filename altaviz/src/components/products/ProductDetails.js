import useFetch from "../../hooks/useFetch";

function ProductDetails() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			<h2>Product 1</h2>
		</>
	);
}
export default ProductDetails;