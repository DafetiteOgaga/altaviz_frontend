import { useContext, useRef } from "react";
import { AuthContext } from "../checkAuth/AuthContext";
import { useBackgroundUpdate } from "../BackgroundUpdates/BackgroundUpdate";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)
const UpdateInBackground = (firebaseNotification, setReload) => {
	// some dummy object
	// firebaseNotification = {
	// 	'OFoGWm-p_Hy1hMhu37H': {
	// 		message: "approve or reject fixed parts-hr",
	// 		timestamp: "2025-01-05T02:23:16.966871"
	// 	}
	// }
	console.log('firebaseNotification:', firebaseNotification)
	const firebaseNotificationKey = useRef(null)
	const { authData } = useContext(AuthContext)
	const updateInventory = useRef(false);
	const dept = authData?.role
	const regionName = authData?.region?.name
	console.log('\nfirebaseNotificationKey:', firebaseNotificationKey.current)

	// exract the key from the firebaseNotification object
	let firebaseKey = Object.keys?.(firebaseNotification||{})?.find?.(key => key)
	let notificationText;
	let websocketAlert;
	let dateAndTime;
	let endpoints = []

	// Check if the firebaseKey is the same as the old key
	const oldFirebaseNotificationKey = firebaseKey === firebaseNotificationKey.current
	console.log(
		'\nfirebaseKey:', firebaseKey,
		'\nfirebaseNotificationKey:', firebaseNotificationKey.current,
		'\nfirebaseKey === firebaseNotificationKey:', oldFirebaseNotificationKey,
		'\nfirebaseKey === null:', firebaseKey === null,
		'\nfirebaseKey === undefined:', firebaseKey === undefined
	)
	if (firebaseKey) {
		notificationText = firebaseNotification[firebaseKey].message
		const timestamp = firebaseNotification[firebaseKey].timestamp
		// Trim microseconds (last 3 digits)
		const cleanTimestamp = timestamp?.slice(0, 23) + "Z";
		// Convert to a JavaScript Date object
		dateAndTime = new Date(cleanTimestamp);
	}
	console.log(
		'\nvalues:', firebaseNotification?.firebaseKey,
		'\nnotificationText:', notificationText,
		'\ndateAndTime:', dateAndTime, '\n',
		'\nkkkkkkkkkkkkkkkkkkkkkkkkkkkk'.repeat(7)
	)
	console.log(
		'\nnotificationText:', notificationText,
		'\nauthData.role:', dept,
	)

	// if the firebaseKey is not the same as the old key and not
	// undefined and user is authenticated
	if (![undefined, firebaseNotificationKey.current].includes(firebaseKey)&&dept) {
		console.log('\n555555555555555555555555555555555555555555'.repeat(9))
		console.log({dept}, {notificationText}, {dept}, {firebaseKey})

		// assign the notificationText to the websocketAlert to be used
		// to assign the the proper array values for the user update
		websocketAlert = notificationText?.split('-')[0]

		// if the text is not deliveries point, continue execution
		if (websocketAlert!=='deliveries point') {
			const reg = notificationText?.split('-')[1]

			// sets updating to indicate and activate the updating style
			localStorage.setItem('updating', `${reg}/${regionName} > ${websocketAlert}`)
		} else {websocketAlert = null}
		console.log({firebaseKey})
		// firebaseNotificationKey.current = firebaseKey
		console.log({firebaseKey})
		updateInventory.current = true
	}
	console.log('\n22222222222222222222222222222222222222222'.repeat(5))

	// this isRegion value should be used to update based on region
	const isRegion = (dept==='human-resource'||dept==='workshop'||(regionName === notificationText?.split('-')[1]))?regionName:null
	console.log(
		'\nnotificationText:', notificationText,
		'\nnotificationText?.split("-")[1]:', notificationText?.split('-')[1],
		'\nisRegion:', isRegion,
	)
	console.log(
		// '\ngetUpdates:', getUpdates,
		'\ndept:', dept,
		'\nauthData.role:', dept,
		'\nwebsocketAlert:', websocketAlert,
	)
	
	const prefixes = {
		notificationPrefix: `notification/${authData?.id}/`,
		totalNotificationPrefix: `${authData?.id}/total/`,
		notificationListPrefix: `list/${authData?.id}/`,
	}
	// const notificationPrefix = `notification/${authData?.id}/`
	// const totalNotificationPrefix = `${authData?.id}/total/`
	// const notificationListPrefix = `list/${authData?.id}/`
	console.log('start'.repeat(20), 'endpoints:', endpoints)
	if (websocketAlert) {
		switch (websocketAlert) {
			// notificationUrl has /notification/id and /id/total
			// notificationListUrl has /list/id
			case 'fault created':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/engineer-pending-faults', prefixes
					)
					endpoints.push(
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'unconfirmedKey-/regional-unconfirmed-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'confirm resolve':
				// custodian confirmed resolution
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/engineer-pending-faults', prefixes,
						'unconfirmedKey-/engineer-unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/engineer-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'fault deleted':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/engineer-pending-faults', prefixes,
						'unconfirmedKey-/engineer-unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/engineer-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			// hr
			case 'added component name to inventory':
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// created a new inventory component name
				break;
			case 'updated component in inventory':
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// updated component in inventory
				break;
			case 'added part name to inventory':
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// created a new inventory part name
				break;
			case 'updated part in inventory':
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// updated part in inventory
				break;

			case 'account update request':
				// account update request
				if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'updateAccount-/approve-user-details-update', prefixes
					)
					endpoints.push(
						`updateList-/approve-user-details-update/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'approve or reject fixed parts':
				if (dept==='human-resource'||dept === 'workshop') {
					console.log('prefixes:', prefixes)
					endpoints = generateNotificationEndpoints(
						'partKey-/post-part', prefixes
					)
					endpoints.push(
						`partPendingList-/post-part/${prefixes.notificationListPrefix}`,
						`${(dept==='human-resource'?`allPendingRequests-/all-request-only/`:`allPendingRequests-/workshop-request/`)+(prefixes.notificationListPrefix)}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints3:'.repeat(5), endpoints)
				break;

			// workshop
			case 'fixed part deleted':
				if (dept==='human-resource'||dept === 'workshop') {
					endpoints = generateNotificationEndpoints(
						'partKey-/post-part', prefixes
					)
					endpoints.push(
						`partPendingList-/post-part/${prefixes.notificationListPrefix}`,
						`${(dept==='human-resource'?`allPendingRequests-/all-request-only/`:`allPendingRequests-/workshop-request/`)+(prefixes.notificationListPrefix)}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			// hr/workshop
			case 'fixed part ready':
				if (dept==='human-resource'||dept === 'workshop') {
					endpoints = generateNotificationEndpoints(
						'partKey-/post-part', prefixes
					)
					endpoints.push(
						`partPendingList-/post-part/${prefixes.notificationListPrefix}`,
						`${(dept==='human-resource'?`allPendingRequests-/all-request-only/`:`allPendingRequests-/workshop-request/`)+(prefixes.notificationListPrefix)}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			// workshop/engineer/supervisor
			case 'make component request':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/workshop-component-request', prefixes,
						'faultsKey-/all-request-faults'
					)
					endpoints.push(
						`componentPendingList-/workshop-component-request/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='workshop') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/request-component', prefixes,
					)
					endpoints.push(
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/workshop-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/request-component', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			// engineer/supervisor
			case 'make part request':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'partKey-/request-part', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`partPendingList-/request-part/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'verify resolve':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'unconfirmedKey-/engineer-unconfirmed-faults', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`faultunconfirmedList-/engineer-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'component request deleted':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/workshop-component-request', prefixes,
						'faultsKey-/all-request-faults'
					)
					endpoints.push(
						`componentPendingList-/workshop-component-request/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='workshop') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/request-component', prefixes
					)
					endpoints.push(
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/workshop-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/request-component', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'part request deleted':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'partKey-/request-part', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`partPendingList-/request-part/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			// supervisor/hr
			case 'approve/reject component request':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'unconfifaultsKey-/pending-faultsrmedKey', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'componentKey-/request-component', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'approve/reject part request':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'partKey-/request-part', prefixes,
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`partPendingList-/request-part/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'approve/reject components and/or parts request':
				if (dept==='custodian') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/pending-faults', prefixes,
						'unconfirmedKey-/unconfirmed-faults'
					)
					endpoints.push(
						`faultpendingList-/pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='supervisor'||dept === 'help-desk') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/user-request', prefixes,
						'unconfirmedKey-/regional-unconfirmed-faults'
					)
					endpoints.push(
						`allUnresolvedKey-/region-pending-faults/${prefixes.notificationListPrefix}`,
						`faultunconfirmedList-/regional-unconfirmed-faults/${prefixes.notificationListPrefix}`,
						`faultpendingList-/user-request/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='human-resource') {
					endpoints = generateNotificationEndpoints(
						'faultsKey-/all-request-faults', prefixes
					)
					endpoints.push(
						`allUnresolvedKey-/all-pending-faults-wRequests/${prefixes.notificationListPrefix}`,
						`allPendingRequests-/all-request-only/${prefixes.notificationListPrefix}`,
						`faultpendingList-/all-request-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				} else if (dept==='engineer') {
					endpoints = generateNotificationEndpoints(
						'partKey-/request-part', prefixes,
						'componentKey-/request-component',
						'faultsKey-/engineer-pending-faults'
					)
					endpoints.push(
						`partPendingList-/request-part/${prefixes.notificationListPrefix}`,
						`componentPendingList-/request-component/${prefixes.notificationListPrefix}`,
						`faultpendingList-/engineer-pending-faults/${prefixes.notificationListPrefix}`,
						`allUnresolvedKey-/engineer-unresolved-faults/${prefixes.notificationListPrefix}`,
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;
			case 'assigned engineer to new location':
				if (dept==='supervisor') {
					endpoints = generateNotificationEndpoints(
						'engineerAssignments-/new-location-assignment', prefixes
					)
					// NotificationString.current = websocketAlert
				}
				console.log('endpoiints:'.repeat(5), endpoints)
				break;

			case 'deliveries point':
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// increments the delivery point for sucessful resolutions
				break;

			default:
				// endpoints.push(
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 		`inventoryComponents-/components/`,
				// 	]
				// Optional: handle any unexpected notification values
				break;
		}
	}
	if (updateInventory.current&&endpoints.length) {
		AwaitUpdate(endpoints, updateInventory, firebaseNotificationKey, firebaseKey, setReload)
	}
	console.log('updateInventory:', updateInventory.current)
}
export default UpdateInBackground;

const AwaitUpdate = async (endpoints, updateInventory, firebaseNotificationKey, firebaseKey, setReload) => {
	console.log('finish;'.repeat(10), 'endpoints:', endpoints, {updateInventory})
	let processedPaths = endpoints?.map?.(path => {
		const [key, url] = path.split('-/');
		const returnUrl = `${key}-/${apiBaseUrl}/${url}`
		console.log('returnUrl:', returnUrl)
		return returnUrl
	})
	console.log('processed paths:'.repeat(5), processedPaths)
	useBackgroundUpdate(processedPaths, ((updateInventory.current&&processedPaths.length)?updateInventory.current:false)).then((responses) => {
		console.log('Fetched data:'.repeat(15), responses);
		console.log(
			'\nresponses?.length:', responses?.length,
			'\nendpoints?.length:', endpoints?.length,
		)
		if (responses?.length===endpoints?.length&&endpoints!==0) {
			console.log('updateInventory:', updateInventory.current)
			firebaseNotificationKey.current = firebaseKey
			updateInventory.current = false
			localStorage.removeItem('updating')
			console.log('updateInventory:', updateInventory.current)
			setReload(prev=>!prev)
		}
	}).catch((error) => {
		console.error('Error during background update:', error);
	});
}

function generateNotificationEndpoints(notificationData1, prefixes, notificationData2 = null, notificationData3 = null) {
	console.log('prefixes:', prefixes)
    const {notificationPrefix, totalNotificationPrefix,
		// notificationListPrefix
	} = prefixes;
	let [totalNotification1, path] = notificationData1.split('-/')
	totalNotification1 = [`total${totalNotification1}`, path].join('-/')

    const endpoints = [
        `${notificationData1}/${notificationPrefix}`,
        `${totalNotification1}/${totalNotificationPrefix}`,
	];

    if (notificationData2) {
		let [totalNotification2, path] = notificationData2.split('-/')
		totalNotification2 = [`total${totalNotification2}`, path].join('-/')
        endpoints.push(
            `${notificationData2}/${notificationPrefix}`,
            `${totalNotification2}/${totalNotificationPrefix}`
        );
    }

	if (notificationData3) {
		let [totalNotification3, path] = notificationData3.split('-/')
		totalNotification3 = [`total${totalNotification3}`, path].join('-/')
        endpoints.push(
            `${notificationData3}/${notificationPrefix}`,
            `${totalNotification3}/${totalNotificationPrefix}`
        );
    }

    // endpoints.push(
    //     `faultpendingList-/${prefixes.notificationListPrefix}`,
    //     `faultunconfirmedList-/${prefixes.notificationListPrefix}`,
    //     `allUnresolvedKey-/unresolved-faults/${notificationListPrefix}`
    // );

    return endpoints;
}
