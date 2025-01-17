import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
import { FetchContext } from "../../../context/FetchContext";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import QueryFieldFromDB from "../QueryFieldFromDB";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import { useNavigate } from "react-router-dom";
import { toast } from'react-hot-toast';
import { AuthContext } from "../../../context/checkAuth/AuthContext";

const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	padding-top: 2rem;
	// flex-direction: row;
	justify-content: space-evenly;
`
const Label = styled.label`
	font-size: 14px;
	color: '#555;
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
	font-size: 25px;
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
// const statesInNig = [
// 	'Abuja', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
// 	'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti',
// 	'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
// 	'Kogi', 'Kwara', 'Lagos', 'Nassarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
// 	'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
// ]

const style = {
	input: {
		padding: "4px",
		fontSize: "16px",
		border: "1px solid #ccc",
		borderRadius: "5px",
	}
}
const styles = {
	options: {
		fontStyle: 'italic',
		backgroundColor: '#D9D9DF',
		color: '#87823E'
	},
	selectOpts: {
		fontStyle: 'italic',
		backgroundColor: '#D9D9DF'
	}
}
const errorStylings = {
	color: 'red',
	fontSize: 'small',
	fontStyle: 'italic',
}

function CreateUser () {
	const initailFormValues = {
		role: "",
		bank: "",
		newBank: "",
		branch: "",
		newBranch: "",
		state: "",
		location: "",
		newLocation: "",
		region: "",
		dob: "",
		gender: "",
		// qtyAtm: "",
		username: "",
		first_name: "",
		last_name: "",
		middle_name: "",
		email: "",
		phone: "",
		wphone: "",
		// password1: "",
		// password2: "",
		password: "",
		address: "",
		aboutme: "",
		profile_picture: null,
		// dummy: '',
	}
	let defaultState = {
		nothing: false,
		custodian: false,
		all: false,
	};
	const navigate = useNavigate()
	const { authData } = useContext(AuthContext);
	const [emailQuery, setEmailQuery] = useState('');
	const [newBankQuery, setNewBankQuery] = useState('');
	const [regionQuery, setRegionQuery] = useState('');
	const [newLocationQuery, setNewLocationQuery] = useState('');
	const [newBranchQuery, setNewBranchQuery] = useState('');
	const [usernameQuery, setUsernameQuery] = useState('');
	// const [found, setFound] = useState(false);
	const { toSentenceCase, addHyphen, removeHyphen } = useContext(SentenceCaseContext)
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});
	// const [showNotifi, setShowNotifi] = useState(false);
	const [rSwitch, setRSwitch] = useState(null)
	const [dept, setDept] = useState(defaultState);
	const [showError, setShowError] = useState(false);
	const refInput = useRef(null);
	// const [regionStateList, setRegionStateList] = useState(null)
	const [bankBranchesList, setBankBranchesList] = useState(null)
	const [bankBankList, setBankBankList] = useState(null)
	const [bankLocationList, setBankLocationList] = useState(null)
	const [bankBranchList, setBankBranchList] = useState(null)
	const [notCustodianList, setNotCustodianList] = useState(null)
	const [filteredStates, setFilteredStates] = useState(null);
	const [filteredRegions, setFilteredRegions] = useState(null);
	const [filteredLocations, setFilteredLocations] = useState(null);
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		`user/`,
		formData,
		postTrigger,
		// '/human-resource',
	);

	useEffect(() => {
        refInput.current.focus();
    }, [])

	// custodian banks and branches
	const custodianBankBranches = useGetWithEncryption(
		'banks-branch/',
		'bankBranches',
	)
	// not custodian
	const notCustodian = useGetWithEncryption(
		`states/`,
		'notCustodian',
	)

	useEffect(() => {
		// get for non custodian
		if (notCustodian) {
			// console.log('notCustodian with encryption: ', notCustodian)
			setNotCustodianList(notCustodian.localDataStoreVar)
		}
		// get for custodian
		if (custodianBankBranches) {
			// console.log('custodianBankBranches with encryption: ', custodianBankBranches)
			setBankBranchesList(custodianBankBranches.localDataStoreVar)
		}
	}, [custodianBankBranches, notCustodian])

	useEffect(() => {
		console.log('start ##############'.toUpperCase())
		// for non custodian
		// for regions
		if (newUser.role !== 'Custodian' && notCustodianList) {
			const stateRegions = []
			for (let i = 0; i < notCustodianList.length; i++) {
					stateRegions.push(notCustodianList[i].name)
			}
			setFilteredRegions(stateRegions.flat())
		}
		// for states
		if (notCustodianList && filteredRegions) {
			const stateStates = []
			for (let i = 0; i < notCustodianList.length; i++) {
				if (notCustodianList[i].name === newUser.region) {
					stateStates.push(notCustodianList[i].states)
					// setFound(true)
					break;
				}
			}
			setFilteredStates(stateStates.flat())
		}
		// locations
		if (newUser.role !== 'Custodian' && notCustodianList && filteredStates) {
			const stateLocations = []
			for (let i = 0; i < filteredStates.length; i++) {
				if (filteredStates[i].name === newUser.state) {
					stateLocations.push(filteredStates[i].locations)
					// setFound(true)
					break;
				}
			}
			setFilteredLocations(stateLocations.flat())
		}


		// get banks
		if (newUser.role === 'Custodian' && bankBranchesList && filteredStates) {
			const bankBanks = []
			for (let i = 0; i < bankBranchesList.length; i++) {
				bankBanks.push(bankBranchesList[i])
			}
			setBankBankList(bankBanks.flat())
		}
		// get locations
		if (newUser.role === 'Custodian' && bankBranchesList && bankBankList) {
			const bankLocation = []
			for (let i = 0; i < bankBankList.length; i++) {
				if (bankBankList[i].name === newUser.bank) {
					bankLocation.push(bankBankList[i].locations)
					// setFound(true)
					break;
				}
			}
			// console.log('newuser.bank:', newUser.bank)
			setBankLocationList(bankLocation.flat())
		}
		// get branches
		if (newUser.role === 'Custodian' && bankBranchesList && bankLocationList) {
			const bankBranches = []
			for (let i = 0; i < bankLocationList.length; i++) {
				if (bankLocationList[i].location === newUser.location) {
					bankBranches.push(bankLocationList[i].branches)
					// setFound(true)
					break;
				}
			}
			// console.log('newuser.location:', newUser.location)
			setBankBranchList(bankBranches.flat())
		}
		console.log('end ##############'.toUpperCase())
	// }, [])
	}, [bankBranchesList, notCustodianList, newUser.role, newUser.bank, newUser.state, newUser.location, newUser.region])

	useEffect(() => {
		if (newUser.role) {
			setNewUser((prev) => ({
				...prev, region: '', state: '', bank: '', location: '', branch: '',
			}));
		}
	}, [newUser.role]);
	useEffect(() => {
		if (newUser.region) {
			setNewUser((prev) => ({
				...prev, state: '', bank: '', location: '', branch: '',
			}));
		}
	}, [newUser.region]);
	useEffect(() => {
		if (newUser.state) {
			setNewUser((prev) => ({
				...prev, bank: '', location: '', newLocation: '', branch: '',
			}));
		}
	}, [newUser.state]);
	useEffect(() => {
		if (newUser.bank) {
			setNewUser((prev) => ({
				...prev, location: '', branch: '',
			}));
		}
	}, [newUser.bank]);
	useEffect(() => {
		if (newUser.location) {
			setNewUser((prev) => ({
				...prev, branch: '',
			}));
		}
	}, [newUser.location]);

	const validateForm = () => {
		const required = 'Required*';
		// console.log('validateForm fxn');
		let errors = {};
		['role', 'username', 'first_name', 'last_name', 'region',
		'dob', 'gender', 'state', 'location', 'email', 'phone',
		'wphone', 'address' ]
		.forEach((field) => {
		if (!newUser[field] || newUser[field].trim() === '') {
			errors[field] = required;
			}
		})
		if (newUser.role === 'Custodian') {
			['bank', 'branch', 'state',	'location']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		if (newUser.role === 'Custodian' && !newUser.bank) {
			['newBank']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		if (newUser.role === 'Custodian' && !newUser.branch) {
			['newBranch', 'newLocation']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		if (newUser.role === 'Custodian' && !newUser.location) {
			['newLocation']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		setNewUserError({...newUserError, ...errors});
		// console.log('total errors:', errors);
		return Object.keys(errors).length === 0;
	}
	// const tolower = (text) => text.toLowerCase()
	const HandleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		if (['email', 'username', 'newBank', 'newLocation', 'newBranch', 'region']
			.includes(name)) {
			if (name === 'email') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (emailRegex.test(value)) {
					setEmailQuery(`${name}-${value}`)
				} else {
					setEmailQuery('')
				}
			} else if (name === 'username') {
				setUsernameQuery(`${name}-${value}`)
			} else if (name === 'region') {
				setRegionQuery(`${removeHyphen(newUser.role.toLowerCase())}-${name}-${value}`)
			} else if (name === 'newBank') {
				setNewBankQuery(`${newUser.region}-${newUser.state}-${name}-${value}`)
			} else if (name === 'newLocation') {
				setNewLocationQuery(
					`${newUser.bank === 'Enter a New Bank' ?
						newUser.newBank : newUser.bank}-${newUser.region}-${newUser.state}-${name}-${value}`
				)
			} else if (name === 'newBranch') {
				setNewBranchQuery(`${newUser.location === 'Enter a New Location' ?
						newUser.newLocation : newUser.location.split('-')[0]}-${newUser.bank === 'Enter a New Bank' ?
						newUser.newBank : newUser.bank}-${newUser.region}-${newUser.state}-${name}-${value}`
				)
				// setNewBranchQuery(`${name}-${value}`)
			}
		}
		if (type === "file") {
			setNewUser(prevState => ({
				...prevState,
				[name]: files[0],
			}));
		} else if (name === 'branch') {
			setNewUser(prevState => ({
				...prevState,
				branch: value,
				newBranch: value === 'Enter a New Branch' ? '' : null,
			}));
		} else if (name === 'newBranch') {
			setNewUser(prevState => ({
				...prevState,
				newBranch: value,
			}));
		} else if (name === 'bank') {
			setNewUser(prevState => ({
				...prevState,
				bank: value,
				newBank: value === 'Enter a New Bank' ? '' : null,
			}));
		} else if (name === 'newBank') {
			setNewUser(prevState => ({
				...prevState,
				newBank: value,
			}));
		} else if (name === 'location') {
			setNewUser(prevState => ({
				...prevState,
				location: value,
				newLocation: value === 'Enter a New Location' ? '' : null,
			}));
		} else if (name === 'newLocation') {
			if (newUser.role.toLowerCase()==='engineer') {
				setNewUser(prevState => ({
					...prevState,
					location: 'Enter a New Location',
					newLocation: value,
				}));
			} else {
				setNewUser(prevState => ({
					...prevState,
					newLocation: value,
				}));
			}
		}
		else {
			setNewUser(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};
	console.log('================================'.repeat(3))

	const handleFormSubmission = (e) => {
		e.preventDefault();
		console.log('Form submitted:', newUser);
		if (validateForm()) {
			if (newUser.newBranch !== null) {
				newUser.branch = newUser.newBranch
			}
			if (newUser.newBank !== null) {
				newUser.bank = newUser.newBank
			}
			if (newUser.newLocation !== null) {
				newUser.location = newUser.newLocation
			}
			const newFormData = new FormData(); // to reset the form
			// Populate formData with the updated formValues
			let updatedSamp = null;
			Object.entries(newUser).forEach(([key, value]) => {
				console.log(
					'key:', key,
					'typeof(value):', typeof(value)
				)
				if ((typeof(value)==='string') && (key!=='aboutme'&&
				key!=='email'&&
				key!=='phone'&&key!=='wphone'&&
				key!=='profile_picture'&&key!=='address'&&key!=='dob')) {
					console.log('key', key, '#####')
					value = value.toLowerCase();
				}
				if (typeof(value) === 'string') {
					value = value.trim();
				}
				// console.log('key: ' + key + ' value: ' + value);
				newFormData.append(key, value);
				updatedSamp = { ...updatedSamp, [key]: value };
			});
			setFormData(newFormData);
			setPostTrigger(true);
			// console.log('updatedSamp:', updatedSamp);
		} else {
			// fieldsExist.current = valuesAllGood.current
			setShowError(true);
			console.log('Form not submitted due to errors:'.repeat(40), newUserError);
		}
	}

	useEffect(() => {
		if (showError) {
			const delay = setTimeout(() => {
				setShowError(false);
			}, 2000);
			return () => clearTimeout(delay);
		}
	}, [showError])

	useEffect(() => {
		if (postData || postError) {
			setPostTrigger(() => {
				// console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			if (postData?.color==='green') {
				// Reset newUser to default state
				setNewUser(initailFormValues);
				if (postData?.msg) setRSwitch(postData);
			} else if (postData?.color==='red') setRSwitch(postData);
			if (postError?.msg) setRSwitch(postError);
			// setShowNotifi(true)
		}
	}, [postTrigger, postData, postLoading, postError])

	useEffect(() => {
		if (rSwitch) {
			toast.success(rSwitch.msg)
			// toast.success(rSwitch.msg, { duration: 10000 });
			setRSwitch(null)
			navigate('/success', {state: {currentPage: `/${authData?.role}`, time: 10}})
		}
	}, [rSwitch])

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
			case 'Select Role':
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

	let stateRegionList;
	let stateBanksList;
	let stateLocationsList;
	let stateStatesList;
	let stateBranchesList;
	console.log('Custodian:', newUser.role === 'Custodian')
	if (newUser.role) {
		stateRegionList = filteredRegions
		stateStatesList = filteredStates
		if (newUser.role === 'Custodian') {
			stateBranchesList = bankBranchList
			stateLocationsList = bankLocationList
			stateBanksList = bankBranchesList
		} else {stateLocationsList = filteredLocations}
	}
	console.log(
		'\nnewUser.branch:', newUser.branch,
		'\nnewUser.newBranch:', newUser.newBranch,
		'\nnewUser.bank:', newUser.bank,
		'\nnewUser.newBank:', newUser.newBank,
		'\nnewUser.location:', newUser.location,
		'\nnewUser.newLocation:', newUser.newLocation,
		'\nnewUser.role:', newUser.role,
		'\nnewUser.region:', newUser.region,
		'\nnewUser.password:', newUser.password,
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
					<form onSubmit={handleFormSubmission}>
						<div>
							<div className="cust-row-user">
								{/* ............. role .................. */}
								<div className="user-fields-row">
									<div className="input-field">
										<Label htmlFor="role">Role:</Label>
										<div>
											<SelectItem
											style={style.input}
											id="role"
											name="role"
											ref={refInput}
											value={newUser.role}
											onChange={(e) => {
												HandleUserCreationInputChange(e);
												renderByDept(e);
											}}
											>
												<option	style={styles.selectOpts}>Select Role</option>
											{[
												'Custodian',
												'Engineer',
												'Workshop',
												'Help Desk',
												'Supervisor',
												'Human Resource',
											].map((dept) => {
												return (
												<option key={dept} value={addHyphen(dept)}>
												{dept}
												</option>
											)})}
											</SelectItem>
										</div>
										{(newUser.region&&(newUser.role.toLowerCase()==='help-desk'||newUser.role.toLowerCase()==='supervisor'||
											newUser.role.toLowerCase()==='custodian'||newUser.role.toLowerCase()==='engineer'
										)) &&
										<QueryFieldFromDB
										query={regionQuery}
										// callbackOnDataChange={handleDataChange}
										/>}
									</div>
								</div>
								{(dept.nothing) &&
								(<>
									{(dept.all) &&
									(<>
										{/* {(!dept.custodian) && */}
										{/* ............. region .................. */}
										<div className="input-field">
											<Label htmlFor="region">Region:</Label>
											<div>
												<SelectItem
												name="region"
												id="region"
												style={style.input}
												value={newUser.region}
												onChange={HandleUserCreationInputChange}
												>
													<option style={styles.selectOpts}>Select Region</option>
													{
													// [
													// 	'region_1',
													// 	'region_2',
													// 	'region_3',
													// ]
													stateRegionList && stateRegionList?.map((region, i) => (
														<option key={i} value={region}>{toSentenceCase(region)}</option>
													))}
												</SelectItem>
											</div>
											{<DisplayError fieldName='region' />}
										</div>
										{/* ............. state .................. */}
										<div className="user-fields-row">
											{(newUser.region && newUser?.region !== 'Select Region') && (
											<div className="input-field">
												<Label htmlFor="state">State:</Label>
												<div>
													<SelectItem
													name="state"
													id="state"
													style={style.input}
													ref={refInput}
													value={newUser.state}
													onChange={HandleUserCreationInputChange}
													>
														<option style={styles.selectOpts}>Select State</option>
														{stateStatesList &&
														stateStatesList.map((stateName, i) => (
															<option key={i} value={stateName.name}>{toSentenceCase(stateName.name)}</option>
														))}
													</SelectItem>
												</div>
												{<DisplayError fieldName='state' />}
											</div>)}

											{/* ............. bank .................. */}
											{newUser.role === 'Custodian' && (newUser.state && newUser?.state !== 'Select State') && (
											// <di className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="bank">Bank:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="bank"
													id="bank"
													ref={refInput}
													value={newUser.bank || 'Select Bank'}
													// required
													onChange={(e) => {
													HandleUserCreationInputChange(e);
													}}
													>
													<option style={styles.selectOpts}>Select Bank</option>
													<option
													style={styles.options}
													value="Enter a New Bank">Enter a New Bank</option>
													{
													stateBanksList &&
													stateBanksList.map((bank, i) => {
														return (
														<option key={i} value={bank.name}>{toSentenceCase(bank.name)}</option>
													)})}
													</SelectItem>
													{newUser.bank === 'Enter a New Bank' && (
													<NewFieldContainer>
														<input
														style={{...style.input, width: '100%',}}
														type="text"
														name="newBank"
														id="newBank"
														placeholder="E.g., fcmb"
														value={newUser.newBank || ''}
														onChange={HandleUserCreationInputChange}
														/>
													</NewFieldContainer>
													)}
												</NewFieldContainer>
												{(newUser.newBank) && <QueryFieldFromDB
												// callbackOnDataChange={handleDataChange}
												query={newBankQuery} />}
												{/* Error Handling */}
												{(newUser.bank === 'Enter a New Bank' && !newUser.newBank) ?
													<DisplayError fieldName='newBank' /> :
													<DisplayError fieldName='bank' />
												}
												{/* {<DisplayError fieldName='bank' />} */}
											</div>)}
										</div>
										{/* ............. location .................. */}
										<div className="user-fields-row">
											{/* {(newUser.state && newUser?.state !== 'Select State') && ( */}
											{((newUser.state && newUser?.state !== 'Select State' && newUser.role !== 'Custodian') ||
												(newUser.role === 'Custodian' && newUser.bank && newUser?.bank !== 'Select Bank')) && (
											<div className="input-field">
												<Label htmlFor="location">Location:</Label>
												<NewFieldContainer>
													{newUser.role.toLowerCase()!=='engineer' &&
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="location"
													id="location"
													ref={refInput}
													value={newUser.location||'Select Location'}
													onChange={HandleUserCreationInputChange}
													>
													<option style={styles.selectOpts}>Select Location</option>
													<option
													style={styles.options}
													value="Enter a New Location">Enter a New Location</option>
														{stateLocationsList &&
														stateLocationsList.map((selectedLocation, i) => {
															return (<option key={i} value={`${selectedLocation.location}-${selectedLocation.id}`}>{toSentenceCase(selectedLocation.location)}</option>
														)})}
													</SelectItem>}
													{(newUser.location === 'Enter a New Location'||newUser.role.toLowerCase()==='engineer') && (
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
												// callbackOnDataChange={handleDataChange}
												query={newLocationQuery} />}
												{/* Error Handling */}
												{(newUser.location === 'Enter a New Location' && !newUser.newLocation) ?
													<DisplayError fieldName='newLocation' /> :
													<DisplayError fieldName='location' />
												}
												{/* // {<DisplayError fieldName='location' />} */}
											</div>)}
											{/* ............... branch ................ */}
											{newUser.role === 'Custodian' && (newUser.location !== 'Select Location' && newUser.location !== '') && (
											<div className="input-field">
												<Label htmlFor="branch">Branch:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="branch"
													id="branch"
													ref={refInput}
													value={newUser.branch || 'Select Branch'}
													onChange={HandleUserCreationInputChange}
													>
													<option style={styles.selectOpts}>Select Branch</option>
													<option
													style={styles.options}
													value="Enter a New Branch">Enter a New Branch</option>
													{stateBranchesList &&
													stateBranchesList.map((branch, i) => (
														<option key={i} value={branch.name}>
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
												// callbackOnDataChange={handleDataChange}
												query={newBranchQuery} />}
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
												<Label htmlFor="first_name">First Name:</Label>
												<input
												type="text"
												name="first_name"
												id="first_name"
												style={style.input}
												value={newUser.first_name}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='first_name' />}
											</div>
											<div className="input-field">
												<Label htmlFor="last_name">Last Name:</Label>
												<input
												type="text"
												name="last_name"
												id="last_name"
												style={style.input}
												value={newUser.last_name}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='last_name' />}
											</div>
										</div>
										{/* ............... middle name and email ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="middle_name">Middle Name:</Label>
												<input
												type="text"
												name="middle_name"
												style={style.input}
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
												style={style.input}
												value={newUser.email}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{newUser.email && <QueryFieldFromDB
												// callbackOnDataChange={handleDataChange}
												query={emailQuery} />}
												{<DisplayError fieldName='email' />}
											</div>
										</div>
										{/* ............... phone and wphone numbers ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="phone">Phone No.:</Label>
												<div>
													<span style={{fontSize: 'large'}}>+234 </span>
													<input
													style={{...style.input, width: '70%'}}
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
													e.target.value = e.target.value.replace(/\D/g, '');
													}}
													/>
												</div>
												{<DisplayError fieldName='phone' />}
											</div>
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
													placeholder=' Required. Example: 8038091572'
													onInput={(e) => {
													e.target.value = e.target.value.replace(/\D/g, '');
													}}
													/>
												</div>
												{<DisplayError fieldName='wphone' />}
											</div>
										</div>
										{/* ............... date of birth and gender ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="dob">Date of Birth:</Label>
												<input
												style={{...style.input, width: '30%'}}
												max={new Date().toISOString().split("T")[0]} // Set max to today's date
												type="date"
												name="dob"
												id="dob"
												value={newUser.dob}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='dob' />}
											</div>
											<div className="input-field">
												<Label htmlFor="gender">Gender:</Label>
												<div>
													<SelectItem
													name="gender"
													id="gender"
													style={style.input}
													value={newUser.gender}
													onChange={HandleUserCreationInputChange}
													>
														<option style={styles.selectOpts}>Select Gender</option>
														{
														[
															'Male',
															'Female',
															// 'Prefer not to say',
														]
														.map((gender, i) => (
															<option key={i} value={gender}>{gender}</option>
														))}
													</SelectItem>
												</div>
												{<DisplayError
												fieldName='gender' />}
											</div>
										</div>
										{/* ............... address and username ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="address">Address:</Label>
												<input
												type="text"
												name="address"
												id="address"
												style={style.input}
												value={newUser.address}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='address' />}
											</div>
											<div className="input-field">
												<Label htmlFor="username">Username:</Label>
												<input
												type="text"
												name="username"
												value={newUser.username}
												id="username"
												style={style.input}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{newUser.username && <QueryFieldFromDB
												// callbackOnDataChange={handleDataChange}
												query={usernameQuery} />}
												{<DisplayError fieldName='username' />}
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
												style={style.input}
												onChange={HandleUserCreationInputChange}
												/>
											</div>
										</div>
									</>)}
								</>)}
								{(postData) ?
									console.log(
										'\npostData:', postData,
										// '\nshowNotifi:', showNotifi,
										'\npostLoading:', postLoading,
										'\nrSwitch:', rSwitch,
										'\npostData:', postData,
										'npostData?.color:', postData?.color,
									): null
								}
								{/* {(showNotifi && !postLoading) && <p style={{...styleObj, color: rSwitch?.color}}>{rSwitch?.msg}</p>} */}
							</div>
						</div>
						
						<MainButtonContainer>
							<MainButton
							onClick={handleFormSubmission}
							type="submit"
							role="button"
							tabIndex="0"
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									// e.preventDefault();  // Prevents default form submission behavior
									handleFormSubmission(e);  // Calls your form submission function
								}
							}}
							disabled={postLoading}>
							{postLoading ? 'Creating...' : 'Create Account'}
							</MainButton>
						</MainButtonContainer>
					</form>
				</div>
			</div>
			<hr/>
		</>
	)
}
export default CreateUser;
