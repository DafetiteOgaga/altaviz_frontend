import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
	console.log('querying AuthContext');
    const { isAuthenticated, loading } = useContext(AuthContext);
	// Show a loading spinner or nothing while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }
	console.log('is authenticated from private route:', isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// // PrivateRoute.js
// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const { isAuthenticated } = useContext(AuthContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate to="/login" replace />
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;
