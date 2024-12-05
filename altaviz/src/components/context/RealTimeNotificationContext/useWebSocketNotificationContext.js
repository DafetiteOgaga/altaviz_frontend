import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create the context
const WebSocketNotificationContext = createContext();

// WebSocketNotificationProvider that provides the notifications globally
export const WebSocketNotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(null);
    const socket = useRef(null);
    // const [serial, setSerial] = useState(0)

    const reconnectWebSocket = () => {
        // let checkSerial = 0
        // Try to re-establish the WebSocket connection
        console.log('\nchecking for notifications')
        socket.current = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

        // Add event listener for when the WebSocket connection is established
        socket.current.onopen = () => {
            console.log('\nWebSocket connection established');
            console.log('\nWebSocket connected');
        };

        // Optionally, handle errors
        socket.current.onerror = (error) => {
            console.error('\nWebSocket error:', error);
        };

        socket.current.onmessage = (event) => {
            console.log('\nfetching notifications')
            const data = JSON.parse(event.data);
            // console.log('\ndata.message:', data.message)
            if (data.message==='WebSocket connected!') {console.log(data.message)}
            else {
                setNotifications(data.message);
                console.log('\nfetched notifications:', data.message)
            }
        };

        socket.current.onclose = () => {
            console.log('\nWebSocket connection closed. Attempting to reconnect...');
        };
    };

    useEffect(() => {
        // Initialize WebSocket connection
        reconnectWebSocket()

        // Cleanup the WebSocket connection on unmount
        return () => {
            if (socket.current) {
                socket.current.close();  // Close WebSocket when component unmounts
            }
        }
    }, []);
    return (
        <WebSocketNotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </WebSocketNotificationContext.Provider>
    );
};

// Custom hook to access the notifications context
export const useWebSocketNotificationContext = () => {
    return useContext(WebSocketNotificationContext);
};
