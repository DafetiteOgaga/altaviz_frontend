import LogFault from "../log_fault/LogFault";
import Dashboard from "../dashboard/Dashboard";
import { useState } from "react";

function Engineer() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);
	const name = "engineer";
	const childList = [
		['Request for parts', 'part', 'Request for Part', 'part-qty', 'Request Part'],
		['Request for components', 'comp', 'Request Components', 'comp-qty', 'Request Component'],
	]
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<div className="custum-button">
					<h5 onClick={toggleOpen}>{isOpen ? 'Collapse Form' : 'Request parts/Components'}</h5>
				</div>
				{isOpen && (<LogFault childList={childList} />)}
			</div>
		</>
	);
};

export default Engineer;