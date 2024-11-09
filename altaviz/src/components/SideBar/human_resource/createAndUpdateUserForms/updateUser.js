import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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

function UpdateUser () {
	const { authData } = useContext(AuthContext)
	const initailFormValues = {
		// role: "",
		// bank: "",
		// newBank: "",
		branch: authData.branch.name,
		newBranch: "",
		// state: authData.role==='custodian'?authData.branch.state.name:authData.state.name,
		location: authData.role==='custodian'?authData.branch.location.location:authData.location.location,
		newLocation: "",
		region: authData.role==='custodian'?authData.branch?.region.name:authData.region.name,
		// dob: "",
		// gender: "",
		// qtyAtm: "",
		// username: "",
		// first_name: "",
		last_name: authData.last_name,
		middle_name: authData.middle_name,
		// email: "",
		// phone: authData.phone,
		wphone: authData.wphone,
		//////////////////////////////////
		//////////////////////////////////
		// password1: "",
		// password2: "",
		//////////////////////////////////
		//////////////////////////////////
		address: authData.address,
		aboutme: authData.aboutme,
		profile_picture: null,
		// dummy: '',
	}
	// let defaultState = {
	// 	nothing: false,
	// 	custodian: false,
	// 	all: false,
	// };
	// const [emailQuery, setEmailQuery] = useState('');
	// const [isEmailExist, setIsEmailExist] = useState(false);
	// const [newBankQuery, setNewBankQuery] = useState('');
	// const [isNewBankExist, setIsNewBankExist] = useState(false);
	const [rSwitch, setRSwitch] = useState(null)
	const [branchID, setBranchID] = useState(null);
	const [showNotifi, setShowNotifi] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [newLocationQuery, setNewLocationQuery] = useState('');
	const [isNewLocationExist, setIsNewLocationExist] = useState(false);
	const [newBranchQuery, setNewBranchQuery] = useState('');
	const [isNewBranchExist, setIsNewBranchExist] = useState(false);
	// const [usernameQuery, setUsernameQuery] = useState('');
	// const [isUsernameExist, setIsUsernameExist] = useState(false);
	// const [found, setFound] = useState(false);
	// const [fieldStatus, setFieldStatus] = useState(false);
	// const [inputText, setInputText] = useState('');
	// const [isExist, setIsExist] = useState(null);
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});
	// const [dept, setDept] = useState(defaultState);
	///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	// const [password1, setPassword1] = useState('');
	// const [password2, setPassword2] = useState('');
	// const [showPassword1, setShowPassword1] = useState(false);
	// const [showPassword2, setShowPassword2] = useState(false);
	// const [passwordCheck, setPasswordCheck] = useState(true);
	///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
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
		`http://127.0.0.1:8000/user-details-update/${authData.id}/`,
		formData,
		postTrigger,
		// `/${authData.role}`,
	);

	// useEffect(() => {
    //     refInput.current.focus();
    // }, [])

	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////
	//custodian - this should be to locations w/branches inline
	// with state, bank and region
	const custodian = useGetWithEncryption(
		`http://127.0.0.1:8000/custodian-details-update/
		${authData.branch.region.id}/
		${authData.branch.state.name}/
		${authData.branch.bank.name}`,
		'custodian',
	)
	// not custodian - this should be to just locations inline
	// with state, bank and region
	const notCustodian = useGetWithEncryption(
		`http://127.0.0.1:8000/others-details-update/
		${authData.branch.region.id}/
		${authData.branch.state.name}/`,
		'notCustodian',
	)
	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////

	useEffect(() => {
		// get locations and branches for custodian
		if (authData.role==='custodian'&&custodian.localDataStoreVar) {
			console.log('custodian with encryption: ', custodian)
			setCustodianList(custodian.localDataStoreVar[0].banks[0].locations)
		}
		// get locations for non custodian
		if (authData.role!=='custodian'&&notCustodian.localDataStoreVar) {
			console.log('notCustodian with encryption: ', notCustodian)
			setNotCustodianList(notCustodian.localDataStoreVar[0].locations)
		}
	}, [custodian, notCustodian])

	useEffect(() => {
		console.log('start ##############'.toUpperCase())
		console.log(
			'\nbranch', newUser.branch,
			'\nlocation', newUser.location,
		)
		// get branches for each location
		if (authData.role === 'custodian' && custodianList) {
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

	///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	// const togglePasswordvisi1 = () => {
	// 	setShowPassword1(!showPassword1);
	// }
	// const togglePasswordvisi2 = () => {
	// 	setShowPassword2(!showPassword2);
	// }

	// useEffect(() => {
	// 	if (password1 && password2) {
	// 		// enforce other checks here
	// 		const passMatch = password1 === password2;
	// 		setPasswordCheck(passMatch);
	// 	}
	// }, [password1, password2]);

	// useEffect(() => {
	// 	if (passwordCheck) {
	// 		setNewUserError({
	// 			...newUserError,
	// 			password1: null,
	// 			password2: null,
	// 		})
	// 		setNewUser({
	// 			...newUser,
	// 			password: password1,
	// 		});
	// 	} else {
	// 		setNewUserError({
	// 			...newUserError,
	// 			password1: 'Passwords do not match',
	// 			password2: 'Passwords do not match',
	// 		})
	// 		setNewUser({
	// 			...newUser,
	// 			password: '',
	// 		});
	// 	}
	// }, [passwordCheck]);
	///////////////////////////////////////////////////////
	///////////////////////////////////////////////////////

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
		if (authData.role === 'custodian') {
			['branch', 'location']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		if (authData.role === 'custodian' && !newUser.branch) {
			['newBranch']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
		if (authData.role === 'custodian' && !newUser.location) {
			['newLocation']
			.forEach((fieldName) => {
				if (!newUser[fieldName] || newUser[fieldName].trim() === '') {
					errors[fieldName] = required;
				}
			})
		}
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
		// if (name==='branch') {
		// 	value = stateBranchesList.map(branch => {
		// 		if (branch.id === Number(value)) {
		// 			return branch.name;
		// 		}
		// 	})
		// 	value = value[0]
		// }
		console.log('value (after):', value)
		if (['newLocation', 'newBranch']
			.includes(name)) {
				console.log('eeeeeeeeeeeeeeeeeeeeee'.toUpperCase())
			if (name === 'newLocation') {
				setNewLocationQuery(
					`${authData.branch.bank.name}-${authData.region.name}-${authData.role==='custodian'?authData.branch.state.name:authData.state.name}-${name}-${value}`
				)
			} else if (name === 'newBranch') {
				setNewBranchQuery(`${newUser.location === 'Enter a New Location' ?
						newUser.newLocation : newUser.location}-${authData.branch.bank.name}-${authData.region.name}-${authData.role==='custodian'?authData.branch.state.name:authData.state.name}-${name}-${value}`
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
			setNewUser(prevState => ({
				...prevState,
				branch: stateBranchesList.filter(branch => {
					console.log(
						'\nbranchID', branch.id,
						'\nvalue', Number(value)
					)
					if (branch.id === Number(value)) {
						console.log('branch.name:', branch.name)
						return branch;
					}
				})[0].name,
				newBranch: value === 'Enter a New Branch' ? '' : null,
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
		///////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////
		// else if (name === 'password1'||name === 'password2') {
		// 	setNewUser(prevState => ({
		// 		...prevState,
		// 		[name]: value,
		// 	}));
		// 	if (name === 'password1') {
		// 		setPassword1(value);
		// 	} else if (name === 'password2') {
		// 		setPassword2(value);
		// 	}
		// }
		///////////////////////////////////////////////////////////
		///////////////////////////////////////////////////////////
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
			// if (!newUser.location && !newUser.newLocation) {
			// 	setNewUser(prevState => ({
			// 		...prevState,
			// 		location: authData.role==='custodian'?authData.branch.location.location:authData.location.location,
			// 	}));
			// }
			// else if (newUser.newLocation) {
			// 	setNewUser(prevState => ({
			// 		...prevState,
			// 		location: newUser.location
			// 	}));
			// }
			// if (!newUser.branch && !newUser.newBranch) {
			// 	setNewUser(prevState => ({
			// 		...prevState,
			// 		branch: authData.branch.name,
			// 	}));
			// }
			// else if (newUser.newBranch) {
			// 	setNewUser(prevState => ({
			// 		...prevState,
			// 		branch: newUser.branch
			// 	}));
			// }
			console.log(
				'\nnewUser.branch:', newUser.branch,
				'\nnewUser.newBranch:', newUser.newBranch,
				'\nnewUser.location:', newUser.location,
				'\nnewUser.newLocation:', newUser.newLocation,
			)
			console.log('Form submitted: (before)', newUser);
			if (newUser.newBranch) {
				newUser.branch = newUser.newBranch
			}
			// if (newUser.newBank !== null) {
			// 	newUser.bank = newUser.newBank
			// }
			if (newUser.newLocation) {
				newUser.location = newUser.newLocation
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
					// key !== 'email'&&
					///////////////////////
					///////////////////////
					// key !== 'password'&&
					// key !== 'password1'&&
					// key !== 'password2'&&
					///////////////////////
					///////////////////////
					// key !== 'phone'&&
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
			newFormData.append('bank', authData.branch.bank.name)
			newFormData.append('state', authData.branch.state.name)
			newFormData.append('branchID', branchID)
			setFormData(newFormData);
			setPostTrigger(true);
			console.log('updatedSamp:', updatedSamp);
		} else {
			setShowError(true);
			console.log('Form not submitted due to errors:', newUserError);
		}
	}
	// useEffect(() => {
	// 	if (showError) {
	// 		const delay = setTimeout(() => {
	// 			setShowError(false);
	// 		}, 1000);
	// 		return () => clearTimeout(delay);
	// 	}
	// }, [showError])
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
			profilePicture.src=`http://127.0.0.1:8000/${authData.profile_picture}`
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
	// const renderByDept = (e) => {
	// 	const value = e.target.value;
	// 	switch (value) {
	// 		case 'Custodian':
	// 			setDept({
	// 				...defaultState,
	// 				custodian: true,
	// 				nothing: true,
	// 				all: true,
	// 			});
	// 			break;
	// 		// case 'Select Role':
	// 		// 	setDept({
	// 		// 		...defaultState,
	// 		// 	});
	// 		// 	break;
	// 		default:
	// 			setDept({
	// 				...defaultState,
	// 				all: true,
	// 				nothing: true
	// 			});
	// 	}
	// 	// console.log('THE VALUE:', value);
	// }
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
	// const temp = {
	// 	loading: false,
	// 	postError: false,
	// 	response: false,
	// }
	// console.log('XXXXX branches list: (global sc0pe)', bankBranchList)
	// let statecustodianList;
	// let stateStateList;
	// let stateBanksList;
	let stateLocationsList;
	// let stateStatesList;
	let stateBranchesList;
	// let extractedStates;
	// let NigStates;
	// let combinedStates;
	// let filteredStateLocation;
	console.log('Custodian:', authData.role === 'custodian')
	if (authData.role) {
		if (authData.role === 'custodian') {
			stateLocationsList = custodianList
			stateBranchesList = locationBranchesList
			// stateBanksList = bankBankList
			// stateStatesList = bankStateList
			// stateStatesList = bankStateLocationList
			// stateStatesBranchesList = bankStateLocationBranchList
		} else {
			// stateStatesList = filteredStates
			stateLocationsList = notCustodianList
		}
		// if (stateStatesList) {
		// 	extractedStates = stateStatesList.map(state => state.name)
		// 	NigStates = statesInNig.map(state => state.toLowerCase())
		// 	combinedStates = [...new Set([...extractedStates, ...NigStates])]
		// }
	}
	// console.log('Custodian:', newUser.role === 'Custodian')
	// console.log('custodianList (outside):', custodianList)
	// console.log('filteredLocations (outside):', filteredLocations)
	// console.log('bankStateList (outside):', bankStateList)
	// console.log('bankStateLocationList (outside):', bankStateLocationList)
	// console.log('bankStateLocationBranchList (outside):', bankStateLocationBranchList)
	// console.log('filteredStates (outside):', filteredStates)
	// console.log('notCustodianList (outside):', notCustodianList)
	// console.log('statecustodianList (Req:banks-outside):', statecustodianList)
	// console.log('stateStateList (Req:states-outside):', stateStateList)
	console.log('stateBranchesList (Req:branches-outside):', stateBranchesList)
	// console.log('stateBanksList (Req:banks-outside):', stateBanksList)
	console.log('stateLocationsList (Req:location-outside):', stateLocationsList)
	// console.log('stateStatesList (Req:states-outside):', stateStatesList)
	// console.log('stateStatesBranchesList (Req:branches-outside):', stateStatesBranchesList)

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
		// use these values to further validate
		// form submission accordingly
		// isEmailExist, isUsernameExist, isNewBankExist, isNewLocationExist, isNewBranchExist
		// '\nemail field exist:', isEmailExist,
		// '\nusername field exist:', isUsernameExist,
		// '\nnew bank field exist:', isNewBankExist,
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
	// if (combinedStates) {
	// 	// let extractedStates = stateStatesList.map(state => state.name)
	// 	// let NigStates = statesInNig.map(state => state.toLowerCase())
	// 	// const combinedStates = [...new Set([...extractedStates, ...NigStates])]
	// 	// const combinedFilteredStates = [...new Set(combinedStates)];

		// console.log(
	// 	'kkkkkkkkkkkkkkkkkkkkk',
	// 	'\nstatesInNig:', NigStates,
	// 	'\nextractedStates:', extractedStates,
		// '\ncombinedStates:', combinedStates,
	// 	// '\ncombinedFilteredStates:', combinedFilteredStates,
		// );
	// 	console.log(
	// 	'mmmmmmmmmmmmmmmmmmmmm',
	// 	'\nlen states in nig:', NigStates?.length,
	// 	'\nlen extractedStates:', extractedStates?.length,
	// 	'\nlen combinedStates:', combinedStates?.length,
	// 	// '\nlen combinedFilteredStates:', combinedFilteredStates.length,
	// 	);
	// }
	if (custodian && custodianList) {
		console.log(
			'\ncustodian',
			'\ncustodian', custodian,
			'\ncustodianList', custodianList,
			'\nlocationBranchesList', locationBranchesList,
			'\nnoncostodian',
			'\n\nnotCustodian', notCustodian,
			'\nnotCustodianList', notCustodianList,
			'\n\nauthData.profile_picture', authData.profile_picture,
		)
	}
	
	// useEffect(() => {
	// 	if (isSuccess || isError) {
	// 		console.log('success response (no timer):', success);
	// 	}
	// }, [isSuccess, isError])
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
	)
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
								{/* ............. role .................. */}
								{/* <div className="user-fields-row">
									<div className="input-field">
										<Label htmlFor="role">Role:</Label>
										<div>
											<SelectItem
											id="role"
											name="role"
											ref={refInput}
											value={newUser.role}
											onChange={(e) => {
												HandleUserCreationInputChange(e);
												renderByDept(e);
											}}
											>
												<option>Select Role</option>
											{[
												'Custodian',
												'Engineer',
												'Workshop',
												'Help Desk',
												'Supervisor',
												'Human Resources',
											].map((dept) => {
												return (
												<option key={dept} value={dept}>
												{dept}
												</option>
											)})}
											</SelectItem>
										</div>
									</div>
								</div> */}



								{
								// (dept.nothing) &&
								(<>
									{
									// (dept.all) &&
									(<>




										{/* {(!dept.custodian) && */}
										{/* ............. region .................. */}
										{/* <div className="input-field">
											<Label htmlFor="region">Region:</Label>
											<div>
												<SelectItem
												name="region"
												id="region"
												value={newUser.region}
												onChange={HandleUserCreationInputChange}
												>
													<option>Select Region</option>
													{
													[
														'region_1',
														'region_2',
														'region_3',
													]
													.map((region, i) => (
														<option key={i} value={region}>{toSentenceCase(region)}</option>
													))}
												</SelectItem>
											</div>
											{<DisplayError fieldName='region' />}
										</div> */}
										{/* ............. state .................. */}
										{/* <div className="user-fields-row"> */}
											{/* <div className="input-field">
												<Label htmlFor="state">State:</Label>
												<div>
													<SelectItem
													name="state"
													id="state"
													ref={refInput}
													value={newUser.state}
													onChange={HandleUserCreationInputChange}
													>
														<option>Select State</option>
														{combinedStates &&
														combinedStates.map((stateName, i) => (
															<option key={i} value={stateName}>{toSentenceCase(stateName)}</option>
														))}
													</SelectItem>
												</div>
												{<DisplayError fieldName='state' />}
											</div> */}

											{/* ............. bank .................. */}
											{/* {authData.role === 'custodian' && (newUser.state && newUser?.state !== 'Select State') && (
											<div className="input-field">
												<Label htmlFor="bank">Bank:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{width: '35%',}}
													name="bank"
													id="bank"
													ref={refInput}
													value={newUser.bank || 'Select Bank'}
													onChange={(e) => {
													HandleUserCreationInputChange(e);
													}}
													>
													<option>Select Bank</option>
													<option value="Enter a New Bank">Enter a New Bank</option>
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
														style={{width: '100%',}}
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
												query={newBankQuery}
												setIsExist={setIsNewBankExist} />}
												{(newUser.bank === 'Enter a New Bank' && !newUser.newBank) ?
													<DisplayError fieldName='newBank' /> :
													<DisplayError fieldName='bank' />
												}
											</div>)} */}
										{/* </div> */}
										{/* ............. location .................. */}
										<div className="user-fields-row">
											{
											// ((newUser.state && newUser?.state !== 'Select State' && authData.role !== 'custodian') ||
											// 	(authData.role === 'custodian' && newUser.bank && newUser?.bank !== 'Select Bank')) && 
												(
											<div className="input-field">
												<Label htmlFor="location">Location:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{width: '35%',}}
													name="location"
													id="location"
													ref={refInput}
													value={newUser.location}
													onChange={HandleUserCreationInputChange}
													disabled={!isEditable}
													>
													<option value={authData.role==='custodian'?authData.branch.location.location:authData.location.location}>{authData.role==='custodian'?authData.branch.location.location:authData.location.location}</option>
													<option value="Enter a New Location">Enter a New Location</option>
														{stateLocationsList &&
														stateLocationsList.map((selectedLocation, i) => {
															return (<option key={i} value={selectedLocation.location}>{toSentenceCase(selectedLocation.location)}</option>
														)})}
													</SelectItem>
													{newUser.location === 'Enter a New Location' && (
														<NewFieldContainer>
															<input
															style={{width: '100%',}}
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
											{((authData.role === 'custodian') &&
											// (newUser.location !== (authData.branch.location.location||authData.location.location)) && (newUser.location === 'Select Location')) && (
											<div className="input-field">
												<Label htmlFor="branch">Branch:</Label>
												<NewFieldContainer>
													<SelectItem
													style={{width: '35%',}}
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
															authData.role==='custodian'?
															authData.branch.location.location:authData.location.location
														)?
																(!isEditable?authData.branch.name:(newUser.branch==='')?'Select Branch':newUser
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
														style={{width: '100%',}}
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
											{/* <div className="input-field">
												<Label htmlFor="first_name">First Name:</Label>
												<input
												type="text"
												name="first_name"
												id="first_name"
												value={newUser.first_name}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='first_name' />}
											</div> */}
											<div className="input-field">
												<Label htmlFor="last_name">Last Name:</Label>
												<input
												type="text"
												name="last_name"
												id="last_name"
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
												value={newUser.middle_name}
												id="middle_name"
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												/>
											</div>
										</div>
										{/* ............... middle name and email ................ */}
										<div className="user-fields-row">
											{/* <div className="input-field">
												<Label htmlFor="middle_name">Middle Name:</Label>
												<input
												type="text"
												name="middle_name"
												value={newUser.middle_name}
												id="middle_name"
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												/>
											</div> */}
											{/* <div className="input-field">
												<Label htmlFor="email">Email:</Label>
												<input
												type="email"
												name="email"
												id="email"
												value={newUser.email}
												required={isRequired}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{newUser.email && <QueryFieldFromDB
												query={emailQuery}
												setIsExist={setIsEmailExist} />}
												{<DisplayError fieldName='email' />}
											</div> */}
										</div>
										{/* ............... phone and wphone numbers ................ */}
										<div className="user-fields-row">
											{/* <div className="input-field">
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
													e.target.value = e.target.value.replace(/\D/g, '');
													}}
													/>
												</div>
												{<DisplayError fieldName='phone' />}
											</div> */}
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
												value={newUser.address}
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='address' />}
											</div>
										</div>
										{/* ............... date of birth and gender ................ */}
										{/* <div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="dob">Date of Birth:</Label>
												<input
												style={{width: '30%'}}
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
													value={newUser.gender}
													onChange={HandleUserCreationInputChange}
													>
														<option >Select Gender</option>
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
										</div> */}
										{/* ////////////////////////////////////////////////////////// */}
										{/* ////////////////////////////////////////////////////////// */}
										{/* ............... password and confirmation ................ */}
										{/* <div className="user-fields-row">
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
													disabled={!isEditable}
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
												{<DisplayError fieldName='password1' />}
												{!passwordCheck && <span style={{...errorStylings}}>{newUserError.password1}</span>}
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
													disabled={!isEditable}
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
												{<DisplayError fieldName='password2' />}
												{!passwordCheck && <span style={{...errorStylings}}>{newUserError.password2}</span>}
											</div>
										</div> */}
										{/* ////////////////////////////////////////////////////////// */}
										{/* ////////////////////////////////////////////////////////// */}
										{/* ............... address and username ................ */}
										<div className="user-fields-row">
											{/* <div className="input-field">
												<Label htmlFor="address">Address:</Label>
												<input
												type="text"
												name="address"
												id="address"
												value={newUser.address}
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												placeholder=' Required'
												/>
												{<DisplayError fieldName='address' />}
											</div> */}
											{/* <div className="input-field">
												<Label htmlFor="username">Username:</Label>
												<input
												type="text"
												name="username"
												value={newUser.username}
												id="username"
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{newUser.username && <QueryFieldFromDB
												query={usernameQuery}
												setIsExist={setIsUsernameExist} />}
												{<DisplayError fieldName='username' />}
											</div> */}
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
												// value={newUser.profile_picture}
												onChange={(e) => {
													HandleUserCreationInputChange(e);
												}}
												disabled={!isEditable}
												/>
												{<img id="createImage" src={`http://127.0.0.1:8000/${authData.profile_picture}`} alt="Profile pic" style={{...profilePictureStyle, border: '1px solid #333',}} />}
											</div>
											<div className="input-field">
												<Label htmlFor="aboutme">About Me:</Label>
												<textarea
												value={newUser.aboutme}
												name="aboutme"
												id="aboutme"
												onChange={HandleUserCreationInputChange}
												disabled={!isEditable}
												/>
												{/* >{newUser.aboutme}</textarea> */}
											</div>
										</div>
									</>)}
								</>)}
								{(showNotifi && !postLoading) && <p style={{...styleObj, color: 'green'}}>{rSwitch.msg}</p>}
							</div>
						</div>
						
						<MainButtonContainer>
							{/* submit button */}
							<MainButton
								onClick={handleFormSubmission}
								type="submit"
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
						{/* render response from db here */}
					{/* <SubmitNotification error={postError} success={postData} /> */}
					</form>
				</div>
			</div>
			<hr/>
		</>
	)
}
export default UpdateUser;