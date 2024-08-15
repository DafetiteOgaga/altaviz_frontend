// import useFetch from "./hooks/useFetch";
// import { useContext } from "react";
// import { GlobalContext } from "./context/Context";
// import GetProductDetails from "./hooks/GetProductDetails";
// import Dashboard from "./SideBar/dashboard/Dashboard";
// import LogFault from "./SideBar/log_fault/LogFault";


function Testfetchapi() {
	// const { useFetchGET } = useContext(GlobalContext)
	// const { data, loading, error } = useFetchGET('http://localhost:8000');

	// if (loading) {
	// 	console.log('Loading ...');
	// 	return (
	// 		<>
	// 			<h6 className="error-and-loading">Loading...</h6>
	// 		</>
	// );};
	// if (error) {
	// 	console.log('Error ...');
	// 	return (
	// 		<>
	// 			<h6 className="error-and-loading">yo! {error}</h6>
	// 		</>
	// );};
	// console.log(data);

	return (
		<>
			<h2>Test Page</h2>
			<div className="background-color custodian-page">
				{/* <Dashboard />
				<LogFault /> */}
			</div>
		</>
	);
}
export default Testfetchapi;
