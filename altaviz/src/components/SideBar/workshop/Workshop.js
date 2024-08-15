import LogFault from "../log_fault/LogFault";
import Dashboard from "../dashboard/Dashboard";
import { useState } from "react";

function Workshop() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => setIsOpen(!isOpen);
	const name = "wokshop";
	const childList = [
		['Post completed parts', 'part', 'Post Fixed Part', 'part-qty', 'Post'],
		['Request for components', 'comp', 'Request Components', 'comp-qty', 'Request Component'],
	]
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<div className="custum-button">
					<h5 onClick={toggleOpen}>{isOpen ? 'Collapse Form' : 'Post/Request'}</h5>
				</div>
				{isOpen && (<LogFault childList={childList} />)}
			</div>
		</>
	);
};

export default Workshop;