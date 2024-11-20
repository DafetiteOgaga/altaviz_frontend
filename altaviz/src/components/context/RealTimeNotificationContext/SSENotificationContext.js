import React, { createContext, useContext } from 'react';
import useSSENotification from './SSENotification';

const SSENotificationContext = createContext();

export const SSENotificationProvider = ({ children }) => {
    const notifications = useSSENotification(); // Start the notification listener when the app loads
    return (
        <SSENotificationContext.Provider value={notifications}>
            {children}
        </SSENotificationContext.Provider>
    );
};
