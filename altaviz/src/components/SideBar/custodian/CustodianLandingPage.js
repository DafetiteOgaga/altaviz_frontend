import Dashboard from "../dashboard/Dashboard";
import LogFault from "../log_fault/LogFault";
import { useState } from "react";

function CustodianLandingPage() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);
	const name = 'custodian';
	const childList = [
		['nothing'],
	]
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<div className="custum-button">
					<h5 onClick={toggleOpen}>{isOpen ? 'Collapse Form' : 'Log a Fault'}</h5>
				</div>
				{isOpen && (<LogFault childList={childList} />)}
			</div>
		</>
	);
};

export default CustodianLandingPage;