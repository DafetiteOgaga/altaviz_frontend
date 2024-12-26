// import useFetch from '../hooks/useFetch';
import logo from '../../logo/altaviz_logo.png';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import "./header.css"
import { useEffect } from 'react';

function Header() {
	const navigateTo = useNavigate();
	// Check if the key 'updating' is present in localStorage
    const isUpdating = localStorage.getItem("updating");
	useEffect(() => {
		if (isUpdating) {
			// Dynamically inject the keyframes into the document's <style> tag
			const styleTag = document.createElement("style");
			styleTag.innerHTML = notificationDotStyles;
			document.head.appendChild(styleTag);

			// Apply animation style to the element via JavaScript
			const notificationDot = document.getElementById("headerNotificationDot");
			if (notificationDot) {
				notificationDot.style.animation = "glow 1.5s infinite";
			}

			// Cleanup (if necessary)
			return () => {
				if (document.head.contains(styleTag)) {
					document.head.removeChild(styleTag);
				}
			};
		}
	}, [isUpdating]);
	return (
		<header>
			<div className='logo-nav'>
				<a
				href='/'
				onClick={(e) => {
					e.preventDefault();
					navigateTo('/');
				}}
				>
					<img src={logo} alt='alterviz logo' />
				</a>
				<Navigation />
			</div>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
			}}>
				{isUpdating&&<span id='headerNotificationDot' style={headerStyles.notificationDot}></span>}
				<h6>Beta v10.03.272</h6>
			</div>
		</header>
	)
}
export default Header;

const headerStyles = {
	notificationDot: {
		// position: '.absolute', // Ensure the dot is positioned relative to the parent
		// top: '-5px', // Adjust vertical position
		// right: '-15px', // Adjust horizontal position
		margin: '37.280px 8px',
		alignSelf: 'center',
		width: '5.5px',
		height: '5.5px',
		// gap: '5px',
		backgroundColor: 'rgb(6, 6, 126)',
		borderRadius: '50%', // Fixed the typo here
		border: '2.5px solid #E5E5E5', // Optional: Add contrast
		animation: 'glow 1.5s infinite', // Add animation reference
	},
}
const notificationDotStyles = `
@keyframes glow {
	0% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
	}
	10% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
	}
	20% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.7);
	}
	30% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.8);
	}
	40% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.9);
	}
	50% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 1);
	}
	60% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.9);
	}
	70% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.8);
	}
	80% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.7);
	}
	90% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.6);
	}
	100% {
		box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
	}
}`;