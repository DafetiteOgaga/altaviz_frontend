import LogFault from "../log_fault/LogFault";
import Dashboard from "../dashboard/Dashboard";

function Engineer() {
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
				<LogFault childList={childList} />
			</div>
		</>
	);
};

export default Engineer;