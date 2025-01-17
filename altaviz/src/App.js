import './App.css';
// import logo from './me.png';
import './components/fonts.css';
import SideBar from './components/SideBar/sidebarComponent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
import UpdateInBackground from './components/context/RealTimeNotificationContext/UpdateInBackground';
import { useFirebase } from './components/context/RealTimeNotificationContext/FirebaseContextNotification';
import useDeviceType from './components/deviceType/DeviceType';
import altaviz from './logo/altaviz_logo.png';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import { AuthContext } from './components/context/checkAuth/AuthContext';

function App() {
	// const { authData } = useContext(AuthContext)
	// const { createNotification } = useChatNotification();
	// createNotification('online', 'IT FUCKING WORKED again!!!')
	const [, setReload] = useState(false)
	const deviceType = useDeviceType()
	console.log({deviceType})
	const { data:firebaseNotification } = useFirebase()
	console.log('firebaseNotification (app.js):', firebaseNotification)
	// useSilentUpdate(firebaseNotification)
	UpdateInBackground(firebaseNotification, setReload)
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl)
	console.log({deviceType})
	// console.log('chatsUpdates?.notificationCount:', chatsUpdates?.notificationCount)
	return (
		<>
			<Toaster
			position="bottom-center"
			// duration={20000}
			toastOptions={toastStyle} />
				{deviceType.toLowerCase() !== 'pc' ? (
					<div style={mAndTstyle.mainContainer}>
					<img src={altaviz} alt="altaviz logo" style={{ height: '40px', marginBottom: '20px' }} />
					<div style={mAndTstyle.mobileAndTabNotReady}>
						<h3 style={mAndTstyle.h}>Pls, kindly switch to PC device.</h3>
						<h4 style={mAndTstyle.h}>Sorry! This application is yet to be styled for Mobile and Tab devices.</h4>
						<h5 style={mAndTstyle.h}>⚠🚧 #Work still in Progress! 🛠🚫</h5>
						<h6 style={mAndTstyle.h}>We apologize for the inconvenience.</h6>
					</div>
					</div>
				) : (
					<div className="app-container">
						<div style={{ paddingBottom: '1em' }}>
							<Header />
							<div className="body-minus-header">
								<div
								// style={mAndTstyle.pageContainer.background}
								// className={authData?"sub-root":""}
								className="sub-root"
								>
									{/* {authData && */}
									<div>
									<SideBar
									// NotificationCount={chatsUpdates?.notificationCount||0}
									className="sidebar" />
									<Announcements />
									</div>
									{/* } */}
									<main>
										<div className="main-background">
											<AppRoutes />
										</div>
									</main>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				)}
		</>
	);
}

export default App;

const mAndTstyle = {
	mainContainer: {
		height: '100vh',
		backgroundColor: 'lightgray',
		padding: '0 30px',
		paddingTop: '80px',
	},
	mobileAndTabNotReady: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'black',
		textAlign: 'center',  // Center text horizontally
		padding: '30px 0',      // Add some padding to prevent text from touching the box edges
		paddingTop: '70px',
		boxSizing: 'border-box',
		flexDirection: 'column',
	},
	h: {
		marginTop: '0',
		marginBottom: '30px'
	}
}

const toastStyle = {
    success: {
		style: {
			background: 'gray',
			color: 'whitesmoke',
			marginBottom: '100px',
		},
    },
    error: {
		style: {
			background: 'gray',
			color: 'white',
			marginBottom: '100px',
		},
	},
}