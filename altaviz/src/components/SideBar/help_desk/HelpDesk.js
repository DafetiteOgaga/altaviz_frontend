// import useFetch from "../hooks/useFetch";
// import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
import { Link } from "react-router-dom"
import "../sidebar_pages.css"
// import Custodian from "./Custodian";
import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";
import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";
import RequestNotification from "../requestApprovedPendingResolved/request/RequestNotification";

function HelpDesk() {
	// if faultStatus is true, the button should be disabled permanently
	// const [ faultStatus, setFaultStatus ] = useState(false)
	// json structure for workshop page
	const location = {
		user: {
			name: 'James',
			department: {
				dept: 'Help Desk',
				numberOfPartsDelivered: 52,
				numberOfPendingParts: 9,
			},
			phone: '12345678902',
			whatsapp: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'james@example.com',
			address: '12, kudirat way, lagos',
			status: 'active',
		},
	}
	const name = "Nancy"
	const message = "Unverified Resolutions";
	// const navigateTo = useNavigate();
	// const goTo = (e) => {
	// 	e.preventDefault();
	// 	navigateTo("/custodian/form");
	// }
	// const FaultForm = ({ faults, formValues }) => {

	return (
		<>
			<div className="background-color custodian-page">
				<CustomTime name={name} />

			{/* dashboard ............................................ */}

				<div className="dash-form">
					<div>
						<h4>Dashboard</h4>
					</div>
					<div>
						<div className="to-form">
							{/* <h4>Log a Fault</h4> */}
							{/* <a href={"/custodian/form"} onClick={(e) => goTo(e)}> */}
							{/* <h4> Log a Fault  </h4> */}
							{/* </a> */}
						</div>
						<hr />
						<div>
							<div className="cust-row">
								<div className="input-field">
										<p><strong>Name: </strong>
											<Link
											style={{color: '#333'}}
											to="/user/1">
												{location.user.name}
											</Link>
										</p>
									</div>
									<div className="input-field">
										<p><strong>Department: </strong>
										{location.user.department.dept}
										</p>
									</div>
									{/* <div className="input-field">
										<p><strong>Deliveries: </strong>
										{location.user.department.numberOfPartsDelivered}
										</p>
									</div> */}
								</div>
								<div className="cust-row">
									<div className="input-field">
										<p><strong>Phone No.: </strong>
										{location.user.phone}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Whatsapp No.: </strong>
										{location.user.whatsapp}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Email: </strong>
											{location.user.email}
										</p>
									</div>
								</div>

								<hr />

								<div className="cust-row">
									<div className="input-field">
										<PendingFaults />
									</div>
									<div className="input-field">
										<Resolved text={message}/>
									</div>
									<div className="input-field">
										<RequestNotification />
									</div>
								</div>
								{/* <div className="input-field textarea-box">
									<p>textarea</p>
								</div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpDesk;