// import cMockData from "../custodian/custodianMockData";
import { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
// import { useState,  } from "react";
import { FetchContext } from "../../../context/FetchContext";
import { useNavigate, useLocation } from 'react-router-dom';

const TopContainer = styled.div`
	display: flex;
	/* justify-content: space-around; */
	flex-direction: column;
`
const BorderLineContainer = styled.div`
	display: flex;
	gap:1rem;
	/* border: 1px solid black; */
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	// padding-bottom: 1rem;
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
const MainButton = styled.h6`
	text-decoration: none;
	white-space: pre;
	color: #555;
	padding: 0 0.7rem;
	border: 0.01px solid;
	border-radius: 5px;
	font-family: sans-serif;
	font-size: 21px;
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
function CreateInventoryName({inventoryName, setUpdateInventory, delayTime}) {
	const currentPage = useLocation().pathname.split('/')[1];
	const navigate = useNavigate()
	const refInput = useRef(null);
	const [exist, setExist] = useState(false);
	// const { handleRefresh } = useRefreshContext();
	const { authData } = useContext(AuthContext);
	const [formIndex, setFormIndex] = useState(0);
	// const page = useLocation().pathname.split('/')[1]
    const [formValue, setFormValue] = useState([{ item: '' }]);
	const [noselection, setNoselecton] = useState(false);
    const [postTrigger, setPostTrigger] = useState(false);
    const [formData, setFormData] = useState(new FormData());
    const { usePostDataAPI } = useContext(FetchContext);

    const { postData, postLoading, postError } = usePostDataAPI(
        `${inventoryName}-name/`,
        formData,
        postTrigger,
    );

    const valueHandler = (e, index) => {
		// if (formValue.item === '') return false
        const { name, value } = e.target;
		console.log(
			'name:', name,
			'\nvalue:', value,
		)
        const updatedFormValue = [...formValue];
        updatedFormValue[index] = { ...updatedFormValue[index], [name]: value };
        setFormValue(updatedFormValue);
    }

	const checkField = () => {
		// let noFault = false;
		let keyList = []
		const formList = Object.entries(formValue)
		console.log('initList', formList)
		// filter and clean the form data
		for (let i = 0; i < formList.length; i++) {
			console.log('filter:', formList[i][1])
			console.log('value:', formList[i][1].item)
			console.log('length:', formList.length)
			console.log('filter.key1:', formList[i][0])
			if (formList[i][1].item === '') continue;
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
		const fieldOkay = checkField()
		if (fieldOkay) {
			const newFormData = new FormData();
        
			formValue.forEach((item, index) => {
				for (const key in item) {
					if (item.hasOwnProperty(key)) {
						const value = item[key].toLowerCase(); // Make sure value is a string
						newFormData.append(`${key}[${index}]`, value);
					}
				}
			});
			newFormData.append('user', authData.email);
			setFormData(newFormData);
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return true
			});
		} else {
			// setFormValue([{ item: '' }]);
			setNoselecton(true)
		}
    }

	useEffect(() => {
		if (postData || postError) {
			if (postData?.exist) {
				console.log(
					'postData response:'.toUpperCase(),
					postData.exist
				)
				setExist(true)
			}
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			// Reset formValue to default state
			setFormValue([{ item: '' }]);
		}
	}, [postTrigger, postData, postLoading, postError])

	useEffect(() => {
        if (exist) {
			const delay = setTimeout(() => {setExist(false)}, delayTime) // 2 secs
			return () => clearTimeout(delay);
        }
		if (noselection) {const timer = setInterval(() => {setNoselecton(false);}, delayTime); // 3 secs
			return () => clearTimeout(timer)
		}
    }, [exist, noselection]);

	useEffect(() => {
        refInput.current.focus();
    }, [])

    const addFieldSet = () => {
        setFormValue([...formValue, { item: '' }]);
    };

    const removeFieldSet = (index) => {
        const updatedFormValue = formValue.filter((_, i) => i !== index);
        setFormValue(updatedFormValue);
    };

	if (postData && !postData.exist) {
		setUpdateInventory(true)
		let localKey;
		if (inventoryName === 'part') localKey = 'inventoryParts';
		if (inventoryName === 'component') localKey = 'inventoryComponents';
		// handleRefresh([localKey])
		localStorage.removeItem(localKey)
		navigate('/blank', {state: {currentPage: `/${currentPage}`, time: 350}})
	}
	console.log('formvalue:', formValue)
	const incrementAddMoreButtonCount = () => setFormIndex(prev => prev + 1)
	const decrementAddMoreButtonCount = () => setFormIndex(prev => prev - 1)
	return (
		<>
			<form onSubmit={handleSubmit}>
			{((postData?.exist && exist)||(noselection)) &&
			<p
			style={style.yerrorStyle}
			>
				{postData && postData.exist}
				{noselection && 'You must fill all field.'}
			</p>}
			{formValue.map((form, index) => {
				return (
				<TopContainer key={index}>
					<BorderLineContainer>
						<FieldsContainer>
							<Label
							style={{textWrap: 'nowrap'}}
							htmlFor={`item-${index}`}>{inventoryName === 'part' ? 'Part' : 'Component'} Name:</Label>
							<input
								id={`item-${index}`}
								name="item"
								style={style.input}
								ref={refInput}
								value={formValue.item}
								placeholder={` Enter ${inventoryName} name`}
								onChange={(e) => valueHandler(e, index)}
							>
							</input>
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
					{console.log(
						'\nindex:', index,
						'\ncurrentPage:', currentPage,
					)}
					{/* {index > 4 ? setFormIndex(false): null} */}
				</TopContainer>
			)})}
			<MainButtonContainer>
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
					{postLoading ? 'Creating...' : 'Create Item'}
				</MainButton>
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
			</form>
			<hr/>
		</>
	);
};
export default CreateInventoryName;

const style = {
	input: {
		padding: "4px",
		fontSize: "16px",
		border: "1px solid #ccc",
		borderRadius: "5px",
	},
	errorStyle: {
		margin: '0',
		paddingLeft: '1rem',
		fontSize: '1rem',
		color: 'red',
		fontWeight: 'light',
		fontStyle: 'italic',
	}
}
