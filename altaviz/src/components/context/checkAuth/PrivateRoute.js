import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
	console.log('querying AuthContext');
    // const location = useLocation();
    const { isAuthenticated, loading } = useContext(AuthContext);
	// Show a loading spinner or nothing while checking authentication
    if (loading) {
        return (<h4 style={{
            padding: '1rem',
            color: '#B5B5BD',
            fontSize: '1.2rem',
            textAlign: 'center',
        }}>Loading ...</h4>)
    }
    // // If authenticated, but trying to access login page, redirect to /dashboard
    // if (isAuthenticated && location.pathname === '/login') {
    //     return <Navigate to="/dashboard" replace />;
    // }
	console.log('is authenticated from private route:', isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
