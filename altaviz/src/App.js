// import logo from './logo.svg';
import { useContext, useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/sidebarCompoent/SideBar';
import Header from './components/header/Header';
import AppRoutes from './components/Routes/Routes';
import Footer from './components/footer/Footer';
import Announcements from './components/announcement/Announcements';
// import useSSENotification from './components/context/SSEContext/SSENotification';
// import Home from './components/home/Home';
import usePullNotification from './components/paginationComp/usePullNotification';
import usePullCompleteList from './components/paginationComp/usePullCompleteList';
import { AuthContext } from './components/context/checkAuth/AuthContext';
import { useWebSocketNotificationContext } from './components/context/RealTimeNotificationContext/useWebSocketNotificationContext';
import { useLocation } from 'react-router-dom';
// import Custodian from './components/SideBar/custodian/Custodian';

function App() {
	const notificationUrl = useRef(null)
	const notificatioKey = useRef(null)
	const dept = useLocation().pathname.split('/')[1]
	const { authData } = useContext(AuthContext)
	// const [notificationUrl, setNotificationUrl] = useState(null)
	// const [notificatioKey, setNotificationKey] = useState(null)
	const [forceUpdates, setForceUpdates] = useState(false)
	const { notifications } = useWebSocketNotificationContext()
	console.log(
		'\nnotifications:', notifications,
		'\nauthData.role:', authData?.role,
	)
	if (notifications && authData) {
		console.log(
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
		)
		localStorage.setItem(dept, notifications)
	}
	console.log(
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
	)
	console.log('\nnotifications (apps.js):', notifications)
	// setConsumedData(false)
	let getUpdates;
	if (localStorage.getItem(dept)) {getUpdates = localStorage.getItem(dept)}
	else {getUpdates = null}
	console.log(
		'\ngetUpdates:', getUpdates,
		'\ndept:', dept,
		'\nauthData.role:', authData?.role,
		'\nlocalStorage.getItem(dept):', localStorage.getItem(dept),
		// '\nisProcessed.current:', isProcessed,
	)
	useEffect(() => {
		if (getUpdates) {
			setForceUpdates(true)
			// setTimeout(() => {
			// 	setForceUpdates(true)
			// 	// isProcessed.current = false
			// }, 50);
		}
	}, [getUpdates])
	const assignNotifications = (url, key) => {
		console.log(
			'\nturning on notificationUrl and notificationKey:',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl.current,
			notificatioKey.current
		)
		notificationUrl.current = url
        notificatioKey.current = key
		console.log(
			notificationUrl.current,
			notificatioKey.current
		)
	};
	switch (getUpdates) {
        case 'fault created':
            // Custodian logged a fault
            if (dept === 'custodian') {
                // console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('pending-faults', 'faultsKey');
                assignNotifications('unresolved-faults', 'allUnresolvedKey');
            } else if (dept === 'engineer') {
                // console.log({role}, {role},{role}, {role}, {role})
                // localStorage.setItem(role, notification)
                // assignNotifications('engineer-pending-faults', 'faultsKey');
                assignNotifications('engineer-unresolved-faults', 'allUnresolvedKey');
            } else if (dept === 'help-desk') {
                // console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('regional-unconfirmed-faults', 'unconfirmedKey');
                assignNotifications('region-pending-faults', 'allUnresolvedKey');
            } else if (dept === 'supervisor') {
                // console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('regional-unconfirmed-faults', 'unconfirmedKey');
                assignNotifications('region-pending-faults', 'allUnresolvedKey');
            }
            break;
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: faultsKey, allUnresolvedKey
            // add to helpdesk: unconfirmedKey, allUnresolvedKey
            // add to supervisor: unconfirmedKey, allUnresolvedKey
            // if (role === 'custodian') {
            //     setNotificationUrl('pending-faults')
            //     setNotificationKey('faultsKey')
            //     setNotificationUrl('unresolved-faults')
            //     setNotificationKey('allUnresolvedKey')
            // }
            // if (role === 'engineer') {
            //     setNotificationUrl('engineer-pending-faults')
            //     setNotificationKey('faultsKey')
            //     setNotificationUrl('engineer-unresolved-faults')
            //     setNotificationKey('allUnresolvedKey')
            // }
            // if (role === 'help-desk') {
            //     setNotificationUrl('regional-unconfirmed-faults')
            //     setNotificationKey('unconfirmedKey')
            //     setNotificationUrl('region-pending-faults')
            //     setNotificationKey('allUnresolvedKey')
            // }
            // if (role === 'supervisor') {
            //     setNotificationUrl('regional-unconfirmed-faults')
            //     setNotificationKey('unconfirmedKey')
            //     setNotificationUrl('region-pending-faults')
            //     setNotificationKey('allUnresolvedKey')
            // }
        case 'confirm resolve':
            // custodian confirmed resolution
            // add to custodian: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to engineer: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            break;
        case 'fault deleted':
            // fault deleted
            // only make the update on next dashboard visit
            break;

        // hr
        case 'added component name to inventory':
            // created a new inventory component name
            break;
        case 'updated component in inventory':
            // updated component in inventory
            break;
        case 'added part name to inventory':
            // created a new inventory part name
            break;
        case 'updated part in inventory':
            // updated part in inventory
            break;
        case 'account update request':
            // account update request
            break;
        case 'approve or reject fixed parts':
            // hr approved/rejected fixed parts
            break;

        // workshop
        case 'fixed part deleted':
            // fixed part deleted
            // only make the update on next dashboard visit
            break;

        // hr/workshop
        case 'fixed part ready':
            // posted part by workshop
            // add to workshop: partKey, allPendingRequests
            // add to human resource: partKey, allPendingRequests
            break;

        // workshop/engineer/supervisor
        case 'make component request':
            // engineer/supervisor/workshop made component request
            // add to workshop: componentKey, allPendingRequests
            // add to custodian: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to engineer: componentKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: componentKey, faultsKey, allUnresolvedKey, allPendingRequests
            break;

        // engineer/supervisor
        case 'make part request':
            // engineer/supervisor made part request
            // add to workshop: partKey, allPendingRequests
            // add to custodian: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to engineer: partKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: faultsKey, allUnresolvedKey, allPendingRequests
            break;
        case 'verify resolve':
            // engineer verified resolution
            // add to custodian: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to engineer: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: faultsKey, allUnresolvedKey
            break;
        case 'component request deleted':
            // component request deleted
            // only make the update on next dashboard visit
            break;
        case 'part request deleted':
            // part request deleted
            // only make the update on next dashboard visit
            break;

        // supervisor/hr
        case 'approve/reject component request':
            // supervisor/hr approve/reject single component request
            // add to workshop: componentKey, allPendingRequests
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: componentKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: componentKey, faultsKey, allUnresolvedKey, allPendingRequests
            break;
        case 'approve/reject part request':
            // supervisor/hr approve/reject single part request
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: partKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: faultsKey, allUnresolvedKey, allPendingRequests
            break;
        case 'approve/reject components and/or parts request':
            // supervisor/hr approve/reject components and/or parts request
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: componentKey, partKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: componentKey, partKey, faultsKey, allUnresolvedKey, allPendingRequests
            break;
        case 'assigned engineer to new location':
            // supervisor assigned engineer to new location
            break;

        case 'deliveries point':
            // increments the delivery point for sucessful resolutions
            break;

        default:
            // Optional: handle any unexpected notification values
            break;
    }
	usePullCompleteList(
		(authData?`${notificationUrl.current}/list`:null), (authData?authData.id:null),
		(authData?notificatioKey.current:null), forceUpdates, (authData?authData.role:null)
	)
	// console.log('2222222222222222222')
	if (forceUpdates&&!getUpdates) {
		console.log(
			'\nturning off notificationUrl and notificationKey:',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl.current,
			notificatioKey.current
		)
		setForceUpdates(false)
		notificatioKey.current = null
		notificationUrl.current = null
		console.log(
			notificationUrl.current,
			notificatioKey.current
		)
	}
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
