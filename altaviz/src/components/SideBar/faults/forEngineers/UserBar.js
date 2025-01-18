import "../../sidebar_pages.css"
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
// import Engineer from '../../engineer/Engineer';
import { AuthContext } from "../../../context/checkAuth/AuthContext";

function UserBar ({allUsers, page, loading}) {
	const engineerParams = useParams();
	const { authData } = useContext(AuthContext);
	// const [uniqueList, setUniqueList] = useState(null);
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext)
	console.log("allUsers:", allUsers)
	console.log({engineerParams})
	console.log(
		'\nloading:', {loading},
		'\nallUsers:', !!allUsers,
	)
	return (
		<>
			<div className="background-color custodian-page">
				{/* {checkCustodian && <CustomTime name={name} />} */}
				<div className="dash-form">
					<div>
						<h4>{engineerParams.context==='updateAccount'?`Account Update`:`Engineers with ${engineerParams.context==='faultsKey'?'Requests':'Faults'}`}</h4>
					</div>
					<div>
					<hr />
						<div className="input-field">
							<ul
							style={{listStyleType: 'none'}}
							>
								{(!allUsers && loading) &&
								// {allUsers &&
								(<p style={{
									padding: '1rem',
									color: '#888',
									fontSize: '1.2rem',
									textAlign: 'center',
								}}>Loading List ...</p>)}

								{allUsers &&
								// for engineer faults
								((engineerParams.context==='faultsKey'||engineerParams.context==='unconfirmedKey') ?
								(allUsers.map((engineer, index) => (
									<li key={engineer.id}>
										<Link
										// /help-desk/user-list/faultsKey/1
										to={`/${engineerParams.dept}/user-list/${engineerParams.context}/${engineer.id}`}
										style={{
											textDecoration: 'none',
											color: '#333'
										}}>
											<div className="fault-list-block">
												<pre>{((page-1)*10)+index+1}. <strong
												style={{fontSize: '1.1rem',}}
												>Engineer</strong>
												{/* {user.id} */}
												</pre>
												{/* {
													<div>
														{
															<p><strong>Bank: </strong>
															{user.logged_by.branch.bank.name.toUpperCase()}</p>
														}
														{
															<p><strong>Details: </strong>
																<span style={{
																	color: 'red',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{toSentenceCase(user.title.name)}
																</span>
															</p>
														}
													</div>
												} */}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Name: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{trimString(toSentenceCase(engineer.first_name), 16)}
																</span>
															</p>
														}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
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
												{authData.role === 'supervisor' &&
													<div style={{alignContent: 'center'}}>
														{/* {
															<p><strong>Managed By: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{trimString(toSentenceCase(user.managed_by.first_name), 16)}
																</span>
															</p>
														} */}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
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
														{/* {
															<p><strong>Name: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{toSentenceCase(user.engineer.first_name)}
																</span>
															</p>
														} */}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
																	<span style={{
																		backgroundColor: 'green',
																		color: 'white',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}
																	>Yes</span>) : 'No'}
															</p>
														} */}
														{
															<p><strong>Faults: </strong>
																<span style={{
																	color: 'blue',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	fontWeight: 'bold',
																}}
																>
																	{engineer.faults.length}
																</span>
															</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Requests: </strong>
																{(engineer?.faults?.some?.(fault => fault.requestStatus === true)) ? (
																	<span style={{
																		color: '#87823E',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																		fontWeight: 'bold',
																	}}>
																		{(engineer?.faults?.reduce((count, request) => {
																			count += request.requestComponent.length??0
																			count += request.requestPart.length??0
																			// console.log('\ncount (after):', count,)
																			return count
																		}, 0))}
																		{/* {(engineer?.faults?.requestComponent?.length??0)+(engineer?.faults?.requestPart?.length??0)} */}
																	</span>) : 'No'}
															</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Requests: </strong>
																{(engineer?.faults?.some?.(fault => fault.requestStatus === true)) ? (
																	<span style={{
																		backgroundColor: 'green',
																		color: 'white',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}
																	>Yes</span>) : 'No'}
															</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Status: </strong>
															{(!engineer.confirm_resolve && !engineer.verify_resolve) ? (
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
															)}
															</p>
														}
														{/* {
															<p>{(user.verify_resolve && !user.confirm_resolve) ? (
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
											</div>
										</Link>
									</li>))) :

								// for update requests
								((engineerParams.context==='updateAccount') &&
								allUsers.map((user, index) => (
									<li key={user.id}>
										<Link
										// human-resource/update-details/2/28
										to={`/${engineerParams.dept}/update-details/${user.requestUser.id}/${user.id}`}
										style={{
											textDecoration: 'none',
											color: '#333'
										}}>
											<div className="fault-list-block">
												<pre>{((page-1)*10)+index+1}. <strong
												style={{fontSize: '1.1rem',}}
												>Update Request</strong>
												{/* {user.id} */}
												</pre>
												{/* {
													<div>
														{
															<p><strong>Bank: </strong>
															{user.logged_by.branch.bank.name.toUpperCase()}</p>
														}
														{
															<p><strong>Details: </strong>
																<span style={{
																	color: 'red',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{toSentenceCase(user.title.name)}
																</span>
															</p>
														}
													</div>
												} */}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Name: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{trimString(toSentenceCase(user.requestUser.first_name), 16)}
																</span>
															</p>
														}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
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
												{authData.role === 'supervisor' &&
													<div style={{alignContent: 'center'}}>
														{/* {
															<p><strong>Managed By: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{trimString(toSentenceCase(user.managed_by.first_name), 16)}
																</span>
															</p>
														} */}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
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
														{/* {
															<p><strong>Name: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{toSentenceCase(user.engineer.first_name)}
																</span>
															</p>
														} */}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
																	<span style={{
																		backgroundColor: 'green',
																		color: 'white',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}
																	>Yes</span>) : 'No'}
															</p>
														} */}
														{
															<p><strong>New Location: </strong>
																<span style={{
																	color: 'blue',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	// fontWeight: 'bold',
																}}
																>
																	{toSentenceCase(user.newLocation)}
																</span>
															</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{/* {
															<p><strong>Name: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{toSentenceCase(user.engineer.first_name)}
																</span>
															</p>
														} */}
														{/* {
															<p><strong>Requests: </strong>
																{(user.requestStatus) ? (
																	<span style={{
																		backgroundColor: 'green',
																		color: 'white',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}
																	>Yes</span>) : 'No'}
															</p>
														} */}
														{
															<p><strong>State: </strong>
															<span style={{
																backgroundColor: '#999',
																color: 'white',
																padding: ' 0 0.3rem',
																borderRadius: '3px',
															}}
															>
																{trimString(toSentenceCase(user.newState), 16)}
															</span>
														</p>
														}
													</div>
												}
												{
													<div style={{alignContent: 'center'}}>
														{
															<p><strong>Status: </strong>
															{(!user.approve && !user.reject) ? (
																<span style={{
																	backgroundColor: 'rgba(255, 255, 0, 0.6)',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dotted',
																	}}>Pending
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>Attended To
																</span>
															)}
															</p>
														}
														{/* {
															<p>{(user.verify_resolve && !user.confirm_resolve) ? (
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
											</div>
										</Link>
									</li>)
								)))
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default UserBar;