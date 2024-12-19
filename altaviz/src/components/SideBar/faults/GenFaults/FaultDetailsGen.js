import { useContext, useEffect, useState, useRef } from "react";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import "../../sidebar_pages.css"
import FaultRequestsItem from "./FaultRequestsItems";
import { FetchContext } from "../../../context/FetchContext";
import { TimeDifferenceContext } from "../../../context/timeDifference/TimeDifferenceContext";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { RotContext } from "../../../context/RotContext";
import { CheckAndFetchFromStorage } from "../../../hooks/fetchFromClient";
import RequestItem from '../../requestForms/RequestItem';

function removeKeys(keys) {
	for (let i = 0; i < keys.length; i++) {
		localStorage.removeItem(keys[i]);
	}
}

function FaultDetailsGen({searchFaults}) {
	const navigate = useNavigate();
	const [remount, setRemount] = useState(true)
	const patchUrlName = useRef(null)
	// const recievedNewRequest = useRef(false)
	const [addPartObj, setAddPartObj] = useState([])
	const [addComponentObj, setAddComponentObj] = useState([])
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	// const [stateUrl, setStateUrl] = useState(null);
	const [formData, setFormData] = useState(new FormData());
	// const { handleRefresh, handleRefreshAll } = useRefreshContext();
	const location = useLocation().pathname.split('/');
	const requestType = location[2].split('-')[2]
	// const [refresh, setRefresh] = useState(false);
	const [requeste, setRequeste] = useState(null);
	const [deleteCompRequestID, setDeleteCompRequestID] = useState([]);
	const [deletePartRequestID, setDeletePartRequestID] = useState([]);
	const [itemId, setItemId] = useState(null)
	const [timeStyle, setTimeStyle] = useState({});
	const { authData } = useContext(AuthContext);
	const { TimeDifference } = useContext(TimeDifferenceContext);
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext);
	const FaultParamDetals = useParams()

	const {
		usePostDataAPI, usePutDataAPI,
		useDeleteDataAPI, usePatchDataAPI,
	} = useContext(FetchContext)

	const [patchTrigger, setPatchTrigger] = useState(false);
	const [deleteTrigger, setDeleteTrigger] = useState(false);
	const [postTrigger, setPostTrigger] = useState(false);
	const [putTrigger, setPutTrigger] = useState(false);

	// toggles and fxns
	const [isCompRequestFormOpen, setIsCompRequestFormOpen] = useState(false);
	const [isPartRequestFormOpen, setIsPartRequestFormOpen] = useState(false);
	const toggleCompRequestForm = () => setIsCompRequestFormOpen(!isCompRequestFormOpen);
	const togglePartRequestForm = () => setIsPartRequestFormOpen(!isPartRequestFormOpen);
	const toggleRemount = () => {
		setRemount(prev =>{
			console.log(
				'\nremount:', remount,
				'\ntoggled remount from', prev, 'to', !prev);
			return !prev
		})
	}

	console.log('11111111111111111111')
	let allFaults = [];
	const allFaultsKey = 'allUnresolvedKey'
	const tempKey = localStorage.getItem(`temp-${allFaultsKey}`)
	const localKeyToUse = tempKey?`temp-${allFaultsKey}`:allFaultsKey
	allFaults = CheckAndFetchFromStorage([
		localKeyToUse,
	])
	console.log('22222222222222222222')
	console.log('allFaults:', allFaults)
	if (!allFaults?.find?.(fault => fault.id === Number(FaultParamDetals.id))) {
		console.log('fault with ID:', FaultParamDetals.id, 'not found.')
		console.log('redirecting to dashboard ...')
		navigate('/success', { state: {currentPage: `/${authData.role}`, time: 50}})
	}
	const faultsItem = allFaults.filter(data => data.id === Number(FaultParamDetals.id))[0]
	console.log('faultsItem:', faultsItem)

	// click events
	const handleClick = (e, {type}) => {
		e.preventDefault();
		console.log(
			'\n',{type},
			'\npatchUrlName.current:', patchUrlName.current,
		)
		if (type.id) {
			console.log('id:', type.id)
			if (type.button === 'withdraw') {
				console.log(
					'\nbutton:', type.button,
					'\nid:', type.id
				)
				console.log('requeste:', requeste)
				setDeleteTrigger(true);
			} else if (type.button==='confirm'||type.button==='seek confirmation'||
				type.button==='approve'||type.button==='reject') {
				console.log(
					'\nbutton:', type.button,
					'\nid:', type.id
				)
				console.log('\n', {faultsItem})
				const newFormData = new FormData();
				newFormData.append('faultID', type.id)
				if (type.button  === 'confirm') {
					newFormData.append('confirm_resolve', true)
					if (faultsItem?.replacement_engineer) {
						newFormData.append('resolvedBy', faultsItem.replacement_engineer.email)
					} else {
						newFormData.append('resolvedBy', faultsItem.assigned_to.email)
					}
					newFormData.append('managedBy', faultsItem.managed_by.email)
					newFormData.append('supervisedBy', faultsItem.supervised_by.email)
					newFormData.append('deliveries', 1)
				} else if (type.button  === 'seek confirmation') {
					newFormData.append('verify_resolve', true)
				} else if (type.button  === 'approve'||type.button  === 'reject') {
					if (type.button  === 'approve') {
						newFormData.append('approved', true)
					} else if (type.button  === 'reject') {
						newFormData.append('rejected', true)
					}
					newFormData.append('approved_by', authData.email)
				}
				setFormData(newFormData)
				setPatchTrigger(true);
			}
		} else if (type==='approved'||type==='rejected') {
			let requestComponentIds;
			let requestPartIDs;
			if (faultsItem?.requestComponent) {
				requestComponentIds = faultsItem?.requestComponent.map(component => component.id)
				console.log({requestComponentIds})
			}
			if (faultsItem?.requestPart) {
				requestPartIDs = faultsItem.requestPart.map(part => part.id)
			}
			const newFormData = new FormData();
			if (requestComponentIds) {newFormData.append('requestComponentIds', requestComponentIds)}
			if (requestPartIDs) {newFormData.append('requestPartIDs', requestPartIDs)}
			// newFormData.append(type, [...requestComponentIds, ...requestPartIDs])
			newFormData.append(type, true)
			newFormData.append('approved_by', authData.email)
			setFormData(newFormData)
			setPatchTrigger(true);
		}
		console.log('\ntype:', type)
	};

	// response variables
	let responseData = [];
	let responseLoading = [];
	let responseError = [];

	// patch
	({ patchData:responseData[0], patchLoading:responseLoading[0], patchError:responseError[0] } = usePatchDataAPI(
			`${patchUrlName.current}/${authData.id}/`,
			formData, patchTrigger,
		));

	// delete
	({ deleteData:responseData[1], deleteLoading:responseLoading[1], deleteError:responseError[1] } = useDeleteDataAPI(
			`${requeste?(requeste+'/'+itemId):('fault/'+itemId)}/delete/`,
			deleteTrigger,
		));

	// post
	({ postData:responseData[2], postLoading:responseLoading[2], postError:responseError[2] } = usePostDataAPI(
			// `${postUrl}/${itemId}/`,
			formData,
			postTrigger,
			// `/${authData.department.name}`
		));

	// put
	({ putData:responseData[3], putLoading:responseLoading[3], putError:responseError[3] } = usePutDataAPI(
			// `${putUrl}/${itemId}/`,
			formData,
			putTrigger,
			// `/${authData.department.name}`
		));

	console.log(
		'\nresponseData:', responseData,
		'\nresponseError:', responseError,
		'\nresponseLoading:', responseLoading,
	)
	const responseErrorValue = responseError.find?.(error => !!error)
	const responseDataValue = responseData.find?.(data => !!data)
	const responseIndex = responseData.findIndex?.(data => !!data)
	console.log(
		'\nany:', responseData.some?.(data => !!data),
		'\nresponseErrorValue:', responseErrorValue,
		'\nResponseIndex:', responseIndex,
		'\nresponseDataValue:', responseDataValue,
	)

	useEffect(() => {
		// if (checkResponseData || checkResponseError) {
		if (responseDataValue || responseErrorValue) {
			if (responseDataValue) {
				console.log(
					// '\ncheckResponseData:', checkResponseData,
					'\nresponse data:', responseData,
					'\nResponseIndex:', responseIndex,
					'\nresponseDataValue:', responseDataValue,
					'\nFaultParamDetals:', FaultParamDetals
				)
			} else {
				// console.log(
				// 	'\nresponse error:', checkResponseError
				// )
			}
			const removeList = [
				'faultsKey', 'totalfaultsKey',
				'unconfirmedKey', 'totalunconfirmedKey',
				'faultpendingList', 'faultunconfirmedList',
				'allUnresolvedKey',
			];

			if (deleteTrigger) {
				setDeleteTrigger(() => {
					console.log('\nsetting Trigger from ', deleteTrigger, ' to ', !deleteTrigger)
					return false
				});
				if (requeste) {
					console.log(
						'\nremoving ...',
						'\npppppppppppppppppppppppppppp',
						'\npppppppppppppppppppppppppppp',
						'\npppppppppppppppppppppppppppp',
						'\npppppppppppppppppppppppppppp',
						'\npppppppppppppppppppppppppppp',
					)
					if (FaultParamDetals.dept==='engineer') {
						let encodedData;
						const localPK = 'faultsKey'
						let decodedData = localStorage.getItem(localPK)
						decodedData = RotCipher(decodedData, decrypt)
						decodedData = JSON.parse(decodedData)
						console.log(
							'\ndata from localStorage:', !!decodedData,
							'\nFaultParamDetals.id:', FaultParamDetals.id,
							'\nitemId:', itemId,
						)
						const updatedFaults = decodedData.map(fault => {
							if (fault.id === Number(FaultParamDetals.id)) {
								let [, type] = requeste.split('-');
								if (type === 'part') {type = 'requestPart'}
								else if (type === 'component') {type = 'requestComponent'}
								fault[type] = fault[type].filter(request =>
									request.id !== itemId
								)
							}
							return fault
						})
						console.log('previous faults:', decodedData)
						console.log('updated faults:', updatedFaults)

						// localKeylist.forEach(key => {
						// 	localStorage.removeItem(key)
						// })

						encodedData = RotCipher(JSON.stringify(updatedFaults), encrypt)
						localStorage.setItem(localPK, encodedData);

						if (encodedData) {console.log('Added item to localStorage')}
					}
					if (requeste.split('-')[1] === 'component') {setDeleteCompRequestID(prev => [...prev, itemId])}
					else if (requeste.split('-')[1] === 'part') {setDeletePartRequestID(prev => [...prev, itemId])}
				}
				if (FaultParamDetals.dept==='supervisor'||FaultParamDetals.dept==='engineer') {
					let localKeylist;
					const [, type] = requeste.split('-');
					if (type==='component') {localKeylist = ['componentsRequestList']}
					else if (type==='part') {localKeylist = ['partsRequestList']}
					localKeylist.forEach(key => {
						localStorage.removeItem(key)
					})
					// removeKeys('componentsRequestList', 'partsRequestList')
					console.log({faultsItem}, {itemId})
					let updatedData = allFaults.map(fault => {
						if (fault.id === faultsItem.id) {
							let [, type] = requeste.split('-');
							if (type === 'part') {type = 'requestPart'}
							else if (type === 'component') {type = 'requestComponent'}
							fault[type] = fault[type].filter(request => request.id !== itemId)}
						return fault;
					})
					const tempUpdatevalue = updatedData // delete
					updatedData = RotCipher(JSON.stringify(updatedData), encrypt)
					localStorage.setItem('allUnresolvedKey', updatedData);
					console.log('allUnresolvedKey has been updated with:', tempUpdatevalue)
				}
				if (FaultParamDetals.dept==='supervisor'||FaultParamDetals.dept==='engineer') {
					removeKeys('componentsRequestList', 'partsRequestList')
				} else {removeKeys(removeList)}
			}
			if (postTrigger) {
				setPostTrigger(() => {
					console.log('\nsetting Trigger from ', postTrigger, ' to ', !postTrigger)
					return false
				});
			}
			if (patchTrigger) {
				console.log(
					`EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
					WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
					WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
					EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
					EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
					EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`
				)
				setPatchTrigger(() => {
					console.log('\nsetting Trigger from ', patchTrigger, ' to ', !patchTrigger)
					return false
				});
				if (FaultParamDetals.dept==='custodian') {
					const getOldData = localStorage.getItem(allFaultsKey)
					localStorage.setItem(`temp-${allFaultsKey}`, getOldData)
					localStorage.setItem('temporaryIDValue', FaultParamDetals.id)
				}
				// else if (FaultParamDetals.dept==='engineer') navigate('/success', { state: {currentPage: authData.role, time: 50}})
				if (FaultParamDetals.dept==='supervisor'||FaultParamDetals.dept==='human-resource') {
					let localKeylist;
					let requestComponentIds;
					let requestPartIDs;
					// const [, type] = requeste.split('-');
					const [, type] = patchUrlName.current.split('-');
					console.log('patchUrlName (1st):', patchUrlName)
					if (type==='component') {localKeylist = ['componentsRequestList']}
					else if (type==='part') {localKeylist = ['partsRequestList']}
					else if (type==='status') {
						localKeylist = ['partsRequestList', 'componentsRequestList']
						if (faultsItem?.requestComponent) {requestComponentIds = faultsItem?.requestComponent?.map(component => component.id)}
						if (faultsItem?.requestPart) {requestPartIDs = faultsItem?.requestPart?.map(part => part.id)}
					}
					localKeylist.forEach(key => {
						localStorage.removeItem(key)
					})
					// removeKeys('componentsRequestList', 'partsRequestList')
					console.log({faultsItem}, {itemId})
					let updatedData = allFaults.map(fault => {
						if (fault.id === faultsItem.id) {
							let [key, type] = requeste.split('-');
							// let [key, type] = patchUrlName.split('-');
							console.log('patchUrlName (2nd):', patchUrlName)
							console.log(
								'\nkey:', key, 'expecting: approved/rejected',
								'\ntype:', type, 'expecting: component/part',
								'\nrequeste:', requeste, 'expecting: approved/rejected',
							)
							if (itemId) {
								if (type === 'part') {type = 'requestPart'}
								else if (type === 'component') {type = 'requestComponent'}
								fault[type].map(request => {
									if (request.id === itemId) {
										request[key] = true
										request.approved_by = {first_name: authData.first_name}
										request.requested_at = new Date()
									}
									return request
								})
							} else {
								if (requestComponentIds) {
									fault.requestComponent.map(request => {
										console.log(
											'\nrequest.id:', request.id,
											'\nrequest.type:', requeste,
											'\nrequest.type curr value:', request.approved||request.rejected, '-expecting for 235 to be true'
										)
										if (!request.approved&&!request.rejected) {request[requeste] = true}
										return request
									})
								}
								if (requestPartIDs) {
									fault.requestPart.map(request => {
										if (!request[requeste])	{request[requeste] = true}
										return request
									})
								}
							}
						}
						// else if ()
						return fault;
					})
					const tempUpdatevalue = updatedData
					updatedData = RotCipher(JSON.stringify(updatedData), encrypt)
					localStorage.setItem('allUnresolvedKey', updatedData);
					console.log('allUnresolvedKey has been updated with:', tempUpdatevalue)

					// delete
					let checkstorage = localStorage.getItem('allUnresolvedKey')
					checkstorage = RotCipher(checkstorage, decrypt)
					checkstorage = JSON.parse(checkstorage)
					console.log('allUnresolvedKey after update:', checkstorage)
					toggleRemount()
				}
				patchUrlName.current = null
				setRequeste(null)
			}
			if (putTrigger) {
				setPutTrigger(() => {
					console.log('\nsetting Trigger from ', putTrigger, ' to ', !putTrigger)
					return false
				});
			}
			// handleRefresh([variableContext, totalArrayContext])
		}
		if (responseData.some?.(item => item)) {
			console.log('\ndatabase response is successful'.toUpperCase())
			// handleRefreshAll()
		}
	}, [
		deleteTrigger, postTrigger, patchTrigger, putTrigger,
		responseData, responseLoading, responseError
	])

	const { wholeDaysBetweenDates, wholeHoursBetweenDates, RDDaysBetweenDates, RDhoursBetweenDates } = TimeDifference({date1: faultsItem?.created_at});
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

	const loggedAt = new Date(faultsItem?.created_at)
	const resolvedAt = faultsItem?.resolved_at ? new Date(faultsItem?.resolved_at) : null;
	let approvedRequest = faultsItem?.requestStatus ?
		((faultsItem?.requestPart?.some?.(request => request.approved)) ||
		(faultsItem?.requestComponent?.some?.(request => request.approved))):
		null
	let rejectRequest = faultsItem?.requestStatus ?
		((faultsItem?.requestPart?.some?.(request => request.rejected)) ||
		(faultsItem?.requestComponent?.some?.(request => request.rejected))):
		null
	const appovedAt = (approvedRequest || rejectRequest) ?
		new Date(
			faultsItem?.requestPart?.find?.(request => request.approved_at).approved_at ||
			faultsItem?.requestComponent?.find?.(request => request.approved_at).approved_at
		) : null;

	const compRequestAt = (faultsItem?.requestComponent) ?
		new Date(faultsItem?.requestComponent?.find?.(request => request.requested_at).requested_at):null
	const partRequestAt = (faultsItem?.requestPart) ?
		new Date(faultsItem?.requestPart?.find?.(request => request.requested_at).requested_at):null

	console.log(
		'\nloggedAt:', loggedAt,
		'\nresolvedAt:', resolvedAt,
		'\napprovedRequest:', approvedRequest,
		'\nrejectRequest:', rejectRequest,
		'\nappovedAt:', appovedAt,
		'\ncompRequestAt:', compRequestAt,
		'\npartRequestAt:', partRequestAt,
		'\napproved_at:', (faultsItem?.requestPart||[])?.find?.(request => request.approved_at)?.approved_at
	)

	// check requests status
	const checkStatus = faultsItem?.requestStatus;
	const checkRequests = (faultsItem?.requestComponent?(faultsItem?.requestComponent?.some?.(request => {
		return (!request?.approved&&!request?.rejected)})):null)||
		(faultsItem?.requestPart?(faultsItem?.requestPart?.some?.(request => {
			return (!request?.approved&&!request?.rejected)})):null)
	console.log({checkRequests})

	// permissions
	// can make requests (engineers and supervisors)
	const canMakeRequests = faultsItem?.assigned_to.username.trim() === authData.username.trim()

	// can confirm/withdraw faults (custodians)
	const canConfirmOrWithdraw = (
		faultsItem?.logged_by?.branch?.id === authData?.branch?.id &&
		faultsItem?.logged_by?.branch?.bank?.name === authData?.branch?.bank?.name &&
		faultsItem?.logged_by?.branch?.state?.id === authData?.branch?.state?.id &&
		authData?.role === 'custodian'
	)
	let hasApprovedPartRequests;
	let hasApprovedComponentRequests;
	if (faultsItem?.requestPart) {
		hasApprovedPartRequests = faultsItem?.requestPart.some?.(request => request.approved)
	}
	if (faultsItem?.requestComponent) {
		hasApprovedComponentRequests = faultsItem?.requestComponent.some?.(request => request.approved)
	}

	// can approve/reject requests (supervisors and human resource)
	const canApproveOrRejectRequests = ((faultsItem?.supervised_by.region.trim() === authData.userRegion.trim()) && authData.role === 'supervisor') || authData.role === 'human-resource'

	// styles
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	const statusStyle = {
		pending: {
			padding: '0 0.4rem',
			borderRadius: '3px',
			border: '1px dotted',
			color: 'grey',
		},
		approved: {
			color: 'green',
		},
		unconfirmed: {
			color: 'blue',
			// fontStyle: 'bolder',
		},
		rejected: {
			color: 'red',
		}
	}
	const buttonStyle = {
		display: 'flex',
		justifyContent: 'space-evenly'
	}
	console.log(
		{deleteTrigger}
	)

	console.log(
		'\n', {addComponentObj},
		'\n', {addPartObj},
		// '\nrecievedNewRequest.current (fault details):', recievedNewRequest.current,
	)

	let combinedPartListOfItems;
	let combinedComponentListOfItems;
	if (faultsItem?.requestPart||faultsItem?.requestComponent) {
		if (faultsItem?.requestPart) {
			combinedPartListOfItems = Array.from(
				new Map(
					[...faultsItem?.requestPart, ...addPartObj].map(item => [item.id, item])
				).values()
			)
		}
		if (faultsItem?.requestComponent) {
			combinedComponentListOfItems = Array.from(
				new Map(
					[...faultsItem?.requestComponent, ...addComponentObj].map(item => [item.id, item])
				).values()
			)
		}
	}

	let storedData = localStorage.getItem('compRequestContext');
	// const { decrypt, RotCipher } = useContext(RotContext);
	if (storedData) {
		storedData = JSON.parse(RotCipher(storedData, decrypt))
		// console.log('\nstoredData:', storedData,)
	}

	const requestItemsObj = {
		// updateCompLocalStorage: updateCompLocalStorage,
		role: authData.role,
		canMakeRequests: canMakeRequests,
		canApproveOrRejectRequests: canApproveOrRejectRequests,
		patchUrlName: patchUrlName,
		setRequeste: setRequeste,
		setItemId: setItemId,
		handleClick: handleClick,
		faultsItem: faultsItem,
		FaultParamDetals: FaultParamDetals
	}
	const requestProps = {
		setAddPartObj: setAddPartObj,
		setAddComponentObj: setAddComponentObj,
		// lastID: maxPartID.current,
		faultId: faultsItem?.id,
		faultDetails: faultsItem,
		itemKeys: [
			// 'partPendingList', 'componentPendingList',
			'faultsKey', 'totalPendingPartRequest',
			'allUnresolvedKey',
		],
	}
	useEffect(() => {
		return () => {
			localStorage.removeItem(`temp-${allFaultsKey}`)
			localStorage.removeItem('temporaryIDValue')
		}
	}, [])
	let tempDetailsID
	if (tempKey&&localStorage.getItem('temporaryIDValue')) {
		tempDetailsID = localStorage.getItem('temporaryIDValue')
	}
	console.log({tempDetailsID})
	let searchedData = localStorage.getItem('searchData')
	if (searchedData) {
		searchedData = RotCipher(searchedData, decrypt)
		searchedData = JSON.parse(searchedData)
		searchedData = searchedData?.map?.(fault => fault.id)
		console.log(searchedData)
	}
	return (
		<>
			<div className="background-color custodian-page">
				{/* <CustomTime /> */}
					<div className="dash-form">

						{/* details heading */}
						{faultsItem &&
							<>
								<div className="req-h4-header">
								<h3>
									{`Fault Log: ID #${faultsItem?.id} - ${toSentenceCase(faultsItem?.title.name)}`}
								</h3>
								<h4 style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}>
									<span>Details</span>
									{(FaultParamDetals.dept !== 'help-desk' &&
										FaultParamDetals.dept !== 'supervisor' &&
										FaultParamDetals.dept !== 'human-resource' &&
										FaultParamDetals.type) &&
										<span style={{paddingRight: '5rem'}}>
										<Link
										style={{color: '#333'}}
										to={`/${FaultParamDetals.dept}/${FaultParamDetals.type}/fault-gen-${requestType==='unconfirmed'?'unconfirmed-list':'list'}/`}>
											Back to List
										</Link>
									</span>}
								</h4>
								</div>

								<div>
									<div className="to-form">
									</div>
									<hr />

									<div>
										{/* row 1 - custodian */}
										<div className="cust-row">
											<div className="input-field">
												<p><strong>Bank: </strong>
													{faultsItem?.logged_by.branch.bank.name.toUpperCase()}
												</p>
											</div>
											<div className="input-field">
												<p><strong>Branch: </strong>
												{toSentenceCase(faultsItem?.logged_by.branch.name)}
												</p>
											</div>
											<div className="input-field">
												<p><strong>State: </strong>
												{toSentenceCase(faultsItem?.logged_by.branch.state.name)}|{faultsItem?.logged_by.branch.state.initial}
												</p>
											</div>
											<div className="input-field">
												<p><strong>Location: </strong>
												{toSentenceCase(faultsItem?.logged_by.branch.location.location)}
												</p>
											</div>
											<div className="input-field">
												<p><strong>Region: </strong>
												{toSentenceCase(faultsItem?.logged_by.branch.location.region.name)}
												</p>
											</div>
										</div>

										{/* row 2 */}
										<div className="cust-row">
											<div className="input-field">
												<p><strong>Logged On: </strong>
													{loggedAt.toDateString() + ' at ' + loggedAt.toLocaleTimeString('en-GB', { hour12: false })}
												</p>
											</div>
											{faultsItem?.logged_by &&
											<>
												<div className="input-field">
													<p><strong>Logged by: </strong>
													<Link
													style={{color: '#333'}}
													to={`/user/${faultsItem?.logged_by.branch.custodian.id}`}>
														{toSentenceCase(faultsItem?.logged_by.branch.custodian.first_name)}
													</Link>
													</p>
												</div>
											</>}
									
											<div className="input-field">
												<p><strong>Status: </strong>
													<span
													// style={(!faultsItem?.verify_resolve) ? statusStyle.pending : (faultsItem?.confirm_resolve) ? statusStyle.approved : statusStyle.unconfirmed}>
													style={(tempDetailsID||faultsItem?.confirm_resolve)?statusStyle.approved:(!faultsItem?.confirm_resolve&&faultsItem?.verify_resolve)?statusStyle.unconfirmed:statusStyle.pending}>
														{((tempDetailsID||faultsItem?.confirm_resolve)?'Resolved ':((!faultsItem?.confirm_resolve&&faultsItem?.verify_resolve)?'Unconfirmed Resolution':'Pending '))}
													</span>
													{(!tempDetailsID&&!faultsItem?.confirm_resolve) &&
													<span
													style={timeStyle}>
														{'('}{(RDDaysBetweenDates < 1) ?
															'Less than ' + wholeHoursBetweenDates + ' ' +
															(RDhoursBetweenDates < 1 ? 'hour':'hours') +
															' ago' :
															wholeDaysBetweenDates + ' ' +
															(RDDaysBetweenDates < 1 ? 'A day':'days') +
															' ago'}{')'}
													</span>}
												</p>
											</div>
										</div>

										{/* row 3 */}
										{faultsItem?.verify_resolve &&
										<div className="cust-row">
											<div className="input-field">
												<p><strong>Resolved On: </strong>
													{resolvedAt.toDateString() + ' at ' + resolvedAt.toLocaleTimeString('en-GB', { hour12: false })}
												</p>
											</div>
											{faultsItem?.confirmed_by &&
											<div className="input-field">
												<p><strong>Confirmed by: </strong>
												<Link
												style={{color: '#333'}}
												to={`/user/${faultsItem?.confirmed_by.id}`}>
													{toSentenceCase(faultsItem?.confirmed_by.first_name)}
												</Link>
												</p>
											</div>}
										</div>}

										{/* row 4 */}
										<div className="cust-row">
											<div className="input-field">
												<p><strong>Assigned to: </strong>
												<Link
												style={{color: '#333'}}
												to={`/user/${faultsItem?.assigned_to.id}`}>
													{toSentenceCase(faultsItem?.assigned_to.first_name)}
												</Link>
												</p>
											</div>
											<div className="input-field to_user">
												<p><strong>Managed by: </strong>
													<Link to={`/user/${faultsItem?.managed_by.id}`}
													style={{color: '#333'}}>
														{toSentenceCase(faultsItem?.managed_by.first_name)}
													</Link>
												</p>
											</div>
											<div className="input-field to_user">
												<p><strong>Supervised by: </strong>
													<Link to={`/user/${faultsItem?.supervised_by.id}`}
													style={{color: '#333'}}>
														{toSentenceCase(faultsItem?.supervised_by.first_name)}
													</Link>
												</p>
											</div>
										</div>

										{/* row 5 */}
										<div className="cust-row">
											<div className="input-field-other">
												<p><strong>Other: </strong>
													{faultsItem?.other ? trimString(faultsItem?.other, 300) : 'No other details'}
												</p>
											</div>
										</div>
									</div>

									{/* components and parts requests */}
									{faultsItem?.requestStatus &&
									<>
										<div className="cust-row">
											{/* components requests */}
											{faultsItem?.requestComponent &&
											<div className="input-field">
												<p style={{marginBottom: '0'}}><strong>Component Requests ({checkStatus && compRequestAt.toDateString()+' at '+compRequestAt.toLocaleTimeString('en-GB', { hour12: false })}): </strong></p>
												<ul
												style={{listStyle: 'none', marginTop: '0'}}>{combinedComponentListOfItems.map((component, index) => {
													return (
												((!deleteCompRequestID.includes(component.id))&&
												<li key={index+component.name.name}>
													<FaultRequestsItem
													requestItemsObj={requestItemsObj}
													request={component}
													searchedData={searchedData}
													type='component'
													/>
												</li>))}
											)}</ul>
											</div>}
											{/* parts requests */}
											{faultsItem?.requestPart &&
											<div className="input-field">
												<p style={{marginBottom: '0'}}><strong>Part Requests ({checkStatus && partRequestAt.toDateString()+' at '+partRequestAt.toLocaleTimeString('en-GB', { hour12: false })}): </strong></p>
												<ul style={{listStyle: 'none', marginTop: '0'}}>{combinedPartListOfItems.map((part, index) => {
													return (
												((!deletePartRequestID.includes(part.id))&&
												<li key={index+part.name.name}>
													<FaultRequestsItem
													requestItemsObj={requestItemsObj}
													request={part}
													searchedData={searchedData}
													type='part'
													/>
												</li>))}
												)}
												</ul>
											</div>}
										</div>

										{/* approve/reject requests */}
										{(approvedRequest || rejectRequest) &&
										<div className="cust-row">
											{/* who approved/rejected the requests */}
											<div className="input-field to_user">
												<p><strong>{approvedRequest ? 'Approved': 'Rejected'} By: </strong>
													<Link
													to={`/user/${faultsItem?.requestComponent?.find?.(user => user?.approved_by?.id)?.approved_by?.id||faultsItem?.requestPart?.find?.(user => user?.approved_by?.id)?.approved_by?.id}`}
													style={{color: '#333'}}>
														{console.log(
															'\npart:', faultsItem?.requestPart?.find?.(user => user.approved_by?.first_name)?.approved_by?.first_name,
															'\ncomponent:', faultsItem?.requestComponent?.find?.(user => user.approved_by?.first_name)?.approved_by?.first_name,
														)}
														{toSentenceCase((faultsItem?.requestComponent?.find?.(user => user.approved_by?.first_name).approved_by?.first_name)||(faultsItem?.requestPart?.find?.(user => user.approved_by?.first_name).approved_by?.first_name))}
													</Link>
												</p>
											</div>
											{/* when requests was approved/rejected */}
											<div className="input-field">
												<p><strong>{approvedRequest ? 'Approved': 'Rejected'} On: </strong>
												{appovedAt.toDateString() + ' at ' + appovedAt.toLocaleTimeString('en-GB', { hour12: false })}
												</p>
											</div>
										</div>}
									</>}

									{/* custodians can confirm/withdraw faults buttons */}
									{canConfirmOrWithdraw &&
									(<div
									style={buttonStyle}>
										{(faultsItem?.verify_resolve&&!tempDetailsID) &&
										<div className="custum-button">
											<h5
											onClick={(e) => {
												setItemId(faultsItem?.id);
												patchUrlName.current = 'unconfirmed-faults'
												handleClick(e, {type: {id: faultsItem?.id, button: 'confirm'}})
											}}
											>
												{responseLoading.some?.(item => item) ? 'Confirming' : 'Confirm Resolution'}
											</h5>
										</div>}
										{(!hasApprovedPartRequests && !hasApprovedComponentRequests && !faultsItem?.verify_resolve) &&
										<div className="custum-button">
											<h5
											onClick={(e) => {
												setItemId(faultsItem?.id);
												handleClick(e, {type: {id: faultsItem?.id, button: 'withdraw'}})
											}}
											>
												{responseLoading.some?.(item => item) ? 'Witdrawing' : 'Withdraw Fault'}
											</h5>
										</div>}
									</div>)}

									{/* engineer component, part requests and seek buttons */}
									{(canMakeRequests && !faultsItem?.verify_resolve) &&
									<div
									style={buttonStyle}>
										<div className="custum-button">
											<h5
											// className={disable}
											style={isCompRequestFormOpen ? {...activeStyles} : {}}
											onClick={toggleCompRequestForm}>
												{isCompRequestFormOpen ? 'Close Form' : 'Request Components'}
											</h5>
										</div>
										<div className="custum-button">
											<h5
											// className={disable}
											style={isPartRequestFormOpen ? {...activeStyles} : {}}
											onClick={togglePartRequestForm}>
												{isPartRequestFormOpen ? 'Close Form' : 'Request Parts'}
											</h5>
										</div>
										<div className="custum-button">
											<h5
											style={{color: 'blue'}}
											onClick={(e) => {
												handleClick(e, {type: {id: faultsItem?.id, button: 'seek confirmation'}});
												patchUrlName.current = 'pending-faults';
											}}
											>
												{responseLoading.some?.(item => item) ? 'Seeking ...' : 'Seek Confirmation'}
											</h5>
										</div>
									</div>}
									{isCompRequestFormOpen &&
										(<RequestItem
											requestProps={requestProps}
											vKey='compRequestContext'
											itemName='component'
											/>)}
									{isPartRequestFormOpen &&
										(<RequestItem
											requestProps={requestProps}
											vKey='partRequestContext'
											itemName='part'
											/>)}

									{/* supervisor and human-resource approve/reject request butttons */}
									{(canApproveOrRejectRequests && !faultsItem?.confirm_resolve && !faultsItem?.verify_resolve &&
									faultsItem?.requestStatus && checkStatus && checkRequests) &&
									<div style={buttonStyle}>
										<div className="custum-button">
											<h5
											onClick={(e) => {
												handleClick(e, {type: 'approved'});
												patchUrlName.current = 'request-status';
												setRequeste('approved')
											}}>
												Approve All Requests
											</h5>
										</div>
										<div className="custum-button">
											<h5
											onClick={(e) => {
												handleClick(e, {type: 'rejected'});
												patchUrlName.current = 'request-status';
												setRequeste('rejected')
											}}>
												Reject All Requests
											</h5>
										</div>
									</div>}
								</div>
							</>}
					</div>
			</div>
			{console.log(
				'\ncanConfirmOrWithdraw:', canConfirmOrWithdraw,
				'\nfaultsItem?.logged_by?.branch?.id:', faultsItem?.logged_by?.branch?.id,
				'\nfaultsItem?.logged_by?.branch?.bank?.name:', faultsItem?.logged_by?.branch?.bank?.name,
				'\nfaultsItem?.logged_by?.branch?.state?.id:', faultsItem?.logged_by?.branch?.state.id,
				'\nauthData?.branch?.id:', authData?.branch?.id,
				'\nauthData?.branch?.bank?.name:', authData?.branch?.bank?.name,
				'\nauthData?.branch?.state?.id:', authData?.branch?.state?.id,
				'\nauthData:', authData,
				'\nfaultsItem:', faultsItem,
				'\nauthData?.role === custodian:', authData?.role === 'custodian'
				// faultsItem?.logged_by?.branch?.id === authData?.branch?.id
			)}
		</>
	);
};

export default FaultDetailsGen;