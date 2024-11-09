import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../checkAuth/AuthContext";
import LogoutButton from "./LogoutButton";

function AuthenticationForm() {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);
	const { authData, loading } = useContext(AuthContext);
	const [run, setRun] = useState(false);
	console.log('authData (authform):', authData)
	// if (backendData) console.log('backendData (authform):', backendData);
	return (
		<>
            {loading && <h1>Loading...</h1>}
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