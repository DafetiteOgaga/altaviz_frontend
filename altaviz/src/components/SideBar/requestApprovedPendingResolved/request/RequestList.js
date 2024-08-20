import "../../sidebar_pages.css"
import { Link, useLocation } from "react-router-dom";
import hdMockData from "../../help_desk/helpdeskMockData";
import {SupervisorListfxn} from "../../human_resource/humanresourceMockData";
import CustomTime from "../../../hooks/CustomTime";
// import { useState } from "react";
import useCheckDept from "../../../hooks/useCheckDept";

function RequestList () {
	const { faultDetails } = hdMockData();
	const { supervisorList } = SupervisorListfxn();
	// console.log('supervisorList:', supervisorList);
	const componentPage = useLocation().pathname.split('/')[1];
	// componentPage = componentPage.pathname;
	// console.log('componentPage: (REQUEST-LIST)', componentPage);

	const { checkCustodian } = useCheckDept(componentPage);
	// const [isHovered, setIsHovered] = useState(false);
	// const [isActive, setIsActive] = useState(false);
	// console.log('checkCustodian after:', checkCustodian);
	const name = 'fault_list';
	const handleResolutionConfirmation = (e, index) => {
		console.log('first came here!');
		e.preventDefault();
		const form = new FormData();
		form.append('resolution', 1); // 1 indicates yes (confirmed)
		// send to backend via post method
		form.forEach((k, v) => {
			console.log('key:', k, '\nvalue:', v);
		})
		// after every confirmation the server should send updated
		// entries for new rendering (use useEffect)
	}
	return (
		<>
			<div className="background-color custodian-page">
				{checkCustodian && <CustomTime name={name} />}
				<div className="dash-form">
					<div>
						<h4>{(componentPage === 'human-resource') ? 'Requests' : 'Faults'} List</h4>
					</div>
					<div>
					<hr />
						<div className="input-field">
							<ul
							style={{listStyleType: 'none'}}
							>
								{faultDetails.map((fault, index) => (
									<li key={fault.id}>
										<Link
										to={`request-details/${fault.id}`}
										style={{
											textDecoration: 'none',
											color: '#333'
										}}>
											<div className="fault-list-block">
												Fault #{fault.id}
												{
													<div>
														{
															<p><strong>Bank: </strong>
															{fault.bank}</p>
														}
														{
															<p><strong>Details: </strong>
																<span style={{
																	// backgroundColor: '',
																	color: 'red',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{fault.title}
																</span>
															</p>
														}
													</div>
												}
												{
													<div>
														{
															<p><strong>Assigned to: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{fault.engineer}
																</span>
															</p>
														}
														
														{
															<p><strong>Requests: </strong>
																{fault.requests ? (
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
												{/* supervisor/human resource */}
												{
													(componentPage === 'supervisor' ||
														componentPage === 'human-resource'
													) &&
													(<div>
														{
															<p>
																{
																	(componentPage === 'human-resource') ? (
																	<>
																		<strong>Supervised by: </strong>
																		<span style={{
																			backgroundColor: '#7d95b1',
																			color: 'white',
																			padding: ' 0 0.3rem',
																			borderRadius: '3px',
																		}}
																		>
																			{supervisorList[index]}
																		</span>
																	</>
																	) : (<span style={{color: 'transparent'}}>nothing</span>)
																}
															</p>
														}
														{
															<p><strong>Managed by: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																}}
																>
																	{fault.helpDesk}
																</span>
															</p>
														}
														
														{/* {
															<p><strong>Requests: </strong>
																{fault.requests ? 'Yes' : 'No'}
															</p>
														} */}
													</div>)
												}
												{
													<div>
														{
															<p><strong>Status: </strong>
															{(fault.faultStatus === 'Pending') ? (
																<span style={{
																	backgroundColor: 'rgba(255, 255, 0, 0.6)',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dotted',
																	}}>{fault.faultStatus}
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>{fault.faultStatus}
																</span>
															)}
															</p>
														}
														{
															<p>{(fault.faultStatus === 'Pending') ? (
																<span
																onClick={(e) => handleResolutionConfirmation(e)}
																style={{
																	// backgroundColor: 'lightgreen',
																	padding: ' 0 0.3rem',
																	borderRadius: '3px',
																	border: '1px dashed',
																	cursor: 'pointer',
																	fontWeight: 'bold',
                                                                    textDecoration: 'underline',
                                                                    // background: 'transparent',
																	color: '#B5B5BD',
																}}
																>Verify Resolution
																</span>) : (
																<span style={{
																	color: 'rgba(0, 0, 255, 1)',
																}}>
																</span>
															)}
															</p>
														}
													</div>
												}
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default RequestList;