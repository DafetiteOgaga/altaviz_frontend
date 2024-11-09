import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
	console.log('querying AuthContext');
    // const location = useLocation();
    const { isAuthenticated, loading } = useContext(AuthContext);
	// Show a loading spinner or nothing while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }
    // // If authenticated, but trying to access login page, redirect to /dashboard
    // if (isAuthenticated && location.pathname === '/login') {
    //     return <Navigate to="/dashboard" replace />;
    // }
	console.log('is authenticated from private route:', isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
