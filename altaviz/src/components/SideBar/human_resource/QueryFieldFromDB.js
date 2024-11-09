import { useState, useEffect, useContext } from 'react';
import { SentenceCaseContext } from '../../context/SentenceCaseContext';

function QueryFieldFromDB({ query, setIsExist }) {
	let queryData = query.split('-')
	let qtype = queryData[queryData.length - 2];
	let qtext = queryData[queryData.length - 1];
	let qstate;
	let qregion;
	let qbank;
	let qlocation;
	console.log(
		'\nquery:', query,
		'\nqueryData:', queryData,
		'\nquery length:', queryData.length,
		// 'query length:', query.length
	)
	if (queryData.length > 2) {
		if (qtype === 'newBank') {
			[qregion, qstate, qtype, qtext] = queryData;
		} else if (qtype === 'newLocation') {
			[qbank, qregion, qstate, qtype, qtext] = queryData;
		} else if (qtype === 'newBranch') {
			[qlocation, qbank, qregion, qstate, qtype, qtext] = queryData;
		}
	} else {
		[qtype, qtext] = queryData;
	}
	console.log(
		'\nqlocaton:', qlocation,
		'\nqbank:', qbank,
		'\nqregion:', qregion,
		'\nqstate:', qstate,
		'\nqtype:', qtype,
		'\nqtext:', qtext,
	)
	// const { toSentenceCase } = useContext(SentenceCaseContext);
	const [emailResponse, setEmailResponse] = useState(null);
	const [usernameResponse, setUsernameResponse] = useState(null);
	const [newBankResponse, setNewBankResponse] = useState(null);
	const [newLocationResponse, setNewLocationResponse] = useState(null);
	const [newBranchResponse, setNewBranchResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!query?.trim() || !qtext?.trim()) {
				console.log('pppppppppppppppppp'.toUpperCase())
				console.log('got whhite space'.toUpperCase())
				setEmailResponse(null);  // Reset if query or qtext is empty or whitespace
				setUsernameResponse(null);
				setNewBankResponse(null);
				setNewLocationResponse(null);
				setNewBranchResponse(null);
				setIsExist(true);
				return;
			}

		setLoading(true);
		setError(null); // Reset error state
		let url = `http://127.0.0.1:8000/${qtype}-check/?
		query=${encodeURIComponent(qtext.toLowerCase())}&
		qtype=${encodeURIComponent(qtype)}&
		qstate=${encodeURIComponent(qstate)}&
		qregion=${encodeURIComponent(qregion)}&
		qbank=${encodeURIComponent(qbank)}&
		qlocation=${encodeURIComponent(qlocation)}
		`
		console.log(
			'\nquery:', query,
			'\nencoded:', encodeURIComponent(query),
			'\nqtype:', qtype,
			'\nencoded:', encodeURIComponent(qtype),
			'\nqtext:', qtext.toLowerCase(),
			'\nencoded:', encodeURIComponent(qtext.toLowerCase()),
			'\nurl', url,
		)
		try {
			if (qtype === 'email') {
				const email = await fetch(url);
				const emailData = await email.json();
				setEmailResponse(emailData.response);
			} else if (qtype === 'username') {
				const username = await fetch(url);
				const usernameData = await username.json();
				setUsernameResponse(usernameData.response);
			} else if (qtype === 'newBank') {
				const newBank = await fetch(url);
				const newBankData = await newBank.json();
				setNewBankResponse(newBankData.response);
			} else if (qtype === 'newLocation') {
				const newLocation = await fetch(url);
				const newLocationData = await newLocation.json();
				setNewLocationResponse(newLocationData.response);
			} else if (qtype === 'newBranch') {
				const newBranch = await fetch(url);
				const newBranchData = await newBranch.json();
				setNewBranchResponse(newBranchData.response);
			}
		} catch (err) {
			console.error('Error fetching from the backend:', err);
			setError('Error fetching data');
		} finally {
			setLoading(false);
		}
		};

		// Call fetchData whenever the query changes
		fetchData();
	}, [query]);  // Query dependency to trigger effect on change

	if (qtype === 'email') setIsExist(!!emailResponse)
	if (qtype === 'username') setIsExist(!!usernameResponse)
	if (qtype === 'newBank') setIsExist(!!newBankResponse)
	if (qtype === 'newLocation') setIsExist(!!newLocationResponse)
	if (qtype === 'newBranch') setIsExist(!!newBranchResponse)
	const displayStylings = {
		fontSize: 'small',
		fontStyle: 'italic',
	}
	return (
		<div>
			{loading && <p style={{
				// padding: '1rem',
				color: '#888',
				// fontSize: '1.2rem',
				textAlign: 'center',
			}}>Loading...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{emailResponse !== null && !loading && (
				// <p>Response: {typeof response === 'boolean' ? (response ? 'True' : 'False') : response}</p>
				<span style={{...displayStylings, color: (!!emailResponse ? 'red' : 'green')}}>{qtext} is {!!emailResponse ? 'Already taken' : 'Available'}</span>
			)}
			{usernameResponse !== null && !loading && (
				// <p>Response: {typeof response === 'boolean' ? (response ? 'True' : 'False') : response}</p>
				<span style={{...displayStylings, color: (!!usernameResponse ? 'red' : 'green')}}>{qtext} is {!!usernameResponse ? 'Already taken' : 'Available'}</span>
			)}
			{newBankResponse !== null && !loading && (
				// <p>Response: {typeof response === 'boolean' ? (response ? 'True' : 'False') : response}</p>
				<span style={{...displayStylings, color: (!!newBankResponse ? 'red' : 'green')}}>{qtext} is {!!newBankResponse ? 'Already taken' : 'Available'}</span>
			)}
			{newLocationResponse !== null && !loading && (
				// <p>Response: {typeof response === 'boolean' ? (response ? 'True' : 'False') : response}</p>
				<span style={{...displayStylings, color: (!!newLocationResponse ? 'red' : 'green')}}>{qtext} is {!!newLocationResponse ? 'Already taken' : 'Available'}</span>
			)}
			{newBranchResponse !== null && !loading && (
				// <p>Response: {typeof response === 'boolean' ? (response ? 'True' : 'False') : response}</p>
				<span style={{...displayStylings, color: (!!newBranchResponse ? 'red' : 'green')}}>{qtext} is {!!newBranchResponse ? 'Already taken' : 'Available'}</span>
			)}
		</div>
	);
}

export default QueryFieldFromDB;