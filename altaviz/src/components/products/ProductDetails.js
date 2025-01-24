// import { useContext  } from "react";
// import { GlobalContext } from "../Context/Context";
import "./productDetails.css"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Context";
import GetProductDetails from "../hooks/GetProductNHeroDetails";
// import DOMPurify from 'dompurify';
// import useFetch from "../hooks/useFetch";

function ProductDetails() {
	// console.log('1111111111111111111')
	let { id } = useParams();
	id = Number(id);
	const { useNavigation } = useContext(GlobalContext);
    const navigateTo = useNavigate();

	const products = GetProductDetails({type: 'details'});
	const totalProducts = products.length
	const product = products[id - 1];

	console.log('product (ProductDetails):', product)
	console.log('products (ProductDetails):', products)
	console.log('product id (ProductDetails):', product.id)
	console.log('id (ProductDetails):', id)
	console.log('totalProducts (ProductDetails):', totalProducts)
	const contactUs = useNavigation('contact us')

	// navigation
	let finalConclusion = '';
	if (product) {
		const product_id = product.id;
		// let thirdPage = false;
		if (product_id === 1 || product_id === 2) {
			finalConclusion = 'upgrade your ATM services'
		} else if (product_id === 3) {
			finalConclusion = 'enhance your currency handling operations'
		} else if (product_id === 4) {
			finalConclusion = 'upgrade your self-service banking'
		} else {
			finalConclusion = 'explore our range of services';
		}
	}
	const goTo = (e, targetId) => {
		// console.log('xxxxxxxxxxxxxxxxxxxx')
		e.preventDefault();
		// setCurrentId(targetId);
		// console.log('Current page:', targetId, '########')
		navigateTo(`/products/product/${targetId}`);
	}
	// useEffect(() => {
	// 	const initialImageDisplay = document.getElementById('atm-detail-display-for');
	// 	const subsequentImageDisplay = document.getElementById('atm-detail-display-for-img');
	// 	if (product.description.title === 'GRG H34 Series ATM' && initialImageDisplay) {
	// 		console.log('IF STATEMENT #######')
	// 		initialImageDisplay.setAttribute('id', 'atm-detail-display-for-img');
	// 		// console.log('initialDisplay', initialImageDisplay);
	// 	} else if (product.description.title !== 'GRG H34 Series ATM' && subsequentImageDisplay) {
	// 		console.log('ELSE STATEMENT #######')
	// 		subsequentImageDisplay.setAttribute('id', 'atm-detail-display-for');
	// 		// setTrigger(false);
	// 		// console.log('subsequentDisplay', subsequentImageDisplay);
	// 	}
	// }, [product.description.title])

	return (
		<>
			<div className="background-color product-details-page">
				{/* {loading && (<h2>loading ...</h2>)}
				{error && (<h2>loading ...</h2>)} */}
				{product &&
				(<>
				<div className="productDetailsTitle">
					<div>
						<h2>
							{product.description.title}
						</h2>
					</div>
					<div className="prev-next">
						{(product.id > 1) && (
						<a href={`/products/product/${(product.id) - 1}`} onClick={(e) => goTo(e, (product.id) - 1)}>
							<h2> &lt; </h2>
						</a>
						)}
						{(product.id < totalProducts) && (
						<a href={`/products/product/${(product.id) + 1}`} onClick={(e) => goTo(e, (product.id) + 1)}>
							<h2> &gt; </h2>
						</a>
            			)}
					</div>
				</div>
					<div id="atm-detail-display-for" className="row-view">
						<div>
							<img src={product.image} alt={product.description.title}
							// style={{width: '150%'}}
							/>
							{/* benefitts */}
						</div>
						<div>
							<p>{product.description.about}:</p>
							<h3>{product.description.features.title}:</h3>
							<ul>{product.description.features.content.head.map((head, index) => {
								return (<li key={head}><strong>{head}: </strong>{product.description.features.content.body[index]}</li>)
							})}</ul>
						</div>
					</div>
					<h3>{product.description.benefits.title}:</h3>
					<ul>{product.description.benefits.content.head.map((head, index) => {
						return (<li key={head}><strong>{head}: </strong>{product.description.benefits.content.body[index]}</li>)
					})}</ul>
					<h3>{product.description.conclusion.title}:</h3>
					{product.description.conclusion.content}
					{/* benefits */}
					{/* conclusion */}
						<p>
							Ready to {finalConclusion} with the GRG {product.title}? {contactUs} today
							to learn more about how this exceptional ATM solution can benefit
							your business.
						</p>
				{/* <{product.detailedDescriptions} /> */}
				</>)}
			</div>
		</>
	);
}
export default ProductDetails;
