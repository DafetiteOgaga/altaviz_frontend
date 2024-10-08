// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
// import { GlobalContext } from '../context/Context';
// import { useNavigate } from "react-router-dom";
import GetProductDetails from '../../hooks/GetProductNHeroDetails';


const CardContainer = styled.div.attrs({
	className: 'CardContainer'
	})`
	perspective: 1000px;
	width: 300px;
	height: 350px;
	position: relative;
	padding: 0 0.3em;
	
	animation: ${({ $item_no }) => {return $item_no % 2 === 0 ? 'homeSlideDown' : 'homeSlideUp';}} 2s ease-in-out;

	@keyframes homeSlideDown {
		from {
		transform: translateY(-50px);
		}
		to {
		transform: translateY(0);
		}
	}
	@keyframes homeSlideUp {
		from {
		transform: translateY(50px);
		}
		to {
		transform: translateY(0);
		}
	}
	// @keyframes homeSlideLeft {
	// 	from {
	// 	transform: translateX(50px);
	// 	}
	// 	to {
	// 	transform: translateX(0);
	// 	}
	// }
	// @keyframes homeSlideRight {
	// 	from {
	// 	transform: translateX(-50px);
	// 	}
	// 	to {
	// 	transform: translateX(0);
	// 	}
	// }
	//   background-color: #fff;
	// border-radius: 10px;
	// box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	// overflow: hidden;
	// transition: transform 0.3s ease, box-shadow 0.3s ease;
	// cursor: pointer;
	// position: relative;
	
	// &:hover {
	// 	transform: translateY(-10px);
	// 	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	// }
`;

const Card = styled.div.attrs({
	className: 'Card'
	})`
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
	transition: transform 0.6s ease;
	cursor: pointer;

	&:hover {
		transform: rotateY(180deg);
	}
`;

const CardFace = styled.div.attrs({
	className: 'CardFace'
	})`
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden; /* Hide the back face */
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	overflow: hidden;
`;

const CardFront = styled(CardFace)`
	background-color: #fff;
`;

const CardBack = styled(CardFace)`
	background-color: #f0f0f0;
  	transform: rotateY(180deg); /* Initially hide the back side */
`;

const CardImage = styled.img.attrs({
	className: 'CardImage'
	})`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const CardContent = styled.div.attrs({
	className: 'CardContent'
	})`
	padding: 0.3rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	animation: bounce 3s ease-in-out;
//   animation: homeSlideRight 1s ease-in-out;

	@keyframes bounce {
		0%, 100% {
		transform: translateX(0);
		}
		20% {
			transform: translateX(-10px);
		}
		50% {
			transform: translateX(0);
		}
		80% {
			transform: translateX(-5px);
		}
	}
  	// 0% {
	// 	transform: translateX(0);
	// }
	// 25% {
	// 	transform: translateX(-20px); /* Adjust the distance as needed */
	// }
	// 50% {
	// 	transform: translateX(0);
	// }
	// 75% {
	// 	transform: translateX(20px); /* Adjust the distance as needed */
	// }
	// 100% {
	// 	transform: translateX(0);
	// }
	// }
	@keyframes homeSlideLeft {
		from {
		transform: translateX(50px);
		}
		to {
		transform: translateX(0);
		}
	}
	@keyframes homeSlideRight {
		from {
		transform: translateX(-50px);
		}
		to {
		transform: translateX(0);
		}
	}
//   height: 100%;
`;

const CardTitle = styled.h2.attrs({
	className: 'CardTitle'
	})`
	font-size: 1.5rem;
	margin: 0;
	color: #424040;
`;

const CardDescription = styled.p.attrs({
	className: 'CardDescription'
	})`
	font-size: 1rem;
	color: #424040;
	margin: 0;
`;

// const CardButton = styled.button`
//   padding: 0.3rem 0.5rem;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

const ProductCards = () => {
	const products = GetProductDetails();
	// console.log('products (PRODUCTCARD):', response);
	// console.log('card photo:', cardData.image);
	// console.log('card title:', cardData.title);
	// console.log('card description:', cardData.description);
	// let { id } = useParams();
	// id = Number(id);
	// const { useFetchGET } = useContext(GlobalContext);
	// const [products, setProducts] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
	// const response = useFetchGET('http://localhost:8000/product/');
	const navigateTo = useNavigate();

	// useEffect(() => {
	// 	const GetData = async () => {
	// 		try {
	// 			if (response.data) {
	// 				if (response.data) {
	// 					setProducts(response.data);
	// 				} else {
	// 					setError('Products not found');
	// 				}
	// 			}
	// 		} catch (error) {
	// 			setError(error.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}}
	// 	GetData();
	// }, [response.data])
	console.log('products (ProductCards):', products)

	const goTo = (e, index) => {
		e.preventDefault();
		// setCurrentId(targetId);
		// console.log('Current page:', index, '########')
		navigateTo(`/products/product/${index}`);
		// pageNumber = pageNumber;
		// if (id > 0 && id > currentProduct && id > totalProducts) {
		// 	setNext(id + 1);
        //     setCurrentProduct(id + 1);
        //     console.log('Previous product is:', currentProduct);
		// if (id === currentProduct && id < totalProducts && id ) {
		// }}
	}
	// if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
			}}
			>
      		{products && (products.map((card, index) => {
				// console.log('index:', index)
				// console.log('card-title:', card.title)
				// console.log('card-id:', card.id)
				return (
				// add an anchor link to individual deatailed cards to CardContainer
				<CardContainer key={card.id}
				$item_no={card.id}
				>
					{/* <a href={`/products/product/${index}`} data-id={card.id} onClick={clickHandler}> */}
					<a
					href={`/products/product/${card.id}`}
					onClick={(e) => goTo(e, card.id)}
					>
						<Card>
							<CardFront>
								<CardImage src={card.image} alt={card.image} />
								<CardContent>
									<CardTitle>{card.description.title}</CardTitle>
									{/* <p>hello</p> */}
									{/* <CardDescription>{card.description}</CardDescription> */}
									{/* <p>bye</p> */}
								</CardContent>
							</CardFront>
							<CardBack>
								<CardContent>
									<CardTitle>Click for More Info</CardTitle>
									<CardDescription>
										{card.description.about.slice(0, 600) + '...'}
										{/* {<CardDescription dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.description.about) }}/>} */}
										{/* {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(card.description.benefits) }}/>} */}
									</CardDescription>
									{/* <CardButton>Learn More</CardButton> */}
								</CardContent>
							</CardBack>
						</Card>
					</a>
				</CardContainer>
			)}))}
		</div>
	);
};

export default ProductCards;


// import useFetch from "../../hooks/useFetch";

// function ProductCards() {
// 	const { data, loading, error } = useFetch('http://localhost:8000');

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error: {error}</p>;
// 	console.log(data);

// 	return (
// 		<>
// 			{/* this cards should contain links to individual detailed product pages */}
// 			<h2>Product Cards section</h2>
// 		</>
// 	);
// }
// export default ProductCards;