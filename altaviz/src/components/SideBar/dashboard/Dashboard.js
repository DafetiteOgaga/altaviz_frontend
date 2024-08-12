import cMockData from "../custodian/custodianMockData";
import wMockData from "../workshop/workshopMockData";
import "../sidebar_pages.css";
import CustomTime from "../../hooks/CustomTime";
import { Link, useLocation } from "react-router-dom";
import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";
import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";

function Dashboard({name, pageName}) {
	// const name = 'Paul';
	const message = 'from dashboard:'
	let componentPage = useLocation();
	componentPage = componentPage.pathname;
	// const pageName = '/custodian';
	// if (componentPage === pageName) {
	// }
	const { location, banks, locations } = cMockData();
	const { location:wuser } = wMockData();
	return (
		<>
			
			<CustomTime name={name} />
			<div className="dash-form">
				<h4>Dashboard</h4>
				<hr />
				<div>
					<div className="cust-row">
						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>Bank: </strong>
								{banks[location.bank.name]}
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Department: </strong>
								{wuser.user.department.dept}
							</p>)}
						</div>

						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>State: </strong>
								{locations[location.bank.state]}
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Email: </strong>
								{wuser.user.email}
							</p>)}
						</div>
						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>Branch: </strong>
								{location.bank.branch.branchName}
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Photo: </strong>
								{wuser.user.profile_photo}
							</p>)}
						</div>
					</div>
					<div className="cust-row">
						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>Engineer: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{location.bank.branch.cEngineer}
								</Link>
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Engineer: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{wuser.user.name}
								</Link>
							</p>)}
						</div>
						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>Help Desk: </strong>
								<Link
									style={{color: '#333'}}
									to="/user/1">
									{location.bank.branch.helpDesk}
								</Link>
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Phone No.: </strong>
								{wuser.user.phone}
							</p>)}
						</div>
						<div className="input-field">
							{/* custodian */}
							{(componentPage === '/custodian') &&
							(<p><strong>ATM Brand: </strong>
								{location.bank.branch.ATMs.type}
							</p>)}
							{/* workshop */}
							{(componentPage === '/workshop') &&
							(<p><strong>Whatsapp No.: </strong>
								{wuser.user.whatsapp}
							</p>)}
						</div>
					</div>
					<div className="pend-resol">
						<PendingFaults />
						<Resolved text={message} />
					</div>
				</div>
			</div>
		</>
	)
}
export default Dashboard;