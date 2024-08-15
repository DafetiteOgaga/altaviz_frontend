// import useFetch from "../hooks/useFetch";
import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
import { Link } from "react-router-dom"
import "../sidebar_pages.css"
// import Custodian from "./Custodian";
import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";
import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";

function Engineer() {
	const location = {
		user: {
			name: 'James',
			department: {
				dept: 'workshop',
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
	const parts = [
		'Select Part',
		'GRG Note Transport',
		'GRG Note Presenter',
		'GRG Note Feeder',
		'GRG EPP',
		'GRG Card Reader',
		'GRG PC Board',
		'GRG Shutter',
		'GRG Receipt Printer',
		'GRG Journal Printer',
		'GRG Monitor',
		'GRG PC Core',
		'GRG Display Unit (Rear)',
		'GRG Cassest',
		'GRG Power Supply Unit',
		'GRG SLLS/SLRS Component',

		'Wincor Stacker',
		'Wincor V-Module (DDU)',
		'Wincor Cash Media Dispenser (CMD) Board',
		'Wincor Interface Card/Board',
		'Wincor EPP',
		'Wincor Card Reader',
		'Wincor Clamp',
		'Wincor PC Board',
		'Wincor Shutter',
		'Wincor Receipt Printer',
		'Wincor Journal Printer',
		'Wincor Monitor',
		'Wincor PC Core',
		'Wincor SOP',
		'Wincor Cassest',
		'Wincor Power Supply Unit',

		'NCR Note Presenter',
		'NCR Pick Module',
		'NCR S1 Board',
		'NCR PC Core (Pocono)',
		'NCR PC Core (Teladega)',
		'NCR EPP',
		'NCR Electronic Board',
		'NCR Card Reader',
		'NCR Shutter',
		'NCR Receipt Printer',
		'NCR Journal Printer',
		'NCR Monitor',
		'NCR GOP',
		'NCR Cassest',
		'NCR Power Supply Unit',
		'NCR MEI component',
	]
	const components = [
		'Select component',
		'GRG Sensors (black & white)',
		'GRG MTS',
		'GRG 297 Belts (2 pieces)',
		'GRG 222 Belts (2 pieces)',
		'GRG 235 Belts (2 pieces)',
		'GRG 282 Belts (2 pieces)',
		'GRG 367 Belts (2 pieces)',
		'GRG 218 Belts (2 pieces)',
		'GRG 214 Belts (2 pieces)',
		'GRG 291 Belts (2 pieces)',
		'GRG 292 Belts (2 pieces)',
		'GRG 400 Belts (2 pieces)',

		'Wincor Sensor',
		'Wincor Measuring Station (MS)',
		'Wincor V-Module Transport belts (2)',
		'Wincor V-Module Money Guide',
		'Wincor V-Module Clutch (2)',
		'Wincor V-Module Prisms (2)',
		'Wincor V-Module belts (2)',
		'Wincor V-Module Puller SP (6)',
		'Wincor V-Module Roller Shaft',
		'Wincor V-Module Selenoids (2)',
		'Wincor Clamp Cable',
		'Wincor Clamp Clips (2)',
		'Wincor Clamp Motor',
		'Wincor Clamp Belts (4)',
		'Wincor Clamp Rollers (4)',
		'Wincor Stacker Shafts (2)',
		'Wincor Stacker Belts (4)',
		'Wincor FDK key R/L',
		'Wincor EPROM Flex',
		'Wincor Single Reject Compartment',

		'NCR Track 2 Read Head',
		'NCR Track 3 Read Head',
		'NCR Camera',
		'NCR Air Filter',
		'NCR Capacitor',
		'NCR Pick-Arm',
		'NCR Suction Cups (8 pieces)',
		'NCR Snap Bearings (7 pieces)',
		'NCR LVDT Belts-19 (5 pieces)',
		'NCR LVDT Belts-20 (a piece)',
		'NCR LVDT Belts-21 (4 pieces)',
		'NCR Vertical Belts (2 pieces)',
		'NCR Presenter Belts-625 (3 pieces)',
		'NCR T-Connector',
		'NCR D-Wheel',

		'Random-Access Memory (RAM)',
		'Hard-Disk Drive (HDD)',
		'Chip-Contact',
		'Card Reader Rollers',
		'CMOS Battery',
	]

	const fields = {
		others: ''
	}
	const [formValues, setFormValues] = useState(fields);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
		...formValues,
		[name]: value,
		});
	};
	const validateForm = () => {
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
		// Form is valid, proceed with submission logic
		console.log('Form submitted:', formValues);
		}
	};
	const name = "Lukeman"
	const message = "Faults Resolved?";
	const [fixedParts, setfixedParts] = useState([{ part: '', amount: '' }]);

	const addFixedFieldSet = () => {
		setfixedParts([...fixedParts, { part: '', amount: '' }]);
	};

	const [requestComponent, setRequestComponent] = useState([{ component: '', amount: '' }]);

	const addRequestComponentFieldSet = () => {
		setRequestComponent([...requestComponent, { component: '', amount: '' }]);
	};
	const removeRequestComponentFieldSet = (index) => {
		const updatedComponents = requestComponent.filter((_, i) => i !== index);
		setRequestComponent(updatedComponents);
	};

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
								<div className="input-field">
									<p><strong>Deliveries: </strong>
									{location.user.department.numberOfPartsDelivered}
									</p>
								</div>
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
							<div className="cust-row">
								<div className="input-field">
									<PendingFaults />
								</div>
								<div className="input-field">
									<Resolved text={message}/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr />

		{/* Post parts ............................................ */}
				<div className="split-container">
					<div className="dash-form">
						<div>
							<h4>Request for parts</h4>
						</div>
						<div>
							<hr />
							<form onSubmit={handleSubmit}>
								<div>
									{/* Submit fixed parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{fixedParts.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Request for Part:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{parts.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="with-rm-btn">
													<div className="input-field">
														<label htmlFor={`part-qty-${index}`}>Quantity:</label>
														<select id={`part-qty-${index}`} name={`part-qty-${index}`}>
														{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
															<option key={number} value={number}>
															{number}
															</option>
														))}
														</select>
													</div>
													<div>
														<button
															type="button"
															onClick={() => removeRequestComponentFieldSet(index)}
															>Remove
														</button>
													</div>
												</div>
											</div>
										))}
										</div>
									</div>
									
									<div className="">
										<div className="input-field textarea-box">
											<label htmlFor="others">Others:</label>
											<textarea
											type="text"
											name="others"
											id="others"
											placeholder="Pls, specify ..."
											rows={3}
											// value={formValues.otherFaults}
											onChange={handleInputChange}
											/>
										</div>
									</div>
								</div>
								<div className="cust-button">
									<button type="submit">Post</button>
									<button type="button" onClick={addFixedFieldSet}>
											Add Part
										</button>
								</div>
							</form>
						</div>
					</div>

					{/* ........................................................................... */}

					
					<div style={{
							borderLeft: '2px inset',
							height: 'auto',
							width: '0',
							margin: '0 auto',
						}}>
					</div>

			{/* ........................................................................... */}

			{/* Request components ............................................ */}
					<div className="dash-form">
						<div>
							<h4>Request for components</h4>
						</div>
						<div>
							<div className="to-form">
							</div>
							<hr />
							<form onSubmit={handleSubmit}>
								<div>
									{/* Request components parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{requestComponent.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`comps-${index}`}>Request Components:</label>
													<select id={`comps-${index}`} name={`comps-${index}`}>
													{components.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="with-rm-btn">
													<div className="input-field">
														<label htmlFor={`comp-qty-${index}`}>Quantity:</label>
														<select id={`comp-qty-${index}`} name={`comp-qty-${index}`}>
														{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
															<option key={number} value={number}>
															{number}
															</option>
														))}
														</select>
													</div>
													<div>
														<button
															type="button"
															onClick={() => removeRequestComponentFieldSet(index)}
															>Remove
														</button>
													</div>
												</div>
											</div>
										))}
										</div>
									</div>

									<div>
										<div className="input-field textarea-box">
											<label htmlFor="others">Others:</label>
											<textarea
											type="text"
											name="others"
											id="others"
											placeholder="Pls, specify ..."
											rows={3}
											// value={formValues.otherFaults}
											onChange={handleInputChange}
											/>
										</div>
									</div>
								</div>
								<div className="cust-button">
									<button type="submit">Make Request</button>
									<button type="button" onClick={addRequestComponentFieldSet}>
										Add Request
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Engineer;