import { useState, useEffect } from 'react';
// import { SentenceCaseContext } from '../../context/SentenceCaseContext';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
function QueryFieldFromDB({ query, callbackOnDataChange, passwordReset=null }) {
	let queryData = query.split('-')
	let qtype = queryData[queryData.length - 2];
	let qtext = queryData[queryData.length - 1];
	let qstate;
	let qregion;
	let qbank;
	let qlocation;
	let qrole;
	console.log(
		'\nquery:', query,
		'\nqueryData:', queryData,
		'\nquery length:', queryData.length,
		// 'query length:', query.length
	)
	if (queryData.length > 2) {
		if (qtype === 'region') {
			[qrole, qtype, qtext] = queryData;
		} else if (qtype === 'newBank') {
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
		'\nqrole:', qrole,
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
	const [roleResponse, setRoleResponse] = useState(null);
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
				setRoleResponse(null);
				if (callbackOnDataChange) {
					console.log('fffffff'.repeat(40))
					callbackOnDataChange({ qtext: qtext, responseValue: -1, response: 'reset' })
				}
				return;
			}

		setLoading(true);
		setError(null); // Reset error state
		let url = `${apiBaseUrl}/${qtype}-check/?
		query=${encodeURIComponent(qtext.toLowerCase())}&
		qtype=${encodeURIComponent(qtype)}&
		qrole=${encodeURIComponent(qrole)}&
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
			} else if (qtype === 'region') {
				const role = await fetch(url);
				const roleData = await role.json();
				setRoleResponse(roleData.response);
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
	
		if (callbackOnDataChange) {
			callbackOnDataChange({ qtext: qtext, responseValue: -1, response: 'reset' })
			if (qtype === 'email') {
				console.log('yyyyyy'.repeat(50))
				callbackOnDataChange({ qtext, qtype, responseValue: emailResponse, response: !!emailResponse ? 'taken' : 'available' });
			}
			if (qtype === 'username') {
				console.log('yyyyyy'.repeat(50))
				callbackOnDataChange({ qtext, qtype, responseValue: usernameResponse, response: !!usernameResponse ? 'taken' : 'available' });
			}
			if (qtype === 'newBank') {
				console.log('yyyyyy'.repeat(50))
				callbackOnDataChange({ qtext, qtype, responseValue: newBankResponse, response: !!newBankResponse ? 'taken' : 'available' });
			}
			if (qtype === 'newLocation') {
				console.log('yyyyyy'.repeat(50))
				callbackOnDataChange({ qtext, qtype, responseValue: newLocationResponse, response: !!newLocationResponse ? 'taken' : 'available' });
			}
			if (qtype === 'newBranch') {
				console.log('yyyyyy'.repeat(50))
				callbackOnDataChange({ qtext, qtype, responseValue: newBranchResponse, response: !!newBranchResponse ? 'taken' : 'available' });
			}
			if (qtype === 'region') {
				console.log('yyyyyy'.repeat(50))
				if (qrole === 'engineer' || qrole === 'custodian') {
					callbackOnDataChange({ qtext, qtype, responseValue: roleResponse, response: !!roleResponse ? 'available' : 'taken' });
				} else if (qrole === 'help desk' || qrole === 'supervisor') {
					callbackOnDataChange({ qtext, qtype, responseValue: roleResponse, response: !!roleResponse ? 'taken' : 'available' });
				}
			}
		}
	const displayStylings = {
		fontSize: 'small',
		fontStyle: 'italic',
		margin: '0',
	}
	return (
		<div>
			{loading && <p style={{...displayStylings, color: '#777'}}>checking ...</p>}
			{error && <p style={{...displayStylings, color: 'red'}}>{error}</p>}

			{emailResponse !== null && !loading && (
				!passwordReset ?
				<p style={{...displayStylings, color: (!!emailResponse ? 'red' : 'green')}}>{qtext} is {!!emailResponse ? 'Already taken' : 'Available'}</p> :
				<p style={{...displayStylings, color: (!!emailResponse ? 'green' : 'red')}}>{qtext} {!!emailResponse ? 'exists' : 'does not exist'} (For demonstration only)</p>
			)}
			{usernameResponse !== null && !loading && (
				<p style={{...displayStylings, color: (!!usernameResponse ? 'red' : 'green')}}>{qtext} is {!!usernameResponse ? 'Already taken' : 'Available'}</p>
			)}
			{newBankResponse !== null && !loading && (
				<p style={{...displayStylings, color: (!!newBankResponse ? 'red' : 'green')}}>{qtext} is {!!newBankResponse ? 'Already taken' : 'Available'}</p>
			)}
			{newLocationResponse !== null && !loading && (
				<p style={{...displayStylings, color: (!!newLocationResponse ? 'red' : 'green')}}>{qtext} is {!!newLocationResponse ? 'Already taken' : 'Available'}</p>
			)}
			{newBranchResponse !== null && !loading && (
				<p style={{...displayStylings, color: (!!newBranchResponse ? 'red' : 'green')}}>{qtext} is {!!newBranchResponse ? 'Already taken' : 'Available'}</p>
			)}
			{console.log(
				'\nqrole:', qrole,
				'\nroleResponse:', roleResponse
				)}
			{roleResponse !== null && !loading && (
				(qrole==='help desk'||qrole==='supervisor') ?
				(<p style={{...displayStylings, color: (!!roleResponse ? 'red' : 'green')}}>{qtext} region is {!!roleResponse ? 'already' : 'yet to be'} assigned {(qrole==='help desk') ? 'an' : 'a'} {qrole}</p>):
				((qrole==='engineer'||qrole==='custodian') &&
				<p style={{...displayStylings, color: (!!roleResponse ? 'red' : 'green')}}>{!!roleResponse?`${qtext} is yet to be designated to ${roleResponse===3?'a supervisor and help desk':roleResponse===2?'a supervisor':roleResponse===1?'an help desk':null}`:'All good here'}</p>)
			)}
		</div>
	);
}

export default QueryFieldFromDB;
