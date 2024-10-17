import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log('checkAuth (globally):', isAuthenticated)
    useEffect(() => {
        // Check if the user is authenticated on mount (e.g., check for token/session)
        console.log('Checking authentication on mount');
        const data = localStorage.getItem('authData');
            if (data) {
            setAuthData(JSON.parse(data));
            }
            setLoading(false);
        // const checkAuth = async () => {
        //     try {
        //         const response = await fetch('http://localhost:8000/check-auth/', {
        //             method: 'GET',
        //             credentials: 'include',
        //         });
        //         if (response.ok) {
        //             setIsAuthenticated(true);
        //         } else {
        //             setIsAuthenticated(false);
        //         }
        //     } catch (e) {
        //         console.error('Error checking authentication:', e.message);
        //         setIsAuthenticated(false);
        //     } finally {
        //         setLoading(false);  // Set loading to false once the check is done
        //     }
        // }
        // checkAuth();
    }, []);
    // Determine authentication status directly from authData
    const isAuthenticated = !!authData;
    console.log('authenticated:', isAuthenticated);

    return (
        <AuthContext.Provider value={{ isAuthenticated, authData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
