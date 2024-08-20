import cMockData from "../custodian/custodianMockData";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import { useState,  } from "react";
import { FetchContext } from "../../context/FetchContext";

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
function AddComponent({childList}) {
	const [triggerPost, setTriggerPost] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const defaultValues = {
		fault: '',
		atmNumber: '',
		others: ''
	}
	const [formValues, setFormValues] = useState([defaultValues]);
	const { usePostDataAPI } = useContext(FetchContext)
	// const { data:response, loading, error:postError } = usePostDataAPI('http://127.0.0.1:8000/component-list/', formData, triggerPost);
	const { faults } = cMockData();
	// const [dynamicfields, setDynamicfields] = useState([{ fault: '', atmNumber: '' }]);
	const valueHandler = (e, index) => {
		const { name, value } = e.target;
        const updatedFormValues = [...formValues];
		updatedFormValues[index] = { ...updatedFormValues[index], [name]: value };
		setFormValues(updatedFormValues);
		console.log('name: ' + name);
		console.log('value: ' + value);
		console.log('index: ' + index);
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
		setTriggerPost(true);
		// const { data:response, loading, error:postError } = usePostDataAPI('http://127.0.0.1:8000/component-list/', formData, triggerPost);
		
		for (const key in formData) {
			formData.append(key, formValues[key]);
			// console.log('formdata:', JSON.stringify(formData));
			// console.log('value:', formData[key]);
		}
		console.log('Form submitted:', formValues);
		// } else {
		// console.log('Form submitted is not valid');
		// console.log('error:', errors);
	}
	const { data: response, loading, error: postError } = usePostDataAPI(
        'http://127.0.0.1:8000/component-list/',
        formData,
        triggerPost
    );
    useEffect(() => {
        if (triggerPost) {
			// Reset triggerPost after posting
            setTriggerPost(false);
			setFormValues([defaultValues]);
        }
    }, [triggerPost]);
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
	console.log('formvalues:', formValues);
	return (
		<form>
		{formValues.map((form, index) => (
			<TopContainer key={index}>
				<BorderLineContainer>
					<FieldsContainer>
					<Label htmlFor={`fault-${index}`}>Post Component:</Label>
					<SelectItem
						id={`fault-${index}`}
						name="fault"
						value={form.fault}
						onChange={(e) => valueHandler(e, index)}
					>
						{faults.map((fault, i) => (
						<option key={i} value={fault}>{fault}</option>
						))}
					</SelectItem>
					</FieldsContainer>
					<FieldsContainer>
					<Label htmlFor={`qty-${index}`}>Quantity:</Label>
					<SelectItem
						id={`qty-${index}`}
						name="atmNumber"
						value={form.atmNumber}
						onChange={(e) => valueHandler(e, index)}
					>
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
				<FieldsContainer>
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
				</FieldsContainer>
			</TopContainer>
		))}
		<MainButtonContainer>
			<MainButton
			onClick={handleSubmit}
			type="submit"
			disabled={loading}>
                {loading ? 'Posting...' : 'Post Parts'}
			</MainButton>
			<MainButton type="button" onClick={addFieldSet}>Add More</MainButton>
		</MainButtonContainer>
		{postError && <p>Error submitting form: {postError}</p>}
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
		</form>
	);
};

export default AddComponent;