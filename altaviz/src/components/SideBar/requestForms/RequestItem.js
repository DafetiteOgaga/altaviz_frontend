import { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { FetchContext } from "../../context/FetchContext";
// import SubmitNotification from "../../../notifications/submitNotification/SubmitNotification";
import { useLocation, useParams } from "react-router-dom";
// import ( SentenceCaseContext)
import { RotContext } from "../../context/RotContext";
import { useRefreshContext } from "../../context/RefreshContext";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import { useFirebase } from "../../context/RealTimeNotificationContext/FirebaseContextNotification";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
// import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";

const TopContainer = styled.div`
	display: flex;
	/* justify-content: space-around; */
	flex-direction: column;
`
const BorderLineContainer = styled.div`
	display: flex;
	gap: 3rem;
	/* border: 1px solid black; */
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	padding-bottom: 0;
	margin-bottom: 0.5rem;
`
const FieldsContainer = styled.div`
	display: flex;
	flex-direction: row;
	// padding-bottom: 1rem;
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
	font-size: 20px;
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
const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// flex-direction: row;
	justify-content: space-evenly;
`
const TextContainer = styled.div`
	display: flex;
	width: 50%;
`
const TextFieldsContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-bottom: 1.5rem;
`
// Function to update faults based on faulxtId and reqType
function updateFaults(packaged) {
	console.log({packaged})
	const updatedArray = packaged.faultsArray.map(fault => {
		console.log('AAAAAAAAA in updateFaults fxn AAAAAAAAAAAAAAA')
		if (fault.id === packaged.fault_id) {
			console.log(`fauli.id:${fault.id} === fault_id: ${packaged.fault_id}`)
			if (fault[packaged.reqType]) {
				console.log(`adding to:${fault[packaged.reqType]}`)
				fault[packaged.reqType] = [...fault[packaged.reqType], ...packaged.newRequestsPlaceholder];
			} else {
				console.log(`creating:${fault[packaged.reqType]}`)
				fault[packaged.reqType] = [...packaged.newRequestsPlaceholder];
				console.log('setting requestStatus to true');
				console.log('fault.requestStatus (before):', fault.requestStatus);
				fault.requestStatus = true;
				console.log('fault.requestStatus (after):', fault.requestStatus);
			}
		}
		console.log('updated fault', fault)
		return fault;
	});
	return updatedArray;
}

function RequestItem({itemName, vKey=null, requestProps=null, setIsCompRequestFormOpen, setIsPartRequestFormOpen}) {
	console.log(
		'\nitemName:', itemName,
        '\nrequestProps:', requestProps,
        '\nvKey:', vKey,
	)
	// const navigateTo = useNavigate()
	const parameters = useParams()
	const fault_id = requestProps?.faultId??parameters.id
	// let validatedData = useRef([])
	const [postResponse, setPostResponse] = useState(false);
	const {encrypt, decrypt, RotCipher} = useContext(RotContext)
	const localKey = `${itemName}sRequestList`
	const [formIndex, setFormIndex] = useState(0);
	const { toSentenceCase } = useContext(SentenceCaseContext);
	const { authData } = useContext(AuthContext);
	const { refreshIcon, handleRefresh } = useRefreshContext();
	const [itemList, setItemList] = useState(null);
	const [incompleteField, setIncompleteField] = useState(false);
	const urlDetails = useLocation().pathname.split('/');
	const dept = urlDetails[1]
	// const urlType = urlDetails.split('/')[2];
	const defaultValues = {
		name: '',
		quantity: '',
		reason: ''
	}
	const [formValues, setFormValues] = useState([defaultValues]);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI, useGetDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		// pass a prop for component or part
		`request-${itemName}/`,
		formData,
		postTrigger,
		// `${fauxltId?`/${parameters.dept}/${parameters.type?parameters.type:faultType}/fault-gen-list/`:fasultId}`
	);
	// get setup
	// compponentList
	const { getData:getItemList, getLoading:getItemLoading, getError:getItemError } = useGetDataAPI(
		`${itemName}s/`,
		true,
	)
	console.log({getItemLoading}, {getItemError})
	useEffect(() => {
		if (getItemList) {
			console.log('getItemList with encryption: ', getItemList)
			// setItemList(getItemList.localDataStoreVar)
			setItemList(getItemList)
		}
	}, [getItemList])
	// local key goes here
	const refreshItem = () => handleRefresh(localKey)
	console.log('itemList:', itemList);

	const valueHandler = (e, index) => {
		const { name, value } = e.target;
        const updatedFormValues = [...formValues];
		updatedFormValues[index] = { ...updatedFormValues[index], [name]: value };
		setFormValues(updatedFormValues);
	}

	const areFieldsValidated = () => {
		console.log('Form submitted:', formValues);
		const newFormData = new FormData(); // to reset the form
		// Populate formData with the updated formValues
		// let forValidatedData = []
        for (const [index, item] of formValues.entries()) {
			console.log('Checking item:', item);
			// console.log('item:', item)
			console.log(
				'has content:',
				(item.name && item.quantity) ?
				`${item.name} ${item.quantity}` :
				'incomplete request field(s)'
			);
			if (!item.name || !item.quantity) {
				console.log('Please select an item');
				setIncompleteField(true);
				return false;
			}
			// pass the props here to switch component and part
			if (item.name === `Select ${toSentenceCase(itemName)}`) {
				console.log(`dont select Select ${itemName}`);
				setIncompleteField(true);
				return false
			}
			if (item.quantity === '0') {
				console.log('dont select 0');
				setIncompleteField(true);
				return false
			}
			// Append validated form data
			// let forValidatedData = {}
			for (const key in item) {
				if (item.hasOwnProperty(key)) {
					console.log(`Appending key: ${key}-${index} with value: ${item[key]}`);
					newFormData.append(`${key}-${index}`, item[key]);
					// forValidatedData[key] = item[key];
				}
			}
        };
		setIncompleteField(false);
		console.log('fault_id', fault_id)
		newFormData.append('fault', fault_id?fault_id:null);
		newFormData.append('user', authData.email);
		setFormData(newFormData);
		for (const [key, value] of newFormData.entries()) {
			console.log(`checking form content: >>> ${key}: ${value}`);
		}
		return true;
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('in submit handler');
		console.log('incompleteField:', incompleteField)
		console.log('areFieldsValidated:', areFieldsValidated())
		if (areFieldsValidated()) {
			console.log('formvalues:', formValues)
			setPostTrigger(true);
		} else {
			console.log('Incomplete field(s) detected, not submitting form');
            return;
		}
	}
	useEffect(() => {
		if (postData || postError) {
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			// Reset formValue to default state
			setFormValues([defaultValues]);
			if (postData) {
				setPostResponse(true)
			// 	console.log('about to refresh ...'.toUpperCase())
			// 	console.log('refreshing ...'.toUpperCase())
			// };
			// // let newRequestsPlaceholder = []
			// if (postData
			// 	// && recievedNewRequest.current
			// ) {
				console.log('Post request successful', postData);
				console.log(`processing for ${itemName} ...`)
				console.log(
					'\n6666666666666666666666666666666666666666',
					'\n6666666666666666666666666666666666666666',
					'\n6666666666666666666666666666666666666666',
					'\n6666666666666666666666666666666666666666',
					'\n6666666666666666666666666666666666666666'
				)
				const newRequestsPlaceholder = postData.responseObjs
				console.log(
					// '\nvalidatedData.current:', validatedData.current,
					'\nnewRequestsPlaceholder:', newRequestsPlaceholder,
					'\nurlDetails[4]-userID:', urlDetails[4],
					'\ndept:', dept,
					'\nparameters:', parameters,
					'\npostData.responseObjs:', postData.responseObjs,
				)
				// let localKeylist;
				let reqType;
				let encodedData;
				if (itemName === 'component') {
					console.log(`for ${itemName}...`)
					// localKeylist = ['componentPendingList']
					reqType = 'requestComponent'
					if (requestProps) {requestProps.setAddComponentObj(newRequestsPlaceholder);}
				} else if (itemName === 'part') {
					console.log(`for ${itemName}...`)
					// localKeylist = ['partPendingList']
					reqType = 'requestPart'
					if (requestProps) {requestProps.setAddPartObj(newRequestsPlaceholder)}
				}
				const localPK = 'faultsKey'
				let decodedFaultData = localStorage.getItem(localPK)
				if (decodedFaultData) {
					decodedFaultData = RotCipher(decodedFaultData, decrypt)
					decodedFaultData = JSON.parse(decodedFaultData)
					console.log(
						'\ndata from localStorage:', !!decodedFaultData,
						'\nfault_id:', fault_id,
						// '\nlocalKeylist:', localKeylist,
						'\nreqType:', reqType,
						'\ndecodedFaultData:', decodedFaultData,
						'\nurlDetails[4]-userID:', urlDetails[4],
					)
					let updatedFaults;
					const packaged = {
						faultsArray: decodedFaultData,
						fault_id: fault_id,
						reqType: reqType,
						newRequestsPlaceholder: newRequestsPlaceholder,
					}
					console.log(
						'\nparameters:', parameters,
						'\nparameters.dept:', parameters.dept,
						'\npackaged.faultsArray:', packaged.faultsArray,
					)
					if (parameters.dept === 'supervisor') {
						let supervisorFaults = decodedFaultData
							?.filter?.(supervisorFault => supervisorFault.id === authData.id)[0]?.faults;
						console.log(
							'\nsupervisorFaults after filtering:', supervisorFaults,
							// '\nspread after filtering:', {...packaged, ...{faultsArray: supervisorFaults}}
						);
						updatedFaults = updateFaults({...packaged, faultsArray: supervisorFaults});
						// newlyFaults = updatedFaults
						console.log('\nupdatedFaults:', updatedFaults,)
						updatedFaults = decodedFaultData.map(user => {
							console.log(
								'user:', user.id, ':',
								'user faults:', user.faults.map(fault => fault.id), ':',
								// 'user faults:', user.faults.map(fault => fault.id), ':',
								'updatedFaults:', updatedFaults,
							)
							return (user.id === Number(urlDetails[4])
								? { ...user, faults: updatedFaults }
								: user)
						});
					} else {
						console.log('\npackaged no filtering:', packaged,)
						updatedFaults = updateFaults(packaged);
					}

					console.log(
						'\nprevious faults:', decodedFaultData,
						'\nupdated faults:', updatedFaults,
						// '\nnewlyFaults:', newlyFaults,

					);
					encodedData = RotCipher(JSON.stringify(updatedFaults), encrypt)
					localStorage.setItem(localPK, encodedData);
					let allUnresolvedKey = localStorage.getItem('allUnresolvedKey')
					if (allUnresolvedKey) {
						allUnresolvedKey = RotCipher(allUnresolvedKey, decrypt)
						allUnresolvedKey = JSON.parse(allUnresolvedKey)
						console.log({allUnresolvedKey})
						allUnresolvedKey = updateFaults({...packaged, faultsArray: allUnresolvedKey});
						console.log(allUnresolvedKey.length)
						// allUnresolvedKey = [...allUnresolvedKey, ...newlyFaults]
						console.log({allUnresolvedKey})
						console.log(allUnresolvedKey.length)
						allUnresolvedKey = RotCipher(JSON.stringify(allUnresolvedKey), encrypt)
						localStorage.setItem('allUnresolvedKey', allUnresolvedKey);
						console.log('updated allUnresolvedKey in localStorage')
					}
					if (encodedData) {console.log('updated', localPK, 'in localStorage')}
				}
				itemName==='component'?setIsCompRequestFormOpen(prev=>!prev):setIsPartRequestFormOpen(prev=>!prev)
			}
		}
	}, [postTrigger, postData, postLoading, postError])
	useEffect(() => {
        if (postResponse) {
			const delay = setTimeout(() => {
				setPostResponse(false);
			},2500)
			return () => clearTimeout(delay);
        }
    }, [postResponse]); //, noselection]);
	useEffect(() => {
		if (incompleteField) {
			const timer = setInterval(() => {
				setIncompleteField((prev) => {
					console.log('setting incompleteField from', prev, 'to', null);
					return null;
				});
			}, 2000);
			return () => clearTimeout(timer)
		}
	}, [incompleteField])
	const addFieldSet = () => {
		setFormValues([...formValues, defaultValues]);
	};
	// dynamically remove forms
	const removeFieldSet = (index) => {
		const updatedFormValues = formValues.filter((_, i) => i !== index);
		setFormValues(updatedFormValues);
		console.log('at index: ' + index);
	}
	const incrementAddMoreButtonCount = () => setFormIndex(prev => prev + 1)
	const decrementAddMoreButtonCount = () => setFormIndex(prev => prev - 1)
	// note: make sure to prevent submission on the frontend if requested component is not filled
	console.log(
		'\n',{urlDetails},
		'\n',{parameters},
		'\n',{itemName},
		'\nrequestProps.itemKeys:', requestProps?.itemKeys,
		// '\nlastID:', requestProps.lastID
		'\nrequestProps.faultDetails:', requestProps?.faultDetails
	)
	const style = {
		input: {
			padding: "4px",
			fontSize: "16px",
			border: "1px solid #ccc",
			borderRadius: "5px",
		}
	}
	const { data:firebaseNotification } = useFirebase()
	console.log({firebaseNotification})
	return (
		<>
			<form>
			{formValues.map((labelTitle, index) => (
				<TopContainer key={index}>
					<BorderLineContainer>
						<FieldsContainer>
							{/* switch between component and part props here */}
							<Label htmlFor={`${labelTitle.name}-${index}`}>Request {`${toSentenceCase(itemName)}`}:</Label>
							<SelectItem
								id={`${labelTitle.name}-${index}`}
								name='name'
								style={style.input}
								value={labelTitle.name}
								onChange={(e) => valueHandler(e, index)}
							>
								{/* switch between component and part props here */}
								<option key={`Select ${toSentenceCase(itemName)}`}
								style={styles.selectOpts}>Select {`${toSentenceCase(itemName)}`}</option>
								{itemList ? (itemList.filter(itemObject => itemObject.quantity !== 0).map((item, i) => (
									<option key={i} value={item.name}>{toSentenceCase(item.name)}</option>
								))) : ('loading ...')}
							</SelectItem>
						</FieldsContainer>
						<FieldsContainer>
							<Label htmlFor={`${labelTitle.quantity}${index}`}>Quantity:</Label>
							<SelectItem
								id={`${labelTitle.quantity}${index}`}
								name='quantity'
								value={labelTitle.quantity}
								style={style.input}
								onChange={(e) => valueHandler(e, index)}
							>
								<option style={styles.selectOpts}>0</option>
								{Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
								<option key={number} value={number}>{number}</option>
								))}
							</SelectItem>
						</FieldsContainer>
						{(index > 0) &&
						<div>
							<button
								type="button"
								onClick={(e) => {
									removeFieldSet(index);
									decrementAddMoreButtonCount();
								}}
							>
								Remove
							</button>
						</div>}
					</BorderLineContainer>
					{/* <div className="input-field textarea-box"> */}
					<TextFieldsContainer style={{paddingLeft: '1rem'}}>
						<TextContainer>
							<label htmlFor={`${labelTitle.reason}-${index}`}>Reason:</label>
							<textarea
							type="text"
							name='reason'
							id={`${labelTitle.reason}-${index}`}
							placeholder={`Pls, specify ... (Expandable field)`}
							rows={1}
							onChange={(e) => valueHandler(e, index)}
							value={labelTitle.reason}
							/>
						</TextContainer>
					</TextFieldsContainer>
					{/* </div> */}
				</TopContainer>
			))}
			{(postData && postResponse) &&
			<p
			style={{
				margin: '0',
				paddingLeft: '1rem',
				fontSize: '1rem',
				color: 'green',
				fontWeight: 'bold',
			}}
			>
				{postData.msg}
			</p>}
			<MainButtonContainer>
				<div
				style={{
					display: 'flex',
					gap: '0.5rem'
				}}>
					<MainButton
					onClick={handleSubmit}
					type="submit"
					role="button"
					tabIndex="0"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							// e.preventDefault();  // Prevents default form submission behavior
							handleSubmit(e);  // Calls your form submission function
						}
					}}
					disabled={postLoading}>
						{/* switch between component and part props here */}
						{postLoading ? 'Requesting...' : `Request ${toSentenceCase(itemName)}`}
					</MainButton>
					<div onClick={refreshItem}>
						{refreshIcon}
					</div>
				</div>
				{(formIndex < 4) &&
					<MainButton
					type="button"
					onClick={(e) => {
						addFieldSet();
						incrementAddMoreButtonCount();
					}}>
						Add More
					</MainButton>}
				{/* <MainButton type="button" onClick={addFieldSet}>Add More</MainButton> */}
			</MainButtonContainer>
			{console.log(postData ? `XXXXXOOOXXXXX success: ${postData.msg}` : `XXXXXOOOXXXXX error: ${postData}`)}
			{/* {console.log('recievedNewRequest.current (request item):', recievedNewRequest.current)} */}
			</form>
			{incompleteField &&
				<>
					<hr style={{width: '80%'}}/>
					<p
					style={{
						margin: '0',
						fontSize: '0.9rem',
						color: 'red',
						fontWeight: 'light',
						fontStyle: 'italic',
						textAlign: 'center',
					}}
					>You must fill all fields to make request(s).</p>
				</>
				}
			<hr/>
		</>
	);
};
export default RequestItem;

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