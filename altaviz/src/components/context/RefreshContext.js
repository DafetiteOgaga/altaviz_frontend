import { createContext, useContext, useState, useEffect } from 'react';
import { FaSync, FaSpinner } from 'react-icons/fa';
// import { AuthContext } from './checkAuth/AuthContext';
import { RotContext } from './RotContext';
import { useNavigate, useLocation } from 'react-router-dom'

// Create a context
const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const { decrypt, RotCipher } = useContext(RotContext);
    // const [authData, setAuthData] = useState(null);
    const navigate = useNavigate();
    const currentPage = useLocation().pathname
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated on mount (e.g., check for token/session)
        console.log('Checking authentication on mount');
        const data = localStorage.getItem('authData');
            if (data) {
                console.log('data:', data)
                const decodedData = RotCipher(data, decrypt)
                console.log('decoded:', decodedData)
                const parsed = JSON.parse(decodedData)
                console.log('parsed:', parsed)
                // setAuthData(parsed);
                console.log('authData:', JSON.parse(decodedData))
            }
    }, [refreshing]);


    function handleRefresh(localKey) {
        if (!localKey) {
            setRefreshing(prev => {
                console.log('Setting refreshing from ', prev, ' to ', !prev);
                return true;
            });
        }
        // Check if localKey is an array and if it contains any item
        if (Array.isArray(localKey) && localKey.length > 0) {
            // Loop through each key in the array and remove it from localStorage
            for (let i = 0; i < localKey.length; i++) {
                localStorage.removeItem(localKey[i]);
                console.log(`Removed key: ${localKey[i]}`);
            }
            // If localKey is not an array i.e a string and it is not empty
        } else if (localKey && localKey.length > 0) {
            localStorage.removeItem(localKey);
            console.log(`Removed key: ${localKey}`);
        } else {
            console.log("No valid keys provided for refresh.".toUpperCase());
        }
        setRefreshing((prev) => {
            console.log('Setting refreshing from', prev, 'to', !prev);
            return true;
        });
    }
    function handleRefreshAll() {
        // navigate(`/${authData.role}`)
        let localList = [] // gather local keys
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) === 'authData') continue // exempt authentication date
            console.log('appending localkey:'.toUpperCase(), localStorage.key(i));
            localList.push(localStorage.key(i));
            // localStorage.removeItem(localStorage.key(i));
        }
        console.log(localList.map(key => `key: ${key}`))
        for (const key of localList) {
            localStorage.removeItem(key);  // Remove local keys and their values from localStorage
            console.log(`removed key: ${key}`);    // Log the key that was removed
        }
        // localStorage.removeItem(localStorage.key(i));
        setRefreshing((prev) => {
            console.log('Setting refreshing from', prev, 'to', !prev);
            return true;
        });
    }
    useEffect(() => {
        if (refreshing) {
            setRefreshing(false);
            navigate('/success', { state: {currentPage, time: 50}})
        }
        // navigate('/success', { state: {currentPage, time: 50}})
    }, [refreshing])
    console.log('last line: ');
    const refreshIcon = (
        <div>
            {refreshing ? (
                <FaSpinner style={refreshStyles.spinner} title="Refreshing..." />
            ) : (
                <FaSync onClick={() => handleRefreshAll()} style={refreshStyles.syncIcon} title="Refresh" />
            )}
        </div>
    );
    console.log('last line: ');
    return (
        <RefreshContext.Provider value={{ refreshIcon, handleRefresh, handleRefreshAll }}>
            {children}
        </RefreshContext.Provider>
    );
};
export const useRefreshContext = () => useContext(RefreshContext);

// For refresh
const baseIconStyle = {
    cursor: 'pointer',
    fontSize: '15px',
    paddingLeft: '0.8rem',
    // paddingTop: '1.1rem',
};
const refreshStyles = {
    spinner: {
        ...baseIconStyle, // Spread the base styles
        animation: 'spin 1s linear infinite',
    },
    syncIcon: {
        ...baseIconStyle, // Spread the base styles
    },
    // keyframes in a style tag
    keyframes: `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            20% { transform: rotate(60deg); }
            40% { transform: rotate(120deg); }
            50% { transform: rotate(180deg); }
            60% { transform: rotate(240deg); }
            80% { transform: rotate(300deg); }
            100% { transform: rotate(360deg); }
        }
    `,
};