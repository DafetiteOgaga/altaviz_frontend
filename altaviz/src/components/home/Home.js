// import useFetch from "../../hooks/useFetch";
import Hero from "./hero/Hero";
import AboutAtms from "./about_atm/AboutAtms";
import ProductCards from "./product_cards/ProductCards";

function Home() {
	return (
		<>
			{/* <div className="home-animation"> */}
			<Hero />
			<AboutAtms />
			<ProductCards />
			{/* </div> */}
		</>
	);
}
export default Home;
