import useFetch from "../../hooks/useFetch";

function ProductCards() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			{/* this cards should contain links to individual detailed product pages */}
			<h2>Product Cards section</h2>
		</>
	);
}
export default ProductCards;