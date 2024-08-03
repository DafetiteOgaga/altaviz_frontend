// import useFetch from "../../hooks/useFetch";
import Hero from "./Hero";
import AboutAtms from "./AboutAtms";
import ProductCards from "./ProductCards";
// import "./home.css"
// import cardreader from "./product_images/Card Reader.png"

function Home() {
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);

	function getImages(r) {
		return r.keys().map(r);
	}
	const images = getImages(require.context('./product_images/', false, /\.(png|jpe?g|svg)$/));
	const titles = [
		'H22V series',
		'H68NL Series Intelligent Cash Recycler',
		'grg-200-v-sorting-machine',
		'H34 series',
	]
	const descriptions = [
		'description1',
		'description2',
		'description3',
		'description4',
	]
	const cardData = images.map((image, index) => {
		// console.log('index', index, 'title', titles[index] , 'descriptions', descriptions[index], 'image', image)
		return ({
			title: titles[index],
            description: descriptions[index],
            image: image,
		})});
	// console.log('cardData:', cardData);
	return (
		<>
			{/* <div className="home-animation"> */}
				<Hero />
				<AboutAtms />
				<ProductCards cardData={cardData} />
			{/* </div> */}
		</>
	);
}
export default Home;
