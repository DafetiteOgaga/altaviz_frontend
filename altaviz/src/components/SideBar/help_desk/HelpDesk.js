import RequestList from "../requestApprovedPendingResolved/request/RequestList";
import Dashboard from "../dashboard/Dashboard";

function HelpDesk() {
	const name = "help desk"
	// const message = "Unverified Resolutions:";
	return (
		<>
			<div className="background-color custodian-page">
				<Dashboard name={name} pageName={`/${name}`} />
				<hr style={{width: '80%'}} />
				<RequestList />
			</div>
		</>
	);
};

export default HelpDesk;