// import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
import { Link } from "react-router-dom"
import "../sidebar_pages.css"
// import Custodian from "./Custodian";

function HumanResource() {
	// if faultStatus is true, the button should be disabled permanently
	// const [ faultStatus, setFaultStatus ] = useState(false)
	// json structure for workshop page
	const user =
		{
			names: {
				firstname: 'John',
				lastname: 'Tunmise',
				middlename: 'Ibidapo',
			},
			department: {
				department: 'Workshop',
				numberOfResolutions: 52,
				numberOfPendingFaults: 9,
			},
			phone: '12345678902',
			wphone: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'james@example.com',
			address: '12, kudirat way, lagos',
			status: 'active',
			aboutme: 'I love solving problems',
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

	// registration logic
	const [createUserFormValues, setCreateUserFormValues] = useState({});
	const [newUserError, setNewUserError] = useState({});
	const handleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		
		// Handle file inputs separately
		if (type === "file") {
			setCreateUserFormValues({
				...createUserFormValues,
				// Store the file
				[name]: files[0],
			});
		} else {
			setCreateUserFormValues({
				...createUserFormValues,
				// store other texts
				[name]: value,
			});
		}};
	const validateUserCreationForm = () => {
		let newUserCreationErrors = {};
		if (!createUserFormValues.fname) newUserCreationErrors.fname = 'Firstname is required';
		if (!createUserFormValues.lname) newUserCreationErrors.lname = 'Lastname is required';
		if (!createUserFormValues.email) newUserCreationErrors.email = 'Email is required';
		if (!createUserFormValues.wphone) newUserCreationErrors.wphone = 'Whatsapp Phone Number is required';
		if (!createUserFormValues.address) newUserCreationErrors.address = 'Address is required';
		if (!createUserFormValues.department) newUserCreationErrors.department = 'Department is required';
		if (!createUserFormValues.password1) newUserCreationErrors.password1 = 'Password is required';
		if (!createUserFormValues.password2) newUserCreationErrors.password2 = 'Password confirmation is required';
		setNewUserError(newUserCreationErrors);

		const noError = Object.keys(newUserCreationErrors).length === 0;
		return noError;
	}

	const handleUserCreationSubmit = (e) => {
		e.preventDefault();
		if (validateUserCreationForm) {
			// proceed with submission
			console.log('User creation successful:', createUserFormValues);
		} else {
			console.log('Validation errors:', newUserError);
		}
	}

	
	// for user update
	const displayPhotoUpdate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('updateImage');
			output.src = reader.result;
			output.style.display = 'block';
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('updateImage').style.display = 'none';
		}
	}
	useEffect(() => {
		const photoSampleUpdate = document.getElementById('u-ppicture');
		// let photoSample = null;
		if (photoSampleUpdate) {
			photoSampleUpdate.addEventListener('change', displayPhotoUpdate);
		}
		return () => {
			photoSampleUpdate.removeEventListener('change', displayPhotoUpdate);
		}
	}, []);

	// for user creation
	const displayPhotoCreate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('createImage');
			output.src = reader.result;
			output.style.display = 'block';
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('createImage').style.display = 'none';
		}
	}
	useEffect(() => {
		const photoSampleCreate = document.getElementById('c-ppicture');
		if (photoSampleCreate) {
			photoSampleCreate.addEventListener('change', displayPhotoCreate);
		}
		return () => {
			photoSampleCreate.removeEventListener('change', displayPhotoCreate);
		}
	}, []);


	console.log('first name: ' + user.names)

	// edit user logic
	const fields = {
		fname: user.names.firstname,
		lname: user.names.lastname,
		mname: user.names.middlename,
        email: user.email,
        wphone: user.phone,
        address: user.address,
        department: user.department.department,
		aboutme: user.aboutme,
	}
	// const { useButton } = useContext(GlobalContext)
	const [formValues, setFormValues] = useState(fields);
	const [isEditable, setIsEditable] = useState(false);
	const [errors, setErrors] = useState({});
	const [selectedOptions, setSelectedOptions] = useState('');
	const EditHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};
	const handleInputChange = (e) => {
		const { name, value, type, files } = e.target;
		
		// Handle file inputs separately
		if (type === "file") {
			setFormValues({
				...formValues,
				// Store the file
				[name]: files[0],
			});
		} else {
			setFormValues({
				...formValues,
				// store other texts
				[name]: value,
			});
		}
		if (name === 'department') {
			console.log('department set value:', value);
			setSelectedOptions(value);
			console.log('department set selectedOptions:', selectedOptions);
		}
	};
	const validateForm = () => {
		let formErrors = {};
		if (!formValues.fname) formErrors.fname = 'Firstname is required';
		if (!formValues.lname) formErrors.lname = 'Lastname is required';
		if (!formValues.email) formErrors.email = 'Email is required';
		if (!formValues.wphone) formErrors.wphone = 'Whatsapp Phone Number is required';
		if (!formValues.address) formErrors.address = 'Address is required';
		if (!formValues.department) formErrors.department = 'Department is required';
		setErrors(formErrors);
	
		return Object.keys(formErrors).length === 0;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
		// Form is valid, proceed with submission logic
		console.log('Form submitted:', formValues);
		}
	};


	const name = "Sandra"
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
												{user.names.firstname}
											</Link>
										</p>
									</div>
									<div className="input-field">
										<p><strong>Department: </strong>
										{user.department.department}
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
										{user.phone}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Whatsapp No.: </strong>
										{user.wphone}
										</p>
									</div>
									<div className="input-field">
										<p><strong>Email: </strong>
											{user.email}
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

			{/* add parts ............................................ */}
				<div className="split-container">
					<div className="dash-form">
						<div>
							<h4>Add Parts to Database</h4>
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
									{/* Submit fixed parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{fixedParts.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`add-parts-${index}`}>Add Part:</label>
													<select id={`add-parts-${index}`} name={`parts-${index}`}>
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
														<select id='part-qty' name={`amount-${index}`}>
														{Array.from({ length: 1000 }, (_, i) => i + 1).map((number) => (
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
									
									{/* <div className="">
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
									</div> */}
								</div>
								<div className="cust-button">
									<button type="submit">Post</button>
									{/* <button onClick={EditHandler}>Edit Fields</button> */}
									<button type="button" onClick={addFixedFieldSet}>
											Add More
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

			{/* add components ............................................ */}
					<div className="dash-form">
							<div>
								<h4>Add Components to Database</h4>
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
										{/* Request components parts */}
										<div className="cust-row">
											<div className="dynamic-cust-row">
											{requestComponent.map((field, index) => (
												<div className="b-line" key={index}>
													<div className="input-field">
														<label htmlFor={`add-comps-${index}`}>Add More:</label>
														<select id={`add-comps-${index}`} name={`parts-${index}`}>
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
															<select id='comp-qty' name={`amount-${index}`}>
															{Array.from({ length: 1000 }, (_, i) => i + 1).map((number) => (
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
									</div>
									<div className="cust-button">
										<button type="submit">Post</button>
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

				<hr />

			{/* create user ............................................ */}
				<div className="split-container">
					<div className="dash-form">
						<div>
							<h4>Create User Account</h4>
						</div>
						<div>
							<div className="to-form">
								{/* <h4>Log a Fault</h4> */}
								{/* <a href={"/custodian"} onClick={(e) => goTo(e)}> */}
								{/* <h4>Workshop</h4> */}
								{/* </a> */}
							</div>
							<hr />
							<form onSubmit={handleUserCreationSubmit}>
								<div>
									{/* row 1 */}
									<div className="cust-row-user">
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="c-fname">First Name:</label>
												<input
												type="text"
												name="fname"
												id="c-fname"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.fname && <span className="error">{newUserError.fname}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="c-mname">Middle Name:</label>
												<input
												type="text"
												name="mname"
												id="c-mname"
												onChange={handleUserCreationInputChange}
												/>
												{/* {newUserError.lname && <span className="error">{newUserError.lname}</span>} */}
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="c-lname">Last Name:</label>
												<input
												type="text"
												name="lname"
												id="c-lname"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.lname && <span className="error">{newUserError.lname}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="c-email">Email:</label>
												<input
												type="email"
												name="email"
												id="c-email"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.email && <span className="error">{newUserError.email}</span>}
											</div>
										</div>
										<div className="user-fields-row">
										<div className="input-field">
												<label htmlFor="c-wphone">Whatsapp No.:</label>
												<input
												type="tel"
												name="wphone"
												id="c-wphone"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.wphone && <span className="error">{newUserError.wphone}</span>}
											</div>
											<div className="input-field">
												
												<label htmlFor="c-department">Department:</label>
												<select id="c-department" name="department">
												{['Select Department', 'Engineering', 'Workshop', 'Help Desk'].map(part => (
													<option key={part} value={part}>
													{part}
													</option>
												))}
												</select>
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="password1">Password:</label>
												<input
												type="password"
												name="password1"
												id="password1"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.password1 && <span className="error">{newUserError.password1}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="password2">Password confirmation:</label>
												<input
												type="password"
												name="password2"
												id="password2"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.password2 && <span className="error">{newUserError.password2}</span>}
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="c-address">Address:</label>
												<input
												type="text"
												name="address"
												id="c-address"
												onChange={handleUserCreationInputChange}
												/>
												{newUserError.address && <span className="error">{newUserError.address}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="c-aboutme">About Me:</label>
												<textarea
												// type="text"
												name="aboutme"
												id="c-aboutme"
												onChange={handleUserCreationInputChange}
												/>
												{/* {newUserError.aboutme && <span className="error">{newUserError.aboutme}</span>} */}
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="c-ppicture">Profile Picture:</label>
												<input
												type="file"
												accept="image/*"
												name="ppicture"
												id="c-ppicture"
												// onChange={handleUserCreationInputChange}
												/>
												{/* {newUserError.aboutme && <span className="error">{newUserError.aboutme}</span>} */}
												{<img id="createImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
											</div>
										</div>
									</div>
								</div>
								<div className="cust-button">
									<button type="submit">Create User</button>
									{/* <button onClick={EditHandler}>Edit Fields</button> */}
									{/* <button type="button" onClick={addFixedFieldSet}>
											Add More
										</button> */}
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

			{/* update user ............................................ */}
					<div className="dash-form">
						<div className="title-and-get-user">
							<h4>Update User Account</h4>
							<div className="input-field">
								<label htmlFor="user">Get User:</label>
								<input
								className="get-user-infield"
								type="text"
								name="user"
								id="user"
								placeholder="First Name ..."
								onChange={handleInputChange}
								// value={formValues.fname}
								// readOnly={!isEditable}
								/>
								{/* {errors.fname && <span className="error">{errors.fname}</span>} */}
							</div>
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
									<div className="cust-row-user">
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="u-fname">First Name:</label>
												<input
												type="text"
												name="fname"
												id="u-fname"
												onChange={handleInputChange}
												value={formValues.fname}
												readOnly={!isEditable}
												/>
												{errors.fname && <span className="error">{errors.fname}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="u-mname">Middle Name:</label>
												<input
												type="text"
												name="mname"
												id="u-mname"
												onChange={handleInputChange}
												value={formValues.mname}
												readOnly={!isEditable}
												/>
												{/* {errors.lname && <span className="error">{errors.lname}</span>} */}
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="u-lname">Last Name:</label>
												<input
												type="text"
												name="lname"
												id="u-lname"
												onChange={handleInputChange}
												value={formValues.lname}
												readOnly={!isEditable}
												/>
												{errors.lname && <span className="error">{errors.lname}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="u-email">Email:</label>
												<input
												type="email"
												name="email"
												id="u-email"
												onChange={handleInputChange}
												value={formValues.email}
												readOnly={!isEditable}
												/>
												{errors.email && <span className="error">{errors.email}</span>}
											</div>
										</div>
										<div className="user-fields-row">
										<div className="input-field">
												<label htmlFor="u-wphone">Whatsapp No.:</label>
												<input
												type="tel"
												name="wphone"
												id="u-wphone"
												onChange={handleInputChange}
												value={formValues.wphone}
												readOnly={!isEditable}
												/>
												{errors.wphone && <span className="error">{errors.wphone}</span>}
											</div>
											<div className="input-field">
												
												<label htmlFor="u-department">Department:</label>
												<select
												id="u-department"
												name="department"
												onChange={handleInputChange}
												value={formValues.department}
												readOnly={!isEditable}
												>
												{(!isEditable) ? (<option>{formValues.department}</option>) : (['Select Department', 'Engineering', 'Workshop', 'Help Desk'].map(part => (
													<option key={part} value={part}>
													{part}
													</option>
												)))}
												</select>
											</div>
										</div>
										{/* <div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="password1">Password:</label>
												<input
												type="password"
												name="password1"
												id="password1"
												onChange={handleInputChange}
												/>
												{errors.password1 && <span className="error">{errors.password1}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="password2">Password confirmation:</label>
												<input
												type="password"
												name="password2"
												id="password2"
												onChange={handleInputChange}
												/>
												{errors.password2 && <span className="error">{errors.password2}</span>}
											</div>
										</div> */}
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="u-address">Address:</label>
												<input
												type="text"
												name="address"
												id="u-address"
												onChange={handleInputChange}
												value={formValues.address}
												readOnly={!isEditable}
												/>
												{errors.address && <span className="error">{errors.address}</span>}
											</div>
											<div className="input-field">
												<label htmlFor="u-aboutme">About Me:</label>
												<textarea
												// type="text"
												name="aboutme"
												id="u-aboutme"
												onChange={handleInputChange}
												value={formValues.aboutme}
												readOnly={!isEditable}
												/>
											</div>
										</div>
										<div className="user-fields-row">
											<div className="input-field">
												<label htmlFor="u-ppicture">Profile Picture:</label>
												<input
												type="file"
												accept="image/*"
												name="ppicture"
												id="u-ppicture"
												// value={formValues.ppicture}
												// readOnly={!isEditable}
												/>
												{/* {errors.aboutme && <span className="error">{errors.aboutme}</span>} */}
												{<img id="updateImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
											</div>
										</div>
									</div>
								</div>
								<div className="cust-button">
									<button type="submit">Update User</button>
									<button onClick={EditHandler}>{!isEditable ? 'Edit Fields' : 'Done Editing'}</button>
									{/* <button type="button" onClick={addFixedFieldSet}>
											Add More
										</button> */}
									{/* <button type="button" onClick={addRequestComponentFieldSet}>
										Add Request
									</button> */}
								</div>
							</form>
						</div>
					</div>
				</div>
		
			</div>
		</>
	);
};

export default HumanResource;