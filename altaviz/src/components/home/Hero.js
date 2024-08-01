import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
	function getImages(r) {
		return r.keys().map(r);
	}
	const images = getImages(require.context('./hero_images/', false, /\.(png|jpe?g|svg)$/));
	console.log('result of images:', images)
	console.log('length of images:', images.length)
	// const images = [
	// 	'https://example.com/image1.jpg',
	// 	'https://example.com/image2.jpg',
	// 	'https://example.com/image3.jpg',
	// ];
	const heading="Welcome to Altaviz Support Limited"
	const subheading="We offer the best ATM support, maintainance and services at affordable prices."
	const more_subheading="With our dedicated and pro-active support engineers around the country,"
	const and_more_subheading="You are guaranteed a 24/7 machine uptime."
	// const ctaText="Contact Us Today!"
	// const ctaLink="/get-started"
	const interval=5000

	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const imageCount = images.length;
		const changeImage = setInterval(() => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
		}, interval);

		return () => clearInterval(changeImage); // Clean up the interval on component unmount
	}, [images.length, interval]);

	return (
		<div
		className="hero"
		style={{ 
			backgroundImage: `url(${images[currentImageIndex]})`,
			// borderRadius: '20rem',
			// height: '45%',
			// backgroundSize: 'contain',
			// backgroundPosition: 'center',
			// backgroundRepeat: 'round',
			// backgroundColor: 'transparent',
		}}
		>
		<div className="hero-content">
			<h1 className="hero-heading">{heading}</h1>
			<p className="hero-subheading">{subheading}</p>
			<p className="hero-subheading">{more_subheading}</p>
			<p className="hero-subheading">{and_more_subheading}</p>
			{/* {ctaText && ctaLink && (
			<a href={ctaLink} className="hero-cta-button">
				{ctaText}
			</a>
			)} */}
		</div>
		</div>
	);
	}

export default Hero;


// import useFetch from "../../hooks/useFetch";

// function Hero() {
// 	const { data, loading, error } = useFetch('http://localhost:8000');

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error: {error}</p>;
// 	console.log(data);

// 	return (
// 		<>
// 			<h2>Hero section</h2>
// 		</>
// 	);
// }
// export default Hero;