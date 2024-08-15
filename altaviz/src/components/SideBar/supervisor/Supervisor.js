import RequestList from "../requestApprovedPendingResolved/request/RequestList";
import Dashboard from "../dashboard/Dashboard";

function Supervisor() {
	const name = "supervisor"
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

export default Supervisor;