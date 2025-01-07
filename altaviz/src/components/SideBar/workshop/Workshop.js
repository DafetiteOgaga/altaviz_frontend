// import LogFault from "../custodian/log_fault/LogFault";
import UpdateUser from "../human_resource/createAndUpdateUserForms/updateUser";
// import AddPartForm from "./addAndRequestCompParts/addPartsForm/AddPartForm";
// import RequestComponentForm from "./addAndRequestCompParts/requestComponentsForm/RequestComponentForm";
import Dashboard from "../dashboard/Dashboard";
import RequestItem from "../requestForms/RequestItem";
import { useState, useEffect } from "react";
import RequestListDisplay from "../Requests/RequestListDisplay";
// import RequestsList from "../Requests/RequestsList";
import Notification from "../notification/Notification";
import UpdateInventoryItems from "../human_resource/addItemToInventory/UpdateInventoryItems";

function Workshop() {
	// const { authData } = useContext(AuthContext);
	const [isCompRequestFormOpen, setIsCompRequestFormOpen] = useState(false);
	const [isPostPartFormOpen, setIsPostPartFormOpen] = useState(false);
	const [isUserDetailsFormOpen, setIsUserDetailsFormOpen] = useState(false);
	const toggleCompRequestForm = () => setIsCompRequestFormOpen(!isCompRequestFormOpen);
	const togglePostPartForm = () => setIsPostPartFormOpen(!isPostPartFormOpen);
	const toggleUserDetailsForm = () => setIsUserDetailsFormOpen(!isUserDetailsFormOpen);
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	const notificationStyles = {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '1rem 0'
	}
	useEffect(() => {
        return () => {
			if (!isUserDetailsFormOpen) {
				localStorage.removeItem('notCustodian');
				localStorage.removeItem('custodian');
				localStorage.removeItem('bankBranches');
			}
        };
    }, [isUserDetailsFormOpen]);
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

					{/* unconfirmed part posts */}
					<Notification
						urlPath='post-part'
						variableContext='partKey'
						// totalArrayContext='totalpartKey'
						titleKey='Posted Parts'
						titleValue='No New Posts'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='requestHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='part-request-list'
						// detailPageUrl='part-request-details'
						detailPageUrl='part-fixed-details'
						// refreshKeyList={refreshKeyList}
						// button='Withdraw'
						// extraDisplayLocalKeys={[
						// 	'componentKey', 'totalcomponentKey',
						// 	'partKey', 'totalpartKey',
						// 	'partPendingList',	'componentPendingList',
						// 	'allPendingRequests'
						// ]}
						/>
				</div>

				{/* <div style={{
					display: 'flex',
                    justifyContent: 'space-around',
				}}>
					<PendingRequestNotifi authData={authData}/>
					<UnapprovedPartsNotifi authData={authData}/>
				</div> */}
				<hr style={{width: '80%'}} />
				<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly'
				}}>
					<div className="custum-button">
						<h5
						style={isCompRequestFormOpen ? {...activeStyles} : {}}
						onClick={toggleCompRequestForm}>{isCompRequestFormOpen ? 'Close Form' : 'Request Components'}</h5>
					</div>
					<div className="custum-button">
						<h5
						style={isPostPartFormOpen ? {...activeStyles} : {}}
						onClick={togglePostPartForm}>{isPostPartFormOpen ? 'Close Form' : 'Post Parts'}</h5>
					</div>
					<div className="custum-button">
						<h5
						style={isUserDetailsFormOpen ? {...activeStyles} : {}}
						onClick={toggleUserDetailsForm}>{isUserDetailsFormOpen ? 'Close Form' : 'Update Details'}</h5>
					</div>
				</div>
				{isCompRequestFormOpen && (<RequestItem itemName='component' />)}
				{/* {isPostPartFormOpen && (<AddPartForm />)} */}
				{isPostPartFormOpen && (<UpdateInventoryItems itemName='post-part' />)}
				{/* {isUserDetailsFormOpen && (<LogFault />)} */}
				{isUserDetailsFormOpen && (<UpdateUser />)}
			{/* </div> */}
				<RequestListDisplay
						requestUrl='workshop-request/list'
						requestKeyContext='allPendingRequests'/>
				{/* <RequestsList localType='component' /> */}
			</div>
		</>
	);
};

export default Workshop;