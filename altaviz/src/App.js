// import logo from './logo.svg';
import { useContext, useEffect, useState, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import './App.css';
import './components/fonts.css';
// import Testfetchapi from './components/Testfetchapi';
import SideBar from './components/SideBar/sidebarComponent/SideBar';
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
import { useFirebase } from './components/context/RealTimeNotificationContext/FirebaseContextNotification';
import { useLocation } from 'react-router-dom';

function App() {
	// const [makeRefresh, setMakeRefresh] = useState(false)
	const keyList = useRef([])
	const firebaseNotificationKey = useRef(null)
	const nTotalNotifications = useRef(0)
	const NotificationString = useRef(null)
	const nCounter = useRef([])
	// const wsKey = useRef(null)
	const notificationListUrl1 = useRef(null)
	const notificationListKey1 = useRef(null)
	// const regionList1 = useRef(null)
	// const type1 = useRef(null)
	const notificationListUrl2 = useRef(null)
	const notificationListKey2 = useRef(null)
	// const regionList2 = useRef(null)
	// const type2 = useRef(null)
	const notificationListUrl3 = useRef(null)
	const notificationListKey3 = useRef(null)
	// const regionList2 = useRef(null)
	// const type3 = useRef(null)
	const notificationListUrl4 = useRef(null)
	const notificationListKey4 = useRef(null)
	// const regionList2 = useRef(null)
	// const type4 = useRef(null)
	const notificationUrl1 = useRef(null)
	const notificationKey1 = useRef(null)
	// const nregion1 = useRef(null)
	// const ntype1 = useRef(null)
	const notificationUrl2 = useRef(null)
	const notificationKey2 = useRef(null)
	// const nregion2 = useRef(null)
	// const ntype2 = useRef(null)
	const notificationUrl3 = useRef(null)
	const notificationKey3 = useRef(null)
	// const nregion2 = useRef(null)
	// const ntype2 = useRef(null)
	// const notificationUrl2 = useRef(null)
	// const notificationtKey2 = useRef(null)
	// const ntype2 = useRef(null)
	const dept = useLocation().pathname.split('/')[1]
	const { authData } = useContext(AuthContext)
	// const [notificationListUrl1, setNotificationUrl] = useState(null)
	// const [notificationListKey1, setNotificationKey] = useState(null)
	const [forceUpdates, setForceUpdates] = useState(false)
	const { notifications } = useWebSocketNotificationContext()
	const { data:firebaseNotification } = useFirebase()
	console.log('firebaseNotification:', firebaseNotification)
	console.log('\nfirebaseNotificationKey.current:', firebaseNotificationKey.current)
	let firebaseKey = Object.keys?.(firebaseNotification||{})?.find?.(key => key)
	console.log(
		'\nfirebaseKey:', firebaseKey,
		'\nfirebaseNotificationKey.current:', firebaseNotificationKey.current,
		'\nfirebaseNotificationKey === firebaseKey:', firebaseNotificationKey.current === firebaseKey,
		'\nfirebaseNotificationKey === null:', firebaseKey === null,
		'\nfirebaseNotificationKey === undefined:', firebaseKey === undefined)
	// console.log('firebaseNotificationKey.current:', firebaseNotificationKey.current)
	// const noNewEntry = firebaseKey === firebaseNotificationKey.current && firebaseKey !== undefined
	// useEffect(() => {
	// 	console.log(
	// 		'\n2222222222222222222222222222',
	// 		'\n2222222222222222222222222222',
	// 		'\n2222222222222222222222222222',
	// 		'\n2222222222222222222222222222',
	// 		'\nfirebaseKey:', firebaseKey,
	// 		'\nfirebaseKey !== undefined:', firebaseKey !== undefined,
	// 		// '\nfirebaseKey !== firebaseNotificationKey.current:', firebaseKey !== firebaseNotificationKey.current,
	// 	)
	// 	// if (firebaseKey !== undefined && firebaseKey !== firebaseNotificationKey.current) {
	// 		console.log(
	// 			'\ngggggggggggggggggggggggggggg',
	// 			'\ngggggggggggggggggggggggggggg',
	// 			'\ngggggggggggggggggggggggggggg',
	// 			'\ngggggggggggggggggggggggggggg',
	// 			'\ngggggggggggggggggggggggggggg',
	// 			'\ngggggggggggggggggggggggggggg',
	// 		)
	// 		// console.log('firebaseNotificationKey.current:', firebaseNotificationKey.current)
	// 		// firebaseNotificationKey.current = firebaseKey
	// 		// console.log('firebaseNotificationKey.current:', firebaseNotificationKey.current)
	// 	}
	// }, [firebaseKey])
	// console.log('firebaseNotificationKey.current:', firebaseNotificationKey.current)
	let notificationText;
	// let timestamp;
	let dateAndTime;
	if (firebaseKey) {
		notificationText = firebaseNotification[firebaseKey].timestamp
		const timestamp = firebaseNotification[firebaseKey].timestamp
		// Trim microseconds (last 3 digits)
		const cleanTimestamp = timestamp.slice(0, 23) + "Z";
		// Convert to a JavaScript Date object
		dateAndTime = new Date(cleanTimestamp);
	}

	console.log(
		'\nfirebaseKey:', firebaseKey,
		'\nfirebaseNotificationKey.current:', firebaseNotificationKey.current,
		'\nvalues:', firebaseNotification?.[firebaseKey],
		'\nnotificationText:', notificationText,
		'\ndateAndTime:', dateAndTime,
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		// '\nnoNewEntry:', noNewEntry,
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
	)
	console.log(
		'\nnotifications:', notifications,
		'\nauthData.role:', authData?.role,
	)
	let wsKey;
	if (![undefined, firebaseNotificationKey.current].includes(firebaseKey) && authData) {
		console.log(
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
		)
		const auth = authData.role
		console.log({dept}, {notifications}, {auth}, {firebaseKey})
		if (notifications?.split('-')[0]!=='deliveries point') {
			wsKey = notifications?.split('-')[0]||'not setting anything to local storage'
			// localStorage.setItem(wsKey, notifications)
		}
		console.log({firebaseKey})
		firebaseNotificationKey.current = firebaseKey
		// firebaseKey = null
		console.log({firebaseKey})
	}
	console.log(
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
		'\n2222222222222222222222222222222222222222222222222222222',
	)
	const isRegion = (authData?.role==='human-resource'||authData?.role==='workshop'||(authData?.region?.name === notifications?.split('-')[1]))?authData?.region?.name:null
	console.log(
		'\nnotifications (apps.js):', notifications,
		'\nnotifications?.split("-")[1]:', notifications?.split('-')[1],
		'\nisRegion:', isRegion,
	)
	// setConsumedData(false)
	let getUpdates;
	if (localStorage.getItem(wsKey)) {getUpdates = localStorage.getItem(wsKey)}
	else {getUpdates = null}
	console.log(
		'\ngetUpdates:', getUpdates,
		'\ndept:', dept,
		'\nauthData.role:', authData?.role,
		'\nlocalStorage.getItem(wsKey):', localStorage.getItem(wsKey),
		'\nwsKey:', wsKey,
	)
	useEffect(() => {
		console.log(
			'\nwsKey:', wsKey,
			'\nkeyList.current.includes(wsKey):', keyList.current.includes(wsKey),
			'\nkeyList.current:', keyList.current,
		)
		if (wsKey && !keyList.current.includes(wsKey)) {
			keyList.current.push(wsKey)
			console.log("Updated keyList:", keyList.current);
		}
	}, [wsKey, notifications])
	console.log('\nkeyList.current:', keyList.current)
	useEffect(() => {
		if (getUpdates) {
			console.log('\nforceUdates:', forceUpdates)
			setForceUpdates(true)
		}
	}, [getUpdates])
	const assignNotificationsList1 = (url, key) => {
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
			// type1.current,
			// regionList1.current,
		)
		notificationListUrl1.current = url
        notificationListKey1.current = key
		// type1.current = type
		// regionList1.current = region
		console.log(
			notificationListUrl1.current,
			notificationListKey1.current,
			// type1.current,
			// regionList1.current,
		)
	};
	const assignNotificationsList2 = (url, key) => {
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
			// type2.current,
			// regionList2.current
		)
		notificationListUrl2.current = url
        notificationListKey2.current = key
		// type2.current = type
		// regionList2.current = region
		console.log(
			notificationListUrl2.current,
			notificationListKey2.current,
			// type2.current,
			// regionList2.current
		)
	};
	const assignNotificationsList3 = (url, key) => {
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
			notificationListUrl3.current,
			notificationListKey3.current,
			// type3.current,
			// regionList2.current
		)
		notificationListUrl3.current = url
        notificationListKey3.current = key
		// type3.current = type
		// regionList2.current = region
		console.log(
			notificationListUrl3.current,
			notificationListKey3.current,
			// type3.current,
			// regionList2.current
		)
	};
	const assignNotificationsList4 = (url, key) => {
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
			notificationListUrl4.current,
			notificationListKey4.current,
			// type4.current,
			// regionList2.current
		)
		notificationListUrl4.current = url
        notificationListKey4.current = key
		// type4.current = type
		// regionList2.current = region
		console.log(
			notificationListUrl4.current,
			notificationListKey4.current,
			// type4.current,
			// regionList2.current
		)
	};
	const assignNotifications1 = (url, key) => {
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
			// ntype1.current,
			// nregion1.current
		)
		notificationUrl1.current = url
        notificationKey1.current = key
		// ntype1.current = type
		// nregion1.current = region
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			// ntype1.current,
			// nregion1.current
		)
	};
	const assignNotifications2 = (url, key) => {
		console.log(
			'\nturning on notificationUrl1 and notificationKey1:',
			'\n12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl2.current,
			notificationKey2.current,
			// ntype2.current,
			// nregion2.current
		)
		notificationUrl2.current = url
        notificationKey2.current = key
		// ntype2.current = type
		// nregion2.current = region
		console.log(
			notificationUrl2.current,
			notificationKey2.current,
			// ntype2.current,
			// nregion2.current
		)
	};
	const assignNotifications3 = (url, key) => {
		console.log(
			'\nturning on notificationUrl1 and notificationKey1:',
			'\n12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
			'\nn12121212121212121212121212121212121',
		)
		console.log('authData:', !!authData)
		console.log(
			notificationUrl3.current,
			notificationKey3.current,
			// ntype2.current,
			// nregion2.current
		)
		notificationUrl3.current = url
        notificationKey3.current = key
		// ntype2.current = type
		// nregion2.current = region
		console.log(
			notificationUrl3.current,
			notificationKey3.current,
			// ntype2.current,
			// nregion2.current
		)
	};
	let region;
	let websocketAlert;
	if (notifications&&wsKey) {[websocketAlert, region] = getUpdates.split('-')}
	console.log(
		'\nwebsocketAlert:', websocketAlert,
		'\nauthData?.region?.name:', authData?.region?.name,
		'\nregion:', region,
	)
	// const isRegion = (authData?.region?.name === region)?authData?.region?.name:null
	switch (websocketAlert) {
        case 'fault created':
            // Custodian logged a fault
            if (dept === 'custodian') {
                assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				// nTotalNotifications.current = 3
            } else if (dept === 'engineer') {
				assignNotifications1('engineer-pending-faults', 'faultsKey');
                assignNotificationsList1('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList2('engineer-unresolved-faults', 'allUnresolvedKey');
				// nTotalNotifications.current = 3
            } else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
                assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				// nTotalNotifications.current = 3
            }
			nTotalNotifications.current = 3
			NotificationString.current = websocketAlert
            break;
        case 'confirm resolve':
            // custodian confirmed resolution
			if (dept === 'custodian') {
                assignNotifications1('pending-faults', 'faultsKey');
				assignNotifications2('unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('unresolved-faults', 'allUnresolvedKey');
            } else if (dept === 'engineer') {
				assignNotifications1('engineer-pending-faults', 'faultsKey');
				assignNotifications2('engineer-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList2('engineer-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('user-request', 'faultpendingList');
				assignNotificationsList3('regional-unconfirmed-faults', 'faultunconfirmedList');
			}
			nTotalNotifications.current = 5
			NotificationString.current = websocketAlert
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
			if (dept === 'human-resource') {
                assignNotifications1('approve-user-details-update', 'updateAccount');
				assignNotificationsList1('approve-user-details-update', 'updateList');
            }
			nTotalNotifications.current = 2
			NotificationString.current = websocketAlert
            break;
        case 'approve or reject fixed parts':
            // hr approved/rejected fixed parts
			if (dept === 'human-resource'||dept === 'workshop') {
                assignNotifications1('post-part', 'partKey');
				assignNotificationsList1('post-part', 'partPendingList');
				if (dept === 'human-resource') {
					assignNotificationsList2('all-request-only', 'allPendingRequests');
				} else if (dept === 'workshop') {
					assignNotificationsList2('workshop-request', 'allPendingRequests');
				}
			}
			nTotalNotifications.current = 3
			NotificationString.current = websocketAlert
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
			if (dept === 'human-resource'||dept === 'workshop') {
                assignNotifications1('post-part', 'partKey');
				assignNotificationsList1('post-part', 'partPendingList');
				if (dept === 'human-resource') {
					assignNotificationsList2('all-request-only', 'allPendingRequests');
				} else if (dept === 'workshop') {
					assignNotificationsList2('workshop-request', 'allPendingRequests');
				}
			}
			nTotalNotifications.current = 3
			NotificationString.current = websocketAlert
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
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 3
			} else if (dept === 'workshop') {
                assignNotifications1('request-component', 'componentKey');
				assignNotificationsList1('request-component', 'componentPendingList');
				assignNotificationsList2('workshop-request', 'allPendingRequests');
				nTotalNotifications.current = 3
            } else if (dept === 'engineer') {
				assignNotifications1('request-component', 'componentKey');
				assignNotifications2('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('request-component', 'componentPendingList');
				assignNotificationsList2('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('workshop-component-request', 'componentKey');
				assignNotifications2('all-request-faults', 'faultsKey');
				assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList2('all-pending-faults-wRequests', 'allUnresolvedKey');
				assignNotificationsList3('all-request-only', 'allPendingRequests');
				assignNotificationsList4('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 6
			}
			NotificationString.current = websocketAlert
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
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 3
			} else if (dept === 'engineer') {
				assignNotifications1('request-part', 'partKey');
				assignNotifications2('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('request-part', 'partPendingList');
				assignNotificationsList2('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('all-request-faults', 'faultsKey');
				// assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList1('all-pending-faults-wRequests', 'allUnresolvedKey');
				assignNotificationsList2('all-request-only', 'allPendingRequests');
				assignNotificationsList3('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 4
			}
			NotificationString.current = websocketAlert
            break;
        case 'verify resolve':
            // engineer verified resolution
            // add to custodian: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to engineer: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: faultsKey, allUnresolvedKey
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotifications2('unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept === 'engineer') {
				assignNotifications1('engineer-unconfirmed-faults', 'unconfirmedKey');
				assignNotifications2('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('engineer-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList2('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('all-request-faults', 'faultsKey');
				// assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList1('all-pending-faults-wRequests', 'allUnresolvedKey');
				// assignNotificationsList3('all-request-only', 'allPendingRequests');
				assignNotificationsList2('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 3
			}
			NotificationString.current = websocketAlert
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
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 3
			} else if (dept === 'engineer') {
				assignNotifications1('request-component', 'componentKey');
				assignNotifications2('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('request-component', 'componentPendingList');
				assignNotificationsList2('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('all-request-faults', 'faultsKey');
				// assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList1('all-pending-faults-wRequests', 'allUnresolvedKey');
				assignNotificationsList2('all-request-only', 'allPendingRequests');
				assignNotificationsList3('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 4
			}
			NotificationString.current = websocketAlert
            break;
        case 'approve/reject part request':
            // supervisor/hr approve/reject single part request
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: partKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: faultsKey, allUnresolvedKey, allPendingRequests
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 3
			} else if (dept === 'engineer') {
				assignNotifications1('request-part', 'partKey');
				assignNotifications2('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('request-part', 'partPendingList');
				assignNotificationsList2('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList3('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 5
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('all-request-faults', 'faultsKey');
				// assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList1('all-pending-faults-wRequests', 'allUnresolvedKey');
				assignNotificationsList2('all-request-only', 'allPendingRequests');
				assignNotificationsList3('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 4
			}
			NotificationString.current = websocketAlert
            break;
        case 'approve/reject components and/or parts request':
            // supervisor/hr approve/reject components and/or parts request
            // add to custodian: faultsKey, allUnresolvedKey
            // add to engineer: componentKey, partKey, faultsKey, allUnresolvedKey
            // add to helpdesk: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to supervisor: faultsKey, unconfirmedKey, allUnresolvedKey
            // add to human resource: componentKey, partKey, faultsKey, allUnresolvedKey, allPendingRequests
			if (dept === 'custodian') {
				assignNotifications1('pending-faults', 'faultsKey');
				assignNotificationsList1('pending-faults', 'faultpendingList');
				assignNotificationsList2('unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 3
			} else if (dept === 'engineer') {
				assignNotifications1('request-part', 'partKey');
				assignNotifications2('request-component', 'componentKey');
				assignNotifications3('engineer-pending-faults', 'faultsKey');
				assignNotificationsList1('request-part', 'partPendingList');
				assignNotificationsList2('request-component', 'componentPendingList');
				assignNotificationsList3('engineer-pending-faults', 'faultpendingList');
				assignNotificationsList4('engineer-unresolved-faults', 'allUnresolvedKey');
				nTotalNotifications.current = 7
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications1('user-request', 'faultsKey');
				assignNotifications2('regional-unconfirmed-faults', 'unconfirmedKey');
				assignNotificationsList1('region-pending-faults', 'allUnresolvedKey');
				assignNotificationsList2('regional-unconfirmed-faults', 'faultunconfirmedList');
				assignNotificationsList3('user-request', 'faultpendingList');
				nTotalNotifications.current = 5
			} else if (dept==='human-resource') {
				assignNotifications1('all-request-faults', 'faultsKey');
				// assignNotificationsList1('workshop-component-request', 'componentPendingList');
				assignNotificationsList1('all-pending-faults-wRequests', 'allUnresolvedKey');
				assignNotificationsList2('all-request-only', 'allPendingRequests');
				assignNotificationsList3('all-request-faults', 'faultpendingList');
				nTotalNotifications.current = 4
			}
			NotificationString.current = websocketAlert
            break;
        case 'assigned engineer to new location':
            // supervisor assigned engineer to new location
			assignNotifications1('new-location-assignment', 'engineerAssignments');
			nTotalNotifications.current = 1
            break;

        case 'deliveries point':
            // increments the delivery point for sucessful resolutions
            break;

        default:
            // Optional: handle any unexpected notification values
            break;
    }
	console.log({authData})
	const noti1 = usePullNotification(
		(authData?notificationUrl1.current:null), (authData?authData.id:null),
		(authData?notificationKey1.current:null), forceUpdates, (authData?authData.role:null),
		// ntype1.current,
		isRegion, websocketAlert
	)
	if (noti1.isListData.current&&!nCounter.current.some?.(check=>check==='one')&&nTotalNotifications.current) {nCounter.current.push('one')}
	console.log(
		'\nnoti1.isListData.current:', noti1.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti2 = usePullNotification(
		(authData?notificationUrl2.current:null), (authData?authData.id:null),
		(authData?notificationKey2.current:null), forceUpdates, (authData?authData.role:null),
		// ntype2.current,
		isRegion, websocketAlert
	)
	if (noti2.isListData.current&&!nCounter.current.some?.(check=>check==='two')&&nTotalNotifications.current) {nCounter.current.push('two')}
	console.log(
		'\nnoti2.isListData.current:', noti2.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti3 = usePullCompleteList(
		(authData?`${notificationListUrl1.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey1.current:null), forceUpdates, (authData?authData.role:null),
		// type1.current,
		isRegion, websocketAlert
	)
	if (noti3.isListData.current&&!nCounter.current.some?.(check=>check==='three')&&nTotalNotifications.current) {nCounter.current.push('three')}
	console.log(
		'\nnoti3.isListData.current:', noti3.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti4 = usePullCompleteList(
		(authData?`${notificationListUrl2.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey2.current:null), forceUpdates, (authData?authData.role:null),
		// type2.current,
		isRegion, websocketAlert
	)
	if (noti4.isListData.current&&!nCounter.current.some?.(check=>check==='four')&&nTotalNotifications.current) {nCounter.current.push('four')}
	console.log(
		'\nnoti4.isListData.current:', noti4.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti5 = usePullCompleteList(
		(authData?`${notificationListUrl3.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey3.current:null), forceUpdates, (authData?authData.role:null),
		// type3.current,
		isRegion, websocketAlert
	)
	if (noti5.isListData.current&&!nCounter.current.some?.(check=>check==='five')&&nTotalNotifications.current) {nCounter.current.push('five')}
	console.log(
		'\nnoti5.isListData.current:', noti5.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti6 = usePullCompleteList(
		(authData?`${notificationListUrl4.current}/list`:null), (authData?authData.id:null),
		(authData?notificationListKey4.current:null), forceUpdates, (authData?authData.role:null),
		// type4.current,
		isRegion, websocketAlert
	)
	if (noti6.isListData.current&&!nCounter.current.some?.(check=>check==='six')&&nTotalNotifications.current) {nCounter.current.push('six')}
	console.log(
		'\nnoti6.isListData.current:', noti6.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	const noti7 = usePullNotification(
		(authData?notificationUrl3.current:null), (authData?authData.id:null),
		(authData?notificationKey3.current:null), forceUpdates, (authData?authData.role:null),
		// ntype2.current,
		isRegion, websocketAlert
	)
	if (noti7.isListData.current&&!nCounter.current.some?.(check=>check==='seven')&&nTotalNotifications.current) {nCounter.current.push('seven')}
	console.log(
		'\nnoti7.isListData.current:', noti7.isListData.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
	)
	console.log(
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnCounter.current:', nCounter.current,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
		'\nnCounter.current.length === nTotalNotifications.current:', nCounter.current.length===nTotalNotifications.current&&nTotalNotifications.current!==0,
	)
	console.log(
		'\nforceUpdates:', forceUpdates,
		'\ngetUpdates:', getUpdates,
	)
	if (forceUpdates&&!getUpdates
		&&nCounter.current.length===nTotalNotifications.current
		&&nTotalNotifications.current!==0) {
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
			// ntype1.current,
			// nregion1.current,

			notificationUrl2.current,
			notificationKey2.current,
			// ntype2.current,
			// nregion2.current,

			notificationUrl3.current,
			notificationKey3.current,
			// ntype2.current,
			// nregion2.current,

			notificationListUrl1.current,
			notificationListKey1.current,
			// type1.current,
			// regionList1.current,

			notificationListUrl2.current,
			notificationListKey2.current,
			// type2.current,
			// regionList2.current,

			notificationListUrl3.current,
			notificationListKey3.current,
			// type3.current,
			// regionList2.current,

			notificationListUrl4.current,
			notificationListKey4.current,
			// type4.current,
			// regionList2.current,
		)
		setForceUpdates(false)
		if (nCounter.current.length===nTotalNotifications.current&&nTotalNotifications.current!==0) {
			console.log(
				'\nnCounter.current.length:', nCounter.current.length,
				'\nnCounter.current:', nCounter.current,
				'\nnTotalNotifications.current:', nTotalNotifications.current,
				'\nnCounter.current.length === nTotalNotifications.current:', nCounter.current.length===nTotalNotifications.current,
			)

			console.log({wsKey}, {websocketAlert})
			console.log(
				'\nNotificationString.current:', NotificationString.current
			)
			// for (let i = 0; i < keyList.current.length; i++) {
			// 	console.log('removing key:', keyList.current[i])
            //     localStorage.removeItem(keyList.current[i]);
			// }
			localStorage.removeItem(NotificationString.current)
			// console.log('keyList.current:', keyList.current)
			keyList.current = []
			keyList.current.pop(NotificationString.current)
			console.log('keyList.current:', keyList.current)

			console.log(
				'\nnoti.isListData',
				noti1.isListData.current,
				noti2.isListData.current,
                noti3.isListData.current,
                noti4.isListData.current,
                noti5.isListData.current,
                noti6.isListData.current,
				noti7.isListData.current,
			)
			noti1.isListData.current = false
			noti2.isListData.current = false
			noti3.isListData.current = false
			noti4.isListData.current = false
			noti5.isListData.current = false
			noti6.isListData.current = false
			noti7.isListData.current = false
			console.log(
				'\nnoti.isListData',
				noti1.isListData.current,
				noti2.isListData.current,
                noti3.isListData.current,
                noti4.isListData.current,
                noti5.isListData.current,
                noti6.isListData.current,
				noti7.isListData.current,
			)
			console.log('nTotalNotifications.current:', nTotalNotifications.current)
			nTotalNotifications.current = 0
			console.log('nTotalNotifications.current:', nTotalNotifications.current)
			console.log('nCounter.current:', nCounter.current)
			nCounter.current = []
			console.log('nCounter.current:', nCounter.current)
			console.log(
				'\n00000000000000000000000000000000',
				'\n00000000000000000000000000000000',
				'\n00000000000000000000000000000000',
				'\n00000000000000000000000000000000',
				'\n00000000000000000000000000000000',
			)
			console.log('setting refresh ...')
			
			// setMakeRefresh(!makeRefresh)
		}
		notificationUrl1.current = null
		notificationKey1.current = null
		// ntype1.current = null
		// nregion1.current = null

		notificationUrl2.current = null
		notificationKey2.current = null
		// ntype2.current = null
		// nregion2.current = null

		notificationUrl3.current = null
		notificationKey3.current = null
		// ntype2.current = null
		// nregion2.current = null

		notificationListKey1.current = null
		notificationListUrl1.current = null
		// type1.current = null
		// regionList1.current = null

		notificationListKey2.current = null
		notificationListUrl2.current = null
		// type2.current = null
		// regionList2.current = null

		notificationListKey3.current = null
		notificationListUrl3.current = null
		// type3.current = null
		// regionList2.current = null

		notificationListKey4.current = null
		notificationListUrl4.current = null
		// type4.current = null
		// regionList2.current = null
		console.log(
			notificationUrl1.current,
			notificationKey1.current,
			// ntype1.current,
			// nregion1.current,

			notificationUrl2.current,
			notificationKey2.current,
			// ntype2.current,
			// nregion2.current,

			notificationUrl3.current,
			notificationKey3.current,
			// ntype2.current,
			// nregion2.current,

			notificationListUrl1.current,
			notificationListKey1.current,
			// type1.current,
			// regionList1.current,

			notificationListUrl2.current,
			notificationListKey2.current,
			// type2.current,
			// regionList2.current,

			notificationListUrl3.current,
			notificationListKey3.current,
			// type3.current,
			// regionList2.current,

			notificationListUrl4.current,
			notificationListKey4.current,
			// type4.current,
			// regionList2.current,
		)
	}
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl
	)
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
