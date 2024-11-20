import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../checkAuth/AuthContext';
import usePullNotification from '../../paginationComp/usePullNotification';
import usePullCompleteList from '../../paginationComp/usePullCompleteList';
// import { FetchContext } from '../FetchContext';

// const baseUrl = 'http://127.0.0.1:8001';
const useUpdateClients = (notification) => {
    // const { useGetDataAPI } = useContext(FetchContext);
    const [serverUrl, setServerUrl] = useState(null)
    const [localKey, setLocalKey] = useState(null)
    // const [liskKey, setLiskKey] = useState(null)
    const { isAuthenticated, authData } = useContext(AuthContext)
    let role;
    let id;
    if (isAuthenticated) {
        role = authData.role
        id = authData.id;
    }
    
    const assignNotifications = (url, key) => {
        setServerUrl(url);
        setLocalKey(key);
    };
    // const setNotification =
    // usePullNotification(
    //     notificationUrl, notificationKey, !!notificationUrl
    // )
    // usePullCompleteList(
    //     `${notificationUrl}/list`, authData.id, notificationKey, !!notificationUrl
    // )
    console.log('notification starting ####################')
    console.log({role}, )
    // this function appends data to the localstorage
    switch (notification) {
        case 'fault created':
            // Custodian logged a fault
            if (role === 'custodian') {
                console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('pending-faults', 'faultsKey');
                // assignNotifications('unresolved-faults', 'allUnresolvedKey');
            } else if (role === 'engineer') {
                console.log({role}, {role},{role}, {role}, {role})
                // localStorage.setItem(role, notification)
                assignNotifications('engineer-pending-faults', 'faultsKey');
                // assignNotifications('engineer-unresolved-faults', 'allUnresolvedKey');
            } else if (role === 'help-desk') {
                console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('regional-unconfirmed-faults', 'unconfirmedKey');
                // assignNotifications('region-pending-faults', 'allUnresolvedKey');
            } else if (role === 'supervisor') {
                console.log({role}, {role},{role}, {role}, {role})
                // assignNotifications('regional-unconfirmed-faults', 'unconfirmedKey');
                // assignNotifications('region-pending-faults', 'allUnresolvedKey');
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
    // const { getData:notificationData, getLoading:arrayLoading, getError:notificationError } = useGetDataAPI(
	// 	`${baseUrl}/${serverUrl}/notification/${id}/`, !!serverUrl
	// );
	// const { getData:totalNumData, getLoading:totaLoading, getError:totalNumError } = useGetDataAPI(
	// 	`${baseUrl}/${serverUrl}/${id}/total/`, !!serverUrl
	// );
    usePullNotification(serverUrl, id, localKey, !!serverUrl);
    // usePullCompleteList(`${serverUrl}/list`, id, localKey, !!serverUrl);
    // console.log({notificationData}, {totalNumData})
    // console.log({arrayLoading}, {totaLoading})
    // console.log({notificationError}, {totalNumError})
    console.log('notification ended ####################')
}
function useSSENotification() {
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // You would pass a dynamic message type to the URL (for example 'approved')
		console.log('start ##############')
        const url = 'http://127.0.0.1:8001/real-time/notifications/';  // Example, can be dynamic
        const eventSource = new EventSource(url, {
            withCredentials: true  // Add this
        });

        eventSource.onmessage = (event) => {
			console.log('hot response:', event.data)
            setNotification(event.data);
            // useUpdateClients(event.data);
        };

        eventSource.onerror = () => {
            console.error("SSE connection error");
            // eventSource.close();  // Optional: Close on error
        };

		eventSource.onopen = () => {
            console.log("Connection re-established");
		};
		console.log('end ##############')
        return () => {
            eventSource.close();  // Clean up connection on unmount
        };
    }, []);

	console.log({notification})
    console.log({notification})
    console.log({notification})
    console.log({notification})
    console.log({notification})

    useUpdateClients(notification);
    return notification;
}

export default useSSENotification;
