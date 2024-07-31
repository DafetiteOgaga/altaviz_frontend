import useFetch from "../../hooks/useFetch";
import Hero from "./Hero";
import AboutAtms from "./AboutAtms";
import PorductCards from "./ProductCards";

function Home() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
		    <Hero />
			<AboutAtms />
			<PorductCards />
			<h2>Home Page</h2>
		</>
	);
}
export default Home;