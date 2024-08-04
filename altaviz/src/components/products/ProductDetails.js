// import { useContext  } from "react";
// import { GlobalContext } from "../Context/Context";
import "./productDetails.css"
import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Context";
import DOMPurify from 'dompurify';
// import useFetch from "../hooks/useFetch";

function ProductDetails() {
	let { id } = useParams();
	const { cardData: products, useNavigation } = useContext(GlobalContext);
	const contactUs = useNavigation('contact us')
	console.log("Product: " + products[0])
	// console.log("Product.title: " + products[0].title)
	const product = products[id]
	// console.log('Type of id:', typeof id);
	id = Number(id);

	useEffect(() => {
		const initialImageDisplay = document.getElementById('atm-detail-display-for');
		const subsequentImageDisplay = document.getElementById('atm-detail-display-for-img');
		// console.log('initialDisplay', initialImageDisplay);
		// console.log('subsequentDisplay', subsequentImageDisplay);
		// console.log('Image display: ' + imageDisplay)
		// console.log('product-id:', id)
		if (id === 3 && initialImageDisplay) {
			// console.log('IF STATEMENT')
			initialImageDisplay.setAttribute('id', 'atm-detail-display-for-img');
			// console.log('initialDisplay', initialImageDisplay);
		} else if (id !== 3 && subsequentImageDisplay ) {
			// console.log('ELSE STATEMENT')
			subsequentImageDisplay.setAttribute('id', 'atm-detail-display-for');
			// console.log('subsequentDisplay', subsequentImageDisplay);
		}
	}, [id])

	// console.log('Type of id:', typeof id);
	let finalConclusion = '';
	// let thirdPage = false;
	if (id === 0 || id === 1) {
		finalConclusion = 'upgrade your ATM services'
	} else if (id === 2) {
		finalConclusion = 'enhance your currency handling operations'
	} else if (id === 3) {
		console.log('WORKING FROM HERE!')
        finalConclusion = 'upgrade your self-service banking'
    } else {
		finalConclusion = 'explore our range of services';
	}

	// if (id === 4) {
	// 	imageDisplay.setAttribute('id', 'atm-detail-display-for-img');
	// } else {
	// 	imageDisplay.setAttribute('id', 'atm-detail-display-for');
	// }
	// console.log("finalConclusion: " + finalConclusion);
	// console.log("finalConclusion-id: " + id);
	// console.log("Product: " + product)
	// console.log("Product.id: " + product.id)
	// console.log("Product.title: " + product.title)
	// console.log("Product.description: " + product.description)
	// console.log("Product.detailedDescriptions: " + product.detailedDescriptions)
	const safeTitle = DOMPurify.sanitize(product.detailedDescriptions.title);
	const safeAbout = DOMPurify.sanitize(product.detailedDescriptions.about);
	const safeFeatures = DOMPurify.sanitize(product.detailedDescriptions.features);
	const safeBenefits = DOMPurify.sanitize(product.detailedDescriptions.benefits);
	const safeConclusion = DOMPurify.sanitize(product.detailedDescriptions.conclusion);
	// console.log("Product.title: " + product.title)
	
	// const { useFetch } = useContext(GlobalContext)
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);


	return (
		<>
			<div className="background-color product-details-page">
				<h2>{product.title}</h2>
					<div id="atm-detail-display-for" className="row-view">
						<div>
							<img src={product.image} alt={product.title} />
							{(id === 0 || id === 1 || id === 2) && (
								<>
									<div dangerouslySetInnerHTML={{ __html: safeBenefits }}/>
									{/* <div dangerouslySetInnerHTML={{ __html: safeConclusion }}/> */}
								</>
						)}
						</div>
						<div>
							<div dangerouslySetInnerHTML={{ __html: safeTitle }}/>
							<div dangerouslySetInnerHTML={{ __html: safeAbout }}/>
							<div dangerouslySetInnerHTML={{ __html: safeFeatures }}/>
						</div>
					</div>
					{(id === 3) && (
							<div dangerouslySetInnerHTML={{ __html: safeBenefits }}/>
						)}
						<div dangerouslySetInnerHTML={{ __html: safeConclusion }}/>
						<p>
							Ready to {finalConclusion} with the GRG {product.title}? {contactUs} today
							to learn more about how this exceptional ATM solution can benefit
							your business.
						</p>
				{/* <{product.detailedDescriptions} /> */}
			</div>
		</>
	);
}
export default ProductDetails;
