import { useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../checkAuth/AuthContext';
import { RemoveAllKeys } from '../../hooks/RemoveKeys';
import { setKeyToLocalStorage } from '../../hooks/setToLocalStorage';

const CheckSessionComponent = () => {
	// const navigate = useNavigate();
	const { authData } = useContext(AuthContext);
	const MAX_SESSION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
	// const MAX_SESSION_TIME = 1000 * 10 // 1 minute, for testing purpose
	let timeElapsed;

	console.log('1111'.repeat(70))
	useEffect(() => {
		const checkSession = () => {
			const lastVisitTime = localStorage.getItem('lVT');
			console.log('lastVisitTime', lastVisitTime)
			if (lastVisitTime) {
				console.log('found lastVisitTime')
				const currentTime = new Date().getTime();
				console.log('currentTime', currentTime)
				timeElapsed = currentTime - parseInt(lastVisitTime, 10);
				console.log('timeElapsed', timeElapsed)
				let readableTime = timeElapsed/1000
				console.log(
					'\nseconds', readableTime,
					'\nminutes', readableTime/(60),
					'\nhours', readableTime/(60*60),
					'\ndays', readableTime/(24*60*60),
				)

				// If more than 24 hours has passed
				if (timeElapsed > MAX_SESSION_TIME) {
					// Clear user data and redirect to login
					console.log('clearing user authentication')
					RemoveAllKeys()
					window.location.href = '/login'
					// navigate('/login'); // Redirect to login page
				} else console.log('not clearing user authentication')
				console.log('updated lastVisitTime')
				// localStorage.setItem('lVT', new Date().getTime());
				setKeyToLocalStorage('lVT', new Date().getTime())
			} else if (!lastVisitTime&&authData) {
				// If no last login time is found, redirect to login
				console.log('no lastVisitTime, so created one')
				// localStorage.setItem('lVT', new Date().getTime());
				setKeyToLocalStorage('lVT', new Date().getTime())
				// navigate('/login');
			}
		};

		checkSession();
	}, []);

	return timeElapsed
	// 	<div>
	// 	<h1>Welcome to My App</h1>
	// 	{/* <button onClick={handleLogin}>Login</button> */}
	// 	</div>
	// );
};

export default CheckSessionComponent;
