// import { useContext  } from "react";
// import { GlobalContext } from "../Context/Context";
import "./productDetails.css"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Context";
import DOMPurify from 'dompurify';
// import useFetch from "../hooks/useFetch";

function ProductDetails() {
	let { id } = useParams();
	id = Number(id);
	const { cardData: products, useNavigation } = useContext(GlobalContext);
	const [currentId, setCurrentId] = useState(Number(id));
	const contactUs = useNavigation('contact us')
	const navigateTo = useNavigate()

	const product = products[currentId]
	const totalProducts = products.length;
	const previous = currentId > 0 ? currentId - 1 : null;
	const next = currentId < totalProducts - 1 ? currentId + 1 : null;
	// console.log("Product: " + products[0])
	// console.log("Product.title: " + products[0].title)
	
	// console.log("Total products: " + totalProducts);
	
	// const product = products[id]
	// console.log('Type of id:', typeof id);
	
	// const totalProducts = products.length
	// let previous = id - 1;
	// const previousCondition = id > 0 && id < totalProducts;
	// const nextCondition = id >= 0 && id < (totalProducts - 1);
	// let next = id + 1;
	// let pageNumber = null;
	// const [ next, setNext ] = useState(id + 1);
	// const [ previous, setPrevious ] = useState(id - 1);
	// const [ currentProduct, setCurrentProduct ] = useState(id);


	const goTo = (e, targetId) => {
		e.preventDefault();
		setCurrentId(targetId);
		console.log('Current page:', targetId, '########')
		navigateTo(`/products/product/${targetId}`);
		// pageNumber = pageNumber;
		// if (id > 0 && id > currentProduct && id > totalProducts) {
		// 	setNext(id + 1);
        //     setCurrentProduct(id + 1);
        //     console.log('Previous product is:', currentProduct);
		// if (id === currentProduct && id < totalProducts && id ) {
		// }}
	}

	useEffect(() => {
		const initialImageDisplay = document.getElementById('atm-detail-display-for');
		const subsequentImageDisplay = document.getElementById('atm-detail-display-for-img');
		// console.log('initialDisplay', initialImageDisplay);
		// console.log('subsequentDisplay', subsequentImageDisplay);
		// console.log('Image display: ' + imageDisplay)
		// console.log('product-id:', id)
		if (currentId === 3 && initialImageDisplay) {
			// console.log('IF STATEMENT')
			initialImageDisplay.setAttribute('id', 'atm-detail-display-for-img');
			// console.log('initialDisplay', initialImageDisplay);
		} else if (currentId !== 3 && subsequentImageDisplay ) {
			// console.log('ELSE STATEMENT')
			subsequentImageDisplay.setAttribute('id', 'atm-detail-display-for');
			// console.log('subsequentDisplay', subsequentImageDisplay);
		}
	}, [currentId])

	// console.log('Type of id:', typeof id);
	let finalConclusion = '';
	// let thirdPage = false;
	if (currentId === 0 || currentId === 1) {
		finalConclusion = 'upgrade your ATM services'
	} else if (currentId === 2) {
		finalConclusion = 'enhance your currency handling operations'
	} else if (currentId === 3) {
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
	// const nothing = '#';


	return (
		<>
			<div className="background-color product-details-page">
				<div className="productDetailsTitle">
					<div>
						<h2>
							{product.title}
							{/* {(id > 0) && (<a
							style={{textDecoration: 'none'}}
							href={`/products/product/${previous}`} onClick={goTo}>&lt;</a>)} */}
							{/* {(id > 0) && (<a href={`/products/product/${previous}`} onClick={goTo}>&gt;</a>)} */}
						</h2>
					</div>
					<div className="prev-next">
						{previous !== null && (
						<a href={`/products/product/${previous}`} onClick={(e) => goTo(e, previous)}>
							<h2> &lt; </h2>
						</a>
						)}
						{next !== null && (
						<a href={`/products/product/${next}`} onClick={(e) => goTo(e, next)}>
							<h2> &gt; </h2>
						</a>
            			)}
					</div>
				</div>
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
