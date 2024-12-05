// import LogFault from "../custodian/log_fault/LogFault";
import UpdateUser from "../human_resource/createAndUpdateUserForms/updateUser";
import Dashboard from "../dashboard/Dashboard";
import { useState } from "react";
// import { AuthContext } from "../../context/checkAuth/AuthContext";
import Notification from "../notification/Notification";
import FaultListDisplay from "../faults/GenFaults/FaultListDisplay";

function Engineer() {
	// let isReload = useRef(false)
	// const [, setNewData] = useState(false)
	const [isUserDetailsFormOpen, setIsUserDetailsFormOpen] = useState(false);
	const toggleUserDetailsForm = () => setIsUserDetailsFormOpen(!isUserDetailsFormOpen);
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	const notificationStyles = {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '1rem 0'
	}
	// const isReload = !!localStorage.getItem('reload')
	// useEffect(() => {
	// 	if (isReload) {
	// 		setNewData(prev => {
	// 			console.log('refreshing FaultListDisplay i.e setting', prev, 'to', !prev)
	// 			return !prev
	// 		})
	// 		localStorage.removeItem('reload')
	// 	}
	// }, [isReload])
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard />
				<hr style={{width: '80%'}} />
				<div style={notificationStyles}>
					{/* pending component requests */}
					<Notification
						urlPath='request-component'
						variableContext='componentKey'
						// totalArrayContext='totalcomponentKey'
						titleKey='Pending Component Requests'
						titleValue='No Pending Requests'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						deleteUrl='request-component'
						handler='requestHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='component-request-list'
						detailPageUrl='component-request-details'
						// refreshKeyList={refreshKeyList}
						button='Withdraw'
						// extraDisplayLocalKeys={[
						// 	'componentKey', 'totalcomponentKey',
						// 	'partKey', 'totalpartKey',
						// 	'partPendingList',	'componentPendingList',
						// 	'allPendingRequests'
						// ]}
						/>

					{/* pending part requests */}
					<Notification
						urlPath='request-part'
						variableContext='partKey'
						// totalArrayContext='totalpartKey'
						titleKey='Pending Parts Requests'
						titleValue='No Pending Requests'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						deleteUrl='request-part'
						handler='requestHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='part-request-list'
						detailPageUrl='part-request-details'
						// refreshKeyList={refreshKeyList}
						button='Withdraw'
						// extraDisplayLocalKeys={[
						// 	'componentKey', 'totalcomponentKey',
						// 	'partKey', 'totalpartKey',
						// 	'partPendingList',	'componentPendingList',
						// 	'allPendingRequests'
						// ]}
						/>

					{/* <Notification
						urlPath='engineer-pending-faults'

						faultsKey
						totalfaultsKey
						unconfirmedKey
						totalunconfirmedKey

						variableContext='faultsKey'
						totalArrayContext='totalfaultsKey'
						titleKey='Pending Faults'
						titleValue='No Pending Faults'
						patchUrl={patchUrl}
						postUrl={postUrl}
						putUrl={putUrl}
						putData={putData}
						deleteUrl={deleteUrl}
						listPageUrl={listPageUrl}
						detailPageUrl={detailPageUrl}
						refreshKeyList={refreshKeyList}
						button={button}
						extraDisplayLocalKeys={['faultpendingList']}
						/> */}

					{/* <PendingRequestNotifi authData={authData}/> */}
					{/* <PendingPartsNotifi authData={authData}/> */}
					{/* <ConfirmResolutionRequestNotifi authData={authData}/> */}
				</div>
				<hr style={{width: '45%'}} />
				<div style={notificationStyles}>
					{/* pending faults */}
					<Notification
						urlPath='engineer-pending-faults'
						variableContext='faultsKey'
						// totalArrayContext='totalfaultsKey'
						titleKey='Pending Faults'
						titleValue='No Pending Faults'
						patchUrl='pending-faults'
						// handler='listHandle'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='pending/fault-gen-list'
						detailPageUrl='pending/fault-gen-details'
						button='Seek Confirmation'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>

						{/* faultsKey
						totalfaultsKey
						unconfirmedKey
						totalunconfirmedKey */}

					{/* pending unconfirmed resolutions */}
					<Notification
						urlPath='engineer-unconfirmed-faults'
						variableContext='unconfirmedKey'
						// totalArrayContext='totalunconfirmedKey'
						titleKey='Unconfirmed Resolutions'
						titleValue='All Resolutions Confirmed'
						// handler='listHandle'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='unconfirmed/fault-gen-list'
						detailPageUrl='unconfirmed/fault-gen-details'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>
				</div>
				<hr style={{width: '80%'}} />
				<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly'
				}}>
					{/* <div className="custum-button">
						<h5
						style={isCompRequestFormOpen ? {...activeStyles} : {}}
						onClick={toggleCompRequestForm}>{isCompRequestFormOpen ? 'Close Form' : 'Request Components'}</h5>
					</div> */}
					{/* <div className="custum-button">
						<h5
						style={isPartRequestFormOpen ? {...activeStyles} : {}}
						onClick={togglePartRequestForm}>{isPartRequestFormOpen ? 'Close Form' : 'Request Parts'}</h5>
					</div> */}
					<div className="custum-button">
						<h5
						style={isUserDetailsFormOpen ? {...activeStyles} : {}}
						onClick={toggleUserDetailsForm}>{isUserDetailsFormOpen ? 'Close Form' : 'Update Details'}</h5>
					</div>
				</div>
				{/* {isCompRequestFormOpen && (<RequestComponentForm />)}
				{isPartRequestFormOpen && (<RequestPartForm />)} */}
				{/* {isPartRequestFormOpen && (<AddPartForm />)} */}
				{isUserDetailsFormOpen && (<UpdateUser />)}
				<FaultListDisplay
					faultUrl='engineer-unresolved-faults/list'
					faultKeyContext='allUnresolvedKey'
					// setNewData={setNewData}
					/>
			</div>
		</>
	);
};


export default Engineer;