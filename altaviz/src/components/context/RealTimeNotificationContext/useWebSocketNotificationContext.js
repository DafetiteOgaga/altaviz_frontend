import { createContext, useContext, useState, useEffect, useRef } from 'react';

// Create the context
const WebSocketNotificationContext = createContext();

// WebSocketNotificationProvider that provides the notifications globally
export const WebSocketNotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(null);
    const socket = useRef(null);
    const [serial, setSerial] = useState(0)

    const reconnectWebSocket = () => {
        let checkSerial = 0
        // Try to re-establish the WebSocket connection
        socket.current = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

        if (socket.current.readyState === 1) {
            console.log('WebSocket connection established')
        }
        socket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(
                '\ndata.message:', data.message,
                // '\nserial:', serial,
                // '\ncheckSerial:', checkSerial,
            );
            // if (serial === checkSerial) {
                setNotifications(data.message);
                // checkSerial = serial+1
                // setSerial(prev => prev+1)
            // } else {
                // setNotifications([]);
            // }
            // localStorage.setItem('engineer', data.message)
            // setConsumedData(true)
        };

        socket.current.onclose = () => {
            console.log('WebSocket connection closed. Attempting to reconnect...');
            // setTimeout(reconnectWebSocket, 1000);  // Retry connection after 1 second
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
