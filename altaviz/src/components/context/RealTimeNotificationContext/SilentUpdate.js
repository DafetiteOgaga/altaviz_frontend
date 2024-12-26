import { useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import usePullNotification from '../../paginationComp/usePullNotification';
import usePullCompleteList from '../../paginationComp/usePullCompleteList';
import { AuthContext } from '../checkAuth/AuthContext';


const assignNotifications = (notificationUrlRef, notificationKeyRef, url, key, logPrefix) => {
	console.log(
		`\nTurning on ${logPrefix}:`,
		`\n${logPrefix.repeat(5)}`
	);
	// console.log('authData:', !!authData);
	console.log(
		'\nkey:', key,
		'\nurl:', url
	);
	console.log(notificationUrlRef.current, notificationKeyRef.current);

	// Assign the values
	notificationUrlRef.current = url;
	notificationKeyRef.current = key;

	console.log(notificationUrlRef.current, notificationKeyRef.current);
};


function useSilentUpdate (firebaseNotification) {
	console.log({firebaseNotification})
	const firebaseNotificationKey = useRef(null)
	const nTotalNotifications = useRef(0)
	const NotificationString = useRef(null)
	const nCounter = useRef([])
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
	const forceUpdates = useRef(false)
	// const { notifications } = useWebSocketNotificationContext()
	
	// const { data:firebaseNotification } = useFirebase()
	console.log('firebaseNotification:', firebaseNotification)
	console.log('\nfirebaseNotificationKey.current:', firebaseNotificationKey.current)
	let firebaseKey = Object.keys?.(firebaseNotification||{})?.find?.(key => key)
	const oldFirebaseNotificationKey = firebaseNotificationKey.current === firebaseKey
	console.log(
		'\nfirebaseKey:', firebaseKey,
		'\nfirebaseNotificationKey.current:', firebaseNotificationKey.current,
		'\nfirebaseNotificationKey === firebaseKey:', oldFirebaseNotificationKey,
		'\nfirebaseNotificationKey === null:', firebaseKey === null,
		'\nfirebaseNotificationKey === undefined:', firebaseKey === undefined
	)
	if (oldFirebaseNotificationKey) {
		localStorage.removeItem('updating')
	}
	let notificationText;
	// change the name  websocketAlert to something with firebase
	// tag to indicate message and pass the message separately from the
	// region and other information separately
	let websocketAlert;
	let dateAndTime;
	if (firebaseKey) {
		notificationText = firebaseNotification[firebaseKey].message
		const timestamp = firebaseNotification[firebaseKey].timestamp
		// Trim microseconds (last 3 digits)
		const cleanTimestamp = timestamp?.slice(0, 23) + "Z";
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
		'\nnotificationText:', notificationText,
		'\nauthData.role:', authData?.role,
	)
	if (![undefined, firebaseNotificationKey.current].includes(firebaseKey) && authData) {
		console.log(
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
			'\n555555555555555555555555555555555555555555555555555555',
		)
		nCounter.current = []
		nTotalNotifications.current = 0
		const auth = authData.role
		console.log({dept}, {notificationText}, {auth}, {firebaseKey})
		websocketAlert = notificationText?.split('-')[0]
		if (websocketAlert!=='deliveries point') {
			// websocketAlert = notificationText?.split('-')[0]
			localStorage.setItem('updating', `${true} > ${websocketAlert}`)
			forceUpdates.current = true
		} else {websocketAlert = null}
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
	// passes for human resource and workshop but checks the notification region against authData.region
	const isRegion = (authData?.role==='human-resource'||authData?.role==='workshop'||(authData?.region?.name === notificationText?.split('-')[1]))?authData?.region?.name:null
	console.log(
		'\nnotificationText (apps.js):', notificationText,
		'\nnotificationText?.split("-")[1]:', notificationText?.split('-')[1],
		'\nisRegion:', isRegion,
	)
	console.log(
		// '\ngetUpdates:', getUpdates,
		'\ndept:', dept,
		'\nauthData.role:', authData?.role,
	)
	switch (websocketAlert) {
        case 'fault created':
            // Custodian logged a fault
            if (dept === 'custodian') {
                assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unresolved-faults', 'allUnresolvedKey', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
				// nTotalNotifications.current = 3
            } else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'engineer-pending-faults', 'faultsKey', 'notification1');
                assignNotifications(notificationListUrl1, notificationListKey1, 'engineer-pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
				// nTotalNotifications.current = 3
            } else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
                assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
				// nTotalNotifications.current = 3
            }
			// nTotalNotifications.current = 3
			// NotificationString.current = websocketAlert
            break;
        case 'confirm resolve':
            // custodian confirmed resolution
			if (dept === 'custodian') {
                assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'user-request', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
            } else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'engineer-pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'engineer-pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// nTotalNotifications.current = 5
			// NotificationString.current = websocketAlert
            break;
        case 'fault deleted':
			if (dept === 'custodian') {
                assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'user-request', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				// assignNotifications(notificationUrl1, notificationKey1, 'workshop-component-request', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'all-request-faults', 'faultsKey', 'notification2');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-only', 'allPendingRequests', 'notificationList3');
				assignNotifications(notificationListUrl4, notificationListKey4, 'all-request-faults', 'faultpendingList', 'notificationList4');
				nTotalNotifications.current = 6
				NotificationString.current = websocketAlert
            } else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'engineer-pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'engineer-pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
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
                assignNotifications(notificationUrl1, notificationKey1, 'approve-user-details-update', 'updateAccount', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'approve-user-details-update', 'updateList', 'notificationList1');
				nTotalNotifications.current = 2
				NotificationString.current = websocketAlert
            }
			// nTotalNotifications.current = 2
			// NotificationString.current = websocketAlert
            break;
        case 'approve or reject fixed parts':
            // hr approved/rejected fixed parts
			if (dept === 'human-resource'||dept === 'workshop') {
                assignNotifications(notificationUrl1, notificationKey1, 'post-part', 'partKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'post-part', 'partPendingList', 'notificationList1');
				if (dept === 'human-resource') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				} else if (dept === 'workshop') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'workshop-request', 'allPendingRequests', 'notificationList2');
				}
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
			}
			// nTotalNotifications.current = 3
			// NotificationString.current = websocketAlert
            break;

        // workshop
        case 'fixed part deleted':
            if (dept === 'human-resource'||dept === 'workshop') {
                assignNotifications(notificationUrl1, notificationKey1, 'post-part', 'partKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'post-part', 'partPendingList', 'notificationList1');
				if (dept === 'human-resource') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				} else if (dept === 'workshop') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'workshop-request', 'allPendingRequests', 'notificationList2');
				}
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
			}
            break;

        // hr/workshop
        case 'fixed part ready':
			if (dept === 'human-resource'||dept === 'workshop') {
                assignNotifications(notificationUrl1, notificationKey1, 'post-part', 'partKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'post-part', 'partPendingList', 'notificationList1');
				if (dept === 'human-resource') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				} else if (dept === 'workshop') {
					assignNotifications(notificationListUrl2, notificationListKey2, 'workshop-request', 'allPendingRequests', 'notificationList2');
				}
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
			}
			// nTotalNotifications.current = 3
			// NotificationString.current = websocketAlert
            break;

        // workshop/engineer/supervisor
        case 'make component request':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'workshop-component-request', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'all-request-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-only', 'allPendingRequests', 'notificationList3');
				assignNotifications(notificationListUrl4, notificationListKey4, 'all-request-faults', 'faultpendingList', 'notificationList4');
				nTotalNotifications.current = 6
				NotificationString.current = websocketAlert
			} else if (dept === 'workshop') {
                assignNotifications(notificationUrl1, notificationKey1, 'request-component', 'componentKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-component', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'workshop-request', 'allPendingRequests', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
            } else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-component', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-component', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;

        // engineer/supervisor
        case 'make part request':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-faults', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 4
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-part', 'partKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-part', 'partPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;
        case 'verify resolve':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				// assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-only', 'allPendingRequests', 'notificationList3');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-faults', 'faultpendingList', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'engineer-unconfirmed-faults', 'unconfirmedKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'engineer-unconfirmed-faults', 'faultunconfirmedList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;
        case 'component request deleted':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'workshop-component-request', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'all-request-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-only', 'allPendingRequests', 'notificationList3');
				assignNotifications(notificationListUrl4, notificationListKey4, 'all-request-faults', 'faultpendingList', 'notificationList4');
				nTotalNotifications.current = 6
				NotificationString.current = websocketAlert
			} else if (dept === 'workshop') {
                assignNotifications(notificationUrl1, notificationKey1, 'request-component', 'componentKey', 'notification1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-component', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'workshop-request', 'allPendingRequests', 'notificationList2');
				nTotalNotifications.current = 3
				NotificationString.current = websocketAlert
            } else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-component', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-component', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
            break;
        case 'part request deleted':
            if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-faults', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 4
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-part', 'partKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-part', 'partPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
            break;

        // supervisor/hr
        case 'approve/reject component request':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-faults', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 4
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-component', 'componentKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-component', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;
        case 'approve/reject part request':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-faults', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 4
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-part', 'partKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'engineer-pending-faults', 'faultsKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-part', 'partPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'engineer-pending-faults', 'faultpendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;
        case 'approve/reject components and/or parts request':
			if (dept === 'custodian') {
				assignNotifications(notificationUrl1, notificationKey1, 'pending-faults', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'pending-faults', 'faultpendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'unresolved-faults', 'allUnresolvedKey', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='supervisor'||dept === 'help-desk') {
				assignNotifications(notificationUrl1, notificationKey1, 'user-request', 'faultsKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'regional-unconfirmed-faults', 'unconfirmedKey', 'notification2');
				assignNotifications(notificationListUrl1, notificationListKey1, 'region-pending-faults', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'regional-unconfirmed-faults', 'faultunconfirmedList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'user-request', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 5
				NotificationString.current = websocketAlert
			} else if (dept==='human-resource') {
				assignNotifications(notificationUrl1, notificationKey1, 'all-request-faults', 'faultsKey', 'notification1');
				// assignNotifications(notificationListUrl1, notificationListKey1, 'workshop-component-request', 'componentPendingList', 'notificationList1');
				assignNotifications(notificationListUrl1, notificationListKey1, 'all-pending-faults-wRequests', 'allUnresolvedKey', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'all-request-only', 'allPendingRequests', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'all-request-faults', 'faultpendingList', 'notificationList3');
				nTotalNotifications.current = 4
				NotificationString.current = websocketAlert
			} else if (dept === 'engineer') {
				assignNotifications(notificationUrl1, notificationKey1, 'request-part', 'partKey', 'notification1');
				assignNotifications(notificationUrl2, notificationKey2, 'request-component', 'componentKey', 'notification2');
				assignNotifications(notificationUrl3, notificationKey3, 'engineer-pending-faults', 'faultsKey', 'notification3');
				assignNotifications(notificationListUrl1, notificationListKey1, 'request-part', 'partPendingList', 'notificationList1');
				assignNotifications(notificationListUrl2, notificationListKey2, 'request-component', 'componentPendingList', 'notificationList2');
				assignNotifications(notificationListUrl3, notificationListKey3, 'engineer-pending-faults', 'faultpendingList', 'notificationList3');
				assignNotifications(notificationListUrl4, notificationListKey4, 'engineer-unresolved-faults', 'allUnresolvedKey', 'notificationList4');
				nTotalNotifications.current = 7
				NotificationString.current = websocketAlert
			}
			// NotificationString.current = websocketAlert
            break;
        case 'assigned engineer to new location':
			if (dept==='supervisor') {
				assignNotifications(notificationUrl1, notificationKey1, 'new-location-assignment', 'engineerAssignments', 'notification1');
				nTotalNotifications.current = 1
			}
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
		(authData?notificationKey1.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// ntype1.current,
		isRegion
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
		(authData?notificationKey2.current:null), forceUpdates.current,
		(authData?authData.role:null),
		isRegion
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
		(authData?notificationListKey1.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// type1.current,
		isRegion
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
		(authData?notificationListKey2.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// type2.current,
		isRegion
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
		(authData?notificationListKey3.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// type3.current,
		isRegion
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
		(authData?notificationListKey4.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// type4.current,
		isRegion
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
		(authData?notificationKey3.current:null), forceUpdates.current,
		(authData?authData.role:null),
		// ntype2.current,
		isRegion
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
	)
	console.log(
		'\ndata coll:', nCounter.current,
		'\nnCounter.current.length:', nCounter.current.length,
		'\nnTotalNotifications.current:', nTotalNotifications.current,
		'\nnTotalNotifications.current===0:', nTotalNotifications.current===0,
		// '\nnTotalNotifications.current!==0:', nTotalNotifications.current!==0,
		'\nnTotalNotifications.current===nCounter.current.length:', nTotalNotifications.current===nCounter.current.length,
		'\nnTotalNotifications.current===nCounter.current.length&&nTotalNotifications.current===0:', nTotalNotifications.current===nCounter.current.length
	)
	const completeUpdate = nTotalNotifications.current===nCounter.current.length
	console.log(
		'\ncompleteUpdate:', completeUpdate,
	)
	console.log(
		'\nforceUpdates.current:', forceUpdates.current,
		// '\ngetUpdates:', getUpdates,
	)
	if (completeUpdate) {
		console.log(
			'\nturning off all notifications and notificationLists:',
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
		forceUpdates.current = false
		if (nCounter.current.length===nTotalNotifications.current&&nTotalNotifications.current!==0) {
			console.log(
				'\nnCounter.current.length:', nCounter.current.length,
				'\nnCounter.current:', nCounter.current,
				'\nnTotalNotifications.current:', nTotalNotifications.current,
				'\nnCounter.current.length === nTotalNotifications.current:', nCounter.current.length===nTotalNotifications.current,
			)

			console.log({websocketAlert})
			console.log('\nNotificationString.current:', NotificationString.current)
			
			localStorage.removeItem(NotificationString.current)
			// console.log('keyList.current:', keyList.current)
			// keyList.current = []
			// keyList.current.pop(NotificationString.current)
			// console.log('keyList.current:', keyList.current)

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
			localStorage.removeItem('updating')
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
}
export default useSilentUpdate;