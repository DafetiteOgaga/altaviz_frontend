import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import SubmitNotification from '../../bbbbbnotifications/submitNotification/SubmitNotification';
import { FetchContext } from "../../../context/FetchContext";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import QueryFieldFromDB from "../QueryFieldFromDB";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";

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
		password1: "",
		password2: "",
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
	const [emailQuery, setEmailQuery] = useState('');
	const [isEmailExist, setIsEmailExist] = useState(false);
	const [newBankQuery, setNewBankQuery] = useState('');
	const [isNewBankExist, setIsNewBankExist] = useState(false);
	const [regionQuery, setRegionQuery] = useState('');
	const [isRegionExist, setIsRegionExist] = useState(false);
	const [newLocationQuery, setNewLocationQuery] = useState('');
	const [isNewLocationExist, setIsNewLocationExist] = useState(false);
	const [newBranchQuery, setNewBranchQuery] = useState('');
	const [isNewBranchExist, setIsNewBranchExist] = useState(false);
	const [usernameQuery, setUsernameQuery] = useState('');
	const [isUsernameExist, setIsUsernameExist] = useState(false);
	const [found, setFound] = useState(false);
	// const [fieldStatus, setFieldStatus] = useState(false);
	// const [inputText, setInputText] = useState('');
	// const [isExist, setIsExist] = useState(null);
	const { toSentenceCase, addHyphen, removeHyphen } = useContext(SentenceCaseContext)
	const [newUser, setNewUser] = useState(initailFormValues);
	const [newUserError, setNewUserError] = useState({});
	const [showNotifi, setShowNotifi] = useState(false);
	const [rSwitch, setRSwitch] = useState(null)
	const [dept, setDept] = useState(defaultState);
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState(true);
	const [isRequired, setIsRequired] = useState(true);
	const [showError, setShowError] = useState(false);
	const refInput = useRef(null);
	const [regionStateList, setRegionStateList] = useState(null)
	const [bankStateList, setBankStateList] = useState(null)
	const [bankBankList, setBankBankList] = useState(null)
	const [bankStateLocationList, setBankStateLocationList] = useState(null)
	const [bankLocationList, setBankLocationList] = useState(null)
	const [bankBranchList, setBankBranchList] = useState(null)
	const [notCustodianList, setNotCustodianList] = useState(null)
	const [custodianList, setCustodianList] = useState(null)
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
		'/human-resource',
	);

	useEffect(() => {
        refInput.current.focus();
    }, [])

	//custodian
	const custodian = useGetWithEncryption(
		`banks/`,
		'custodian',
	)
	// not custodian
	const notCustodian = useGetWithEncryption(
		`states/`,
		'notCustodian',
	)

	useEffect(() => {
		// get for custodian
		if (custodian) {
			console.log('custodian with encryption: ', custodian)
			setCustodianList(custodian.localDataStoreVar)
		}
		// get for non custodian
		if (notCustodian) {
			console.log('notCustodian with encryption: ', notCustodian)
			setNotCustodianList(notCustodian.localDataStoreVar)
		}
	}, [custodian, notCustodian])

	useEffect(() => {
		console.log('start ##############'.toUpperCase())
		// for non custodian
		// for regions
		if (newUser.role !== 'Custodian' && notCustodianList) {
			console.log('regions (non custodian) ##############'.toUpperCase())
			console.log(
				'\nnotCustodianList: ', notCustodianList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				// '\nnewUser.region:', newUser.region,
			)
			// if (locationListValue) {
			const stateRegions = []
			// console.log('locationListValue:', locationListValue)
			console.log('999999999999999999')
			for (let i = 0; i < notCustodianList.length; i++) {
				console.log('2222222222222222222:', notCustodianList[i])
				console.log(
					'\nnotCustodianList[i].name:', notCustodianList[i],
					// '\nnewUser.region:', newUser.region,
				)
				// if (notCustodianList[i].name === newUser.region) {
					console.log('44444444444444444444')
					console.log('found:'.toUpperCase(), notCustodianList[i])
					stateRegions.push(notCustodianList[i].name)
					// setFound(true)
					// break;
				// }
			}
			console.log(
				// '\nnewuser.region:', newUser.region,
				'\nstateRegions:', stateRegions,
			)
			// console.log('newuser.region:', newUser.region)
			setFilteredRegions(stateRegions.flat())
		}
		// for states
		if (newUser.role !== 'Custodian' && notCustodianList && filteredRegions) {
			console.log('regions > states (non custodian) ##############'.toUpperCase())
			console.log(
				'\nnotCustodianList: ', notCustodianList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.region:', newUser.region,
			)
			// if (locationListValue) {
			const stateStates = []
			// console.log('locationListValue:', locationListValue)
			console.log('11111111111111111111')
			for (let i = 0; i < notCustodianList.length; i++) {
				console.log('2222222222222222222:', notCustodianList[i])
				console.log(
					'\nnotCustodianList[i].name:', notCustodianList[i],
					'\nnewUser.region:', newUser.region,
				)
				if (notCustodianList[i].name === newUser.region) {
					console.log('44444444444444444444')
					console.log('found:'.toUpperCase(), notCustodianList[i])
					stateStates.push(notCustodianList[i].states)
					setFound(true)
					break;
				}
			}
			console.log(
				'\nnewuser.region:', newUser.region,
				'\nstateStates:', stateStates,
			)
			// console.log('newuser.region:', newUser.region)
			setFilteredStates(stateStates.flat())
		}
		// locations
		if (newUser.role !== 'Custodian' && notCustodianList && filteredStates) {
			console.log('states > locations (non custodian) ##############'.toUpperCase())
			console.log(
				'\nfilteredStates: ', filteredStates,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.state:', newUser.state,
			)
			// if (locationListValue) {
			const stateLocations = []
			// console.log('locationListValue:', locationListValue)
			console.log('ccccccccccccccccccccc')
			for (let i = 0; i < filteredStates.length; i++) {
				console.log('ddddddddddddddddddd:', filteredStates[i])
				console.log(
					'\nfilteredStates[i].name:', filteredStates[i],
					'\nnewUser.state:', newUser.state,
				)
				if (filteredStates[i].name === newUser.state) {
					console.log('eeeeeeeeeeeeeeeeeeee')
					console.log('found:'.toUpperCase(), filteredStates[i])
					stateLocations.push(filteredStates[i].locations)
					setFound(true)
					break;
				}
			}
			console.log(
				'\nnewuser.state:', newUser.state,
				'\nstateLocations:', stateLocations,
			)
			// console.log('newuser.state:', newUser.state)
			setFilteredLocations(stateLocations.flat())
		}


		// for custodian
		// for regions
		if (newUser.role === 'Custodian' && custodianList) {
			console.log('regions (custodian) ##############'.toUpperCase())
			console.log(
				'\ncustodianList: ', custodianList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				// '\nnewUser.region:', newUser.region,
			)
			// if (locationListValue) {
			const regionStates = []
			// console.log('locationListValue:', locationListValue)
			console.log('555555555555555555555')
			for (let i = 0; i < custodianList.length; i++) {
				console.log('66666666666666666666:', custodianList[i])
				console.log(
					'\ncustodianList[i].name:', custodianList[i],
					// '\nnewUser.region:', newUser.region,
				)
				// if (custodianList[i].name === newUser.region) {
					console.log('7777777777777777777777')
					console.log('found:'.toUpperCase(), custodianList[i])
					regionStates.push(custodianList[i].name)
					// setFound(true)
					// break;
				// }
			}
			console.log(
				// '\nnewuser.region:', newUser.region,
				'\nbankStates:', regionStates.flat(),
			)
			setRegionStateList(regionStates.flat())
		}
		// for states
		if (newUser.role === 'Custodian' && custodianList) {
			console.log('regions > states (custodian) ##############'.toUpperCase())
			console.log(
				'\ncustodianList: ', custodianList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.region:', newUser.region,
			)
			// if (locationListValue) {
			const bankStates = []
			// console.log('locationListValue:', locationListValue)
			console.log('555555555555555555555')
			for (let i = 0; i < custodianList.length; i++) {
				console.log('66666666666666666666:', custodianList[i])
				console.log(
					'\ncustodianList[i].name:', custodianList[i],
					'\nnewUser.region:', newUser.region,
				)
				if (custodianList[i].name === newUser.region) {
					console.log('7777777777777777777777')
					console.log('found:'.toUpperCase(), custodianList[i])
					bankStates.push(custodianList[i].states)
					setFound(true)
					break;
				}
			}
			console.log(
				'\nnewuser.region:', newUser.region,
				'\nbankStates:', bankStates.flat(),
			)
			setBankStateList(bankStates.flat())
		}
		// get banks
		if (newUser.role === 'Custodian' && custodianList && bankStateList) {
			console.log('states > banks (custodian) ##############'.toUpperCase())
			console.log(
				'\nbankStateList: ', bankStateList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.state:', newUser.state,
			)
			// if (locationListValue) {
			const bankBanks = []
			// console.log('locationListValue:', locationListValue)
			console.log('888888888888888888')
			for (let i = 0; i < bankStateList.length; i++) {
				console.log('9999999999999999999999:', bankStateList[i])
				console.log(
					'\nbankStateList[i].name:', bankStateList[i],
					'\nnewUser.state:', newUser.state,
				)
				if (bankStateList[i].name === newUser.state) {
					console.log('101010101010101010101')
					console.log('found:'.toUpperCase(), bankStateList[i])
					bankBanks.push(bankStateList[i].banks)
					setFound(true)
					break;
				}
			}
			console.log(
				'\newuser.state:', newUser.state,
				'\nbankBanks:', bankBanks.flat(),
			)
			setBankBankList(bankBanks.flat())
		}
		// get locations
		if (newUser.role === 'Custodian' && custodianList && bankBankList) {
			console.log('banks > locations (custodian) ##############'.toUpperCase())
			console.log(
				'\nbankBankList: ', bankBankList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.bank:', newUser.bank,
			)
			// if (locationListValue) {
			const bankLocation = []
			// console.log('locationListValue:', locationListValue)
			console.log('121212121212121212121212')
			for (let i = 0; i < bankBankList.length; i++) {
				console.log('131313131313131313131313:', bankBankList[i])
				console.log(
					'\nbankBankList[i].name:', bankStateList[i],
					'\nnewUser.state:', newUser.bank,
				)
				if (bankBankList[i].name === newUser.bank) {
					console.log('141414141414141414141414')
					console.log('found:'.toUpperCase(), bankBankList[i])
					bankLocation.push(bankBankList[i].locations)
					setFound(true)
					break;
				}
			}
			console.log('newuser.bank:', newUser.bank)
			setBankLocationList(bankLocation.flat())
		}
		// get branches
		if (newUser.role === 'Custodian' && custodianList && bankLocationList) {
			console.log('locations > branches (custodian) ##############'.toUpperCase())
			console.log(
				'\nbankLocationList: ', bankLocationList,
				// '\nlocalStorage: ', locations.localDataStoreVar,
				'\nnewUser.location:', newUser.location,
			)
			// if (locationListValue) {
			const bankBranches = []
			// console.log('locationListValue:', locationListValue)
			console.log('151515151515151515151515')
			for (let i = 0; i < bankLocationList.length; i++) {
				console.log('161616161616161616161616:', bankLocationList[i])
				console.log(
					'\nbankLocationList[i].name:', bankStateList[i],
					'\nnewUser.state:', newUser.location,
				)
				if (bankLocationList[i].location === newUser.location) {
					console.log('17171717171717171717171717')
					console.log('found:'.toUpperCase(), bankLocationList[i])
					bankBranches.push(bankLocationList[i].branches)
					setFound(true)
					break;
				}
			}
			console.log('newuser.location:', newUser.location)
			setBankBranchList(bankBranches.flat())
		}
		console.log('end ##############'.toUpperCase())
	// }, [])
	}, [custodianList, notCustodianList, newUser.role, newUser.bank, newUser.state, newUser.location, newUser.region])

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
				...prev, bank: '', location: '', branch: '',
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

	const togglePasswordvisi1 = () => {
		setShowPassword1(!showPassword1);
	}
	const togglePasswordvisi2 = () => {
		setShowPassword2(!showPassword2);
	}

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
		['role', 'username', 'first_name', 'last_name', 'region',
		'dob', 'gender', 'state', 'location', 'email', 'phone',
		'wphone', 'password1', 'password2', 'address' ]
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
		console.log('total errors:', errors);
		return Object.keys(errors).length === 0;
	}
	// const tolower = (text) => text.toLowerCase()
	const HandleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		// const checkValue = value;
		console.log(
			'\nname:', name,
			'\nvalue:', value,
			'\nnewUser.role:', newUser.role,
			'\nnewUser.region:', newUser.region,
		)
		if (['email', 'username', 'newBank', 'newLocation', 'newBranch', 'region']
			.includes(name)) {
				console.log('eeeeeeeeeeeeeeeeeeeeee'.toUpperCase())
			// ||name === 'email'||name === 'email' {
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
				console.log(
					'\nnewUser.role:', newUser.role,
					'\nname-value:', `${name}-${value}`
				)
				setRegionQuery(`${removeHyphen(newUser.role.toLocaleLowerCase())}-${name}-${value}`)
			} else if (name === 'newBank') {
				setNewBankQuery(`${newUser.region}-${newUser.state}-${name}-${value}`)
			} else if (name === 'newLocation') {
				setNewLocationQuery(
					`${newUser.bank === 'Enter a New Bank' ?
						newUser.newBank : newUser.bank}-${newUser.region}-${newUser.state}-${name}-${value}`
				)
			} else if (name === 'newBranch') {
				setNewBranchQuery(`${newUser.location === 'Enter a New Location' ?
						newUser.newLocation : newUser.location}-${newUser.bank === 'Enter a New Bank' ?
						newUser.newBank : newUser.bank}-${newUser.region}-${newUser.state}-${name}-${value}`
				)
				// setNewBranchQuery(`${name}-${value}`)
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
			setNewUser(prevState => ({
				...prevState,
				newLocation: value,
			}));
		} else if (name === 'password1'||name === 'password2') {
			setNewUser(prevState => ({
				...prevState,
				[name]: value,
			}));
			if (name === 'password1') {
				setPassword1(value);
			} else if (name === 'password2') {
				setPassword2(value);
			}
		} else {
			setNewUser(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const fieldsExist = !(isEmailExist || isUsernameExist || isNewBankExist|| isRegionExist || isNewLocationExist || isNewBranchExist)
	// setFieldStatus(fieldsExist)
	const handleFormSubmission = (e) => {
		e.preventDefault();
		console.log('Form submitted:', newUser);
		if (validateForm() && fieldsExist) {
			console.log(
				'newUser.branch:', newUser.branch,
				'newUser.newBranch:', newUser.newBranch,
				'newUser.bank:', newUser.bank,
				'newUser.newBank:', newUser.newBank,
				'newUser.location:', newUser.location,
				'newUser.newLocation:', newUser.newLocation,
			)
			console.log('Form submitted: (before)', newUser);
			if (newUser.newBranch !== null) {
				newUser.branch = newUser.newBranch
			}
			if (newUser.newBank !== null) {
				newUser.bank = newUser.newBank
			}
			if (newUser.newLocation !== null) {
				newUser.location = newUser.newLocation
			}
			console.log('Form submitted (after):', newUser);
			console.log('Form datatype:', typeof(newUser));
			// Submit form data to server
			const newFormData = new FormData(); // to reset the form
			// Populate formData with the updated formValues
			let updatedSamp = null;
			Object.entries(newUser).forEach(([key, value]) => {
				console.log(
					'key:', key,
					'typeof(value):', typeof(value)
				)
				if ((typeof(value) === 'string') && (key !== 'aboutme'&&
				key !== 'email'&&key !== 'password'&&key !== 'password1'&&
				key !== 'password2'&&key !== 'phone'&&key !== 'wphone'&&
				key !== 'profile_picture'&&key !== 'address'&&key !== 'dob')) {
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
		color: '#999',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		padding: '0',
		margin: '0',
		fontSize: '20px',
	}
	// const temp = {
	// 	loading: false,
	// 	postError: false,
	// 	response: false,
	// }
	// console.log('XXXXX branches list: (global sc0pe)', bankBranchList)
	// let statecustodianList;
	// let stateStateList;
	let stateRegionList;
	let stateBanksList;
	let stateLocationsList;
	let stateStatesList;
	let stateBranchesList;
	// let extractedStates;
	// let NigStates;
	// let combinedStates;
	// let filteredStateLocation;
	console.log('Custodian:', newUser.role === 'Custodian')
	if (newUser.role) {
		if (newUser.role === 'Custodian') {
			stateRegionList = regionStateList
			stateBranchesList = bankBranchList
			stateLocationsList = bankLocationList
			stateBanksList = bankBankList
			stateStatesList = bankStateList
			// stateStatesList = bankStateLocationList
			// stateStatesBranchesList = bankStateLocationBranchList
		} else {
			stateRegionList = filteredRegions
			stateStatesList = filteredStates
			stateLocationsList = filteredLocations
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
	console.log('regionStateList (outside):', regionStateList)
	console.log('filteredRegions (Req:region-outside):', filteredRegions)
	console.log('stateRegionList (Req:regions-outside):', stateRegionList)
	console.log('stateBranchesList (Req:branches-outside):', stateBranchesList)
	console.log('stateBanksList (Req:banks-outside):', stateBanksList)
	console.log('stateLocationsList (Req:location-outside):', stateLocationsList)
	console.log('stateStatesList (Req:states-outside):', stateStatesList)
	// console.log('stateStatesBranchesList (Req:branches-outside):', stateStatesBranchesList)

	let all = !(isEmailExist === isUsernameExist === isNewBankExist === isRegionExist === isNewLocationExist === isNewBranchExist)
	console.log(
		'\nnewUser.branch:', newUser.branch,
		'\nnewUser.newBranch:', newUser.newBranch,
		'\nnewUser.bank:', newUser.bank,
		'\nnewUser.newBank:', newUser.newBank,
		'\nnewUser.location:', newUser.location,
		'\nnewUser.newLocation:', newUser.newLocation,
		'\nnewUser.role:', newUser.role,
		'\nnewUser.region:', newUser.region,
	)
	console.log(
		// use these values to further validate
		// form submission accordingly
		// isEmailExist, isUsernameExist, isNewBankExist, isNewLocationExist, isNewBranchExist
		'\nemail field exist:', isEmailExist,
		'\nusername field exist:', isUsernameExist,
		'\nnew bank field exist:', isNewBankExist,
		'\nrole exist:', isRegionExist,
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
	console.log(
		'\ncustodian:', custodian,
		'\nnotCustodian:', notCustodian
	)
	const styleObj = {
		fontWeight: 'bold',
		margin: '0',
		transition: 'opacity 0.05s ease-out',
	}
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
												<option>Select Role</option>
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
										{(newUser.region&&(newUser.role==='Help-Desk'||newUser.role==='Supervisor')) && <QueryFieldFromDB
										query={regionQuery}
										setIsExist={setIsRegionExist} />}
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
													<option>Select Region</option>
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
														<option>Select State</option>
														{/* {stateStatesList &&
														stateStatesList.map((stateName, i) => (
															<option key={i} value={stateName.name}>{toSentenceCase(stateName.name)}</option>
														))} */}
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
												query={newBankQuery}
												setIsExist={setIsNewBankExist} />}
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
													<SelectItem
													style={{...style.input, width: '35%',}}
													name="location"
													id="location"
													ref={refInput}
													value={newUser.location || 'Select Location'}
													onChange={HandleUserCreationInputChange}
													>
													<option>Select Location</option>
													<option value="Enter a New Location">Enter a New Location</option>
														{stateLocationsList &&
														stateLocationsList.map((selectedLocation, i) => {
															// console.log(
															// 	'selectedLocation:', selectedLocation,
															// 	'selectedLocation.location:', selectedLocation.location
															// )
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
													<option>Select Branch</option>
													<option value="Enter a New Branch">Enter a New Branch</option>
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
												required={isRequired}
												// onFocus={handleFocus}
												// onBlur={handleBlur}
												onChange={HandleUserCreationInputChange}
												placeholder=' Required'
												/>
												{newUser.email && <QueryFieldFromDB
												query={emailQuery}
												setIsExist={setIsEmailExist} />}
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
												{/* {console.log(
													'gender error:', newUserError?.gender,
													'\nstate error:', newUserError?.state,
													'\nbank error:', newUserError?.bank,
													'\nbank value:', newUser?.bank,
													'\nshow error:', showError,
												)} */}
												{<DisplayError
												fieldName='gender' />}
											</div>
										</div>
										{/* ............... password and confirmation ................ */}
										<div className="user-fields-row">
											<div className="input-field">
												<Label htmlFor="password1">Password:</Label>
												<div style={{ position: 'relative' }}>
													<input
													type={showPassword1 ? 'text' : 'password'}
													name="password1"
													id="password1"
													style={style.input}
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
													style={style.input}
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
												{<DisplayError fieldName='password2' />}
												{!passwordCheck && <span style={{...errorStylings}}>{newUserError.password2}</span>}
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
												query={usernameQuery}
												setIsExist={setIsUsernameExist} />}
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
										'\nshowNotifi:', showNotifi,
										'\npostLoading:', postLoading,
										'\nrSwitch:', rSwitch,
										'\npostData:', postData,
									): null
								}
								{(showNotifi && !postLoading) && <p style={{...styleObj, color: 'green'}}>{rSwitch}</p>}
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
					{/* <SubmitNotification error={postError} success={postData} /> */}
					</form>
				</div>
			</div>
			<hr/>
		</>
	)
}
export default CreateUser;