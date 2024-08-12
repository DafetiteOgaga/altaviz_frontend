import Dashboard from "../dashboard/Dashboard";
import LogFault from "../log_fault/LogFault";
import CreateUser from "./createUser";
import UpdateUser from "./UpdateUser";
import { useState } from "react";
import "./humanResource.css"

function HumanResource() {
	const [createUser, setCreateUser] = useState(false);
	const [updateUser, setUpdateUser] = useState(false);
	const toggleCreateUser = () => {
		setCreateUser(!createUser);
	}
	const toggleUpdateUser = () => {
		setUpdateUser(!updateUser);
	}
	// useEffect(() => {

	// },[])
	// const toggleCreateUser = () => {
	// 	if (createUser) {
	// 		setCreateUser(!createUser);
	// 	}
	// 	if (updateUser) {
	// 		setUpdateUser(!updateUser);
	// 	}
    // };
	const name = 'human resource';
	const childList = [
		['Add parts', 'part', 'Add Part', 'part-qty', 'Add Part'],
		['Add components', 'comp', 'Add Components', 'comp-qty', 'Add Component'],
	]
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<div className="user-account">
					<h5 onClick={toggleCreateUser}>{createUser ? 'Close Account Creation Form' : 'Create New Account'}</h5>
					<h5 onClick={toggleUpdateUser}>{updateUser ? 'Close Update Form' : 'Update Existing User'}</h5>
				</div>
				<hr style={{width: '50%'}} />
				<LogFault childList={childList} />
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
				)}
			</div>
		</>
	);
};

export default HumanResource;