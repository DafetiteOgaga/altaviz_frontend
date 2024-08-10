import "../../sidebar_pages.css"
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import CustomTime from "../../../hooks/CustomTime";

function RequestList ({text}) {
	// const requests = 3;
	const name = "Chidinma";
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

	// const parts = [
	// 	'GRG Display Unit (Rear)',
	// 	'GRG Cassest',
	// 	'GRG Power Supply Unit',
	// 	'GRG SLLS/SLRS Component',
	// ]
	// const components = [
	// 	'GRG Sensors (black & white)',
	// 	'GRG MTS',
	// 	'GRG 297 Belts (2 pieces)',
	// 	'GRG 222 Belts (2 pieces)',
	// 	'GRG 235 Belts (2 pieces)',
	// 	'GRG 282 Belts (2 pieces)',
	// ]
	// const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	// useEffect(() => {
	// 	if (isDropdownVisible && text !== "Kindly Confirm Resolution:") {
	// 		const resolvedDropdowns = document.querySelectorAll('#dropdown-position');
	// 		resolvedDropdowns.forEach(identifier => {
	// 			// console.log('old id attr if:', identifier);
	// 			identifier.setAttribute('id', 'dropdownposition')
	// 			// const changeAttr = identifier.setAttribute('id', 'dropdownposition')
	// 			// console.log('new id attr if:', changeAttr)
	// 			// return changeAttr;
	// 	})} else {
	// 		const resolvedDropdowns = document.querySelectorAll('#dropdownposition');
    //         resolvedDropdowns.forEach(identifier => {
	// 			// console.log('old id attr else:', identifier);
    //             // const changeAttr = identifier.setAttribute('id', 'dropdown-position');
	// 			identifier.setAttribute('id', 'dropdown-position');
	// 			// console.log('new id attr else:', changeAttr)
    //             // return identifier;
	// 	})}
	// }, [isDropdownVisible, text])
	// const toggleDropdown = (e) => {
	// 	e.preventDefault();
	// 	setIsDropdownVisible(!isDropdownVisible);
	// }
	// const closeDropdown = () => {
	// 	if (isDropdownVisible) {
	// 		setIsDropdownVisible(false);
	// 	}
	// }
	// console.log('id array:', document.querySelectorAll('#dropdown-position'));
	// console.log('prop message from parent:', text)
	// console.log('prop message from parent:', text.prop)
	return (
		<>
			<div className="background-color custodian-page">
				<CustomTime name={name} />

			{/* dashboard ............................................ */}

				<div className="dash-form">
					<div>
						<h4>Faults List</h4>
						{/* <h4>Requests for Fault #{faultDetails.id} ({faultDetails.title})</h4> */}
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
							<div className="">
								<div className="input-field">
									{/* <h6>Parts: </h6> */}
									<ul
									style={{listStyleType: 'none'}}
									>
										{faultDetails.map((fault) => (
											<li key={fault.id}><Link
											to={`/request-details/${fault.id}`}
											style={{
												textDecoration: 'none',
												color: '#333'
												}}>
												<div className="fault-list-block">
													Fault #{fault.id}
													{
														<div>
															{
																<p><strong>Bank: </strong>
																{fault.bank}</p>
															}
															{
																<p><strong>Details: </strong>
																{fault.title}</p>
															}
														</div>
													}
													{
														<div>
															{
																<p><strong>For: </strong>
																<span style={{
																	backgroundColor: '#999',
																	color: 'white',
                                                                    padding: ' 0 0.3rem',
                                                                    borderRadius: '3px',
																}}
																>{fault.engineer}</span></p>
															}
															
															{
																<p><strong>Requests: </strong>
																{fault.requests ? 'Yes' : 'No'}</p>
															}
														</div>
													}
													{
														<div>
															{
																<p><strong>Status: </strong>
																{(fault.faultStatus === 'Pending') ? (
																	<span style={{
																		backgroundColor: 'rgba(255, 255, 0, 0.6)',
																		padding: ' 0 0.3rem',
																		borderRadius: '3px',
																	}}>{fault.faultStatus}</span>) : (
																		    <span style={{
                                                                                color: 'rgba(0, 0, 255, 1)',
                                                                            }}>{fault.faultStatus}</span>
																	)
																}</p>
															}
														</div>
													}
												</div>
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default RequestList;