import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import { useState,  } from "react";
import { FetchContext } from "../../context/FetchContext";
import SubmitNotification from "../notifications/submitNotification/SubmitNotification";
import { useLocation } from "react-router-dom";

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
// const QuantityInput = styled.input`
// 	display: flex;
// 	flex-direction: row;
// `
// const ButtonContainer = styled.div`
// 	// display: flex;
// 	// justify-content: center;
// 	cursor: pointer;
// 	// gap: 10rem;
// `
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
// const CustomButton = styled.button`
// 	text-wrap: nowrap;
// 	background-color: #8A8A93;
// 	/* background-color: #252588f8; */
// 	color: white;
// 	padding: 0.4rem 1rem;
// 	/* margin: 0 34rem; */
// 	/* margin-top: 1rem; */
// 	border: none;
// 	border-radius: 4px;
// 	cursor: pointer;
// `
const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// flex-direction: row;
	justify-content: space-evenly;
`
function AddComponent() {
	const page = useLocation().pathname.split('/')[1];
	// const [postTrigger, setPostTrigger] = useState(false);
	// const [formData, setFormData] = useState(new FormData());
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
		'http://127.0.0.1:8000/components/',
		formData,
		postTrigger,
	);
	// { getData, getLoading, getError }
	const { getData, getLoading } = useGetDataAPI(
		'http://127.0.0.1:8000/component-name/'
	);

	
	// const { usePostDataAPI, useGetDataAPI } = useContext(FetchContext);
	
	// const [inventoryList, setInventoryList] = usegetData);
	// const [newList, setNewList] = useState(inventoryList);
	// const { data:response, loading, error:postError } = usePostDataAPI('http://127.0.0.1:8000/component-list/', formData, postTrigger);
	// const { faults } = cMockData();
	// const [dynamicfields, setDynamicfields] = useState([{ fault: '', atmNumber: '' }]);
	const valueHandler = (e, index) => {
		const { name, value } = e.target;
        const updatedFormValues = [...formValues];
		updatedFormValues[index] = { ...updatedFormValues[index], [name]: value };
		setFormValues(updatedFormValues);
		// console.log('name: ' + name);
		// console.log('value: ' + value);
		// console.log('index: ' + index);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('in submit handler');
		const newFormData = new FormData(); // to reset the form
		// Populate formData with the updated formValues
        formValues.forEach((item, index) => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    newFormData.append(`${key}[${index}]`, item[key]);
                }
            }
        });
		setFormData(newFormData);
		setPostTrigger(true);
		// const { data:response, loading, error:postError } = usePostDataAPI('http://127.0.0.1:8000/component-list/', formData, postTrigger);
		
		// this is redundant, i think. check it out #################################################################
		// for (const key in formData) {
		// 	formData.append(key, formValues[key]);
			// console.log('formdata:', JSON.stringify(formData));
			// console.log('value:', formData[key]);
		}
		console.log('Form submitted:', formValues);
		// } else {
		// console.log('Form submitted is not valid');
		// console.log('error:', errors);
	// const { data: response, loading, error: postError } = usePostDataAPI(
    //     'http://127.0.0.1:8000/components/',
    //     formData,
    //     postTrigger
    // );
	// const useRefetch = () => {
	// 	setTimeout(() => {
	// getData = useGetDataAPI('http://127.0.0.1:8000/inventory/');
	// 	}, 2500);
	// }
    useEffect(() => {
        if (postTrigger) {
			// Reset postTrigger after posting
            setPostTrigger(false);
			setFormValues([defaultValues]);
			
        }
    }, [postTrigger]);
	const addFieldSet = () => {
		setFormValues([...formValues, defaultValues]);
		// setFormIndex(formIndex + 1);
		// console.log('formIndex: ' + formIndex);
	};
	// dynamically remove forms
	const removeFieldSet = (index) => {
		const updatedFormValues = formValues.filter((_, i) => i !== index);
		setFormValues(updatedFormValues);
		console.log('at index: ' + index);
	};
	// console.log("start here");
	// console.log('formvalues:', formValues);
	// console.log('type of data:', typeof(inventoryData));
	// console.log('inventoryData:', JSON.stringify(inventoryData));
	// console.log('inventoryData type:', typeof(JSON.stringify(inventoryData)));
	// console.log('len inventoryData:', (JSON.stringify(inventoryData).length));
	// console.log('inventoryData:', inventoryData);
	// console.log('inventoryData obj.entr', inventoryData)
	// inventoryData.forEach((item) => {
	// 	console.log('item:', item);
	// })
	// let newList = [];
	// useEffect(() => {
	// 	// newList = [];
    //     if (inventoryData) {
	// 		console.log('inventoryList before:', inventoryList);
	// 		// for (let i = 0; i < inventoryData.length; i++) {
	// 		// 	inventoryList.append(i);
	// 		// }
	// 		console.log('len inventoryList:', inventoryList.length);
	// 		console.log('inventoryList after:', inventoryList);
	// 	}
	// },[inventoryData])
	
	// const styleObj = {
	// 	paddingLeft: '1rem',
	// 	fontWeight: 'bold',
	// 	margin: '0',
	// }
	return (
		<>
			<form>
			{formValues.map((form, index) => (
				<TopContainer key={index}>
					<BorderLineContainer>
						<FieldsContainer>
						<Label htmlFor={`${form.name}-${index}`}>Post Component:</Label>
						<SelectItem
							id={`${form.name}-${index}`}
							name='name'
							value={form.name}
							onChange={(e) => valueHandler(e, index)}
						>
							<option>Select Component</option>
							{getData ? (getData.map((fault, i) => (
							// <>
								
								<option key={i} value={fault.name}>{fault.name}</option>
							// </>
							))) : ('Loading...')}
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
						<div>
							<button
								type="button"
								onClick={() => removeFieldSet(index)}
							>
								Remove
							</button>
						</div>
					</BorderLineContainer>
					{/* <FieldsContainer>
						<Label style={{ paddingLeft: '1rem' }} htmlFor={`others-${index}`}>Others:</Label>
						<textarea
						type="text"
						name="others"
						id={`others-${index}`}
						placeholder="Pls, specify ..."
						rows={3}
						value={form.others}
						onChange={(e) => valueHandler(e, index)}
						/>
					</FieldsContainer> */}
				</TopContainer>
			))}
			<MainButtonContainer>
				<MainButton
				onClick={handleSubmit}
				type="submit"
				disabled={postLoading}>
					{postLoading ? 'Posting...' : 'Post Parts'}
				</MainButton>
				<MainButton type="button" onClick={addFieldSet}>Add More</MainButton>
			</MainButtonContainer>
			<SubmitNotification
			error={postError}
			success={postData}
			page={page} />
			{/* {postError && <p style={{
					...styleObj, color: 'red',
				}}>Error: {postError}</p>}
				{response && <p style={{
					...styleObj, color: 'green',
				}}>Success!</p>} */}
			</form>
			<hr/>
		</>
	);
};

export default AddComponent;