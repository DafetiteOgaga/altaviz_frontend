// import { useContext  } from "react";
// import { GlobalContext } from "../Context/Context";
import "./productDetails.css"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Context";
// import DOMPurify from 'dompurify';
// import useFetch from "../hooks/useFetch";

function ProductDetails() {
	// console.log('1111111111111111111')
	let { id } = useParams();
	id = Number(id);
	const { useNavigation, useFetchGET } = useContext(GlobalContext);
    const navigateTo = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
	const [totalProducts, setTotalProducts] = useState(0);
	const [trigger, setTrigger] = useState(false);

	const response = useFetchGET('http://localhost:8000/product/');

	useEffect(() => {
		// console.log('trigger 1: ' + trigger)
		const GetData = async () => {
			try {
				if (response.data) {
					setTotalProducts(response.data.length);
					const currentProduct = response.data.find(product => product.id === id);
					if (currentProduct) {
						setProduct(currentProduct)
						if (currentProduct.title === 'GRG H34 Series ATM') {
							setTrigger(true);
						} else {
							setTrigger(false);
						}
						// console.log('trigger 2: ' + trigger)
					} else {
						setError('Product not found');
					}
				}
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}}
		GetData();
	}, [id, response.data])
	// console.log('START HERE #######')
	console.log('product (ProductDetails):', product)
	// try {
	// 	console.log('product (ProductDetails):', product[id-1])
	// 	const { description, id:product_id, title } = product[id-1];
	// 	console.log('description (ProductDetails):', description);
	// 	console.log('title (ProductDetails):', title);
	// 	console.log('product_id (ProductDetails):', product_id);
	// 	} catch {
	// 	console.log('WAIT, LOADING...')
	// }
	// console.log("Id (ProductDetails) 11: " + id)
	// console.log('products (ProductDetails):', products);
	// console.log("Id (ProductDetails) 22: " + id)
	// console.log('products data (ProductDetails):', products.data);
	// useEffect(() => {
	// 	try {
	// 	// console.log("Id (ProductDetails) 33: " + id)
	// 	console.log('products data index[id] (ProductDetails):', products.data[id]);
	// 	// console.log("Id (ProductDetails) 44: " + id)
	// 	console.log('products data index[id] id (ProductDetails):', products.data[id].id);
	// 	// console.log("Id (ProductDetails) 55: " + id)
	// 	console.log('products data index[id] title (ProductDetails):', products.data[id].title);
	// 	// console.log("Id (ProductDetails) 66: " + id)
	// 	} catch (error) {
	// 		console.log('WAIT, LOADING ...')
	// 	}
	// })
	
	// const [currentId, setCurrentId] = useState(Number(id));
	// const [status, setStatus] = useState(null);
	const contactUs = useNavigation('contact us')
	// // const navigateTo = useNavigate()

	// do {
	// 	
	// } while (status === null)
	
	// // console.log("Id: " + id)
	// // console.log("currendId: " + currentId)
	// console.log("Product ***** : " + product)
	// console.log("Product.title: " + product.title)
	// console.log("previous products: " + previous);
	// console.log("next products: " + next);
	// console.log("Total products: " + totalProducts);

	// console.log('2222222222222')
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

		// const product = products.data[currentId]
		// const totalProducts = products.length;
		// const previous = product_id > 0 ? product_id - 1 : null;
		// const next = product_id < totalProducts - 1 ? product_id + 1 : null;

	}
	
	const goTo = (e, targetId) => {
		// console.log('xxxxxxxxxxxxxxxxxxxx')
		e.preventDefault();
		// setCurrentId(targetId);
		// console.log('Current page:', targetId, '########')
		navigateTo(`/products/product/${targetId}`);
		// pageNumber = pageNumber;
		// if (id > 0 && id > currentProduct && id > totalProducts) {
		// 	setNext(id + 1);
		//     setCurrentProduct(id + 1);
			// console.log('Previous product is:', currentProduct);
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
		if (trigger && initialImageDisplay) {
			console.log('IF STATEMENT #######')
			initialImageDisplay.setAttribute('id', 'atm-detail-display-for-img');
			// console.log('initialDisplay', initialImageDisplay);
		} else if (subsequentImageDisplay) {
			console.log('ELSE STATEMENT #######')
			subsequentImageDisplay.setAttribute('id', 'atm-detail-display-for');
			setTrigger(false);
			// console.log('subsequentDisplay', subsequentImageDisplay);
		}
		// setTrigger(false)
		// setCurrentId(id);
		// console.log("Id (useEffect): " + id)
		// console.log("currendId (useEffect): " + currentId)
		// if (!initialImageDisplay || !subsequentImageDisplay) {
		// 	console.log('No image display elements found')
		// }
	}, [trigger])

	// // console.log('Type of id:', typeof id);
	
	// }

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
	// const safeTitle = DOMPurify.sanitize(product.detailedDescriptions.title);
	// const safeAbout = DOMPurify.sanitize(product.detailedDescriptions.about);
	// const safeFeatures = DOMPurify.sanitize(product.detailedDescriptions.features);
	// const safeBenefits = DOMPurify.sanitize(product.detailedDescriptions.benefits);
	// const safeConclusion = DOMPurify.sanitize(product.detailedDescriptions.conclusion);
	// console.log("Product.title: " + product.title)
	
	// const { useFetch } = useContext(GlobalContext)
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);
	// const nothing = '#';
	if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


	return (
		<>
			<div className="background-color product-details-page">
				{/* {loading && (<h2>Loading...</h2>)}
				{error && (<h2>Loading...</h2>)} */}
				{product &&
				(<>
				<div className="productDetailsTitle">
					<div>
						<h2>
							{product.title}
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
							<img src={product.product_images} alt={product.product_images} />
							{/* benefitts */}
						</div>
						<div>
							<p>{product.description.about}:</p>
							<h3>Key Features:</h3>
							<ul>{product.description.features.map(({head, body}) => {
								return (<li key={head}><strong>{head}: </strong>{body}</li>)
							})}</ul>
						</div>
					</div>
					<h3>Benefits for Your Business:</h3>
					<ul>{product.description.benefits.map(({head, body}) => {
						return (<li key={head}><strong>{head}: </strong>{body}</li>)
					})}</ul>
					<h3>Conclusion:</h3>
					{product.description.conclusion}
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
