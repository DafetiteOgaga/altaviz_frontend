import cMockData from "../custodian/custodianMockData";
import wMockData from "../workshop/workshopMockData";
import eMockData from "../engineer/engineerMockData";
import hdMockData from "../help_desk/helpdeskMockData";
import sMockData from "../supervisor/supevisorMockData";
import hrMockData from "../human_resource/humanresourceMockData";
import "../sidebar_pages.css";
import CustomTime from "../../hooks/CustomTime";
import { Link, useLocation } from "react-router-dom";
import Resolved from "../notifications/resolved/Resolved";
import PendingFaults from "../notifications/pending_faults/PendingFaults";
import PendingRequest from "../notifications/pendingRequest/pendingRequest";

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
	const { location:euser } = eMockData();
	const { location:hduser } = hdMockData();
	const { location:suser } = sMockData();
	const { user:hruser } = hrMockData();
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
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Department: </strong>
								{euser.user.department.dept}
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>Department: </strong>
								{hduser.user.department.dept}
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>Department: </strong>
								{suser.user.department.dept}
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>Department: </strong>
								{hruser.department.department}
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
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Email: </strong>
								{euser.user.email}
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>Email: </strong>
								{hduser.user.email}
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>Email: </strong>
								{suser.user.email}
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>Email: </strong>
								{hruser.email}
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
							(<p><strong>Deliveries: </strong>
								{wuser.user.department.numberOfPartsDelivered}
							</p>)}
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Deliveries: </strong>
								{euser.user.department.numberOfPartsDelivered}
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>Deliveries: </strong>
								{hduser.user.department.numberOfPartsDelivered}
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>Photo: </strong>
								{/* {suser.user.profile_photo} */}
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>Photo: </strong>
								{/* {hruser.profile_photo} */}
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
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Engineer: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{euser.user.name}
								</Link>
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>User: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{hduser.user.name}
								</Link>
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>User: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{suser.user.name}
								</Link>
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>User: </strong>
								<Link
								style={{color: '#333'}}
								to="/user/1">
									{hruser.names.firstname}
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
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Phone No.: </strong>
								{euser.user.phone}
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>Phone No.: </strong>
								{hduser.user.phone}
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>Phone No.: </strong>
								{suser.user.phone}
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>Phone No.: </strong>
								{hruser.phone}
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
							{/* engineer */}
							{(componentPage === '/engineer') &&
							(<p><strong>Whatsapp No.: </strong>
								{wuser.user.whatsapp}
							</p>)}
							{/* help-desk */}
							{(componentPage === '/help-desk') &&
							(<p><strong>Whatsapp No.: </strong>
								{hduser.user.whatsapp}
							</p>)}
							{/* supervisor */}
							{(componentPage === '/supervisor') &&
							(<p><strong>Whatsapp No.: </strong>
								{suser.user.whatsapp}
							</p>)}
							{/* human-resource */}
							{(componentPage === '/human-resource') &&
							(<p><strong>Whatsapp No.: </strong>
								{hruser.wphone}
							</p>)}
						</div>
					</div>
					{/* engineer */}
					{(componentPage !== '/workshop') &&
					(<div className="pend-resol">
						{componentPage !== '/human-resource' && <PendingFaults />}
						{/* help-desk/supervisor/human-resource */}
						{(componentPage === '/help-desk' ||
							componentPage === '/supervisor' ||
							componentPage === '/human-resource'
						) && (<PendingRequest />)}
						{(componentPage !== '/help-desk' &&
							componentPage !== '/supervisor' &&
							componentPage !== '/human-resource'
						) && (
							<Resolved componentPage={componentPage.split('/')[1]} text={message} />
						)}
					</div>)}
				</div>
			</div>
		</>
	)
}
export default Dashboard;