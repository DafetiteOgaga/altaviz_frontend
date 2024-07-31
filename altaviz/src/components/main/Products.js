import useFetch from "../../hooks/useFetch";

function Products() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			<h2>Products Page</h2>
			<h3>This should be a drop down menu with links to detailed atm products</h3>
		</>
	);
}
export default Products;