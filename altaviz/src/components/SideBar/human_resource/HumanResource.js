import Dashboard from "../dashboard/Dashboard";
// import LogFault from "../log_fault/LogFault";
import CreateUser from "./createUser";
import UpdateUser from "./UpdateUser";
import { useState } from "react";
// import { FetchContext } from "../../context/FetchContext";
import "./humanResource.css"
// import AddComponentName from "./inventory/AddComponentName";
// import AddPartName from "./inventory/AddPartName";
import { useNavigate } from "react-router-dom";
import RequestList from "../requestApprovedPendingResolved/request/RequestList";
import AddComponent from "../componentComps/AddComponent";
import AddPart from "../partComps/AddPart";

function HumanResource() {
	const navigate = useNavigate();
	const [createUser, setCreateUser] = useState(false);
	const [updateUser, setUpdateUser] = useState(false);
	const [Comps, setComps] = useState(false);
	const [Parts, setParts] = useState(false);
	// const [addCompNames, setAddCompNames] = useState(false);
	// const [addPartNames, setAddPartNames] = useState(false);
	const toggleCreateUser = () => {
		setCreateUser(!createUser);
	}
	const toggleUpdateUser = () => {
		setUpdateUser(!updateUser);
	}
	const toggleAddComps = () => {
		setComps(!Comps);
	}
	const toggleAddParts = () => {
		setParts(!Parts);
	}
	// const toggleAddCompNames = () => {
	// 	setAddCompNames(!addCompNames);
	// }
	// const toggleAddPartNames = () => {
	// 	setAddPartNames(!addPartNames);
	// }
	const gotoInventory = () => {
		navigate('/inventory');
	}
	const name = 'human resource';
	// const childList = [
	// 	['Add parts', 'part', 'Add Part', 'part-qty', 'Add Part'],
	// 	['Add components', 'comp', 'Add Components', 'comp-qty', 'Add Component'],
	// ]
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<div className="custum-button">
					<h5 onClick={gotoInventory}>Inventory</h5>
					{/* <h5 style={addCompNames ? {...activeStyles} : {}}  onClick={toggleAddCompNames}>{addCompNames ? 'Close Inventory Component Names Form' : 'Add New Component Name'}</h5>
					<h5 style={addPartNames ? {...activeStyles} : {}}  onClick={toggleAddPartNames}>{addPartNames ? 'Close Inventory Part Names Form' : 'Add New Part Name'}</h5> */}
				</div>
				<div className="custum-button">
					<h5 style={Comps ? {...activeStyles} : {}} onClick={toggleAddComps}>{Comps ? 'Close Components Form' : 'Add Components'}</h5>
					<h5 style={Parts ? {...activeStyles} : {}} onClick={toggleAddParts}>{Parts ? 'Close Parts Form' : 'Add Parts'}</h5>
				</div>
				<div className="custum-button">
					<h5 style={createUser ? {...activeStyles} : {}}  onClick={toggleCreateUser}>{createUser ? 'Close Account Creation Form' : 'Create New Account'}</h5>
					<h5 style={updateUser ? {...activeStyles} : {}}  onClick={toggleUpdateUser}>{updateUser ? 'Close Update Form' : 'Update Existing User'}</h5>
				</div>
				<hr style={{width: '50%'}} />
				
				{Comps && (
					<>
						{/* <hr /> */}
						<AddComponent />
						{/* <LogFault childList={childList} /> */}
					</>
				)}
				{Parts && (
					<>
						{/* <hr /> */}
						<AddPart />
						{/* <LogFault childList={childList} /> */}
					</>
				)}
				{createUser && (
					<>
						{/* <hr /> */}
						<CreateUser />
					</>
				)}
				{updateUser && (
					<>
						{/* <hr /> */}
						<UpdateUser />
					</>
				)}
				{/* <hr style={{width: '80%'}} /> */}
				<RequestList />
				{/* <AddComponent /> */}
				{/* {Comps && (
					<>
						<hr />
						<LogFault childList={childList} />
					</>
				)}
				{createUser && (
					<>
						<hr />
						<CreateUser />
					</>
				)}
				{updateUser && (
					<>
						<hr />
						<UpdateUser />
					</>
				)} */}
			</div>
		</>
	);
};

export default HumanResource;