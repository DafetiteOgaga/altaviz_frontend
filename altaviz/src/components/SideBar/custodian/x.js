// import useFetch from "../hooks/useFetch";
// import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import CustodianForm from "./CustodianForm";
// import CustodianLandingPage from "./CustodianLandingPage";
import "./custodian.css"

function Custodian() {
	const name = "Yemi";
	return (
		<>
			<div className="background-color custodian-page">
				<div>
					<CustomTime name={name} />
				</div>
			</div>
		</>





);
};

export default Custodian;