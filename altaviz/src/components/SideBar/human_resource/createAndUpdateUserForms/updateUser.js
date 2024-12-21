import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import SubmitNotification from '../../bbbbbnotifications/submitNotification/SubmitNotification';
import { FetchContext } from "../../../context/FetchContext";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import QueryFieldFromDB from "../QueryFieldFromDB";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import { AuthContext } from "../../../context/checkAuth/AuthContext";

const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// padding-top: 4rem;
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
	color: #555;
	padding: 0 0.7rem;
	border: 0.01px solid;
	border-radius: 5px;
	font-family: sans-serif;
	font-size: 22px;
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
const NewFieldContainer = styled.div`
	display: flex;
	flex-direction: row;
`

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
function UpdateUser () {
	const { authData } = useContext(AuthContext)
	const initailFormValues = {
		branch: authData?.branch?.name,
		newBranch: "",
		// state: authData.role==='custodian'?authData.branch.state.name:authData.state.name,
		location: (authData?.role==='custodian')?(authData?.branch?.location?.location):(authData?.location?.location),
		newLocation: "",
		region: (authData?.role==='custodian')?(authData?.branch?.region?.name):(authData?.region?.name),
		last_name: authData?.last_name,
		middle_name: authData?.middle_name,
		wphone: authData?.wphone,
		address: authData?.address,
		aboutme: authData?.aboutme,
		profile_picture: null,
		// dummy: '',
	}

	const [rSwitch, setRSwitch] = useState(null)
	const [branchID, setBranchID] = useState(0);
	const [showNotifi, setShowNotifi] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [newLocationQuery, setNewLocationQuery] = useState('');
	const [isNewLocationExist, setIsNewLocationExist] = useState(false);
	const [newBranchQuery, setNewBranchQuery] = useState('');
	const [isNewBranchExist, setIsNewBranchExist] = useState(false);

	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});

	// const [isRequired, setIsRequired] = useState(true);
	const [showError, setShowError] = useState(false);
	const refInput = useRef(null);
	// const [bankStateList, setBankStateList] = useState(null)
	// const [bankBankList, setBankBankList] = useState(null)
	// const [bankStateLocationList, setBankStateLocationList] = useState(null)
	const [locationBranchesList, setLocationBranchesList] = useState(null)
	// const [bankBranchList, setBankBranchList] = useState(null)
	const [notCustodianList, setNotCustodianList] = useState(null)
	const [custodianList, setCustodianList] = useState(null)
	// const [filteredStates, setFilteredStates] = useState(null);
	// const [filteredLocations, setFilteredLocations] = useState(null);
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		`user-details-update/${authData?.id}/`,
		formData,
		postTrigger,
		// `/${authData.role}`,
	);

	console.log('2222222222222')
	console.log('authData:', authData)
	console.log(
		'\nauthData?.branch?.region?.id:', authData?.branch?.region?.id,
		'\nauthData?.branch?.state?.name:', authData?.branch?.state?.name,
		'\nauthData?.branch?.bank?.name:', authData?.branch?.bank?.name,
		'\nauthData?.region?.id or authData.id(for workshop):', authData?.region?.id,
		'\nauthData?.state?.name:', authData?.state?.name,
	)
	// with state, bank and region
	const custodian = useGetWithEncryption(
		`custodian-details-update/${authData?.branch?.region?.id}/${authData?.branch?.state?.name}/${authData?.branch?.bank?.name}`,
		'custodian',
	)
	// not custodian - this should be to just locations inline
	// with state, bank and region
	const notCustodian = useGetWithEncryption(
		`others-details-update/${authData?.region?.id}/${authData?.state?.name}/`,
		'notCustodian',
	)

	useEffect(() => {
		// get locations and branches for custodian
		if (authData?.role==='custodian'&&custodian.localDataStoreVar) {
			console.log('custodian with encryption: ', custodian)
			setCustodianList(custodian?.localDataStoreVar[0]?.banks[0]?.locations)
		}
		// get locations for non custodian
		if (authData?.role!=='custodian'&&notCustodian.localDataStoreVar) {
			console.log('notCustodian with encryption: ', notCustodian)
			setNotCustodianList(notCustodian?.localDataStoreVar[0]?.locations)
		}
	}, [custodian, notCustodian])

	useEffect(() => {
		console.log('start ##############'.toUpperCase())
		console.log(
			'\nbranch', newUser.branch,
			'\nlocation', newUser.location,
		)
		// get branches for each location
		if (authData?.role === 'custodian' && custodianList) {
			console.log('location > branches (custodian) ##############'.toUpperCase())
			console.log('\ncustodianList: ', custodianList)
			const locationBranches = []
			console.log('121212121212121212121212')
			for (let i = 0; i < custodianList.length; i++) {
				console.log('131313131313131313131313:', custodianList[i])
				console.log('\ncustodianList[i].name:', custodianList[i])
				if (custodianList[i].location === newUser.location) {
					console.log('141414141414141414141414')
					console.log('found:'.toUpperCase(), custodianList[i])
					locationBranches.push(custodianList[i].branches)
					break;
				}
			}
			setLocationBranchesList(locationBranches.flat())
		}
		console.log(
			'\nbranch', newUser.branch,
			'\nlocation', newUser.location,
		)
		console.log('end ##############'.toUpperCase())
	}, [custodianList, newUser.location])

	useEffect(() => {
		if (newUser.location) {
			setNewUser((prev) => ({
				...prev, branch: '',
			}));
		}
	}, [newUser.location]);

	let stateLocationsList;
	// let stateStatesList;
	let stateBranchesList;
	console.log('Custodian:', authData?.role === 'custodian')
	if (authData?.role) {
		if (authData?.role === 'custodian') {
			stateLocationsList = custodianList
			stateBranchesList = locationBranchesList
		} else {
			// stateStatesList = filteredStates
			stateLocationsList = notCustodianList
		}
	}

	console.log('stateBranchesList (Req:branches-outside):', stateBranchesList)
	// console.log('stateBanksList (Req:banks-outside):', stateBanksList)
	console.log('stateLocationsList (Req:location-outside):', stateLocationsList)


	const validateForm = () => {
		const required = 'Required*';
		console.log('validateForm fxn');
		let errors = {};
		// ['last_name', 'location', 'wphone', 'password1', 'password2', 'address']
		['last_name', 'location', 'wphone', 'address']
		.forEach((field) => {
		if (!newUser[field] || newUser[field].trim() === '') {
			errors[field] = required;
			}
		})
		// if (authData.role === 'custodian') {
		// 	['branch', 'location']
		// 	.forEach((fieldName) => {
		// 		if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
		// 			errors[fieldName] = required;
		// 		}
		// 	})
		// }
		// if (authData.role === 'custodian' && !newUser.branch) {
		// 	['newBranch']
		// 	.forEach((fieldName) => {
		// 		if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
		// 			errors[fieldName] = required;
		// 		}
		// 	})
		// }
		// if (authData.role === 'custodian' && !newUser.location) {
		// 	['newLocation']
		// 	.forEach((fieldName) => {
		// 		if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
		// 			errors[fieldName] = required;
		// 		}
		// 	})
		// }
		setNewUserError({...newUserError, ...errors});
		console.log('total errors:', errors);
		return Object.keys(errors).length === 0;
	}
	const EditHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};
	const HandleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		// let value = value
		console.log('value (before):', value)

		console.log('value (after):', value)
		if (['newLocation', 'newBranch']
			.includes(name)) {
				console.log('eeeeeeeeeeeeeeeeeeeeee'.toUpperCase())
			if (name === 'newLocation') {
				setNewLocationQuery(
					`${authData?.branch?.bank?.name}-${authData?.region?.name}-${(authData?.role==='custodian')?(authData?.branch?.state?.name):(authData?.state?.name)}-${name}-${value}`
				)
			} else if (name === 'newBranch') {
				setNewBranchQuery(`${newUser.location === 'Enter a New Location' ?
						newUser.newLocation : newUser.location}-${authData?.branch?.bank?.name}-${authData?.region?.name}-${(authData?.role==='custodian')?(authData?.branch?.state?.name):(authData?.state?.name)}-${name}-${value}`
				)
			}
		}
		if (type === "file") {
			console.log('A FILE FINALLY! onchange:', value);
			console.log('files[0]:', files[0]);
			setNewUser(prevState => ({
				...prevState,
				[name]: files[0],
			}));
		} else if (name === 'branch') {
			console.log(
				'\nstateBranchesList:', stateBranchesList,
				'\nvalue:', value
			)
			setNewUser(prevState => ({
				...prevState,
				// branch: stateBranchesList?.filter(branch => {
				// 	console.log(
				// 		'\nbranchID', branch.id,
				// 		'\nvalue', Number(value)
				// 	)
				// 	if (branch.id === Number(value)) {
				// 		console.log('branch.name:', branch.name)
				// 		return branch;
				// 	}
				// })[0]?.name,
				branch: value,
				//// newBranch: value === 'Enter a New Branch' ? '' : null,
			}));
		} else if (name === 'newBranch') {
			setNewUser(prevState => ({
				...prevState,
				newBranch: value,
			}));
		} else if (name === 'location') {
			setNewUser(prevState => ({
				...prevState,
				location: value,
				newLocation: value === 'Enter a New Location' ? '' : null,
			}));
		} else if (name === 'newLocation') {
			setNewUser(prevState => ({
				...prevState,
				newLocation: value,
			}));
		}

		else {
			setNewUser(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const fieldsExist = !(
		// isEmailExist || isUsernameExist || isNewBankExist ||
		isNewLocationExist || isNewBranchExist)
	// setFieldStatus(fieldsExist)
	const handleFormSubmission = (e) => {
		e.preventDefault();
		console.log('Form submitted:', newUser);
		if (validateForm() && fieldsExist) {
			console.log(
				'\nnewUser.branch:', newUser.branch,
				'\nnewUser.newBranch:', newUser.newBranch,
				'\nnewUser.location:', newUser.location,
				'\nnewUser.newLocation:', newUser.newLocation,
			)

			console.log(
				'\nnewUser.branch:', newUser.branch,
				'\nnewUser.newBranch:', newUser.newBranch,
				'\nnewUser.location:', newUser.location,
				'\nnewUser.newLocation:', newUser.newLocation,
			)
			let tempVar = 'new'
			console.log('Form submitted: (before)', newUser);
			if (newUser.newBranch) {
				newUser.branch = newUser.newBranch
				newUser.newBranch = tempVar
			}
			// if (newUser.newBank !== null) {
			// 	newUser.bank = newUser.newBank
			// }
			if (newUser.newLocation) {
				newUser.location = newUser.newLocation
				newUser.newLocation = tempVar
			}
			console.log('Form submitted (after):', newUser);
			console.log('Form datatype:', typeof(newUser));
			// Submit form data to server
			const newFormData = new FormData(); // to reset the form
			// Populate formData with the updated formValues
			let updatedSamp;
			Object.entries(newUser).forEach(([key, value]) => {
				console.log(
					'key:', key,
					'typeof(value):', typeof(value)
				)
				if ((typeof(value) === 'string') && (
					key !== 'aboutme'&&
					key !== 'wphone'&&
					key !== 'profile_picture'&&
					key !== 'address'
					// &&key !== 'dob'
				)) {
					console.log('key', key, '#####')
					value = value.toLowerCase();
				}
				if (typeof(value) === 'string') {
					value = value.trim();
				}
				console.log(
					'\nkey:', key,
					'\nvalue:', value
				);
				newFormData.append(key, value);
				updatedSamp = { ...updatedSamp, [key]: value };
			});
			newFormData.append('bank', authData?.branch?.bank?.name)
			newFormData.append('state', authData?.branch?.state?.name)
			newFormData.append('branchID', branchID==='Enter a New Branch'?-1:branchID)
			setFormData(newFormData);
			setPostTrigger(true);
			console.log('updatedSamp:', updatedSamp);
		} else {
			setShowError(true);
			console.log('Form not submitted due to errors:', newUserError);
		}
	}

	useEffect(() => {
		if (postData || postError) {
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			// Reset newUser to default state
			setNewUser(initailFormValues);
			setShowNotifi(true)
			if (postData?.msg) setRSwitch(postData);
			else if (postError?.msg) setRSwitch(postError);
		}
	}, [postTrigger, postData, postLoading, postError])

	useEffect(() => {
		if (showNotifi) {
			const timer = setTimeout(() => {
				// console.log('success response:', success);
				setShowNotifi(false);
				setRSwitch(null)
			}, 5000);
			return () => clearTimeout(timer);
		}

	}, [showNotifi])

	const profilePictureStyle = {
		display: 'block',
		border: '2px solid #333',
		borderRadius: '100%',
		width: '150px',
		height: '150px',
		marginTop: '1rem',
		padding: '0.1rem',
	}
	const displayPhotoCreate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('createImage');
			output.src = reader.result;
			Object.assign(output.style, {
				...profilePictureStyle
			});
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		else {
			const profilePicture = document.getElementById('createImage')
			profilePicture.src=`${apiBaseUrl}${authData?.profile_picture}`
			// profilePicture.style.display = 'block';
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

	const errorStylings = {
		color: 'red',
		fontSize: 'small',
		fontStyle: 'italic',
	}
	// const visiButtonStyle = {
	// 	position: 'absolute',
	// 	right: '125px',
	// 	top: '60%',
	// 	transform: 'translateY(-50%)',
	// 	color: '#333',
	// 	background: 'none',
	// 	border: 'none',
	// 	cursor: 'pointer',
	// 	padding: '0',
	// 	margin: '0',
	// }

	let all = !(
		// isEmailExist === isUsernameExist === isNewBankExist ===
		isNewLocationExist === isNewBranchExist)
	console.log(
		'\nnewUser.branch:', newUser.branch,
		'\nnewUser.newBranch:', newUser.newBranch,
		'\nnewUser.location:', newUser.location,
		'\nnewUser.newLocation:', newUser.newLocation,
	)
	console.log(
		'\nnew location field exist:', isNewLocationExist,
		'\nnew branch field exist:', isNewBranchExist,
		'\nall fields good:', all,
	)
	const DisplayError = ({fieldName }) => {
		// Split the string by spaces or other delimiter if necessary
		const complete = fieldName.split(''); // splits by each character
		// Convert the first character to uppercase
		let processed = complete[0].toUpperCase();
		// Concatenate it back to sentence case
		processed = processed + complete.slice(1).join('');
		if (showError &&
			(!newUser?.[fieldName] || (newUser?.[fieldName] === `Select ${processed}`)) &&
			(newUserError?.[fieldName])) {
		return <span style={errorStylings}>{newUserError[fieldName]}</span>;
		}
		return null;
	};

	if (custodian && custodianList) {
		console.log(
			'\ncustodian',
			'\ncustodian', custodian,
			'\ncustodianList', custodianList,
			'\nlocationBranchesList', locationBranchesList,
			'\nnoncostodian',
			'\n\nnotCustodian', notCustodian,
			'\nnotCustodianList', notCustodianList,
			'\n\nauthData.profile_picture', authData?.profile_picture,
		)
	}

	const styleObj = {
		fontWeight: 'bold',
		margin: '0',
		transition: 'opacity 0.05s ease-out',
	}
	console.log(
		'\nnewuser.branch:', newUser.branch,
		'\nbranchID:', branchID,
		'\npostData:', postData,
		'\npostError:', postError,
		'\npostLoading:', postLoading,
		'\nrSwitch:', rSwitch,
		'\n', {authData}
	)
	const style = {
		input: {
			padding: "4px",
			fontSize: "16px",
			border: "1px solid #ccc",
			borderRadius: "5px",
		}
	}
	return (
		<>
			<div className="dash-form">
				<div>
					<h4>Update Details</h4>
				</div>
				<div>
					<div className="to-form">
					</div>
					<hr />
					<form onSubmit={handleFormSubmission}>
						<div>
							<div className="cust-row-user">

								{(<>
									{(<>
										{/* ............. location .................. */}
										<div className="user-fields-row">
											{(<div className="input-field">
												<Label htmlFor="location">Location:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="location"
													id="location"
													ref={refInput}
													value={newUser.location}
													onChange={HandleUserCreationInputChange}
													disabled={!isEditable}
													>
													<option value={(authData?.role==='custodian')?(authData?.branch?.location?.location):(authData?.location?.location)}>{(authData?.role==='custodian')?(authData?.branch?.location?.location):(authData?.location?.location)}</option>
													<option value="Enter a New Location">Enter a New Location</option>
														{stateLocationsList &&
														stateLocationsList.map((selectedLocation, i) => {
															return (<option key={i} value={selectedLocation.location}>{toSentenceCase(selectedLocation.location)}</option>
														)})}
													</SelectItem>
													{newUser.location === 'Enter a New Location' && (
														<NewFieldContainer>
															<input
															style={{...style.input, width: '100%',}}
															type="text"
															name="newLocation"
															id="newLocation"
															placeholder="E.g., ajah"
															value={newUser.newLocation || ''}
															onChange={HandleUserCreationInputChange}
															/>
														</NewFieldContainer>
														)}
												</NewFieldContainer>
												{(newUser.newLocation) && <QueryFieldFromDB
												query={newLocationQuery}
												setIsExist={setIsNewLocationExist} />}
												{/* Error Handling */}
												{(newUser.location === 'Enter a New Location' && !newUser.newLocation) ?
													<DisplayError fieldName='newLocation' /> :
													<DisplayError fieldName='location' />
												}
											</div>)}
											{/* ............... branch ................ */}
											{((authData?.role === 'custodian') &&
											// (newUser.location !== (authData.branch.location.location||authData.location.location)) && (newUser.location === 'Select Location')) && (
											<div className="input-field">
												<Label htmlFor="branch">Branch:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="branch"
													id="branch"
													ref={refInput}
													value={newUser.branch}
													onChange={(e) => {
														HandleUserCreationInputChange(e);
														setBranchID(e.target.value);
													}}
													disabled={!isEditable}
													>
													{/* <option value={newUser.branch}>{isEditable?'Select Branch':newUser.branch}</option> */}
													<option value={newUser.branch}>
														{newUser.location === (
															(authData?.role==='custodian')?
															(authData?.branch?.location?.location):(authData?.location?.location)
														)?
																(!isEditable?(authData?.branch?.name):(newUser.branch==='')?'Select Branch':newUser
															.branch) : (
																	newUser.location==='Enter a New Location'||newUser.branch===''
																)?
																		'Select Branch' : newUser.branch
														}
													</option>
													<option value="Enter a New Branch">Enter a New Branch</option>
													{stateBranchesList &&
													stateBranchesList.map((branch, i) => (
														<option key={i} value={branch.id}>
															{toSentenceCase(branch.name)}
														</option>
													))}
													</SelectItem>
													{newUser.branch === 'Enter a New Branch' && (
													<NewFieldContainer>
														<input
														style={{...style.input, width: '100%',}}
														type="text"
														name="newBranch"
														id="newBranch"
														placeholder="E.g., Ikeja"
														value={newUser.newBranch || ''}
														onChange={HandleUserCreationInputChange}
														/>
													</NewFieldContainer>
													)}
												</NewFieldContainer>
												{(newUser.newBranch) && <QueryFieldFromDB
												query={newBranchQuery}
												setIsExist={setIsNewBranchExist} />}
												{/* Error Handling */}
												{(newUser.branch === 'Enter a New Branch' && !newUser.newBranch) ?
													<DisplayError fieldName='newBranch' /> :
													<DisplayError fieldName='branch' />
												}
											</div>
											)}
										</div>
										{/* ............... first and last name ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="last_name">Last Name:</Label>
												<input
												type="text"
												name="last_name"
												id="last_name"
												style={style.input}
												value={newUser.last_name}
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='last_name' />}
											</div>
											<div className="input-field">
												<Label htmlFor="middle_name">Middle Name:</Label>
												<input
												type="text"
												name="middle_name"
												style={style.input}
												value={newUser.middle_name}
												id="middle_name"
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												/>
											</div>
										</div>

										{/* ............... phone and wphone numbers ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="wphone">Whatsapp No.:</Label>
												<div>
													<span style={{fontSize: 'large'}}>+234 </span>
													<input
													style={{...style.input, width: '70%'}}
													type="tel"
													name="wphone"
													id="wphone"
													maxLength={10}
													value={newUser.wphone}
													required
													inputMode='numeric'
													onChange={HandleUserCreationInputChange}
													disabled={!isEditable}
													placeholder=' Required. Example: 8038091572'
													onInput={(e) => {
													e.target.value = e.target.value.replace(/\D/g, '');
													}}
													/>
												</div>
												{<DisplayError fieldName='wphone' />}
											</div>
											<div className="input-field">
												<Label htmlFor="address">Address:</Label>
												<input
												type="text"
												name="address"
												id="address"
												style={style.input}
												value={newUser.address}
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='address' />}
											</div>
										</div>

										{/* ............... picture and aboutme ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="profile_picture">Profile Picture:</Label>
												<input
												type="file"
												accept="image/*"
												name="profile_picture"
												id="profile_picture"
												style={style.input}
												// value={newUser.profile_picture}
												onChange={(e) => {
													HandleUserCreationInputChange(e);
												}}
												disabled={!isEditable}
												/>
										{<img id="createImage" src={`${apiBaseUrl}${authData?.profile_picture}`} alt="Profile pic" style={{...profilePictureStyle, border: '1px solid #333',}} />}
											</div>
											<div className="input-field">
												<Label htmlFor="aboutme">About Me:</Label>
												<textarea
												value={newUser.aboutme}
												name="aboutme"
												id="aboutme"
												style={style.input}
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												/>
												{/* >{newUser.aboutme}</textarea> */}
											</div>
										</div>
									</>)}
								</>)}
								{(showNotifi&&!postLoading&&rSwitch) && <p style={{...styleObj, color: 'green'}}>{rSwitch.msg}</p>}
							</div>
						</div>
						
						<MainButtonContainer>
							{/* submit button */}
							<MainButton
								onClick={handleFormSubmission}
								type="submit"
								role="button"
								tabIndex="0"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();  // Prevents default form submission behavior
										handleFormSubmission();  // Calls your form submission function
									}
								}}
								disabled={postLoading}>
								{postLoading ? 'Updating...' : 'Update Details'}
							</MainButton>
							{/* edit button */}
							<MainButton type="button"
								onClick={EditHandler}
								>
									{!isEditable ? 'Edit Details' : 'Stop Editing'}
								</MainButton>
						</MainButtonContainer>
						<div
						style={{
							display: 'flex',
							justifyContent: 'center',
                            flexDirection: 'column',
							textAlign: 'center',
							marginTop: '0.5rem',
						}}>
							{!fieldsExist &&
							(<>
								<p style={{...errorStylings, margin: '0'}}>Error: all required fields must be filled</p>
								{/* <br></br> */}
								<p style={{...errorStylings, margin: '0'}}>Note: if this error persist. kindly retrace your steps by clearing the text fields with backspace key.</p>
							</>)}
						</div>
					</form>
				</div>
			</div>
			<hr/>
		</>
	)
}
export default UpdateUser;