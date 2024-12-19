import './App.css';
import './components/fonts.css';
import SideBar from './components/SideBar/sidebarComponent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
import useSilentUpdate from './components/context/RealTimeNotificationContext/SilentUpdate';
import { useFirebase } from './components/context/RealTimeNotificationContext/FirebaseContextNotification';
import useDeviceType from './components/deviceType/DeviceType';
import { useEffect } from 'react';

function App() {
	const deviceType = useDeviceType()
	console.log({deviceType})
	const { data:firebaseNotification } = useFirebase()
	console.log('firebaseNotification (app.js):', firebaseNotification)
	useSilentUpdate(firebaseNotification)
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl)
	console.log({deviceType})
	const mAndTstyle = {
		mobileAndTabNotReady: {
			display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
					backgroundColor: 'lightgray',
					color: 'black',
					textAlign: 'center',  // Center text horizontally
					padding: '30px',      // Add some padding to prevent text from touching the edges
					boxSizing: 'border-box',
					flexDirection: 'column',
		},
		h: {
			marginTop: '0',
			marginBottom: '30px'
		}
	}
	return (
		<>
			{deviceType.toLowerCase() !== 'pc' ? (
				<div style={mAndTstyle.mobileAndTabNotReady}>
					<h3 style={mAndTstyle.h}>Pls, kindly switch to PC device.</h3>
					<h4 style={mAndTstyle.h}>Sorry! This application is yet to be styled for Mobile and Tab devices.</h4>
					<h5 style={mAndTstyle.h}>⚠🚧 # Work still in Progress! 🛠🚫</h5>
				</div>
			) : (
				<div className="app-container">
					<div style={{ paddingBottom: '1em' }}>
						<Header />
						<div className="body-minus-header">
							<div className="sub-root">
								<div>
									<SideBar className="sidebar" />
									<Announcements />
								</div>
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
