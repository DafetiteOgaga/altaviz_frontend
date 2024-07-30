import React from 'react';
import useFetch from './hooks/useFetch';

function UserComponent() {
	const { data, loading, error } = useFetch('http://localhost:8000/user');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
		<h1>User Data</h1>
		{data['home']}
		</div>
	);
}

function SupervisorComponent() {
	const { data, loading, error } = useFetch('http://localhost:8000/supervisor');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
		<h1>Supervisor Data</h1>
		{data['home']}
		</div>
	);
}

function App() {
	return (
		<>
		<h1>Response from backend:</h1>
		<UserComponent />
		<SupervisorComponent />
		</>
	);
}

export default App;
