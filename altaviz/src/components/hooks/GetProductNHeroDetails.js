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

	// return  (
    //     <>
	// 		<div>
	// 			{atmDetails.map((data, index) => {
	// 				return (
	// 				<ul
	// 				style={{
	// 					listStyleType: 'none',
	// 				}}
	// 				key={data.id}>
	// 					<li>
	// 						<p>Id: {data.id}</p>
	// 						<p>Title: {data.description.title}</p>
	// 						<p>About: {data.description.about.slice(0, 100)}</p>
	// 						<p>features title: {data.description.features.title}</p>
	// 						<p>features content: {data.description.features.content.head.map((head, index) => {
	// 							return (
	// 								<ul key={index}>
	// 									<li><strong>{head}: </strong>{data.description.features.content.body[index]}</li>
	// 								</ul>
	// 							)
	// 						})}</p>
	// 						<p>benefits title: {data.description.benefits.title}</p>
	// 						<p>benefits content: {data.description.benefits.content.head.map((head, index) => {
	// 							return (
    //                                 <ul key={index}>
    //                                     <li><strong>{head}: </strong>{data.description.benefits.content.body[index]}</li>
    //                                 </ul>
    //                             )
	// 						})}</p>
	// 						<p>conclusion title: {data.description.conclusion.title}</p>
	// 						<p>conclusion content: {data.description.conclusion.content}</p>
	// 						<img src={data.image} alt={data.title} width={100} />
	// 						<p style={{whiteSpace: 'pre'}}>{'\n\n\n'}</p>
	// 					</li>
	// 				</ul>
	// 			)})}
	// 		</div>
    //     </>
	// )
}
export default GetProductDetails;
