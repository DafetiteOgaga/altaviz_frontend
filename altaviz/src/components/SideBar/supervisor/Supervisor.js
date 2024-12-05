import { useState, useEffect } from "react";
import Dashboard from "../dashboard/Dashboard";
import FaultListDisplay from "../faults/GenFaults/FaultListDisplay";
import Notification from "../notification/Notification";
import FaultSearch from "../searches/FaultSearch";
import UpdateUser from "../human_resource/createAndUpdateUserForms/updateUser";
// import EngineerToLocation from "../detailsUpdate/engineerToLocation";

function Supervisor() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
	const [isUserDetailsFormOpen, setIsUserDetailsFormOpen] = useState(false);
	// const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
	const toggleUserDetailsForm = () => setIsUserDetailsFormOpen(!isUserDetailsFormOpen);
	const notificationStyles = {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '1rem 0'
	}
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	useEffect(() => {
        return () => {
			if (!isSearchOpen) {
				localStorage.removeItem('searchData');
			}
            // localStorage.removeItem('searchData');
        };
    }, [isSearchOpen]);
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard />
				<hr style={{width: '80%'}} />
				<div style={notificationStyles}>
					{/* location and branch awaiting engineer assignments */}
					<Notification
						urlPath='new-location-assignment'
						variableContext='engineerAssignments'
						// totalArrayContext='totalUnconfirmedFaultst'
						titleKey='Assign Engineer to Location'
						titleValue='No New Updates'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='noOptions'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='new-location-list'
						// detailPageUrl='user-list/unconfirmedKey'
						// refreshKeyList={refreshKeyList}
						// button='helpdesk-unconfirmed'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>
				</div>

				<hr style={{width: '45%'}} />
				<div style={notificationStyles}>
					{/* pending requests */}
					<Notification
						urlPath='user-request'
						variableContext='faultsKey'
						// totalArrayContext='totalPendingUserRequest'
						titleKey='Engineers with Pending Requests'
						titleValue='No Pending Requests'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='userHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='user/faultsKey'
						detailPageUrl='user-list/faultsKey'
						// refreshKeyList={refreshKeyList}
						// button='Approve'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>

					{/* unconfirmed faults */}
					<Notification
						urlPath='regional-unconfirmed-faults'
						variableContext='unconfirmedKey'
						// totalArrayContext='totalUnconfirmedFaultst'
						titleKey='Engineers with Unresolved Faults'
						titleValue='All Faults confirmed'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='userHandler'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='user/unconfirmedKey'
						detailPageUrl='user-list/unconfirmedKey'
						// refreshKeyList={refreshKeyList}
						// button='helpdesk-unconfirmed'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>
				</div>

				<div
				style={{
					display: 'flex',
					justifyContent: 'space-evenly'
				}}>
					{/* search button and form */}
					<div className="custum-button">
						<h5
						style={isSearchOpen?{...activeStyles}:{}}
						onClick={toggleSearch}>
							{isSearchOpen?'Close Form' : 'Search for Faults'}
						</h5>
					</div>
					<div className="custum-button">
						<h5
						style={isUserDetailsFormOpen?{...activeStyles}:{}}
						onClick={toggleUserDetailsForm}>
							{isUserDetailsFormOpen ? 'Close Form' : 'Update Details'}
						</h5>
					</div>
				</div>
				{isUserDetailsFormOpen && <UpdateUser />}
				{isSearchOpen && < FaultSearch />}
				{!isSearchOpen &&
				<FaultListDisplay
					faultUrl='region-pending-faults/list'
					faultKeyContext='allUnresolvedKey'/>}
			</div>
		</>
	);
};

export default Supervisor;