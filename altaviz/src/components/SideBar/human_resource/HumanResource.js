import Dashboard from "../dashboard/Dashboard";
import CreateUser from "./createAndUpdateUserForms/createUser";
import UpdateUser from "./createAndUpdateUserForms/updateUser";
import { useState, useEffect } from "react";
import "./humanResource.css"
import RequestListDisplay from "../Requests/RequestListDisplay";
import { useNavigate } from "react-router-dom";
// import RequestList from "../xxrequestApprovedPendingResolved/request/RequestList";
// import AddComponent from "../componentComps/AddComponent";
import FaultListDisplay from "../faults/GenFaults/FaultListDisplay";
// import AddComponent from "./addCompParts/componentComps/AddComponent";
// import AddPart from "../human_resource/addCompParts/partComps/AddPart";
// import CustodianDetailsUpdateRequestNotifi from "./updateDetails/custodianDetailsUpdate/CustodianDetailsUpdateRequestNotifi";
import Notification from "../notification/Notification";
import FaultSearch from "../searches/FaultSearch";
import AddItemToInventory from "./addItemToInventory/AddItemToInventory";

function HumanResource() {
	const navigate = useNavigate();
	const [createUser, setCreateUser] = useState(false);
	const [updateUser, setUpdateUser] = useState(false);
	const [Comps, setComps] = useState(false);
	const [Parts, setParts] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	// const [isVisible, setIsVisible] = useState(false);
	const [isRequestList, setIsRequestList] = useState(false);
	const [isFading, setIsFading] = useState(false);
	// const [isMount, setIsMount] = useState(false);
	const [inTransit, setInTransit] = useState(false);
	// const [isComponentReady, setIsComponentReady] = useState(false);

	// const toggleRequestList = () => {setIsRequestList(!isRequestList);}
	// useEffect(() => {
	// 	setIsMount(true)
	// 	const resetMount = setTimeout(() => {
	// 		setIsMount(false);
	// 	}, 3000);
	// 	return () => {clearTimeout(resetMount)};
	// }, [])
	const toggleRequestList = () => {
        setIsFading(true);
		setInTransit(true)
        const fadein = setTimeout(() => {
            setIsRequestList((prev) => !prev);
            setIsFading(false);
        }, 300);
		const delayBG = setTimeout(() => {
            setInTransit(false)
        }, 400);
		return () => {
			clearTimeout(fadein);
			clearTimeout(delayBG);
		};
    };
	const toggleSearchBtn = () => {
        setIsFading(true);
		setInTransit(true)
        const fadein = setTimeout(() => {
            setIsRequestList((prev) => !prev);
            setIsFading(false);
        }, 300);
		const delayBG = setTimeout(() => {
            setInTransit(false)
        }, 400);
		return () => {
			clearTimeout(fadein);
			clearTimeout(delayBG);
		};
    };
	// useEffect(() => {
	// 	return ()=> {
	// 		const timeout = setTimeout(() => {
	// 			setIsVisible(true)
	// 		}, 5000); // Trigger fade-in immediately on mount
	// 		return () => clearTimeout(timeout);
	// 	}
	// }, [isSearchOpen]);
    const toggleStyles = {
            transition: 'opacity 3s ease-in-out',
            opacity: isFading ? 0 : 1,
            pointerEvents: isFading ? 'none' : 'auto',
        }
	// const searchStyles = {
	// 	opacity: isVisible ? 1 : 0,
	// 	transition: 'opacity 3s ease-in-out',
	// 	pointerEvents: isVisible ? 'auto' : 'none',
	// };
	const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
	const toggleCreateUser = () => setCreateUser(!createUser);
	const toggleUpdateUser = () => setUpdateUser(!updateUser);
	const toggleAddComps = () => setComps(!Comps);
	const toggleAddParts = () => setParts(!Parts);
	const gotoInventory = () => navigate('/inventory');
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
				localStorage.removeItem('searchRequestData');
			}
            // localStorage.removeItem('searchData');
        };
    }, [isSearchOpen]);
	const backgroundStyle = {
		backgroundColor:  '#E5E5E5',
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem',
	}
	return (
		<>
			<div
			style={backgroundStyle}
			className="custodian-page">
				<Dashboard />
				<hr style={{width: '80%'}} />
				<div style={notificationStyles}>
					{/* pending component requests */}
					<Notification
						urlPath='workshop-component-request'
						variableContext='componentKey'
						// totalArrayContext='totalcomponentKey'
						titleKey='Workshop Requests'
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
						button='Approve'
						extraDisplayLocalKeys={[
							'componentKey', 'totalcomponentKey',
							'partKey', 'totalpartKey',
							'partPendingList',	'componentPendingList',
							'allPendingRequests'
						]}
						/>

					{/* unconfirmed part posts */}
					<Notification
						urlPath='post-part'
						variableContext='partKey'
						// totalArrayContext='totalpartKey'
						titleKey='Fixed Parts'
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
						button='Approve'
						// secondButton='Reject'
						// extraDisplayLocalKeys={[
						// 	'componentKey', 'totalcomponentKey',
						// 	'partKey', 'totalpartKey',
						// 	'partPendingList',	'componentPendingList',
						// 	'allPendingRequests'
						// ]}
						/>
				</div>
				<hr style={{width: '45%'}} />
				<div style={notificationStyles}>
					{/* account update requests */}
					<Notification
						urlPath='approve-user-details-update'
						variableContext='updateAccount'
						// totalArrayContext='totalAccountUpdateRequestContext'
						titleKey='Account Update Requests'
						titleValue='No Requests'
						// patchUrl={patchUrl}
						// postUrl={postUrl}
						// putUrl={putUrl}
						// putData={putData}
						// deleteUrl='request-component'
						handler='accountUpdate'
						// listHandle
						// requestHandler
						// unapprovedHandler
						listPageUrl='update/updateAccount'
						detailPageUrl='update-details'
						// refreshKeyList={refreshKeyList}
						// button='Approve'
						// extraDisplayLocalKeys={[
						// 	'faultsKey', 'totalfaultsKey',
						// 	'unconfirmedKey', 'totalunconfirmedKey',
						// 	'faultpendingList',	'faultunconfirmedList',
						// 	'allUnresolvedKey'
						// ]}
						/>

					{/* pending requests with faults */}
					<Notification
						urlPath='all-request-faults'
						variableContext='faultsKey'
						// totalArrayContext='totalPendingUserRequest'
						titleKey='Engineers with Requests'
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
						// secondButton='Reject'
						extraDisplayLocalKeys={[
							'faultsKey', 'totalfaultsKey',
							'unconfirmedKey', 'totalunconfirmedKey',
							'faultpendingList',	'faultunconfirmedList',
							'allUnresolvedKey'
						]}
						/>
				</div>
				<hr style={{width: '80%'}} />
				{/* inventory, parts and components buttons */}
				<div className="custum-button">
					{/* inventory list and form */}
					<h5 onClick={gotoInventory}>Inventory</h5>

					{/* component form */}
					<h5
					style={Comps ?
						{...activeStyles} :
						{}}
					onClick={toggleAddComps}>{Comps ?
						'Close Form'
						: 'Add Components'}
					</h5>

					{/* part form */}
					<h5
					style={Parts ?
						{...activeStyles} :
						{}}
					onClick={toggleAddParts}>{Parts ?
						'Close Form':
						'Add Parts'}
					</h5>
				</div>

				{/* account creation and update forms */}
				<div className="custum-button">
					{/* account creation form */}
					<h5
					style={createUser ?
						{...activeStyles} :
						{}}
					onClick={toggleCreateUser}>{createUser ?
						'Close Form' :
						'New Account'}
					</h5>
					{/* account update form */}
					<h5
					style={updateUser ?
						{...activeStyles} :
						{}}
					onClick={toggleUpdateUser}>{updateUser ?
						'Close Form' :
						'Update Acount'}
					</h5>

					{/* search button and form */}
					<h5
					style={
						isSearchOpen ?
							{...activeStyles} :
							{}}
					onClick={(e)=>{
						toggleSearch();
						toggleSearchBtn();
						}}>
						{isSearchOpen ?
							'Close Form' :
							'Search for Requests'}
					</h5>
				</div>
				<hr style={{width: '50%'}} />

				<div className="custum-button">
					{/* search button and form */}
					<h5
					style={
						!isRequestList ?
							{...activeStyles} :
							{}}
					onClick={toggleRequestList}>
						Requests with Faults
					</h5>
					{/* search button and form */}
					<h5
					style={
						isRequestList ?
							{...activeStyles} :
							{}}
					onClick={toggleRequestList}>
						Requests Only
					</h5>
				</div>
				<div style={{...toggleStyles, ...(inTransit?{paddingBottom: '100rem'}:{})}}>
					{isSearchOpen && < FaultSearch />}
				</div>
				{Comps && (<AddItemToInventory itemName='components' />)}
				{Parts && (<AddItemToInventory itemName='parts' />)}
				{createUser && (<CreateUser />)}
				{updateUser && (<UpdateUser />)}

				<div style={{...toggleStyles, ...(inTransit?{paddingBottom: '100rem'}:{})}}>
					{(!isSearchOpen)&&(!isRequestList ?
					<FaultListDisplay
						faultUrl='all-pending-faults-wRequests/list'
						faultKeyContext='allUnresolvedKey'/> :
					<RequestListDisplay
						requestUrl='all-request-only/list'
						requestKeyContext='allPendingRequests'/>)}
				</div>
			</div>
		</>
	);
};

export default HumanResource;