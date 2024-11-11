import { useEffect, useState } from 'react';

const updateEveryone = (notification) => {
    switch (notification) {
        // custodian
        case 'fault created':
            // Custodian logged a fault
            break;
        case 'confirm resolve':
            // custodian confirmed resolution
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
            break;

        // workshop/engineer/supervisor
        case 'make component request':
            // engineer/supervisor made component request
            break;

        // engineer/supervisor
        case 'make part request':
            // engineer/supervisor made part request
            break;
        case 'verify resolve':
            // engineer verified resolution
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
            break;
        case 'approve/reject part request':
            // supervisor/hr approve/reject single part request
            break;
        case 'approve/reject components and/or parts request':
            // supervisor/hr approve/reject components and/or parts request
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
}
function SSENotification() {
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // You would pass a dynamic message type to the URL (for example 'approved')
		console.log('start ##############')
        const url = 'http://127.0.0.1:8000/real-time/notifications/';  // Example, can be dynamic
        const eventSource = new EventSource(url, {
            withCredentials: true  // Add this
        });

        eventSource.onmessage = (event) => {
			console.log('hot response:', event.data)
            setNotification(event.data);
            updateEveryone(event.data);
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

    return (
        <div>
            <h2>Real-Time Notification:</h2>
            <p>{notification}</p>
        </div>
    );
}

export default SSENotification;
