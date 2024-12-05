import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import { FetchContext } from "../../../context/FetchContext";
// import SubmitNotification from "../../../bbbbbnotifications/submitNotification/SubmitNotification";
import { useNavigate, useLocation } from "react-router-dom";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
// import { useRefreshContext } from "../../../context/RefreshContext";

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
	padding: 1rem;
	padding-bottom: 0;
	margin-bottom: 0.5rem;
`
const FieldsContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding-bottom: 1rem;
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
const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// flex-direction: row;
	justify-content: space-evenly;
`
function AddItemToInventory({itemName}) {
	const location = useLocation().pathname.split('/');
	const dept = location[1]
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const navigate = useNavigate()
	const { authData } =  useContext(AuthContext)
	const [noselection, setNoselecton] = useState(false);
	const [postResponse, setPostResponse] = useState(false);
	// const { refreshIcon, handleRefresh } = useRefreshContext();
	const [itemList, setItemList] = useState(null);
	const [getTrigger, setGetTrigger] = useState(true);
	const [formIndex, setFormIndex] = useState(0);
	// const page = useLocation().pathname.split('/')[1];
	const defaultValues = {
		name: '',
		quantity: '',
		// others: ''
	}
	const [formValues, setFormValues] = useState([defaultValues]);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI, useGetDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		`http://127.0.0.1:8000/${itemName}/${itemName==='post-part'?authData.id+'/':''}`,
		formData,
		postTrigger,
	);
	// get setup
	// compponentList
	const { getData:getItemList, getLoading, getError } = useGetDataAPI(
		`http://127.0.0.1:8000/${itemName==='post-part'?'parts':itemName}/`,
		true,
	)
	console.log({getLoading}, {getError})
	// const refreshCompCopm = () => handleRefresh('getItemList')
	useEffect(() => {
		if (getItemList) {
			console.log('getItemList with encryption: ', getItemList)
			// setItemList(getItemList.localDataStoreVar)
			setItemList(getItemList)
		}
	}, [getItemList])
	console.log('itemList:', itemList);

	const valueHandler = (e, index) => {
		const { name, value } = e.target;
        const updatedFormValues = [...formValues];
		updatedFormValues[index] = { ...updatedFormValues[index], [name]: value };
		setFormValues(updatedFormValues);
	}

	const checkField = () => {
		// let noFault = false;
		let keyList = []
		const formList = Object.entries(formValues)
		console.log('initList', formList)
		// filter and clean the form data
		for (let i = 0; i < formList.length; i++) {
			console.log('filter:', formList[i][1])
			console.log('name:', formList[i][1].name)
			console.log('quantity:', formList[i][1].quantity)
			console.log('length:', formList.length)
			console.log('filter.key1:', formList[i][0])
			if (formList[i][1].name === `Select ${itemList === 'components' ? 'Component': 'Part'}`) return false;
			if (formList[i][1].name === '') return false;;
			if (formList[i][1].quantity === '0') return false;;
			if (formList[i][1].quantity === '') return false;;
			// if (formList[i][1] === 'Select Fault') continue;
			// if (Number(formList[i]) === '0') continue;
			// console.log('qqqqqqqqq'.toUpperCase())
			keyList.push(formList[i])
			// console.log('ppppppppp'.toUpperCase())
		};
		// check if the form still has values after cleaning it
		console.log('keyList:', keyList);
		if (keyList.length === 0) {
			console.log('length of keyList:', keyList.length)
			return false;
		}
		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('in submit handler');
		console.log('Form submitted:', formValues);
		const fieldOkay = checkField()
		if (fieldOkay) {
			const newFormData = new FormData(); // to reset the form
			// Populate formData with the updated formValues
			formValues.forEach((item, index) => {
				for (const key in item) {
					if (item.hasOwnProperty(key)) {
						// newFormData.append(`${key}[${index}]`, item[key]);
						newFormData.append(`${key}-${index}`, item[key]);
					}
				}
			});
			newFormData.append('user', authData.email);
			setFormData(newFormData);
			setPostTrigger(true);
			setGetTrigger(false);
		} else {
			// setFormValues([defaultValues]);
			setNoselecton(true)
		}
	}
	useEffect(() => {
		if (postData || postError) {
			if (postData?.success) {
				console.log(
					'postData response:'.toUpperCase(),
					postData.success
				)
				setPostResponse(true)
			} else if (postData.received) {
				console.log(
					'postData response:'.toUpperCase(),
					postData.received
				)
				localStorage.removeItem('unapprovedContext')
				localStorage.removeItem('totalUnapproved')
				navigate('/success', {state: {currentPage:`/${authData.role}`}})
			}
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			setGetTrigger(() => {
				console.log('setting getTrigger from ', getTrigger, ' to ', !getTrigger)
				return true
			});
			// Reset formValue to default state
			setFormValues([defaultValues]);
		}
	}, [postTrigger, postData, postLoading, postError])
    useEffect(() => {
        if (postResponse) {
			const delay = setTimeout(() => {setPostResponse(false)}, 3000) // 5 secs
			return () => clearTimeout(delay);
        }
		if (noselection) {const timer = setInterval(() => {setNoselecton(false);}, 3000); // 3 secs
			return () => clearTimeout(timer)
		}
    }, [postResponse, noselection]);

	// useEffect(() => {
    //     refInput.current.focus();
    // }, [])

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
	console.log('111111111111')
	if (postData?.success) {
		console.log(
			'postData response:'.toUpperCase(),
			postData.success,
			'postResponse:', postResponse,
		)
	}
	console.log({itemName})
	console.log(
		'\nlocation:', location,
		'\ndept:', dept,
	)
	return (
		<>
			<form onSubmit={handleSubmit}>
			{formValues.map((form, index) => (
				<TopContainer key={index}>
					<BorderLineContainer>
						<FieldsContainer>
							<Label htmlFor={`${form.name}-${index}`}>{`Update ${toSentenceCase(dept==='workshop'?'Parts':itemName)} Inventory`}:</Label>
							<SelectItem
								id={`${form.name}-${index}`}
								name='name'
								value={form.name}
								onChange={(e) => valueHandler(e, index)}
							>
								<option key={`Select ${itemName === 'components' ? 'Component': 'Part'}`}>{`Select ${itemName === 'components' ? 'Component': 'Part'}`}</option>
								{itemList ? (itemList.map((itemName, i) => {
									// console.log('itemName', itemName)
									// if (itemName.quantity === 0) return null;
									return (
									<option key={i} value={itemName.name}>{`${toSentenceCase(itemName.name)} ${itemName.quantity === 0 ? ' (Empty)': ''}`}</option>
								)})) : ('loading ...')}
							</SelectItem>
						</FieldsContainer>
						<FieldsContainer>
							<Label htmlFor={`${form.quantity}${index}`}>Quantity:</Label>
							<SelectItem
								id={`${form.quantity}${index}`}
								name='quantity'
								value={form.quantity}
								onChange={(e) => valueHandler(e, index)}
							>
								<option>0</option>
								{Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
								<option key={number} value={number}>{number}</option>
								))}
							</SelectItem>
						</FieldsContainer>
						{(index > 0) &&
						<div>
							<button
								type="button"
								onClick={() => {
									removeFieldSet(index);
									decrementAddMoreButtonCount();
								}}
							>
								Remove
							</button>
						</div>}
					</BorderLineContainer>
				</TopContainer>
			))}
			{((postData?.success && postResponse)||(noselection)) &&
			<p
			style={{
				margin: '0',
				paddingLeft: '1rem',
				fontSize: '1rem',
				color: (noselection ? 'red': 'green'),
				fontWeight: 'light',
				fontStyle: 'bold',
			}}
			>
				{/* {postData && postData.success} */}
				{noselection ? 'You must fill all field.': <span style={{fontWeight: "bold"}}>{postData.success}</span>}
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
					disabled={postLoading}>
						{postLoading ? 'Posting...' : `Post ${itemName === 'components' ? 'Component': 'Part'}`}
					</MainButton>
					{/* <div onClick={refreshCompCopm}>
						{refreshIcon}
					</div> */}
				</div>
				{(formIndex < 4) &&
					<MainButton
					type="button"
					onClick={() => {
						addFieldSet();
						incrementAddMoreButtonCount();
					}}>
						Add More
					</MainButton>}
			</MainButtonContainer>
			{/* {(postData?.success && postResponse) &&
			<p
			style={{
				margin: '0',
				paddingLeft: '1rem',
				fontSize: '1rem',
				color: 'green',
				fontWeight: 'light',
				fontStyle: 'bold',
			}}
			>{postData.success}</p>} */}
			{/* <SubmitNotification
			error={postError}
			success={postData}
			page={page} /> */}
			</form>
			<hr/>
		</>
	);
};

export default AddItemToInventory;