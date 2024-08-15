import "../../sidebar_pages.css"
import { Link, useLocation } from "react-router-dom";
import hdMockData from "../../help_desk/helpdeskMockData";

function FaultList () {
	const { faultDetails } = hdMockData();
	let componentPage = useLocation();
	componentPage = componentPage.pathname;
	return (
		<>
			<div className="dash-form">
				<div>
					<h4>Faults List</h4>
				</div>
				<div>
				<hr />
					<div className="input-field">
						<ul
						style={{listStyleType: 'none'}}
						>
							{faultDetails.map((fault) => (
								<li key={fault.id}>
									<Link
									to={`/request-details/${fault.id}`}
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
														{fault.title}</p>
													}
												</div>
											}
											{
												<div>
													{
														<p><strong>For: </strong>
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
															{fault.requests ? 'Yes' : 'No'}
														</p>
													}
												</div>
											}
											{/* supervisor */}
											{
												(componentPage === '/supervisor') &&
												(<div>
													{
														<p
														style={{
															color: 'transparent'
														}}
														><strong>placeholder: </strong>
															yes
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
																}}>{fault.faultStatus}
															</span>) : (
															<span style={{
																color: 'rgba(0, 0, 255, 1)',
															}}>{fault.faultStatus}
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
		</>
	)
}
export default FaultList;