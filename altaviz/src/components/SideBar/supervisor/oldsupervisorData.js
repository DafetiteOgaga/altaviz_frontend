// import useFetch from "../hooks/useFetch";
// import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
import { Link } from "react-router-dom"
import "../sidebar_pages.css"
// import Custodian from "./Custodian";
import RequestList from "../requestApprovedPendingResolved/request/RequestList";
import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";
import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";
import RequestNotification from "../requestApprovedPendingResolved/request/RequestNotification";

function Supervisor() {
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
	const name = "Banji"
	const message = "Unverified Resolutions:";
	const today = new Date();
	const faultDetails = [
		{
			id: 1,
			title: "Dispenser error",
			engineer: "Bamidele",
			phone: 23187344884,
			whatsapp: 32938472644,
			email: "bamidele@example.com",
			reason: "The Screen was damaged by the heavy rain that fell on 22.05.24 and needs replacement.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "FCMB",
			dueDate: today.toDateString(),
		},
		{
			id: 2,
			title: "Cash Jam",
			engineer: "Yinka",
			phone: 23187344884,
			whatsapp: 32938472644,
			email: "yinka@example.com",
			reason: "Consistent Cash Jam.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "Fidelity Bank",
			dueDate: today.toDateString(),
		},
		{
			id: 3,
			title: "Card Reader Failure",
			engineer: "Ifeoma",
			phone: 23948374374,
			whatsapp: 34829203746,
			email: "ifeoma@example.com",
			reason: "The card reader is not accepting cards. Needs immediate repair.",
			faultStatus: "In Progress",
			requests: false,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "Union Bank",
			dueDate: today.toDateString(),
		},
		{
			id: 4,
			title: "ATM Not Dispensing Cash",
			engineer: "Chukwuemeka",
			phone: 23748374834,
			whatsapp: 33948203745,
			email: "chukwuemeka@example.com",
			reason: "ATM is not dispensing cash despite having sufficient funds.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "UBA",
			dueDate: today.toDateString(),
		},
		{
			id: 5,
			title: "Screen Flickering",
			engineer: "Oluwaseun",
			phone: 23984738473,
			whatsapp: 34839304839,
			email: "oluwaseun@example.com",
			reason: "The ATM screen flickers intermittently, making it hard for users to complete transactions.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "WEMA Bank",
			dueDate: today.toDateString(),
		},
		{
			id: 6,
			title: "PIN Pad Malfunction",
			engineer: "Folake",
			phone: 23182374823,
			whatsapp: 32938474839,
			email: "folake@example.com",
			reason: "The PIN pad is unresponsive, preventing customers from entering their PINs.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "FCMB",
			dueDate: today.toDateString(),
		},
		{
			id: 7,
			title: "Receipt Printer Error",
			engineer: "Adeyemi",
			phone: 23847384373,
			whatsapp: 34829294748,
			email: "adeyemi@example.com",
			reason: "The receipt printer is jammed and needs to be fixed.",
			faultStatus: "In Progress",
			requests: false,
			requestStatus: "Pending",
			resolved: false,
			delay: false,
			bank: "WEMA Bank",
			dueDate: today.toDateString(),
		},
		{
			id: 8,
			title: "Network Connectivity Issue",
			engineer: "Ngozi",
			phone: 23748238473,
			whatsapp: 34829294746,
			email: "ngozi@example.com",
			reason: "ATM is not connecting to the bank's network. Possible issue with the network module.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "Polaris Bank",
			dueDate: today.toDateString(),
		},
		{
			id: 9,
			title: "Low Cash Alert",
			engineer: "Abdul",
			phone: 23482374823,
			whatsapp: 34829294743,
			email: "abdul@example.com",
			reason: "ATM cash levels are low and need replenishment.",
			faultStatus: "In Progress",
			requests: false,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "Ecobank",
			dueDate: today.toDateString(),
		},
		{
			id: 10,
			title: "Touch Screen Unresponsive",
			engineer: "Amaka",
			phone: 23984738473,
			whatsapp: 34829384748,
			email: "amaka@example.com",
			reason: "The ATM's touch screen is unresponsive, making it difficult for customers to use the machine.",
			faultStatus: "Pending",
			requests: true,
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			bank: "Ecobank",
			dueDate: today.toDateString(),
		},
	];
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

								{/* <hr /> */}

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
					<hr />
					<RequestList faultDetails={faultDetails} />
				</div>
			</div>
		</>
	);
};

export default Supervisor;