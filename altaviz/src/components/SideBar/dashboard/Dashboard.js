import "../sidebar_pages.css";
import CustomTime from "../../hooks/CustomTime";
import Deliveries from "./DeliveriesPoints";
import { Link, useLocation } from "react-router-dom";
// import Resolved from "../bbbbbnotifications/xxresolved/Resolved";
// import PendingFaults from "../bbbbbnotifications/xxpending_faults/PendingFaults";
import { useContext } from "react";
// import useForceDBPullWEncryption
// import usePullNotification from "../../paginationComp/usePullNotification";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
import { useRefreshContext } from "../../context/RefreshContext";
// import useForceDBPullWEncryption from '../../paginationComp/useForceDBPullWEncryption';

function Dashboard() {
	const { authData } = useContext(AuthContext);
	const { toSentenceCase, separateChars, removeHyphen } = useContext(SentenceCaseContext);
	const { refreshIcon } = useRefreshContext();
	const department = useLocation().pathname.split('/')[1]
	const custodianCheck = (authData?.role==='custodian') ?? null
	const supervisorAndHelpDesk = !!authData?.branch?.name
	const notAvailable = 'not available yet'
	console.log(
		'\nauthData:', authData,
		'\ncustodianCheck:', custodianCheck,
		'\ncheck:', separateChars('8038091572'),
	)
	// console.log()
	return (
		<>
			<div style={{paddingTop: '2rem'}}>
				{authData && <CustomTime authData={authData} />}
				{/* <div className="dash-form"> */}
				<div className={`dash-form ${authData?.role !== department ? 'error-outline' : ''}`}>
					<div
					style={{display: 'flex'}}
					>
						<h4 style={{margin: '0'}}>Dashboard</h4>
						<div
						style={{paddingTop: '0.5rem'}}
						// onClick={refreshDashboard}
						>
							{refreshIcon}
						</div>
					</div>
					<hr />
					{authData &&
					(<div>
						{custodianCheck &&
						// custodian, bank, branch, etc
						<div className="cust-row">
							<div className="input-field">
								<p><strong>Bank: </strong>
									{authData.branch.bank.name.toUpperCase()}
								</p>
							</div>
							<div className="input-field">
								<p><strong>State: </strong>
									{toSentenceCase(authData.branch.state.name)}|{authData.branch.state.initial.toUpperCase()}
								</p>
							</div>
							<div className="input-field">
								<p><strong>Branch: </strong>
									{toSentenceCase(authData.branch.name)}
								</p>
							</div>
							<div className="input-field">
								<p><strong>Branch Location: </strong>
									{toSentenceCase(authData.branch.location.location)}
								</p>
							</div>
							<div className="input-field">
								{<p><strong>Region: </strong>
									{toSentenceCase(authData.branch.region.name)}
								</p>}
							</div>
						</div>}
						{/* user info */}
						<div className="cust-row">
							{/* <div className="input-field">
								<p><strong>Role: </strong>
									{toSentenceCase(authData.role)}
								</p>
							</div> */}
							<div className="input-field">
								<p><strong>Email: </strong>
									{authData.email}
								</p>
							</div>
							<div className="input-field">
								<p><strong>Role: </strong>
									{toSentenceCase(removeHyphen(authData.role))}
								</p>
							</div>
							{(!custodianCheck&&authData.role!=='human-resource') &&
							<div className="input-field">
								<p><strong>Deliveries: </strong>
									{<Deliveries id={authData.id} />}
								</p>
							</div>}
						</div>
						{/* for custodian */}
						<div className="cust-row">
							{custodianCheck &&
							<div className="input-field">
								<p><strong>Branch Engineer: </strong>
									{authData.branch.branch_engineer ?
									(<Link
									style={{color: '#333'}}
									to={`/user/${authData.branch.branch_engineer.engineer.id}`}>
										{toSentenceCase(authData.branch.branch_engineer.engineer.first_name || authData.branch.branch_engineer.engineer.username)}
									</Link>):'An Engineer will be Assigned shortly'}
								</p>
							</div>}
							{(authData?.role !== 'human-resource' && authData?.role !== 'workshop') &&
							<>
								<div className="input-field">
									<p><strong>Help Desk: </strong>
										{supervisorAndHelpDesk ?
										<Link
										style={{color: '#333'}}
										to={`/user/${authData?.branch?.region?.helpdesk?.id}`}>
											{toSentenceCase(authData.branch.region.helpdesk.first_name || authData.branch.region.helpdesk.username)}
										</Link>: <span>{toSentenceCase(notAvailable)}</span>}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Supervisor: </strong>
										{supervisorAndHelpDesk ?
										<Link
										style={{color: '#333'}}
										to={`/user/${authData.branch.region.supervisor.id}`}>
											{toSentenceCase(authData.branch.region.supervisor.first_name || authData.branch.region.supervisor.username)}
										</Link>: <span>{toSentenceCase(notAvailable)}</span>}
									</p>
								</div>
							</>}
						</div>

						<div className="cust-row">
							<div className="input-field">
								<p><strong>Name: </strong>
									<Link
									style={{color: '#333'}}
									to={`/user/${authData.id}`}>
										{toSentenceCase(authData.first_name || authData.username)}
									</Link>
								</p>
							</div>
							<div className="input-field">
								<p><strong>Phone No.: </strong>
									+234 {separateChars(authData.phone)}
								</p>
							</div>
							<div className="input-field">
								<p><strong>Whatsapp No.: </strong>
									+234 {separateChars(authData.wphone)}
								</p>
							</div>
						</div>
						{!custodianCheck &&
						<div className="cust-row">
							<div className="input-field">
								{<p><strong>State: </strong>
									{toSentenceCase(authData.state.name)}|{authData.state.initial}
								</p>}
							</div>
							<div className="input-field">
								{<p><strong>Location: </strong>
									{(toSentenceCase(authData.location.location))}
								</p>}
							</div>
							<div className="input-field">
								{<p><strong>Region: </strong>
									{toSentenceCase(authData.userRegion)}
								</p>}
							</div>
						</div>}
						{/* engineer and workshop */}
						{/* <div className="cust-row"> */}
							{/* {(authData.role === 'workshop' || authData.role === 'engineer') &&
							<div className="input-field">
								<p><Link
								style={{color: '#333'}}
								to={'approved-component-request-list/'}>
									<strong>Approved Component Requests</strong>
								</Link></p>
							</div>} */}
							{/* workshop */}
							{/* {(authData.role === 'workshop') &&
							<div className="input-field">
								<p><Link
								style={{color: '#333'}}
								to={'approved-part-list/'}>
									<strong>Approved Parts</strong>
								</Link></p>
							</div>} */}
							{/* engineer */}
							{/* {(authData.role === 'engineer') &&
							<div className="input-field">
								<p><Link
								style={{color: '#333'}}
								to={'approved-part-request-list/'}>
									<strong>Approved Part Requests</strong>
								</Link></p>
							</div>} */}
						{/* </div> */}
					</div>)}
				</div>
			</div>
		</>)
}
export default Dashboard;