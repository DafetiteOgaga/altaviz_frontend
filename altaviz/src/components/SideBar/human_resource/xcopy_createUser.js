import PhoneInput from 'react-phone-input-2'; // npm install react-phone-input-2
import 'react-phone-input-2/lib/style.css'; // npm install react-phone-input-2
import { useState, useEffect } from "react";
import styled from "styled-components"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SubmitNotification from '../notifications/submitNotification/SubmitNotification';

// const TopContainer = styled.div`
// 	display: flex;
// 	/* justify-content: space-around; */
// 	flex-direction: column;
// `
// const BorderLineContainer = styled.div`
// 	display: flex;
// 	gap: 3rem;
// 	/* border: 1px solid black; */
// 	border-radius: 0.5rem;
// 	padding: 1rem;
// 	padding-bottom: 0;
// 	margin-bottom: 0.5rem;
// `
// const FieldsContainer = styled.div`
// 	display: flex;
// 	flex-direction: row;
// 	padding-bottom: 1rem;
// `
const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// flex-direction: row;
	justify-content: space-evenly;
`
const Label = styled.label`
	font-size: large;
`
const SelectItem = styled.select`
	height: 100%;
`
const MainButton = styled.h6`
	text-decoration: none;
	white-space: pre;
	color: #2b2929;
	padding: 0 0.7rem;
	border: 0.01px solid;
	border-radius: 5px;
	font-family: sans-serif;
	background-color: #E5E5E5;
	// font-weight: 900;
	margin: 0;
	&:hover {
		box-shadow: -5px 5px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a935d;
	}
	&:active {
		box-shadow: -1px 1px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a93;
	}
`
function CreateUser () {
	const initailFormValues = {
		department: "",
		bank: "",
		branch: "",
		state: "",
		qtyAtm: "",
		fname: "",
		lname: "",
		mname: "",
		email: "",
		phone: "",
		wphone: "",
		password1: "",
		password2: "",
		address: "",
		aboutme: "",
		ppicture: null,
	}
	let defaultState = {
		nothing: false,
		custodian: false,
		all: false,
	};
	const emptyFields = {
		isBankEmpty: false,
		// isBranchEmpty: false,
	}
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});
	const [showFields, setShowFields] = useState(false);
	const [dept, setDept] = useState(defaultState);
	const [phone, setPhone] = useState('');
	const [error, setError] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState(true);
	const [isRequired, setIsRequired] = useState(true);
	const [isEmpty, setIsEmpty] = useState(emptyFields);
	const [currEmptyState, setCurrEmptyState] = useState({...emptyFields});
	const [failedSubmission, setFailedSubmission] = useState(false);
	// useEffect(() => {
	//   handleEmptyFields();
	// }, [failedSubission])
	const handleEmptyFields = (e) => {
		const { name, value } = e.target;
		// console.log('value:', value);
		// console.log(`#####\nvalue: ${value}\nfailed to submit: ${failedSubmission}\nbranch error: ${newUserError.name}\nvalue.trim: ${value.trim() === '' && failedSubmission}\n#####`)
		setIsEmpty((prevState) => ({
			...prevState,
			[name]: value.trim() === '' && failedSubmission
		}));
	};
	useEffect(() => {
		setCurrEmptyState((prevState) => ({
			...prevState,
			...isEmpty
		}));
		// console.log('Current empty state:', currEmptyState);
	}, [isEmpty]);
	const handleFocus = () => {
		setIsRequired(false);
	}
	const handleBlur = () => {
		setIsRequired(true);
	}
	const togglePasswordvisi1 = () => {
		setShowPassword1(!showPassword1);
	}
	// useEffect(() => {
	//   const focus = document.getElementById('email');
	//   if (focus.checked) {
	//     focus.setAttribute('required', false);
	//   } else {
	//     focus.setAttribute('required', true);
	//   }
	//   return focus.removeAttribute('required');
	// }, [])
	const togglePasswordvisi2 = () => {
		setShowPassword2(!showPassword2);
	}
	const handlePhoneChange = (value) => {
		setPhone(value);

		if (value && value.length < 10) {
			setError('Please enter a valid phone number.');
		} else {
			setError('');
		}
	}
	const HandleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		// console.log('onchange value:', value)
	if (name === 'email' || name === 'phone' || name === 'wphone') {
		console.log('GOT IT! onchange:', value);
	}
	if (type === "file") {
		console.log('A FILE FINALLY! onchange:', value);
		setNewUser({
			...newUser,
			[name]: files[0],
		});
	// console.log("showFields (before):", showFields);
			// if (showFields) {
	//   console.log("showFields (after):", showFields);
			// 	const imagePreview = document.getElementById("createImage");
			// 	imagePreview.src = URL.createObjectURL(files[0]);
			// 	imagePreview.style.display = "block"; // checkout other display properties
			// }
		} else {
	// if (name === 'password1' || name === 'password2') {
	//   if (name === 'password1') {
	//     console.log('password1111:', value)
	//     setPassword1(value);
	//     setNewUser({
	//       ...newUser,
	//       [name]: value,
	//     });
	//     console.log('password1:', value);
	//   }
	//   if (name === 'password2') {
	//     console.log('password2222:', value)
	//     setPassword2(value);
	//     setNewUser({
	//       ...newUser,
	//       [name]: value,
	//     });
	//     console.log('password2:', value);
	//   }
	//   let passMatch = newUser.password1 === newUser.password2
	//   console.log(`#####\npassMatch: ${passMatch}\npassword1: ${newUser.password1}\npassword2: ${newUser.password2}\n#####`);
	//   if (!passMatch) {
	//     // setPasswordError('Passwords does not match');
	//     console.log(`passwords match: ${password1 === password2}`)
	//     setPasswordCheck(false);
	//     // setNewUserError({
	//     //   ...newUserError,
	//     //   password1: 'Passwords do not match',
	//     //   password2: 'Passwords do not match',
	//     // })
	//   } else if (passMatch) {
	//     // setNewUser({
	//     //   ...newUser,
	//     //   password: newUser.password1,
	//     // });
	//     setPasswordCheck(true);
	//     setFinalPassword(newUser.password1)
	//     // setNewUserError({
	//     //   ...newUserError,
	//     //   password1: '',
	//     //   password2: '',
	//     // })
	//   }
	//   // else {
	//   //   setPasswordError('');
	//   //   console.log(`passwords match: ${password1 === password2}`)
	//   // }
	// } else {
	//   console.log("text value:", value);
	//   setNewUser({
	//     ...newUser,
	//     [name]: value,
	//   });
	// }
	setNewUser({
		...newUser,
		[name]: value,
	});

	if (name === 'password1') {
		setPassword1(value);
	} else if (name === 'password2') {
		setPassword2(value);
	}
	}};
	useEffect(() => {
		if (password1 && password2) {
			// enforce other checks here
			const passMatch = password1 === password2;
			setPasswordCheck(passMatch);
		}
	}, [password1, password2]);

useEffect(() => {
	if (passwordCheck) {
		setNewUserError({
			...newUserError,
			password1: '',
			password2: '',
		})
		setNewUser({
			...newUser,
			password: password1,
		});
	// setFinalPassword('');
	} else {
		setNewUserError({
			...newUserError,
			password1: 'Passwords do not match',
			password2: 'Passwords do not match',
		})
		setNewUser({
			...newUser,
			password: '',
		});
	}
	}, [passwordCheck]);

	const validateForm = () => {
	const required = 'Required*';
	console.log('validateForm fxn');
	let errors = {};
		[
		'department',
		'fname',
		'lname',
		'email',
		'phone',
		'wphone',
		'password1',
		'password2',
		'address'
		].forEach((field) => {
		if (!newUser[field] ||
			newUser[field].trim() === '') {
			errors[field] = required;
			}
		})
	if (newUser.department === 'Custodian') {
		[
			'bank',
			'branch',
			'state'
		].forEach((fieldName) => {
			if (!newUser[fieldName] ||
			newUser[fieldName].trim() === '') {
				errors[fieldName] = required;
			}
		})
	}
	setNewUserError({...newUserError, ...errors});
	console.log('total errors:', errors);
	return Object.keys(errors).length === 0;
	// if (!newUser.department) generalFormErrors.department = required;
		// if (!newUser.fname) generalFormErrors.fname = required;
		// if (!newUser.lname) generalFormErrors.lname = required;
		// if (!newUser.email) generalFormErrors.email = required;
		// if (!newUser.phone) generalFormErrors.phone = required;
		// if (!newUser.wphone) generalFormErrors.wphone = required;
		// if (!newUser.password1) generalFormErrors.password1 = required;
		// if (!newUser.password2) generalFormErrors.password2 = required;
	// if (!newUser.address) generalFormErrors.address = required;

	//   let plusCustodianFormErrors = {}
		// 	if (!newUser.bank) plusCustodianFormErrors.bank = required;
		// 	if (!newUser.branch) plusCustodianFormErrors.branch = required;
		// 	if (!newUser.state) plusCustodianFormErrors.state = required;

	//   if (newUser.department === "Custodian") {
	//     console.log("yes:", newUser.department);
	//     setNewUserError({...newUserError, plusCustodianFormErrors, generalFormErrors})
	//   } else {
	//     console.log("no:", newUser.department);
	//     setNewUserError({...newUserError, generalFormErrors})
	//   }
	//   console.log('total errors:', generalFormErrors);
	// 	return Object.keys(generalFormErrors).length === 0;
	}
	const handleFormSubmission = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Validate form inputs
			console.log('Form submitted:', newUser);
			// Submit form data to server
			//...
			// Reset form state
			setNewUser(initailFormValues);
			setShowFields(false);
		} else {
			setFailedSubmission(true);
			console.log('Form not submitted due to errors');
	}
	console.log('email:', newUser.email);
	console.log('phone:', newUser.phone);
	console.log('wphone:', newUser.wphone);
	console.log('fields:', newUser);
	}
	// const [dept, setDept] = useState({
	// 	nothing: false,
	// 	custodian: false,
	// 	all: false,
	// });
	// const [newUserError, setNewUserError] = useState({});
	const displayPhotoCreate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('createImage');
			output.src = reader.result;
			Object.assign(output.style, {
				display: 'block',
				border: '2px solid #333',
				borderRadius: '100%',
				width: '150px',
				height: '150px',
				marginTop: '1rem',
				padding: '0.1rem',
			});
			// output.style.display = 'block';
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('createImage').style.display = 'none';
		}
	}
	useEffect(() => {
	// console.log('RUNNING RUNNING RUNNING');
		const photoSampleCreate = document.getElementById('ppicture');
		if (photoSampleCreate) {
			if (photoSampleCreate) {
				photoSampleCreate.addEventListener('change', displayPhotoCreate);
			}
			return () => {
				photoSampleCreate.removeEventListener('change', displayPhotoCreate);
			}
		}
	});
	const renderByDept = (e) => {
		const value = e.target.value;
		// const defaultState = {
		// 	nothing: false,
		// 	custodian: false,
		// 	all: false,
		// };
		switch (value) {
			case 'Custodian':
				setDept({
					...defaultState,
					custodian: true,
					nothing: true,
					all: true,
				});
				break;
			case 'Select Department':
				setDept({
					...defaultState,
				});
				break;
			default:
				setDept({
					...defaultState,
					all: true,
					nothing: true
				});
		}
		// console.log('THE VALUE:', value);
	}
	// const HandleUserCreationInputChange = (e) => {
	// 	// Handle input change
	// };
	
	// const handleFormSubmission = (e) => {
	// 	e.preventDefault();
	// 	// Handle form submission
	// };
	const errorStylings = {
		color: 'red',
		fontSize: 'small',
		fontStyle: 'italic',
	}
	const visiButtonStyle = {
		position: 'absolute',
		right: '125px',
		top: '60%',
		transform: 'translateY(-50%)',
		color: '#333',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		padding: '0',
		margin: '0',
	}
	// console.log('new user:', newUser)
	// console.log('newUserError:', newUserError)
	// console.log('finalPassword (#####):', finalPassword)
	const temp = {
		loading: false,
		postError: false,
		response: false,
	}
	return (
		<>
			<div className="dash-form">
				<div>
					<h4>Create User Account</h4>
				</div>
				<div>
					<div className="to-form">
					</div>
					<hr />
					{/* <form onSubmit={handleFormSubmission}> */}
					<form>
						<div>
							
							<div className="cust-row-user">
						
								<div className="user-fields-row">
									<div className="input-field">
										<Label htmlFor="department">Department:</Label>
										<SelectItem
										id="department"
										name="department"
										value={newUser.department}
										onChange={(e) => {
											// console.log('1111111111')
											HandleUserCreationInputChange(e);
											// console.log('2222222222')
											renderByDept(e);
											// console.log('3333333333')
										}}
										// required
										>
											<option>Select Department</option>
										{[
											'Custodian',
											'Engineering',
											'Workshop',
											'Help Desk'
										].map((dept) => {
											// console.log('dept value:', dept)
											return (
											<option key={dept} value={dept}>
											{dept}
											</option>
										)})}
										</SelectItem>
										{/* {newUserError.department && <span style={{...errorStylings}}>{newUserError.department}</span>} */}
										{newUserError.department &&
										(!failedSubmission ?
										(<span style={{...errorStylings}}>
											{newUserError.department}
										</span>) :
										(newUser.department === 'Select Department' ?
										(<span style={{...errorStylings}}>
											{newUserError.department}
										</span>) : ''))}
									</div>
								</div>
								{(dept.nothing) &&
								(
									<>
										{(dept.all) &&
										(
											<>
												{(dept.custodian) &&
												(
													<>
														<div className="user-fields-row">
															<div className="input-field">
																<Label htmlFor="bank">Bank:</Label>
																<SelectItem
																name="bank"
																id="bank"
																value={newUser.bank}
																// required
																onChange={(e) => {
																HandleUserCreationInputChange(e);
																handleEmptyFields(e);
																}}
																// onChange={HandleUserCreationInputChange}
																>
																	<option>Select Bank</option>
																{[
																	'UBA',
																	'WEMA Bank',
																	'FCMB',
																	'Ecobank',
																	'Union Bank',
																	'Fidelity Bank',
																	'Heritage Bank',
																	'Polaris Bank',
																	'Access Bank',
																].map((bank, i) => (
																// <>
																	
																	<option key={i} value={bank}>{bank}</option>
																// </>
																))}
															</SelectItem>
															{/* {(newUserError.bank && !currEmptyState.bank) && <span style={{...errorStylings}}>{newUserError.bank}</span>} */}
															{/* {newUserError.bank && <span style={{...errorStylings}}>{newUserError.bank}</span>} */}
															{newUserError.bank &&
															(!failedSubmission ?
															(<span style={{...errorStylings}}>
																{newUserError.bank}
															</span>) :
															(newUser.bank === 'Select Bank' ?
															(<span style={{...errorStylings}}>
																{newUserError.bank}
															</span>) : ''))}
															{/* {newUserError.bank && (
															!failedSubmission || newUser.bank === ''
																? <span style={errorStylings}>{newUserError.bank}</span>
																: null
															)} */}
															</div>
															<div className="input-field">
																<Label htmlFor="branch">Branch:</Label>
																<input
																type="text"
																// autoComplete
																name="branch"
																id="branch"
																value={newUser.branch}
																// required
																onChange={(e) => {
																HandleUserCreationInputChange(e);
																handleEmptyFields(e);
																}}
																/>
																{/* {(newUserError.branch && currEmptyState.branch) && <span style={{...errorStylings}}>{newUserError.branch}</span>} */}
																{/* {newUserError.branch &&  <span style={{...errorStylings}}>{newUserError.branch}</span>} */}
																{/* {newUserError.branch && (!failedSubmission ? (<span style={{...errorStylings}}>{newUserError.branch}</span>) : (newUser.branch === '' ? (<span style={{...errorStylings}}>{newUserError.branch}</span>) : ''))} */}
																{newUserError.branch && (
																!failedSubmission || newUser.branch === ''
																	? <span style={errorStylings}>{newUserError.branch}</span>
																	: null
																)}
															</div>
														</div>
														<div className="user-fields-row">
															<div className="input-field">
																<Label htmlFor="state">State:</Label>
																<SelectItem
																// type="text"
																// autoComplete
																name="state"
																id="state"
																value={newUser.state}
																// required
																onChange={HandleUserCreationInputChange}
																>
																	<option>Select State</option>
																	{[
																		'Abuja State',
																		'Abia State',
																		'Adamawa State',
																		'Akwa Ibom State',
																		'Anambra State',
																		'Bauchi State',
																		'Bayelsa State',
																		'Benue State',
																		'Borno State',
																		'Cross River State',
																		'Delta State',
																		'Ebonyi State',
																		'Edo State',
																		'Ekiti State',
																		'Enugu State',
																		'Gombe State',
																		'Imo State',
																		'Jigawa State',
																		'Kaduna State',
																		'Kano State',
																		'Katsina State',
																		'Kebbi State',
																		'Kogi State',
																		'Kwara State',
																		'Lagos State',
																		'Nassarawa State',
																		'Niger State',
																		'Ogun State',
																		'Ondo State',
																		'Osun State',
																		'Oyo State',
																		'Plateau State',
																		'Rivers State',
																		'Sokoto State',
																		'Taraba State',
																		'Yobe State',
																		'Zamfara State',
																	].map((stateName, i) => (
																	// <>
																		
																		<option key={i} value={stateName}>{stateName}</option>
																	// </>
																	))}
																</SelectItem>
																{/* {newUserError.state && <span style={{...errorStylings}}>{newUserError.state}</span>} */}
																{/* {newUserError.state && (
																!failedSubmission || newUser.state === ''
																	? <span style={errorStylings}>{newUserError.state}</span>
																	: null
																)} */}
																{newUserError.state &&
																(!failedSubmission ?
																(<span style={{...errorStylings}}>
																	{newUserError.state}
																</span>) :
																(newUser.state === 'Select State' ?
																(<span style={{...errorStylings}}>
																	{newUserError.state}
																</span>) : ''))}
															</div>
															<div className="input-field">
																<Label htmlFor="qtyAtm">Quantity of ATMs:</Label>
																<input
																type="number"
																name="qtyAtm"
																id="qtyAtm"
																value={newUser.qtyAtm}
																// required
																onChange={HandleUserCreationInputChange}
																/>
																
															</div>
														</div>
													</>)
												}
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="fname">First Name:</Label>
														<input
														type="text"
														// autoComplete
														name="fname"
														id="fname"
														value={newUser.fname}
														// required
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{/* {newUserError.fname && <span style={{...errorStylings}}>{newUserError.fname}</span>} */}
														{newUserError.fname && (
														!failedSubmission || newUser.fname === ''
															? <span style={errorStylings}>{newUserError.fname}</span>
															: null
														)}
													</div>
													<div className="input-field">
														<Label htmlFor="lname">Last Name:</Label>
														<input
														type="text"
														// autoComplete
														name="lname"
														id="lname"
														value={newUser.lname}
														// required
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{/* {newUserError.lname && <span style={{...errorStylings}}>{newUserError.lname}</span>} */}
														{newUserError.lname && (
														!failedSubmission || newUser.lname === ''
															? <span style={errorStylings}>{newUserError.lname}</span>
															: null
														)}
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="mname">Middle Name:</Label>
														<input
														type="text"
														// autoComplete
														name="mname"
														value={newUser.mname}
														id="mname"
														onChange={HandleUserCreationInputChange}
														/>
														
													</div>
													<div className="input-field">
														<Label htmlFor="email">Email:</Label>
														<input
														type="email"
														name="email"
														id="email"
														value={newUser.email}
														required={isRequired}
														onFocus={handleFocus}
														onBlur={handleBlur}
														// onFocus={SetIsRequired(false)}
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{/* {newUserError.email && <span style={{...errorStylings}}>{newUserError.email}</span>} */}
														{newUserError.email && (
														!failedSubmission || newUser.email === ''
															? <span style={errorStylings}>{newUserError.email}</span>
															: null
														)}
													</div>
												</div>
												<div className="user-fields-row">
													{/* <PhoneInput
													country={'ng'} // ng for Nigeria
													value={newUser.phone}
													onChange={() => {
														handlePhoneChange();
														HandleUserCreationInputChange();
													}}
													inputProps={{
														name: 'phone',
														id: "phone",
														required: true,
													}}
													/>
													{newUserError.phone && <span style={{...errorStylings}}>{newUserError.phone}</span>} */}
													<div className="input-field">
														<Label htmlFor="phone">Phone No.:</Label>
														{/* add another input for country code */}
														<div>
															<span style={{fontSize: 'large'}}>+234 </span>
															<input
															style={{width: '70%'}}
															type="tel"
															name="phone"
															id="phone"
															maxLength={10}
															value={newUser.phone}
															required
															// pattern="^\+?\d{10,15}$"
															// pattern="^\d{10}$"
															// title="Invalid phone number."
															inputMode='numeric'
															onChange={HandleUserCreationInputChange}
															placeholder=' Required. Example: 8038091572'
															onInput={(e) => {
															// Prevent non-digit input
															e.target.value = e.target.value.replace(/\D/g, '');
															}}
															/>
														</div>
														{/* {newUserError.phone && <span style={{...errorStylings}}>{newUserError.phone}</span>} */}
														{newUserError.phone && (
														!failedSubmission || newUser.phone === ''
															? <span style={errorStylings}>{newUserError.phone}</span>
															: null
														)}
													</div>
													<div className="input-field">
														<Label htmlFor="wphone">Whatsapp No.:</Label>
														<div>
															<span style={{fontSize: 'large'}}>+234 </span>
															<input
															style={{width: '70%'}}
															type="tel"
															name="wphone"
															id="wphone"
															maxLength={10}
															value={newUser.wphone}
															required
															inputMode='numeric'
															onChange={HandleUserCreationInputChange}
															placeholder=' Required. Example: 8038091572'
															onInput={(e) => {
															// Prevent non-digit input
															e.target.value = e.target.value.replace(/\D/g, '');
															}}
															/>
														</div>
														{/* {newUserError.wphone && <span style={{...errorStylings}}>{newUserError.wphone}</span>} */}
														{newUserError.wphone && (
														!failedSubmission || newUser.wphone === ''
															? <span style={errorStylings}>{newUserError.wphone}</span>
															: null
														)}
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="password1">Password:</Label>
														<div style={{ position: 'relative' }}>
															<input
															type={showPassword1 ? 'text' : 'password'}
															name="password1"
															id="password1"
															value={newUser.password1}
															// required
															onChange={HandleUserCreationInputChange}
															placeholder=' Required'
															/>
															<button
															type="button"
															onClick={togglePasswordvisi1}
															style={{
																...visiButtonStyle,
															}}
															>
																{showPassword1 ? <FaEyeSlash /> : <FaEye />}
															</button>
														</div>
														{(!passwordCheck || newUserError.password1) && <span style={{...errorStylings}}>{newUserError.password1}</span>}
													</div>
													<div className="input-field">
														<Label htmlFor="password2">Password confirmation:</Label>
														<div style={{ position: 'relative' }}>
															<input
															type={showPassword2 ? 'text' : 'password'}
															name="password2"
															id="password2"
															value={newUser.password2}
															// required
															onChange={HandleUserCreationInputChange}
															placeholder=' Required'
															/>
															<button
															type="button"
															onClick={togglePasswordvisi2}
															style={{
																...visiButtonStyle,
															}}
															>
																{showPassword2 ? <FaEyeSlash /> : <FaEye />}
															</button>
														</div>
														{(!passwordCheck || newUserError.password2) && <span style={{...errorStylings}}>{newUserError.password2}</span>}
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="address">Address:</Label>
														<input
														type="text"
														// autoComplete
														name="address"
														id="address"
														value={newUser.address}
														// required
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{/* {newUserError.address && <span style={{...errorStylings}}>{newUserError.address}</span>} */}
														{newUserError.address && (
														!failedSubmission || newUser.address === ''
															? <span style={errorStylings}>{newUserError.address}</span>
															: null
														)}
													</div>
													<div className="input-field">
														<Label htmlFor="aboutme">About Me:</Label>
														<textarea
														// type="text"
														// autoComplete
														value={newUser.aboutme}
														name="aboutme"
														id="aboutme"
														onChange={HandleUserCreationInputChange}
														/>
														
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="ppicture">Profile Picture:</Label>
														<input
														type="file"
														accept="image/*"
														name="ppicture"
														id="ppicture"
														onChange={(e) => {
															HandleUserCreationInputChange(e);
															setShowFields(true);
														}}
														/>
														{/* {errors.aboutme && <span className="error">{errors.aboutme}</span>} */}
														{<img id="createImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
													</div>
												</div>
											</>
										)}
									</>
								)
								}
							</div>
						</div>
						{/* <MainButtonContainer>
						<MainButton
						onClick={handleFormSubmission}
						type="submit"
						disabled={temp.loading}>
							{temp.loading ? 'Creating...' : 'Create Account'}
						</MainButton>
						</MainButtonContainer>
						<SubmitNotification error={temp.postError} success={temp.response} /> */}
						{/* <div className="cust-button">
							<button type="submit">Create User</button>
							
						</div> */}
					</form>
				</div>
			</div>
			<MainButtonContainer>
				<MainButton
				onClick={handleFormSubmission}
				type="submit"
				disabled={temp.loading}>
				{temp.loading ? 'Creating...' : 'Create Account'}
				</MainButton>
			</MainButtonContainer>
			<SubmitNotification error={temp.postError} success={temp.response} />
			<hr/>
		</>
	)
}
export default CreateUser;