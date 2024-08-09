// import useFetch from "../hooks/useFetch";
import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
// import { useNavigate } from "react-router-dom"
import "../custodian.css"
// import Custodian from "./Custodian";

function Workshop() {
	// if faultStatus is true, the button should be disabled permanently
	// const [ faultStatus, setFaultStatus ] = useState(false)
	// json structure for workshop page
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

	// const custodianUserDetails = [
	// 	{
	// 		id: 1,
	// 		name: 'Bayo',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'bayo@fidelitybank.com',
    //         location: 'OG',
	// 		bank: 'FB',
	// 	},
		// {
		// 	id: 2,
		// 	name: 'Iyare',
		// 	profile_photo: 'placeholder.png',
		// 	phone1: '12345678901',
		// 	whatsapp: '09876543210',
        //     email: 'iyare@fcmb.com',
        //     location: 'EN',
		// 	bank: 'FM',
		// },
		// {
		// 	id: 3,
		// 	name: 'Hauwa',
		// 	profile_photo: 'placeholder.png',
		// 	phone1: '12345678901',
		// 	whatsapp: '09876543210',
        //     email: 'hauwa@ecobank.com',
        //     location: 'KD',
		// 	bank: 'EC',
		// },
	// ]
	// console.log('custodianUserDetails:', custodianUserDetails);
	// const banksd = ['Select Bank',
	// 	'UB|UBA', 'WB|WEMA Bank', 'FM|FCMB', 'EC|Ecobank', 'UB|Union Bank',
	// 	'FB|Fidelity Bank', 'HB|Heritage Bank', 'PB|Polaris Bank',
	// 	'AB|Access Bank',
	// ]
	// const banks = {
	// 	'UA': 'UBA',
	// 	'WB': 'WEMA Bank',
	// 	'FM': 'FCMB',
	// 	'EC': 'Ecobank',
	// 	'UB': 'Union Bank',
	// 	'FB': 'Fidelity Bank',
	// 	'HB': 'Heritage Bank',
	// 	'PB': 'Polaris Bank',
	// 	'AB': 'Access Bank',
	// }
	// const locations = {
	// 	'FC': 'Abuja State',
	// 	'AB': 'Abia State',
	// 	'AD': 'Adamawa State',
	// 	'AK': 'Akwa Ibom State',
	// 	'AN': 'Anambra State',
	// 	'BA': 'Bauchi State',
	// 	'BY': 'Bayelsa State',
	// 	'BE': 'Benue State',
	// 	'BO': 'Borno State',
	// 	'CR': 'Cross River State',
	// 	'DE': 'Delta State',
	// 	'EB': 'Ebonyi State',
	// 	'ED': 'Edo State',
	// 	'EK': 'Ekiti State',
	// 	'EN': 'Enugu State',
	// 	'GO': 'Gombe State',
	// 	'IM': 'Imo State',
	// 	'JI': 'Jigawa State',
	// 	'KD': 'Kaduna State',
	// 	'KN': 'Kano State',
	// 	'KT': 'Katsina State',
	// 	'KE': 'Kebbi State',
	// 	'KO': 'Kogi State',
	// 	'KW': 'Kwara State',
	// 	'LA': 'Lagos State',
	// 	'NA': 'Nassarawa State',
	// 	'NI': 'Niger State',
	// 	'OG': 'Ogun State',
	// 	'ON': 'Ondo State',
	// 	'OS': 'Osun State',
	// 	'OY': 'Oyo State',
	// 	'PL': 'Plateau State',
	// 	'RI': 'Rivers State',
	// 	'SO': 'Sokoto State',
	// 	'TA': 'Taraba State',
	// 	'YO': 'Yobe State',
	// 	'ZA': 'Zamfara State',
	// }
	// const atmType = ['GRG', 'Wincor-Nixdorf', 'NCR']
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
	// const cEngineers = [
	// 	{
	// 		id: 1,
	// 		name: 'Yemi',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'yemi@example.com',
    //         location: 'lagos state',
	// 		supervisor: 'Banji',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Udo',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'udo@example.com',
    //         location: 'Osun state',
	// 		supervisor: 'Gmoney',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Ahmed',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'ahmed@example.com',
    //         location: 'Kogi state',
	// 		supervisor: 'Owolabi',
	// 	},
	// ]
	// const helpDesk = [
	// 	{
	// 		id: 1,
	// 		name: 'Nonye',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'nonye@example.com',
    //         location: 'Delta state',
	// 		supervisor: 'Collins',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Nike',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'nike@example.com',
    //         location: 'Abuja state',
	// 		supervisor: 'Collins',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Blessing',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'blessing@example.com',
    //         location: 'Plateau state',
	// 		supervisor: 'Collins',
	// 	},
	// ]
	// const faultStatus = ['Resolved', 'Pending']
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);

	const fields = {
		// name: location.user.name,
		// department: location.user.department.dept,
		// deliveries: location.user.department.numberOfPartsDelivered,
		// pendings: location.user.department.numberOfPartsPending,
		// phone: location.user.phone,
		// whatsapp: location.user.whatsapp,
		// photo: location.user.profile_photo,
		// email: location.user.email,
        // status: location.user.status,
		others: ''
	  }
	// const { useButton } = useContext(GlobalContext)
	const [formValues, setFormValues] = useState(fields);
	// const [isEditable, setIsEditable] = useState(false);
	// const [errors, setErrors] = useState({});
	
	// const EditHandler = (e) => {
	// 	e.preventDefault();
	// 	setIsEditable(!isEditable);
	// };

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
		  ...formValues,
		  [name]: value,
		});
	  };

	const validateForm = () => {
		// let formErrors = {};
		// if (!formValues.name) formErrors.name = 'Name is required';
		// if (!formValues.department) formErrors.department = 'Department is required';
		// if (!formValues.deliveries) formErrors.deliveries = 'Deliveries is required';
		// if (!formValues.pendings) formErrors.pendings = 'Pendings is required';
		// if (!formValues.phone) formErrors.phone = 'Phone Number is required';
		// if (!formValues.whatsapp) formErrors.whatsapp = 'Whatsapp Number is required';
		// if (!formValues.profile_photo) formErrors.profile_photo = 'Profile Photo is required';
		// if (!formValues.email) formErrors.email = 'Email is required';
		// if (!formValues.status) formErrors.status = 'Status is required';
		// setErrors(formErrors);
	
		// return Object.keys(formErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
		// Form is valid, proceed with submission logic
		console.log('Form submitted:', formValues);
		}
	};
	const name = "Lukeman"
	// const navigateTo = useNavigate();
	// const goTo = (e) => {
	// 	e.preventDefault();
	// 	navigateTo("/custodian/form");
	// }
	// const FaultForm = ({ faults, formValues }) => {
	const [fixedParts, setfixedParts] = useState([{ part: '', amount: '' }]);

	const addFixedFieldSet = () => {
		setfixedParts([...fixedParts, { part: '', amount: '' }]);
	};

	const [requestComponent, setRequestComponent] = useState([{ component: '', amount: '' }]);

	const addRequestComponentFieldSet = () => {
		setRequestComponent([...requestComponent, { component: '', amount: '' }]);
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
											{location.user.name}
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
								{/* <div className="cust-row">
									<div className="input-field">
										<p>
											workshop parts
										</p>
									</div>
									<div className="input-field">
										<p>
										{location.user.email}
										</p>
									</div>
									<div className="input-field">
										<p>
										{location.user.status}
										</p>
									</div>
								</div> */}
								{/* <div className="input-field textarea-box">
									<p>textarea</p>
								</div> */}
						</div>
					</div>
				</div>
				<hr />

		{/* forms ............................................ */}

		{/* Post parts ............................................ */}
				<div className="split-container">
					<div className="dash-form">
						<div>
							<h4>Post completed parts</h4>
						</div>
						<div>
							<div className="to-form">
								{/* <h4>Log a Fault</h4> */}
								{/* <a href={"/custodian"} onClick={(e) => goTo(e)}> */}
								{/* <h4>Workshop</h4> */}
								{/* </a> */}
							</div>
							<hr />
							<form onSubmit={handleSubmit}>
								<div>
									{/* row 1 */}
									{/* <div className="cust-row"> */}
										{/* <div className="input-field">
											<label htmlFor="name">Name:</label>
											<input
											type="text"
											name="name"
											id="name"
											value={formValues.name}
											readOnly
											/>
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="department">Department:</label>
											<input
											type="text"
											name="department"
											id="department"
											value={formValues.department}
											readOnly
											onChange={handleInputChange}
											readOnly={!isEditable}
											/>
											{errors.state && <span className="error">{errors.state}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="deliveries">Deliveries:</label>
											<input
											type="text"
											name="deliveries"
											id="deliveries"
											value={formValues.deliveries}
											readOnly
											onChange={handleInputChange}
											readOnly={!isEditable}
											/>
											{errors.branch && <span className="error">{errors.branch}</span>}
										</div> */}
									{/* </div> */}
									{/* row 2 */}
									<div className="cust-row">
										{/* <div className="input-field">
											<label htmlFor="pendings">Pendings:</label>
											<input
											type="text"
											name="pendings"
											id="pendings"
											value={formValues.pendings}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.engineer && <span className="error">{errors.engineer}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="phone">Phone:</label>
											<input
											type="text"
											name="phone"
											id="phone"
											value={formValues.phone}
											// onChange={handleInputChange}
											readOnly
											/>
											{errors.helpDesk && <span className="error">{errors.helpDesk}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="whatsapp">Whatsapp Number:</label>
											<input
											type="text"
											name="whatsapp"
											id="whatsapp"
											value={formValues.whatsapp}
											onChange={handleInputChange}
											readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div> */}
									</div>
									{/* row 3 */}
									{/* <div className="cust-row"> */}
										{/* <div className="input-field">
											<label htmlFor="photo">Profile Photo:</label>
											<input
											type="text"
											name="photo"
											id="photo"
											value={formValues.photo}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.engineer && <span className="error">{errors.engineer}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="email">Email:</label>
											<input
											type="text"
											name="email"
											id="email"
											value={formValues.email}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.helpDesk && <span className="error">{errors.helpDesk}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="status">Status:</label>
											<input
											type="text"
											name="status"
											id="status"
											value={formValues.status}
											onChange={handleInputChange}
											readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div> */}
									{/* </div> */}






									{/* <div className="cust-row">
										<div className="input-field">
											<label htmlFor="total-atms">Total Number of ATMs:</label>
											<input
											type="text"
											name="total-atms"
											id="total-atms"
											value={formValues.totalNumberOfATMs}
											// readOnly={!isEditable}
											/>
											{errors.totalNumberOfATMs && <span className="error">{errors.totalNumberOfATMs}</span>}
										</div>
									</div> */}


									{/* Request components parts */}
									{/* <div className="cust-row">
										<div className="dynamic-cust-row">
										{requestComponent.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Request Components:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{components.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Components:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
												</div>
											</div>
										))}
										</div>
									</div> */}

									{/* Submit fixed parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{fixedParts.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Post Fixed Part:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{parts.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Part:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
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
									{/* <button onClick={EditHandler}>Edit Fields</button> */}
									<button type="button" onClick={addFixedFieldSet}>
											Add More Part
										</button>
									{/* <button type="button" onClick={addRequestComponentFieldSet}>
										Add Request
									</button> */}
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
							// backgroundColor: 'white',
							// boxShadow: 'inset 0 0 5px white',
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
								{/* <h4>Log a Fault</h4> */}
								{/* <a href={"/custodian"} onClick={(e) => goTo(e)}> */}
								{/* <h4>Workshop</h4> */}
								{/* </a> */}
							</div>
							<hr />
							<form onSubmit={handleSubmit}>
								<div>
									{/* row 1 */}
									{/* <div className="cust-row"> */}
										{/* <div className="input-field">
											<label htmlFor="name">Name:</label>
											<input
											type="text"
											name="name"
											id="name"
											value={formValues.name}
											readOnly
											/>
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="department">Department:</label>
											<input
											type="text"
											name="department"
											id="department"
											value={formValues.department}
											readOnly
											onChange={handleInputChange}
											readOnly={!isEditable}
											/>
											{errors.state && <span className="error">{errors.state}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="deliveries">Deliveries:</label>
											<input
											type="text"
											name="deliveries"
											id="deliveries"
											value={formValues.deliveries}
											readOnly
											onChange={handleInputChange}
											readOnly={!isEditable}
											/>
											{errors.branch && <span className="error">{errors.branch}</span>}
										</div> */}
									{/* </div> */}
									{/* row 2 */}
									{/* <div className="cust-row"> */}
										{/* <div className="input-field">
											<label htmlFor="pendings">Pendings:</label>
											<input
											type="text"
											name="pendings"
											id="pendings"
											value={formValues.pendings}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.engineer && <span className="error">{errors.engineer}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="phone">Phone:</label>
											<input
											type="text"
											name="phone"
											id="phone"
											value={formValues.phone}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.helpDesk && <span className="error">{errors.helpDesk}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="whatsapp">Whatsapp Number:</label>
											<input
											type="text"
											name="whatsapp"
											id="whatsapp"
											value={formValues.whatsapp}
											onChange={handleInputChange}
											readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div> */}
									{/* </div> */}
									{/* row 3 */}
									{/* <div className="cust-row"> */}
										{/* <div className="input-field">
											<label htmlFor="photo">Profile Photo:</label>
											<input
											type="text"
											name="photo"
											id="photo"
											value={formValues.photo}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.engineer && <span className="error">{errors.engineer}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="email">Email:</label>
											<input
											type="text"
											name="email"
											id="email"
											value={formValues.email}
											onChange={handleInputChange}
											readOnly
											/>
											{errors.helpDesk && <span className="error">{errors.helpDesk}</span>}
										</div> */}
										{/* <div className="input-field">
											<label htmlFor="status">Status:</label>
											<input
											type="text"
											name="status"
											id="status"
											value={formValues.status}
											onChange={handleInputChange}
											readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div> */}
									{/* </div> */}






									{/* <div className="cust-row">
										<div className="input-field">
											<label htmlFor="total-atms">Total Number of ATMs:</label>
											<input
											type="text"
											name="total-atms"
											id="total-atms"
											value={formValues.totalNumberOfATMs}
											// readOnly={!isEditable}
											/>
											{errors.totalNumberOfATMs && <span className="error">{errors.totalNumberOfATMs}</span>}
										</div>
									</div> */}


									{/* Request components parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{requestComponent.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Request Components:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{components.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Components:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
												</div>
											</div>
										))}
										</div>
									</div>

									{/* Submit fixed parts */}
									{/* <div className="cust-row">
										<div className="dynamic-cust-row">
										{fixedParts.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Fixed Part:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{parts.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Part:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
												</div>
											</div>
										))}
										</div>
									</div> */}
									
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
									{/* <button onClick={EditHandler}>Edit Fields</button> */}
									{/* <button type="button" onClick={addFixedFieldSet}>
											Add Part
										</button> */}
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

export default Workshop;