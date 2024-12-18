import './App.css';
import './components/fonts.css';
import SideBar from './components/SideBar/sidebarComponent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
import SilentUpdate from './components/context/RealTimeNotificationContext/SilentUpdate';
import { useFirebase } from './components/context/RealTimeNotificationContext/FirebaseContextNotification';

function App() {
	const { data:firebaseNotification } = useFirebase()
	console.log('firebaseNotification (app.js):', firebaseNotification)
	SilentUpdate(firebaseNotification)
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl)
	return (
		<div className="app-container">
			<div style={{paddingBottom: '1em'}}>
					<Header />
						<div className='body-minus-header'>
							<div className="sub-root">
								<div>
									<SideBar className="sidebar" />
									<Announcements />
								</div>
								<main>
									<div className='main-background'>
										<AppRoutes/>
									</div>
								</main>
							</div>
						</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
