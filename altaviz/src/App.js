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
// import { type } from '@testing-library/user-event/dist/cjs/utility/type.js';
// import Custodian from './components/SideBar/custodian/Custodian';

function App() {
	const notificationListUrl1 = useRef(null)
	const notificationListKey1 = useRef(null)
	const type1 = useRef(null)
	const notificationListUrl2 = useRef(null)
	const notificationListKey2 = useRef(null)
	const type2 = useRef(null)
	const notificationUrl1 = useRef(null)
	const notificationKey1 = useRef(null)
	const ntype1 = useRef(null)
	// const notificationUrl2 = useRef(null)
	// const notificationtKey2 = useRef(null)
	// const ntype2 = useRef(null)
	const dept = useLocation().pathname.split('/')[1]
	const { authData } = useContext(AuthContext)
	// const [notificationListUrl1, setNotificationUrl] = useState(null)
	// const [notificationListKey1, setNotificationKey] = useState(null)
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
		const auth = authData.role
		console.log({dept}, {notifications}, {auth})
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
	const assignNotificationsList1 = (url, key, type=null) => {
		console.log(
			'\nturning on notificationListUrl1 and notificationListKey1:',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
			'\n77777777777777777777777777777777777',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationListUrl1.current,
			notificationListKey1.current,
			type1.current,
		)
		notificationListUrl1.current = url
        notificationListKey1.current = key
		type1.current = type
		console.log(
			notificationListUrl1.current,
			notificationListKey1.current,
			type1.current
		)
	};
	const assignNotificationsList2 = (url, key, type=null) => {
		console.log(
			'\nturning on notificationListUrl2 and notificationListKey2:',
			'\n99999999999999999999999999999999999',
			'\n99999999999999999999999999999999999',
			'\n99999999999999999999999999999999999',
			'\n99999999999999999999999999999999999',
			'\n99999999999999999999999999999999999',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationListUrl2.current,
			notificationListKey2.current,
			type2.current
		)
		notificationListUrl2.current = url
        notificationListKey2.current = key
		type2.current = type
		console.log(
			notificationListUrl2.current,
			notificationListKey2.current,
			type2.current
		)
	};
	const assignNotifications1 = (url, key, type=null) => {
		console.log(
			'\nturning on notificationUrl1 and notificationKey1:',
			'\n10101010101010101010101010101010101',
			'\n10101010101010101010101010101010101',
			'\n10101010101010101010101010101010101',
			'\n10101010101010101010101010101010101',
			'\n10101010101010101010101010101010101',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			ntype1.current
		)
		notificationUrl1.current = url
        notificationKey1.current = key
		ntype1.current = type
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			ntype1.current
		)
	};
	switch (getUpdates) {
        case 'fault created':
            // Custodian logged a fault
            if (dept === 'custodian') {
                // console.log({role}, {role},{role}, {role}, {role})
                // assignNotificationsList1('pending-faults', 'faultsKey');
				// ()
                assignNotifications1('pending-faults', 'faultsKey', true);
				assignNotificationsList1('unresolved-faults', 'allUnresolvedKey');
            } else if (dept === 'engineer') {
                // console.log({role}, {role},{role}, {role}, {role})
                // localStorage.setItem(role, notification)
                // assignNotificationsList1('engineer-pending-faults', 'faultsKey');
				assignNotifications1('engineer-pending-faults', 'faultsKey', true);
                assignNotificationsList1('engineer-pending-faults', 'faultpendingList', true);
				assignNotificationsList2('engineer-unresolved-faults', 'allUnresolvedKey');
            } else if (dept==='supervisor'||dept === 'help-desk') {
                // console.log({role}, {role},{role}, {role}, {role})
				assignNotifications1('regional-unconfirmed-faults', 'unconfirmedKey', true);
                assignNotificationsList1('regional-unconfirmed-faults', 'faultunconfirmedList', true);
                assignNotificationsList2('region-pending-faults', 'allUnresolvedKey');
            }
            break;
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: faultsKey, allUnresolvedKey
            // add to helpdesk: unconfirmedKey, allUnresolvedKey
            // add to supervisor: unconfirmedKey, allUnresolvedKey
            // if (role === 'custodian') {
            //     setNotificationUrl('pending-faults')
            //     setNotificationKey('faultsKey')
            // }
            // if (role === 'engineer') {
            //     setNotificationUrl('engineer-pending-faults')
            //     setNotificationKey('faultsKey')
            // }
            // if (role === 'help-desk') {
            //     setNotificationUrl('regional-unconfirmed-faults')
            //     setNotificationKey('unconfirmedKey')
            // }
            // if (role === 'supervisor') {
            //     setNotificationUrl('regional-unconfirmed-faults')
            //     setNotificationKey('unconfirmedKey')
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
	usePullNotification(
		(authData?notificationUrl1.current:null), (authData?authData.id:null),
		(authData?notificationKey1.current:null), forceUpdates, (authData?authData.role:null),
		ntype1.current
	)
	usePullCompleteList(
		(authData?`${notificationListUrl1.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey1.current:null), forceUpdates, (authData?authData.role:null),
		type1.current
	)
	usePullCompleteList(
		(authData?`${notificationListUrl2.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey2.current:null), forceUpdates, (authData?authData.role:null),
		type2.current
	)
	if (forceUpdates&&!getUpdates) {
		console.log(
			'\nturning off notificationListUrl and notificationListKey:',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
			'\n88888888888888888888888888888888888',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			ntype1.current,
			notificationListUrl1.current,
			notificationListKey1.current,
			type1.current,
			notificationListUrl2.current,
			notificationListKey2.current,
			type2.current,
		)
		setForceUpdates(false)
		notificationUrl1.current = null
		notificationKey1.current = null
		ntype1.current = null
		notificationListKey1.current = null
		notificationListUrl1.current = null
		type1.current = null
		notificationListKey2.current = null
		notificationListUrl2.current = null
		type2.current = null
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			ntype1.current,
			notificationListUrl1.current,
			notificationListKey1.current,
			type1.current,
			notificationListUrl2.current,
			notificationListKey2.current,
			type2.current
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
