import Dashboard from "../dashboard/Dashboard";
import LogFault from "../log_fault/LogFault";

function CustodianLandingPage() {
	const name = 'custodian';
	const childList = [
		['nothing'],
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

export default CustodianLandingPage;