// import useFetch from "../hooks/useFetch";
// import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
import useCheckDept from "../../hooks/useCheckDept";
// import { GlobalContext } from "../../context/Context";
// import { useNavigate } from "react-router-dom"
import "../sidebar_pages.css"
import { Link, useLocation } from "react-router-dom";
// import Custodian from "./Custodian";

function FaultDetails() {
	let dept = useLocation();
	dept = dept.pathname
	const { isCustodianPage } = useCheckDept(dept)
	// if faultStatus is true, the button should be disabled permanently
	// const [ faultStatus, setFaultStatus ] = useState(false)
	// json structure for workshop page
	const today = new Date();
	const location = {
			id: 1,
			bank: 'FCMB',
			branch: 'Ikota Branch',
			faultTitle: "Dispenser error",
			engieer: "James",
			phone: '12345678902',
			whatsapp: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'james@example.com',
			faultStatus: "Pending",
			requestStatus: "Pending",
			resolved: false,
			delay: true,
			dueDate: today.toDateString(),
			helpDesk: 'Omolara',
		}

	// const parts = [
	// 	'Select Part',
	// 	'GRG Note Transport',
	// 	'GRG Note Presenter',
	// 	'GRG Note Feeder',
	// 	'GRG EPP',
	// 	'GRG Card Reader',
	// 	'GRG PC Board',
	// 	'GRG Shutter',
	// 	'GRG Receipt Printer',
	// 	'GRG Journal Printer',
	// 	'GRG Monitor',
	// 	'GRG PC Core',
	// 	'GRG Display Unit (Rear)',
	// 	'GRG Cassest',
	// 	'GRG Power Supply Unit',
	// 	'GRG SLLS/SLRS Component',

	// 	'Wincor Stacker',
	// 	'Wincor V-Module (DDU)',
	// 	'Wincor Cash Media Dispenser (CMD) Board',
	// 	'Wincor Interface Card/Board',
	// 	'Wincor EPP',
	// 	'Wincor Card Reader',
	// 	'Wincor Clamp',
	// 	'Wincor PC Board',
	// 	'Wincor Shutter',
	// 	'Wincor Receipt Printer',
	// 	'Wincor Journal Printer',
	// 	'Wincor Monitor',
	// 	'Wincor PC Core',
	// 	'Wincor SOP',
	// 	'Wincor Cassest',
	// 	'Wincor Power Supply Unit',

	// 	'NCR Note Presenter',
	// 	'NCR Pick Module',
	// 	'NCR S1 Board',
	// 	'NCR PC Core (Pocono)',
	// 	'NCR PC Core (Teladega)',
	// 	'NCR EPP',
	// 	'NCR Electronic Board',
	// 	'NCR Card Reader',
	// 	'NCR Shutter',
	// 	'NCR Receipt Printer',
	// 	'NCR Journal Printer',
	// 	'NCR Monitor',
	// 	'NCR GOP',
	// 	'NCR Cassest',
	// 	'NCR Power Supply Unit',
	// 	'NCR MEI component',
	// ]
	// const components = [
	// 	'Select compnent',
	// 	'GRG Sensors (black & white)',
	// 	'GRG MTS',
	// 	'GRG 297 Belts (2 pieces)',
	// 	'GRG 222 Belts (2 pieces)',
	// 	'GRG 235 Belts (2 pieces)',
	// 	'GRG 282 Belts (2 pieces)',
	// 	'GRG 367 Belts (2 pieces)',
	// 	'GRG 218 Belts (2 pieces)',
	// 	'GRG 214 Belts (2 pieces)',
	// 	'GRG 291 Belts (2 pieces)',
	// 	'GRG 292 Belts (2 pieces)',
	// 	'GRG 400 Belts (2 pieces)',
	// 	'GRG EPP',
	// 	'GRG Shutter',
	// 	'GRG Receipt Printer',
	// 	'GRG Journal Printer',
	// 	'GRG Monitor',
	// 	'GRG PC Core',
	// 	'GRG Display Unit (Rear)',
	// 	'GRG Cassest',
	// 	'GRG Power Supply Unit',
	// 	'GRG SLLS/SLRS Component',

	// 	'Wincor Sensor',
	// 	'Wincor Measuring Station (MS)',
	// 	'Wincor V-Module Transport belts (2)',
	// 	'Wincor V-Module Money Guide',
	// 	'Wincor V-Module Clutch (2)',
	// 	'Wincor V-Module Prisms (2)',
	// 	'Wincor V-Module belts (2)',
	// 	'Wincor V-Module Puller SP (6)',
	// 	'Wincor V-Module Roller Shaft',
	// 	'Wincor V-Module Selenoids (2)',
	// 	'Wincor Clamp Cable',
	// 	'Wincor Clamp Clips (2)',
	// 	'Wincor Clamp Motor',
	// 	'Wincor Clamp Belts (4)',
	// 	'Wincor Clamp Rollers (4)',
	// 	'Wincor Stacker Shafts (2)',
	// 	'Wincor Stacker Belts (4)',
	// 	'Wincor FDK key R/L',
	// 	'Wincor EPROM Flex',
	// 	'Wincor Single Reject Compartment',

	// 	'NCR Track 2 Read Head',
	// 	'NCR Track 3 Read Head',
	// 	'NCR Camera',
	// 	'NCR Air Filter',
	// 	'NCR Capacitor',
	// 	'NCR Pick-Arm',
	// 	'NCR Suction Cups (8 pieces)',
	// 	'NCR Snap Bearings (7 pieces)',
	// 	'NCR LVDT Belts-19 (5 pieces)',
	// 	'NCR LVDT Belts-20 (a piece)',
	// 	'NCR LVDT Belts-21 (4 pieces)',
	// 	'NCR Vertical Belts (2 pieces)',
	// 	'NCR Presenter Belts-625 (3 pieces)',
	// 	'NCR T-Connector',
	// 	'NCR D-Wheel',

	// 	'Random-Access Memory (RAM)',
	// 	'Hard-Disk Drive (HDD)',
	// 	'Chip-Contact',
	// 	'Card Reader Rollers',
	// 	'CMOS Battery',
	// ]
	// const fields = {
	// 	name: location.user.name,
	// 	department: location.user.department.dept,
	// 	deliveries: location.user.department.numberOfPartsDelivered,
	// 	pendings: location.user.department.numberOfPartsPending,
	// 	phone: location.user.phone,
	// 	whatsapp: location.user.whatsapp,
	// 	photo: location.user.profile_photo,
	// 	email: location.user.email,
    //     status: location.user.status,
	// 	others: ''
	//   }
	// const [formValues, setFormValues] = useState(fields);
	// const [errors, setErrors] = useState({});
	
	// const EditHandler = (e) => {
	// 	e.preventDefault();
	// 	setIsEditable(!isEditable);
	// };

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormValues({
	// 	  ...formValues,
	// 	  [name]: value,
	// 	});
	//   };

	// const validateForm = () => {
	// 	let formErrors = {};
	// 	if (!formValues.name) formErrors.name = 'Name is required';
	// 	if (!formValues.department) formErrors.department = 'Department is required';
	// 	if (!formValues.deliveries) formErrors.deliveries = 'Deliveries is required';
	// 	if (!formValues.pendings) formErrors.pendings = 'Pendings is required';
	// 	if (!formValues.phone) formErrors.phone = 'Phone Number is required';
	// 	if (!formValues.whatsapp) formErrors.whatsapp = 'Whatsapp Number is required';
	// 	if (!formValues.profile_photo) formErrors.profile_photo = 'Profile Photo is required';
	// 	if (!formValues.email) formErrors.email = 'Email is required';
	// 	if (!formValues.status) formErrors.status = 'Status is required';
	// 	setErrors(formErrors);
	
	// 	return Object.keys(formErrors).length === 0;
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (validateForm()) {
	// 	// Form is valid, proceed with submission logic
	// 	console.log('Form submitted:', formValues);
	// 	}
	// };
	const name = "Lukeman"
	const handleResolutionConfirmation = (e) => {
		console.log('first came here!');
		// if (confirmResolution) {
		// 	e.preventDefault();
		const form = new FormData();
		form.append('resolution', 1); // 1 indicates yes (confirmed)
		// send to backend via post method
		form.forEach((k, v) => {
			console.log('key:', k, '\nvalue:', v);
		})
			// after every confirmation the server should send updated
			// entries for new rendering (use useEffect)
		}


	return (
		<>
			<div className="background-color custodian-page">
				<CustomTime name={name} />
					<div className="dash-form">
						<div className="req-h4-header">
							<h4>
								Fault Log: ID #{location.id}
							</h4>
							<h4>
								<Link
								style={{color: '#333'}}
								to="request-details/1">Parts Request</Link>
							</h4>
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
											<p><strong>Bank: </strong>
												{location.bank}
											</p>
										</div>
										<div className="input-field">
											<p><strong>Branch: </strong>
											{location.branch}
											</p>
										</div>
										<div className="input-field">
											<p><strong>Fault Detail: </strong>
											{location.faultTitle}
											</p>
										</div>
								</div>
								<div className="cust-row">
									<div className="input-field">
										<p><strong>Status: </strong>
										{location.faultStatus}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Assigned to: </strong>
										<Link
										style={{color: '#333'}}
										to="/user/1">
											{location.engieer}
										</Link>
										</p>
									</div>
									<div className="input-field">
										<p><strong>Due Date: </strong>
										{location.dueDate}
										</p>
									</div>
								</div>
								<div className="cust-row">
									<div className="input-field">
										<p><strong>Phone No.: </strong>
											{location.phone}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Whatsapp: </strong>
										{location.whatsapp}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Email: </strong>
										{location.email}
										</p>
									</div>
									<div className="input-field to_user">
										<p><strong>Managed by: </strong>
											<Link to="/user/1"
											style={{color: '#333'}}>
												{location.helpDesk}
											</Link>
										</p>
									</div>
								</div>
							</div>
							{isCustodianPage && (<div className="custum-button">
								<h5 onClick={handleResolutionConfirmation}>Confirm Resolution</h5>
							</div>)}
						</div>
					</div>
			</div>
		</>
	);
};

export default FaultDetails;