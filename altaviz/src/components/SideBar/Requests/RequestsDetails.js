import { useContext, useEffect, useState, useRef } from "react";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
import "../sidebar_pages.css"
// import useForceDBPullWEncryption from "../../paginationComp/useForceDBPullWEncryption";
// import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";
import { FetchContext } from "../../context/FetchContext";
import FetchFromLocalStorageOrDB from "../../hooks/fetchFromLocalStorage";
import { TimeDifferenceContext } from "../../context/timeDifference/TimeDifferenceContext";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
// import { usey } from "../../context/RefreshContext";
// import { RxFontStyle } from "react-icons/rx";
// import { FetchContext } from "../../context/FetchContext";
// import Supervisor from '../supervisor/Supervisor';
import { RotContext } from "../../context/RotContext";

// function removeKeys(keys) {
// 	for (let i = 0; i < keys.length; i++) {
// 		localStorage.removeItem(keys[i]);
// 	}
// }

const getRequests = (localPendingFaults, id, requestType) => {
	console.log(
		'\nlocalPendingFaults list:', localPendingFaults,
		'\nfaultID:', id,
		'\nfaultIDs:', localPendingFaults.map(fault => fault.id),
	)
	localPendingFaults = localPendingFaults.filter(fault => fault.id === Number(id))[0]
	console.log('\nlocalPendingFaults current fault:', localPendingFaults)
	let allRequests
	if (localPendingFaults.requestStatus) {
		if (requestType==='part') allRequests = localPendingFaults.requestPart;
		if (requestType==='component') allRequests = localPendingFaults.requestComponent;
		console.log('allRequests (', requestType, '):', allRequests)
		// setTempIDs(allRequests.map(request => request.id))
	}
	return allRequests
}

function RequestsDetails() {
	const action = useRef(null)
	// const forcePull = useRef(false)
	// const oneRender = useRef(false)
	// const [tempIDs, setTempIDs] = useState(null)
	// const [newIDs, setNewIDs] = useState(null)
	const { decrypt, RotCipher , encrypt} = useContext(RotContext);
	// const [newData, setNewData] =useState(null)
	// const { useGetDataAPI } = useContext(FetchContext);
	// const [getTrigger, setGetTrigger] = useState(false);
	const navigate = useNavigate();
	// const { handleRefresh } = useRefreshContext();
	// const [itemID, setItemID] = useState(null)
	const location = useLocation().pathname.split('/');
	const requestType = location[2].split('-')[0]
	const dept = location[1]
	const [timeStyle, setTimeStyle] = useState({});
	const { authData } = useContext(AuthContext);
	const { TimeDifference } = useContext(TimeDifferenceContext);
	const { toSentenceCase } = useContext(SentenceCaseContext);
	const requestParamDetails = useParams()
	// delete setup
	// const [formData, setFormData] = useState(new FormData());
	const { useDeleteDataAPI, usePatchDataAPI } = useContext(FetchContext)
	const [formData, setFormData] = useState(new FormData());
	const [deleteTrigger, setDeleteTrigger] = useState(false);
	const [patchTrigger, setPatchTrigger] = useState(false);

	console.log('newDataAAAAAAAAA:', authData)
	console.log('auth data id: ', authData.id)
	console.log('auth data name: ', authData.first_name)
	console.log('auth dataXXXXXX:', authData)
	console.log(
		'\nrequestParamDetails:', requestParamDetails,
		'\nrequestParamDetailsID:', requestParamDetails.id,
		'\nrequestType:', requestType
	)

	// console.log(
	// 	'\nvariable:', `${requestType}Key`,
	// )

	// let allRequests;
	// allRequests = [...FetchFromLocalStorageOrDB(localVariable, itemUrl)]
	const requestSearch = localStorage.getItem('searchRequestData')
	let allRequests;
	let allRequestsKey = 'allUnresolvedKey';
	let localPendingFaults = localStorage.getItem(allRequestsKey);
	if (requestParamDetails.faultID) {
		// allRequestsKey = 'allUnresolvedKey'
		console.log('Fault ID: ', requestParamDetails.faultID)
		// let localPendingFaults = localStorage.getItem(allRequestsKey);
		if (localPendingFaults) {
			localPendingFaults = JSON.parse(RotCipher(localPendingFaults, decrypt))
			console.log(
				'allgood here'
			)
			// localPendingFaults = localPendingFaults.filter(fault => fault.id === Number(requestParamDetails.faultID))[0]
			// console.log('\nlocalPendingFaults current fault:', localPendingFaults)
			// if (localPendingFaults.requestStatus) {
			// 	if (requestType==='part') allRequests = localPendingFaults.requestPart;
			// 	if (requestType==='component') allRequests = localPendingFaults.requestComponent;
			// 	console.log('allRequests (', requestType, '):', allRequests)
			// 	// setTempIDs(allRequests.map(request => request.id))
			// }
			allRequests = getRequests(localPendingFaults,requestParamDetails.faultID, requestType)
		}
	} else if (requestSearch) {
		allRequests = localStorage.getItem('searchRequestData')
		allRequests = RotCipher(allRequests, decrypt)
		allRequests = JSON.parse(allRequests)
	} else {
		// console.log('localStorage response:', localStorage.getItem(`${requestType}PendingList`))
		if (localStorage.getItem(`${requestType}PendingList`)) {
			allRequestsKey = `${requestType}PendingList`
			// allRequests = FetchFromLocalStorageOrDB()
		} else {
			allRequestsKey = `${requestType}Key`
			// allRequests = FetchFromLocalStorageOrDB()
		}
		// if (localStorage.getItem('allPendingRequests')&&requestParamDetails.dept!=='human-resource'&&requestParamDetails.dept!=='workshop'&&requestType!=='partKey') {
		if (localStorage.getItem('allPendingRequests')&&requestType!=='partKey') {
			allRequestsKey = 'allPendingRequests'
			// allRequests = FetchFromLocalStorageOrDB()
		}
		console.log('allRequestsKey:', allRequestsKey)
		if (allRequestsKey) {allRequests = FetchFromLocalStorageOrDB(allRequestsKey)}
	}
	let comparisonID = Number(requestParamDetails.id)
	const tempKey = localStorage.getItem(`temp-${allRequestsKey}`)
	console.log(
		'\ntempKey:', !!tempKey,
		'\nallRequestsKey:', allRequestsKey
	)
	if (tempKey) {
		console.log('fetching from local storage with key:', !!tempKey)
		allRequests = RotCipher(tempKey, decrypt)
		allRequests = JSON.parse(allRequests)
		if (requestParamDetails.faultID) {
			allRequests = getRequests(localPendingFaults,requestParamDetails.faultID, requestType)
		}
	}

	console.log(
		// '\nConfirm Details typeof:', typeof(confirmResolutionsContext),
		'\nallRequests:', allRequests,
		'\ntroubleshoot: data[0]:', allRequests[0],
		'\ntroubleshoot: data[0].id:', allRequests[0].id,
		'\ntroubleshoot: requestParamDetails.id:', Number(requestParamDetails.id)
	);
	console.log(
		'\ndept:', dept,
		'\nlocation:', location,
		'\nrequestType:', requestType,
	)

	const itemExist = !allRequests?.find(request => request.id === comparisonID)
	useEffect(() => {
		if (itemExist) {
			console.log('request with ID:', comparisonID, 'not found.')
			console.log('redirecting to dashboard ...')
			navigate('/success', { state: {currentPage: `/${authData?.role}`, time: 50}})
		}
	}, [itemExist])
	let requestItem;
	// if (!allRequests.map(request => request.id).includes(comparisonID) && requestParamDetails.dept === 'engineer') {
	// 	comparisonID = allRequests.reduce((maxID, request) => {
	// 		return request.id > maxID ? request.id : maxID;
	// 	}, 0)
	// }
	
	// else if (requestParamDetails.dept==='workshop')
	requestItem = allRequests.filter(data => {
		console.log('requestID:', data.id, '-', data.type)
		// return data.id === comparisonID && data.type === (location[2].split('-')[1]==='fixed'?`fixed-${requestType}`:requestType)
		return data.id === comparisonID && data.type === (!data.fault?`fixed-${requestType}`:requestType)
	})[0]
	console.log('\nrequestItem:', requestItem,)
	if (requestSearch) {
		requestItem = allRequests.filter(request => (
			request.id === comparisonID &&
			request.id*request.name.id*request.quantityRequested === Number(requestParamDetails.computedID) &&
			request.name.name === requestParamDetails.itemName
		))[0]
	}
	console.log(
		'\nrequestParamDetails:', requestParamDetails,
		'\nrequestItem:', requestItem,
		'\nrequestParamDetails.id:', requestParamDetails.id,
		'\ncomparisonID:', comparisonID,
		'\nallRequests:', allRequests
	)
	const itemUrl = `request-${requestType}/${requestItem?.id}`
	console.log({itemUrl})
	console.log(
		'\nrequestItem:', requestItem,
		'\nconstructed url:', `${(requestType==='part'&&dept==='workshop')?('post-part/'+requestItem?.id):itemUrl}`
	)
	const { deleteData, deleteLoading, deleteError } = useDeleteDataAPI(
		`${(requestType==='part'&&dept==='workshop')?('post-part/'+requestItem?.id):itemUrl}/delete/`,
		deleteTrigger,
	);
	const { patchData, patchLoading, patchError } = usePatchDataAPI(
		`${requestParamDetails.faultID?`request-${requestType}`:'post-part'}/${authData?.id}/`,
		formData, patchTrigger,
	);
	console.log(
		'\ndelete info',
		'\n',{deleteData},
		'\n',{deleteLoading},
		'\n',{deleteError},
	)

	const handleClick = (e, {type=null}) => {
		e.preventDefault();
		console.log('handleClick() triggered');
		if (type) {
			console.log(
				'\npatch TRIGGERED',
				'\ntype:', type,
			)
			const newFormData = new FormData()
			newFormData.append(type, true)
			newFormData.append('faultID', requestParamDetails.id)
			newFormData.append('approved_by', authData.email)
			setFormData(newFormData)
			setPatchTrigger(true)
		} else {
			setDeleteTrigger(true);
			console.log('Delete TRIGGERED')
		}
    };


	useEffect(() => {
		if (deleteData||deleteError||patchData||patchError) {
			console.log('777777777777777777777777777777777777777777777')
			console.log('777777777777777777777777777777777777777777777')
			console.log('777777777777777777777777777777777777777777777')
			console.log('777777777777777777777777777777777777777777777')
			console.log('777777777777777777777777777777777777777777777')
			if (deleteData||deleteError) {
				setDeleteTrigger(() => {
					console.log('setting deleteTrigger from ', deleteTrigger, ' to ', !deleteTrigger)
					return false
				});
			}
			if (patchData||patchError) {
				setPatchTrigger(() => {
					console.log('setting patchTrigger from ', patchTrigger, ' to ', !patchTrigger)
					return false
				});
				if (patchData) {
					console.log(
						'\npatchData:', patchData,
						'\npatchData.msg:', patchData.msg,
						'\nrequestItem.id:', requestItem.id
					)
					const updatedRequestItem = allRequests.map(request => {
						if (request?.id === requestItem?.id) {
							console.log('Request:', request)
							console.log('patchData.msg:', patchData.msg)
							console.log('Request.approve (before):', request.approve)
							request[patchData.msg] = true
							console.log('Request.approve (after):', request.approve)
						}
						return request
					})
					console.log({updatedRequestItem})
					// let secondKey;
					let updaterequests = updatedRequestItem
					updaterequests = RotCipher(JSON.stringify(updaterequests), encrypt)
					const keyList = ['Key', 'PendingList']
					for (let i = 0; i < keyList.length; i++) {
						console.log(
							'\nupdating:', `${requestType}${keyList[i]}`
						)
						localStorage.setItem(`${requestType}${keyList[i]}`, updaterequests)
					}
					if (requestParamDetails.dept==='human-resource') {
						const getOldData = localStorage.getItem(allRequestsKey)
						localStorage.setItem(`temp-${allRequestsKey}`, getOldData)
						localStorage.setItem('temporaryIDValue', requestParamDetails.id)
					}
				}
			}
		}
		if (deleteLoading) {
			console.log('delete request is loading ...'.toUpperCase())
			console.log('555555555555555555555555555555555555555555555')
			console.log('555555555555555555555555555555555555555555555')
			console.log('555555555555555555555555555555555555555555555')
			console.log('555555555555555555555555555555555555555555555')
			console.log('555555555555555555555555555555555555555555555')
			// const removeList = [
			// 	'componentKey', 'totalcomponentKey',
			// 	'partKey', 'totalpartKey',
			// 	'partPendingList',	'componentPendingList',
			// 	'allPendingRequests'
			// ]
			let totalLocalvariable;
			if (requestParamDetails.dept === 'workshop') {
				if (requestType === 'part') totalLocalvariable = 'totalUnapproved';
				if (requestType === 'component') totalLocalvariable = 'totalPendingCompRequest';
			}
			if (requestParamDetails.dept === 'engineer') {
				if (requestType === 'part') totalLocalvariable = 'totalPendingPartRequest';
				if (requestType === 'component') totalLocalvariable = 'totalPendingCompRequest';
			}
			// removeKeys(removeList)
			console.log(
				'\ndeleted keys ...'.toUpperCase(),
				// '\n', {localVariable},
				'\n', {totalLocalvariable},
			)
			navigate(`/${authData.role}`)
		}
	}, [deleteTrigger, deleteData, deleteLoading, deleteError,
		patchData, patchLoading, patchError])

	// console.log('requestItem:', requestItem)
	console.log('Single request details:',requestItem)
	const { wholeDaysBetweenDates, wholeHoursBetweenDates, RDDaysBetweenDates, RDhoursBetweenDates } = TimeDifference({date1: requestItem?.requested_at});
	console.log('created_at #####:', requestItem?.requested_at);
	console.log('created_at typeof #####:', typeof(requestItem?.requested_at));
	console.log(
		'\ndays diff #####:', wholeDaysBetweenDates,
		'\nraw days diff #####:', RDDaysBetweenDates,
		'\nhours diff #####:', wholeHoursBetweenDates,
		'\nraw hours diff #####:', RDhoursBetweenDates
	);
	console.log('authData #####:', authData);
	const statusStyle = {
		pending: {
			padding: '0 0.4rem',
			borderRadius: '3px',
			// border: '1px dotted',
			color: 'grey',
		},
		approved: {
			color: 'green',
		},
		unconfirmed: {
			color: 'blue',
		},
		rejected: {
			color: 'red',
		}
	}
	useEffect(() => {
		if (RDDaysBetweenDates < 1) {
			setTimeStyle({
				fontStyle: 'italic',
				color: 'darkgray',
			});
		} else {
			setTimeStyle({
				fontStyle: 'italic',
				color: 'red',
				fontWeight: 'bold',
				});
			// setTimeStyle((prevColor) => ({...prevColor, color: 'blue' }));
		}
	}, [])
	const requestedAt = new Date(requestItem?.requested_at)
	console.log('requestItem:', requestItem)
	let canWithdrawRequest;
	// if (requestParamDetails.dept !== 'workshop') {
	if ((dept === 'workshop'||dept === 'human-resource') && requestType === 'part') {
		console.log('requestItem.user.email:', requestItem?.user.email.trim())
	}
	else {
		console.log('requestItem.user.first_name:', requestItem?.user?.first_name.trim())
		// console.log('requestItem.user.first_name:', requestItem?.user?.first_name)
	}
	console.log('authData.first_name():', authData?.first_name.trim())
	if (dept === 'workshop' && requestType === 'part') {
		canWithdrawRequest = requestItem?.user.email.trim() === authData?.email.trim()
    }
	// else if (dept === 'engineer' && requestParamDetails.faultID) {
	// 	canWithdrawRequest = requestItem.user === authData.id
	// }
	else {
		canWithdrawRequest = requestItem?.user?.first_name.trim() === authData?.first_name.trim()
		// canWithdrawRequest = requestItem.user.first_name === authData.first_name
	}
	let faultStatus;
	const pending = ((!requestItem?.fault?.confirm_resolve && !requestItem?.fault?.verify_resolve))?'pending':null
	const unconfirmed = (!requestItem?.fault?.confirm_resolve && requestItem?.fault?.verify_resolve)?'unconfirmed':null
	faultStatus = pending??unconfirmed

	console.log(
		'\ndleteTrigger:', deleteTrigger,
		'\ncanWithdrawRequest:', canWithdrawRequest,
		'\nrole:', authData.role,
	)
	console.log(
		'\n',{deleteData},
		'\n',{deleteLoading},
		'\n',{deleteError},
		'\n', {requestItem},
		// '\n', {tempIDs},
		// '\nupdatePendingFault.isDone:', updatePendingFault.isDone,
	)
	console.log(
		// '\n', {oneRender},
		// '\noneRender.current:', oneRender.current,
		// '\ntempIDs:', tempIDs,
	)
	// if (oneRender.current) {setTempIDs(allRequests.map(request => request.id))}
	// let allSet;
	// if (updatePendingFault.isDone) {
	// 	oneRender.current = false;
	// 	// localStorage.removeItem('forcePullRequests')
	// 	// allSet = true;
	// }
	// else if (!forcePull.current) {allSet = true}
	// console.log('\nall set:', allSet)
	const canAlsoApproveOrReject = ((requestItem?.fault?.supervised_by.region === authData.userRegion) && authData.role === 'supervisor') || authData.role === 'human-resource'
	console.log(
		'\ncanAlsoApproveOrReject:', canAlsoApproveOrReject,
	)
	useEffect(() => {
		return () => {
			localStorage.removeItem(`temp-${allRequestsKey}`)
			localStorage.removeItem('temporaryIDValue')
			action.current = null
		}
	}, [])
	let tempDetailsID
	if (tempKey&&localStorage.getItem('temporaryIDValue')) {
		tempDetailsID = localStorage.getItem('temporaryIDValue')
	}
	console.log({tempDetailsID})
	// if (!requestItem) {
	// 	console.log('request with ID:', comparisonID, 'not found.')
	// 	console.log('redirecting to dashboard ...')
	// 	navigate('/success', { state: {currentPage: `/${authData?.role}`, time: 50}})
	// }
	return (
		<>
			{requestItem &&
			<div className="background-color custodian-page">
				<div className="dash-form">
					<div className="req-h4-header">
						<h3>
							{`${requestType==='part'?'Part':'Component'} ${requestType==='part'&&dept==='workshop'?'Post':(requestItem?.quantityRequested?'Request':'Fixed')}: ID ${'#'+requestItem?.id}`}
						</h3>
						<h4 style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
							<span>Details</span>
							<span style={{paddingRight: '5rem'}}>
								<Link
								style={{color: '#333'}}
								to={`/${dept}/${requestType==='part'?'part':'component'}-request-list/`}>
									{(dept !== 'help-desk'&&dept !== 'supervisor') && 'Back to List'}
								</Link>
							</span>
						</h4>
					</div>
					<div>
						<div className="to-form">
						</div>
						<hr />
						<div>
							{requestItem?.fault &&
							<div className="cust-row">
								<div className="input-field">
									<p><strong>Bank: </strong>
										{requestItem.fault.logged_by.branch.bank.name.toUpperCase()}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Branch: </strong>
									{toSentenceCase(requestItem.fault.logged_by.branch.name)}
									</p>
								</div>
								<div className="input-field">
									<p><strong>State: </strong>
									{toSentenceCase(requestItem.fault.logged_by.branch.state.name)}|{requestItem.fault.logged_by.branch.state.initial}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Location: </strong>
									{toSentenceCase(requestItem?.fault?.location?.location)}
									</p>
								</div>
							</div>}
							{requestParamDetails.dept === 'workshop' ?
							// workshop (without faults)
							(<div className="cust-row">
								<div className="input-field">
									<p><strong>Part: </strong>
										{toSentenceCase((requestItem.name.name)?(requestItem.name.name):(requestItem.name))}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Quantity: </strong>
									{(requestItem.quantity)?(requestItem.quantity):(requestItem.quantityRequested)}
									</p>
								</div>
								<div className="input-field to_user">
									<p><strong>Requested By: </strong>
										<Link to={`/user/${requestItem.user.id}`}
										style={{color: '#333'}}>
											{toSentenceCase((requestItem.user.first_name)?(requestItem.user.first_name):(requestItem.user))}
										</Link>
									</p>
								</div>
							</div>) :
							// others (faults)
							(<div className="cust-row">
								<div className="input-field">
									<p><strong>{requestType==='part'?'Part':'Component'}: </strong>
										{toSentenceCase(requestItem.name.name||requestItem.name)}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Quantity: </strong>
									{requestItem.quantityRequested||requestItem.quantity}
									</p>
								</div>
								<div className="input-field to_user">
									<p><strong>Requested By: </strong>
										<Link to={`/user/${requestItem?.user?.id}`}
										style={{color: '#333'}}>
											{toSentenceCase(requestItem?.user?.first_name)}
										</Link>
									</p>
								</div>
							</div>)}
							<div className="cust-row">
								<div className="input-field">
									<p><strong>Requested On: </strong>
									{
									requestedAt.toDateString()
									+ ' at ' + requestedAt.toLocaleTimeString('en-GB', { hour12: false })
									}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Status: </strong>
										<span
										style={((tempDetailsID&&action.current==='approved')||requestItem.approved) ? statusStyle.approved : ((tempDetailsID&&action.current==='rejected')||requestItem.rejected) ? statusStyle.rejected : statusStyle.pending}
										>{(((tempDetailsID&&action.current==='approved')||requestItem.approved) ? 'Approved': ((tempDetailsID&&action.current==='rejected')||requestItem.rejected) ? 'Rejected':'Pending ')}</span>
										{!(tempDetailsID||requestItem.approved||requestItem.rejected) && (<span style={timeStyle}>{' ('}{ + (RDDaysBetweenDates < 1) ? 'Less than ' + wholeHoursBetweenDates + ' ' + (RDhoursBetweenDates < 1 ? 'hour':'hours') + ' ago' : wholeDaysBetweenDates + ' ' + (RDDaysBetweenDates === 1 ? 'A day':'days') + ' ago'}{')'}</span>)}
									</p>
								</div>
							</div>
							<div className="cust-row">
								{requestItem?.fault &&
								<>
									<div className="input-field to_user">
										<p><strong>Fault: </strong>
											{!requestSearch?
												<Link to={`/${requestParamDetails.dept}/${faultStatus}/fault-gen-details/${requestItem?.fault?.id}`}
												style={{color: '#333'}}>
													{toSentenceCase(requestItem?.fault?.title?.name)}
												</Link>:
												toSentenceCase(requestItem?.fault?.title?.name)}
										</p>
									</div>
									<div className="input-field to_user">
										<p><strong>Fault ID: #</strong>
												{requestItem?.fault?.id}
										</p>
									</div>
								</>}
								{/* <div className="cust-row">
									{requestItem?.fault && <div className="input-field-other">
										<p><strong>Other: </strong>
										{requestItem?.fault?.other}
										</p>
									</div>}
								</div> */}
								{requestItem.approved_by && <div className="input-field">
									<p><strong>Approved By: </strong>
									<Link
									style={{color: '#333'}}
									to={`/user/${requestItem.approved_by.id}`}>
										{toSentenceCase(requestItem.approved_by.first_name)}
									</Link>
									</p>
								</div>}
							</div>
							<div className="cust-row">
								{requestItem?.fault &&
								<>
									<div className="input-field to_user">
										<p><strong>Managed By: </strong>
											<Link to={`/user/${requestItem?.fault?.managed_by?.id}`}
											style={{color: '#333'}}>
												{toSentenceCase(requestItem?.fault?.managed_by?.first_name)}
											</Link>
										</p>
									</div>
									<div className="input-field to_user">
										<p><strong>Supervised By: </strong>
											<Link to={`/user/${requestItem?.fault?.supervised_by?.id}`}
											style={{color: '#333'}}>
												{toSentenceCase(requestItem?.fault?.supervised_by?.first_name)}
											</Link>
										</p>
									</div>
								</>}
							</div>
							{/* <div className="cust-row">
								{requestItem?.fault && <div className="input-field-other">
									<p><strong>Other: </strong>
									{toSentenceCase(requestItem?.fault?.other)}
									</p>
								</div>}
							</div> */}
							<div className="cust-row">
								<div className="input-field">
									<p><strong>Reason: </strong>
										{requestItem.reason}
									</p>
								</div>
							</div>
						</div>
						{console.log(
							'\nworkshop or engineer:', authData.role === 'workshop'||authData.role === 'engineer',
                            '\ncanWithdrawRequest:', canWithdrawRequest,
                            '\nrequestItem.approved:', !requestItem.approved,
                            '\nrequestItem.rejected:', !requestItem.rejected,
						)}
						{((authData.role === 'workshop'||authData.role === 'engineer') && canWithdrawRequest && !requestItem.approved && !requestItem.rejected) && (
						<div
						className='custum-button'
						disabled={deleteLoading}
							onClick={(e) => {
								handleClick(e);
							}}>
							<h5>{deleteLoading ? 'Witdrawing...' : 'Withdraw Fault'}</h5>
						</div>
						)}

						{/* supervisor and human-resource approve/reject request butttons */}
						{(canAlsoApproveOrReject && !requestItem?.approved && !requestItem?.rejected && !tempDetailsID) &&
							<div style={{
								display: 'flex',
								justifyContent: 'space-evenly'
							}}>
								<div className="custum-button">
									<h5	onClick={(e) => {
										handleClick(e, {type: 'approved'});
										action.current = 'approved';
									}}>
										Approve Request
									</h5>
								</div>
								<div className="custum-button">
									<h5
									onClick={(e) => {
										handleClick(e, {type: 'rejected'});
										action.current = 'rejected';
									}}>
										Reject Request
									</h5>
								</div>
							</div>
						}
					</div>
				</div>
			</div>}
		</>
	);
};

export default RequestsDetails;