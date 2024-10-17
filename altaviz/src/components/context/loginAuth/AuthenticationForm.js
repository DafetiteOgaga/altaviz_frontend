import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../checkAuth/AuthContext";
import LogoutButton from "./LogoutButton";

function AuthenticationForm() {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);
	const { authData, loading } = useContext(AuthContext);
	const [run, setRun] = useState(false);
	// const [backendData, setBackendData] = useState(null);
	// const reRun = () => {
	// 	setRun(!run);
	// }
	 // Determine authentication based on authData
	// const isAuthenticatedUsingAuthData = authData !== null;
	// useEffect(() => {
	// 	const checkAuth = async () => {
	// 		try {
	// 			const response = await fetch('http://localhost:8000/check-auth/', {
	// 				method: 'GET',
	// 				credentials: 'include',
	// 			});
	// 			const data = await response.json()
	// 			if (response.ok) {
	// 				setIsAuthenticated(true);
	// 				setBackendData(data);
	// 			} else {
	// 				setIsAuthenticated(false);
	// 			}
	// 		} catch (e) {
	// 			console.error('Error checking authentication:', e.message);
	// 			setIsAuthenticated(false);
	// 		} finally {
	// 			setLoading(false);  // Set loading to false once the check is done
	// 		}
	// 	}
	// 	checkAuth()
	// }, [run])
	console.log('authData (authform):', authData)
	// if (backendData) console.log('backendData (authform):', backendData);
	return (
		<>
            {loading && <h1>Loading...</h1>}
            {/* {!loading && (
                isAuthenticated ? (
				<>
					<h1>Authenticated (from server)</h1>
					<h5>The data:</h5>
					<pre>{JSON.stringify(backendData, null, 2)}</pre>
					<button onClick={reRun}>Re-run check</button>
				</>
			) : <h1>Not Authenticated</h1>
            )}
			<hr/> */}
			
				<>
					<h1>Authenticated {authData ? 'True' : 'False'}</h1>
					<h5>The data:</h5>
					<pre>{JSON.stringify(authData, null, 2)}</pre>
					{/* <button onClick={reRun}>Re-run check</button> */}
				</>
				
			<LogoutButton />
        </>
	)
}
export default AuthenticationForm;