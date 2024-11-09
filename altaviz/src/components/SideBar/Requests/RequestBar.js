import "../sidebar_pages.css"
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useRefreshContext } from "../../context/RefreshContext";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
import { styled } from 'styled-components';

function RequestBar ({allRequests, total=null, page, type=null, found=null}) {
	const requestUrlType = useLocation().pathname.split('/');
	let requestType;
	if (requestUrlType[1] === 'workshop') {
		if (requestUrlType[2]) {
			requestType = requestUrlType[2].split('-')[0];
		} else {
			requestType = undefined;
		}
	} else if (requestUrlType[1] === 'human-resource') {
		if (localStorage.getItem('searchRequestData')) {
			requestType = 'items';
		} else {try {requestType = requestUrlType[2].split('-')[0];} catch {}}
	} else {
		requestType = requestUrlType[2].split('-')[0];
	}
	console.log(
		'\ntype:', type,
		'\nrequestUrlType:', requestUrlType,
		'\npage', page
	)
	//// const requestType = useLocation().pathname.split('/')[2].split('-')[0];
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext)
	console.log("allRequests:", allRequests)
	const { refreshIcon } = useRefreshContext();
	console.log(
		'requestType:', requestType,
		'requestType:', requestType,
	)
	const statusStyle = {
		pending: {
			backgroundColor: 'rgba(255, 255, 0, 0.6)',
			border: '1px dotted',
			padding: ' 0 0.3rem',
			borderRadius: '3px',
		},
		name: {
			backgroundColor: '#999',
			color: 'white',
		},
			// padding: '0 0.4rem',
			// borderRadius: '3px',
			// border: '1px dotted',
			// color: 'grey',
		approved: {
			color: 'green',
		},
		unconfirmed: {
			// color: 'rgba(0, 0, 255, 1)',
			color: 'blue',
		},
		rejected: {
			color: 'red',
		},
	}
	// request.quantityRequested?'Request':'Fixed'
	const partType = allRequests.some(item => item.quantityRequested)?'Request':'Fixed'
	console.log({partType}, {requestUrlType})
	const backgroundStyle = {
		backgroundColor:  '#E5E5E5',
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem',
	}
	return (
		<>
			<div
			style={backgroundStyle}
			className="custodian-page">
				<div className="dash-form">
					<div>
						<h4 style={{display: 'flex'}}>
							{!type && 'Requests'}
							{type === 'faultSearch' && `Found ${found}`}
							{(type&&type!=='faultSearch') && type + ' '}{requestType === 'component'?'Components':(requestType === 'part'?'Parts':((type&&type!=='faultSearch')?'Items':null))} {(requestUrlType[1] === 'workshop' && requestType === 'part')?'Posted':(requestType==='items'?null:(requestUrlType[1]==='human-resource'?partType:'Request'))} {requestUrlType[1]!=='human-resource'&&'List'} {(type&&type!=='faultSearch') && refreshIcon}
							{total && ' ('+total+' ' + (total===1?'Item':'Items') + ')'}
						</h4>
					</div>
					<div>
					<hr />
						<div className="input-field">
							<ul
							style={{listStyleType: 'none'}}
							>
								{allRequests &&
								allRequests.map((request, index) => {
									console.log(
										'\nrequest type:', request.type,
										'\nrequestType:', requestType,
									)
									return (
									<li key={request.id+request.requested_at}>
										{/* {console.log('requestIdKey:', request.id)} */}
										<Link
										to={`${type==='faultSearch'?'requestSearch':(requestType!==undefined?requestType:request.type)}-request-details/${type==='faultSearch'?(request.id*request.name.id*request.quantityRequested+'/'+request.name.name+'/'):''}${request.id}`}
										// to={`${type==='faultSearch'?'requestSearch':(requestType==='component'?'component':'part')}-request-details/${type==='faultSearch'?(request.id*request.name.id*request.quantityRequested+'/'+request.name.name+'/'):''}${request.id}`}
										style={{
											textDecoration: 'none',
											color: '#333'
										}}>
											{/* {console.log('request.fault:', !!request.fault)} */}
											{request.fault ?
											// requests with fault
											(<div className="fault-list-block">
												<pre>{type !== 'faultSearch' && `${((page-1)*10)+index+1}. `}<strong
												style={{fontSize: '1.1rem',}}
												>Request: #</strong>{request.id}</pre>
												{
													<div>
														{
															<p><strong>Bank: </strong>
															{request.fault.logged_by.branch.bank.name.toUpperCase()}</p>
														}
														{
															<p><strong>Details: </strong>
																<span style={statusStyle.rejected}
																>
																	{trimString(toSentenceCase(request.fault.title.name), 20)}
																</span>
															</p>
														}
													</div>
												}
												{
													<div>
														{
															<p><strong>{toSentenceCase(request.type?request.type:requestType)}: </strong>
																<span style={statusStyle.unconfirmed}
																>
																	{trimString(toSentenceCase(request?.name?.name?request?.name?.name:request?.name), 16)}
																</span>
															</p>
														}
														{
															<p><strong>Requested By: </strong>
																<span style={{
																	...statusStyle.pending,
																	...statusStyle.name
																}}
																>
																	{trimString(toSentenceCase(request.fault.assigned_to.first_name), 16)}
																</span>
															</p>
														}
														{/* {
															<p><strong>Requests: </strong>
																{(request.partsRequest || request.componentsRequest) ? (
																	<span style={{
																		backgroundColor: 'green',
																		color: 'white',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}
																	>Yes</span>) : 'No'}
															</p>
														} */}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Status: </strong>
															{<span style={(!request?.approved&&!request?.rejected) ? statusStyle.pending : (request?.approved) ? statusStyle.approved : statusStyle.rejected}>
																{(!request?.approved&&!request?.rejected) ? 'Pending': (request?.approved) ? 'Approved' : 'Rejected'}
															</span>}
															{/* {(!request.approved && !request.rejected) ? (
																<span style={{
																	backgroundColor: 'rgba(255, 255, 0, 0.6)',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dotted',
																	}}>Pending
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>Unconfirmed
																</span>
															)} */}
															</p>
														}
														{/* {
															<p>{(request.fault.verify_resolve && !request.fault.confirm_resolve) ? (
																<span
																style={{
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dashed',
																	cursor: 'pointer',
																	fontWeight: 'bold',
                                                                    textDecoration: 'underline',
																	color: '#B5B5BD',
																}}
																>Verify this Resolution
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>
																</span>
															)}
															</p>
														} */}
													</div>
												}
											</div>)
											:
											// requests without fault
											(<div className="fault-list-block">
												<pre>{type !== 'faultSearch' && `${((page-1)*10)+index+1}. `}<strong
												style={{fontSize: '1.1rem',}}
												>{request.quantityRequested?'Request':'Fixed'}: #</strong>{request.id}</pre>
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>{request.type?toSentenceCase(request.type):(request.quantityRequested?'Component':'Part')}: </strong>
															{toSentenceCase(request.name.name?request.name.name:request.name)}</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Quantity: </strong>
																	{request.quantityRequested?request.quantityRequested:request.quantity}
															</p>
														}
													</div>
												}
												{
													<p style={{alignContent: 'center'}}><strong>Requested By: </strong>
														<span style={{
															...statusStyle.pending,
															...statusStyle.name
														}}
														>
															{trimString(toSentenceCase(request.user.first_name), 16)}
														</span>
													</p>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Status: </strong>
															{<span style={(!request?.approved&&!request?.rejected) ? statusStyle.pending : (request?.approved) ? statusStyle.approved : statusStyle.rejected}>
																{(!request?.approved&&!request?.rejected) ? 'Pending': (request?.approved) ? 'Approved' : 'Rejected'}
															</span>}
															{/* {!request.status ? (
																<span style={{
																	backgroundColor: 'rgba(255, 255, 0, 0.6)',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dotted',
																	}}>Pending
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>Approved
																</span>
															)} */}
															</p>
														}
													</div>
												}
											</div>)}
										</Link>
									</li>
								)})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default RequestBar;