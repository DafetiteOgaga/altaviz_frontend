// import LogFault from "../custodian/log_fault/LogFault";
import UpdateUser from "../human_resource/createAndUpdateUserForms/updateUser";
// import AddPartForm from "./addAndRequestCompParts/addPartsForm/AddPartForm";
// import RequestComponentForm from "./addAndRequestCompParts/requestComponentsForm/RequestComponentForm";
import Dashboard from "../dashboard/Dashboard";
import RequestItem from "../requestForms/RequestItem";
import { useState } from "react";
// import { AuthContext
import RequestsList from "../Requests/RequestsList";
import Notification from "../notification/Notification";
import AddItemToInventory from "../human_resource/addCompParts/AddItemToInventory";
// import RequestNotification from "../notification/RequestNotification";
// import PendingRequestNotifi from "./notificationsWorkshop/pendingRequestNotifi";
// import UnapprovedPartsNotifi from "./notificationsWorkshop/UnapprovedPartsNotifi";
// import { AuthContext } from '../../context/checkAuth/AuthContext';


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
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard />
				<hr style={{width: '80%'}} />
				<div style={notificationStyles}>
					{/* pending component requests */}
					<Notification
						urlPath='request-component'
						variableContext='compRequestContext'
						totalArrayContext='totalPendingCompRequest'
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
						/>

					{/* unconfirmed part posts */}
					<Notification
						urlPath='post-part'
						variableContext='unapprovedContext'
						totalArrayContext='totalUnapproved'
						titleKey='Posted Parts'
						titleValue='No New Posts'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='partPostHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='part-request-list'
						detailPageUrl='part-request-details'
						// refreshKeyList={refreshKeyList}
						// button='Withdraw'
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
				{isPostPartFormOpen && (<AddItemToInventory itemName='post-part' />)}
				{/* {isUserDetailsFormOpen && (<LogFault />)} */}
				{isUserDetailsFormOpen && (<UpdateUser />)}
			</div>
			<RequestsList localType='component' />
		</>
	);
};

export default Workshop;