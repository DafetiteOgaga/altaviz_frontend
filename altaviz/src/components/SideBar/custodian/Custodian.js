import Dashboard from "../dashboard/Dashboard";
import LogFault from "./LogFault";
import UpdateUser from "../human_resource/createAndUpdateUserForms/updateUser";
import { useState, useEffect } from "react";
import Notification from '../notification/Notification';
import FaultListDisplay from "../faults/GenFaults/FaultListDisplay";

function Custodian() {
	const [isFaultFormOpen, setIsFaultFormOpen] = useState(false);
	const [isDetailsFormOpen, setIsDetailsFormOpen] = useState(false);
	// const { refresh } = useContext(RefreshContext);

	const toggleFault = () => setIsFaultFormOpen(!isFaultFormOpen);
	const toggleEditDetails = () => setIsDetailsFormOpen(!isDetailsFormOpen);
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
			if (!isDetailsFormOpen) {
				localStorage.removeItem('notCustodian');
				localStorage.removeItem('custodian');
			}
            // localStorage.removeItem('searchData');
        };
    }, [isDetailsFormOpen]);
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard />
				<hr style={{width: '80%'}} />
				<div style={notificationStyles}>
					{/* pending faults */}
					<Notification
						urlPath='pending-faults'
						variableContext='faultsKey'
						// totalArrayContext='totalfaultsKey'
						titleKey='Pending Faults'
						titleValue='No Pending faults'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						deleteUrl='fault'
						// handler='listHandle'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='pending/fault-gen-list'
						detailPageUrl='pending/fault-gen-details'
						// refreshKeyList={refreshKeyList}
						button='Withdraw'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>

					{/* unconfirmed Resolutions */}
					<Notification
						urlPath='unconfirmed-faults'
						variableContext='unconfirmedKey'
						// totalArrayContext='totalunconfirmedKey'
						titleKey='Unconfirmed Resolutions'
						titleValue='All Resolutions Confirmed'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl='unconfirmed-faults'
						patchUrl='unconfirmed-faults'
						// putData={putData}
						// deleteUrl='fault'
						// handler='listHandle'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='unconfirmed/fault-gen-list'
						detailPageUrl='unconfirmed/fault-gen-details'
						// refreshKeyList={refreshKeyList}
						button='Confirm'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>
				</div>
				<hr style={{width: '80%'}} />

				{/* form buttons/toggle */}
				<div style={{
					display: 'flex',
					justifyContent: 'space-evenly'
				}}>
					<div className="custum-button">
						<h5
						style={isFaultFormOpen ? {...activeStyles} : {}}
						onClick={toggleFault}>{isFaultFormOpen ? 'Close Form' : 'Log Faults'}</h5>
					</div>
					<div className="custum-button">
						<h5
						style={isDetailsFormOpen ? {...activeStyles} : {}}
						onClick={toggleEditDetails}>{isDetailsFormOpen ? 'Close Form' : 'Update Details'}</h5>
					</div>
				</div>

				{/* forms */}
				{isFaultFormOpen && (<LogFault />)}
				{isDetailsFormOpen && (<UpdateUser />)}

				{/* unresolved/unconfirmed fault list */}
				<FaultListDisplay
					faultUrl='unresolved-faults/list'
					faultKeyContext='allUnresolvedKey'/>

			</div>
		</>
	);
};

export default Custodian;