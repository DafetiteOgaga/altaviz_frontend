import { useState, useEffect, useContext } from "react";
import styled from "styled-components"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SubmitNotification from '../notifications/submitNotification/SubmitNotification';
import { FetchContext } from "../../context/FetchContext";

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
		// qtyAtm: "",
		username: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		email: "",
		phone: "",
		wphone: "",
		password1: "",
		password2: "",
		address: "",
		aboutme: "",
		profile_picture: null,
	}
	let defaultState = {
		nothing: false,
		custodian: false,
		all: false,
	};
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});
	const [dept, setDept] = useState(defaultState);
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState(true);
	const [isRequired, setIsRequired] = useState(true);
	const [failedSubmission, setFailedSubmission] = useState(false);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		'http://127.0.0.1:8000/user/',
		formData,
		postTrigger,
		'/human-resource',
	);

	const handleFocus = () => {
		setIsRequired(false);
	}
	const handleBlur = () => {
		setIsRequired(true);
	}
	const togglePasswordvisi1 = () => {
		setShowPassword1(!showPassword1);
	}
	const togglePasswordvisi2 = () => {
		setShowPassword2(!showPassword2);
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
		} else {
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
		'first_name',
		'last_name',
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
	}
	const handleFormSubmission = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log('Form submitted:', newUser);
			console.log('Form datatype:', typeof(newUser));
			// Submit form data to server
			const newFormData = new FormData(); // to reset the form
			// Populate formData with the updated formValues
			let updatedSamp = null;
			Object.entries(newUser).forEach(([key, value]) => {
				if (typeof(value) === 'string') {
					value = value.toLowerCase();
				}
				// console.log('key: ' + key + ' value: ' + value);
				newFormData.append(key, value);
				updatedSamp = { ...updatedSamp, [key]: value };
			});
			setFormData(newFormData);
			setPostTrigger(true);
			// Reset form state
			setNewUser(initailFormValues);
			console.log('updatedSamp:', updatedSamp);
		} else {
			setFailedSubmission(true);
			console.log('Form not submitted due to errors');
		}
		// console.log('email:', newUser.email);
		// console.log('phone:', newUser.phone);
		// console.log('wphone:', newUser.wphone);
		// console.log('fields:', newUser);
	}
	// const HandlePost = () => {
	// 	const { data: postResponse, PostLoading, error: postError } = PostDataAPIComp(
	// 		'http://127.0.0.1:8000/user/',
	// 		formData,
	// 		postTrigger
	// 	);
	// 	setLoading(PostLoading)
	// 	setResponse(postResponse);
	// 	setPError(postError);
	// }
	// useEffect(() => {
	// 	// HandlePost();
	// 	if (postTrigger) {
	// 		HandlePost();
	// 		setPostTrigger(false)
	// 		// Reset form state
	// 		setNewUser(initailFormValues);
	// 	}
	// }, [postTrigger])

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
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('createImage').style.display = 'none';
		}
	}
	useEffect(() => {
		const photoSampleCreate = document.getElementById('profile_picture');
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
											HandleUserCreationInputChange(e);
											renderByDept(e);
										}}
										>
											<option>Select Department</option>
										{[
											'Custodian',
											'Engineering',
											'Workshop',
											'Help Desk',
											'Human Resources',
										].map((dept) => {
											return (
											<option key={dept} value={dept}>
											{dept}
											</option>
										)})}
										</SelectItem>
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
																}}
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
															{newUserError.bank &&
															(!failedSubmission ?
															(<span style={{...errorStylings}}>
																{newUserError.bank}
															</span>) :
															(newUser.bank === 'Select Bank' ?
															(<span style={{...errorStylings}}>
																{newUserError.bank}
															</span>) : ''))}
															</div>
															<div className="input-field">
																<Label htmlFor="branch">Branch:</Label>
																<input
																type="text"
																name="branch"
																id="branch"
																placeholder=" E.g Ikeja"
																value={newUser.branch}
																// required
																onChange={(e) => {
																HandleUserCreationInputChange(e);
																}}
																/>
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
															{/* <div className="input-field">
																<Label htmlFor="qtyAtm">Quantity of ATMs:</Label>
																<input
																type="number"
																name="qtyAtm"
																id="qtyAtm"
																value={newUser.qtyAtm}
																// required
																onChange={HandleUserCreationInputChange}
																/>
																
															</div> */}
														</div>
													</>)
												}
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="first_name">First Name:</Label>
														<input
														type="text"
														// autoComplete
														name="first_name"
														id="first_name"
														value={newUser.first_name}
														// required
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{newUserError.first_name && (
														!failedSubmission || newUser.first_name === ''
															? <span style={errorStylings}>{newUserError.first_name}</span>
															: null
														)}
													</div>
													<div className="input-field">
														<Label htmlFor="last_name">Last Name:</Label>
														<input
														type="text"
														// autoComplete
														name="last_name"
														id="last_name"
														value={newUser.last_name}
														// required
														onChange={HandleUserCreationInputChange}
														placeholder=' Required'
														/>
														{newUserError.last_name && (
														!failedSubmission || newUser.last_name === ''
															? <span style={errorStylings}>{newUserError.last_name}</span>
															: null
														)}
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="middle_name">Middle Name:</Label>
														<input
														type="text"
														// autoComplete
														name="middle_name"
														value={newUser.middle_name}
														id="middle_name"
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
														{newUserError.email && (
														!failedSubmission || newUser.email === ''
															? <span style={errorStylings}>{newUserError.email}</span>
															: null
														)}
													</div>
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="phone">Phone No.:</Label>
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
															inputMode='numeric'
															onChange={HandleUserCreationInputChange}
															placeholder=' Required. Example: 8038091572'
															onInput={(e) => {
															// Prevent non-digit input
															e.target.value = e.target.value.replace(/\D/g, '');
															}}
															/>
														</div>
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
														{newUserError.address && (
														!failedSubmission || newUser.address === ''
															? <span style={errorStylings}>{newUserError.address}</span>
															: null
														)}
													</div>
													<div className="input-field">
														<Label htmlFor="username">Username:</Label>
														<input
														type="text"
														// autoComplete
														name="username"
														value={newUser.username}
														id="username"
														onChange={HandleUserCreationInputChange}
														/>
													</div>
													{/* <div className="input-field">
														<Label htmlFor="aboutme">About Me:</Label>
														<textarea
														value={newUser.aboutme}
														name="aboutme"
														id="aboutme"
														onChange={HandleUserCreationInputChange}
														/>
													</div> */}
												</div>
												<div className="user-fields-row">
													<div className="input-field">
														<Label htmlFor="profile_picture">Profile Picture:</Label>
														<input
														type="file"
														accept="image/*"
														name="profile_picture"
														id="profile_picture"
														onChange={(e) => {
															HandleUserCreationInputChange(e);
														}}
														/>
														{<img id="createImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
													</div>
													<div className="input-field">
														<Label htmlFor="aboutme">About Me:</Label>
														<textarea
														value={newUser.aboutme}
														name="aboutme"
														id="aboutme"
														onChange={HandleUserCreationInputChange}
														/>
													</div>
												</div>
											</>
										)}
									</>
								)
								}
							</div>
						</div>
					</form>
				</div>
			</div>
			<MainButtonContainer>
				<MainButton
				onClick={handleFormSubmission}
				type="submit"
				disabled={postLoading}>
				{postLoading ? 'Creating...' : 'Create Account'}
				</MainButton>
			</MainButtonContainer>
			<SubmitNotification error={postError} success={postData} />
			<hr/>
		</>
	)
}
export default CreateUser;