import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { RotContext } from '../RotContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { decrypt, RotCipher } = useContext(RotContext);
    // const redirectToPage = useNavigate()
    const [authData, setAuthData] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    // console.log('checkAuth (globally):', isAuthenticated)
    useEffect(() => {
        // Check if the user is authenticated on mount (e.g., check for token/session)
        console.log('Checking authentication on mount');
        const data = localStorage.getItem('authData');
            if (data) {
                console.log('data:', data)
                const decodedData = RotCipher(data, decrypt)
                console.log('decoded:', decodedData)
                setAuthData(JSON.parse(decodedData));
            }
            setLoading(false);
    }, []);
    // Determine authentication status directly from authData
    const isAuthenticated = !!authData;
    console.log('authenticated:', isAuthenticated);
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         try {
    //             console.log(`tring to redirect to: /${authData.department.name}`)
    //             redirectToPage(`/${authData.department.name}`)
    //         } catch {
    //             console.log('settled for: /home instead')
    //             redirectToPage('/')
    //         }
    //     }
    //     console.log('auth data KKKKKK:', authData)
    // }, [isAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, authData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
