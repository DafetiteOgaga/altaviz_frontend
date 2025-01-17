import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/Context';
import './Hero.css';
import { getHeroImages } from '../../hooks/GetProductNHeroDetails';

function Hero() {
	const images = getHeroImages();
	const { companyName } = useContext(GlobalContext);
	const heading=`Welcome to ${companyName}`
	const subheading="We sell and offer the best ATM support, maintainance and services at affordable prices."
	const more_subheading="With our dedicated and pro-active support Engineers around the country,"
	const and_more_subheading="You are guaranteed a 24/7 machine uptime."
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
		}}
		>
		<div className="hero-content">
			<h1 className="hero-heading">{heading}</h1>
			<p className="hero-subheading">{subheading}</p>
			<p className="hero-subheading">{more_subheading}</p>
			<p className="hero-subheading">{and_more_subheading}</p>
		</div>
		</div>
	);
	}
export default Hero;