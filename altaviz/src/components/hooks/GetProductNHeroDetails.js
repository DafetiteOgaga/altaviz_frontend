import ATMDescription from "../context/ATMDescription";
// import ATMDescriptionSummary from '../context/ATMDescriptionSummary';

function getHeroImages() {
	const r = require.context('../../images/hero_images/', false, /\.(png|jpe?g|svg)$/);
	return r.keys().map(r);
}
export { getHeroImages };

function GetProductDetails () {
	function getProductImages() {
		const r = require.context('../../images/product_images/', false, /\.(png|jpe?g|svg)$/);
		return r.keys().map(r);
	}
	const images = getProductImages();
	const detailedDescriptions = ATMDescription()
	const atmDetails = images.map((image, index) => {
		return ({
			id: index + 1,
			description: detailedDescriptions[index],
            image: image,
		})});

	return atmDetails;
}
export default GetProductDetails;
