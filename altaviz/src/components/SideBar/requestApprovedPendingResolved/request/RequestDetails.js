import "../../sidebar_pages.css"
import { Link } from "react-router-dom";
import CustomTime from "../../../hooks/CustomTime";

function RequestDetails () {
	// const requests = 3;
	const name = "Chidinma";
	const today = new Date();
	const faultDetails = {
		id: 1,
		title: "Dispenser error",
		engieer: "Bamidele",
		phone: 23187344884,
		whatsapp: 32938472644,
		email: "bamidele@example.com",
        reason: "The Screen was damaged by the heavy rain that fell on 22.05.24 and needs replacement.",
        faultStatus: "Pending",
		requestStatus: "Pending",
        resolved: false,
		delay: true,
		dueDate: today.toDateString(),
		helpDesk: 'Bukola',
	}
	const parts = [
		'GRG Display Unit (Rear)',
		'GRG Cassest',
		'GRG Power Supply Unit',
		'GRG SLLS/SLRS Component',
	]
	const components = [
		'GRG Sensors (black & white)',
		'GRG MTS',
		'GRG 297 Belts (2 pieces)',
		'GRG 222 Belts (2 pieces)',
		'GRG 235 Belts (2 pieces)',
		'GRG 282 Belts (2 pieces)',
	]
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
					<div className="req-h4-header">
						<h4>
							Requests for Fault #{faultDetails.id} ({faultDetails.title})
						</h4>
						<h4>
							<Link
							to="/fault-details/1">Fault Details</Link>
						</h4>
					</div>
					{/* <div>
						
					</div> */}
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
										<p><strong>Requests made by: </strong>
											<Link
											style={{color: '#333'}}
											to="/user/1">
												{faultDetails.engieer}
											</Link>
										</p>
									</div>
									<div className="input-field">
										<p><strong>Request Status: </strong>
										{faultDetails.requestStatus}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Fault Status: </strong>
										{faultDetails.faultStatus}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Overdue: </strong>
										{faultDetails.delay ? 'Yes' : 'No'}
										</p>
									</div>
							</div>
							<div className="cust-row">
								<div className="input-field">
									<p><strong>Phone No.: </strong>
									{faultDetails.phone}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Whatsapp No.: </strong>
									{faultDetails.whatsapp}
									</p>
								</div>
								<div className="input-field">
									<p><strong>Due Date: </strong>
										{faultDetails.dueDate}
									</p>
								</div>
								<div className="input-field to_user">
									<p><strong>Managed by: </strong>
										<Link to="/user/1">
											{faultDetails.helpDesk}
										</Link>
									</p>
								</div>
							</div>

								{/* <div className="cust-row">
									<div className="input-field">
										<PendingFaults />
									</div>
									<div className="input-field">
										<Resolved text={message}/>
									</div>
									<div className="input-field">
										<RequestNotification />
									</div>
								</div> */}
								{/* <div className="input-field textarea-box">
									<p>textarea</p>
								</div> */}
						</div>
						<hr />
						
						<div className="req-details">
							<h4>Requirements for Immediate Resolution</h4>
						</div>
						<div className="cust-row req-details">
							<div className="input-field">
								<h6>Parts: </h6>
								<ul>
									{parts.map((part, index) => (
										<li key={index}>{part}</li>
									))}
								</ul>
							</div>
							<div className="input-field req-details">
								<h6>Components: </h6>
								<ul>
									{components.map((component, index) => (
										<li key={index}>{component}</li>
									))}
								</ul>
							</div>
							{/* <div className="input-field">
								<p><strong>Overdue: </strong>
								{faultDetails.delay ? 'Yes' : 'No'}
								</p>
							</div> */}
						</div>
						<div className="input-field">
							<p><strong>Reason: </strong>
								{faultDetails.reason}
							</p>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}
export default RequestDetails;