import useFetch from "../../hooks/useFetch";

function About() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			<h2>About Page</h2>
			<h3>About the company and what it does</h3>
		</>
	);
}
export default About;