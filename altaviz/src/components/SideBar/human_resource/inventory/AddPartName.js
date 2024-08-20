// import cMockData from "../custodian/custodianMockData";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import { useState,  } from "react";
import { FetchContext } from "../../../context/FetchContext";
import SubmitNotification from "../../notifications/submitNotification/SubmitNotification";
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
// const SelectItem = styled.select`
// 	height: 100%;
// `
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
function AddPartName() {
	const page = useLocation().pathname.split('/')[1]
    const [formValue, setFormValue] = useState([{ item: '' }]);
    const [postTrigger, setPostTrigger] = useState(false);
    const [formData, setFormData] = useState(new FormData());
    const { usePostDataAPI } = useContext(FetchContext);

    const { postData, postLoading, postError } = usePostDataAPI(
        'http://127.0.0.1:8000/part-name/',
        formData,
        postTrigger,
    );

    const valueHandler = (e, index) => {
        const { name, value } = e.target;
        const updatedFormValue = [...formValue];
        updatedFormValue[index] = { ...updatedFormValue[index], [name]: value };
        setFormValue(updatedFormValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        
        formValue.forEach((item, index) => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const value = item[key].toLowerCase(); // Make sure value is a string
                    newFormData.append(`${key}[${index}]`, value);
                }
            }
        });

        setFormData(newFormData);
        setPostTrigger(true);
        // Reset formValue to default state
        setFormValue([{ item: '' }]);
    }

    useEffect(() => {
        if (postTrigger) {
            setPostTrigger(false);
			// Reset formValue to default state
			setFormValue([{ item: '' }]);
        }
    }, [postTrigger]);

    const addFieldSet = () => {
        setFormValue([...formValue, { item: '' }]);
    };

    const removeFieldSet = (index) => {
        const updatedFormValue = formValue.filter((_, i) => i !== index);
        setFormValue(updatedFormValue);
    };
	return (
		<>
			<form>
			{formValue.map((form, index) => (
				<TopContainer key={index}>
					<BorderLineContainer>
						<FieldsContainer>
							<Label
							style={{textWrap: 'nowrap'}}
							htmlFor={`fault-${index}`}>Part Name:</Label>
							<input
								id={`item-${index}`}
								name="item"
								// value={formValue.item}
								onChange={(e) => valueHandler(e, index)}
							>
								{/* {faults.map((item, i) => (
								<option key={i} value={item}>{item}</option>
								))} */}
							</input>
						</FieldsContainer>
						{/* <FieldsContainer>
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
						</FieldsContainer> */}
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
					{postLoading ? 'Creating...' : 'Create Item'}
				</MainButton>
				<MainButton type="button" onClick={addFieldSet}>Add More</MainButton>
			</MainButtonContainer>
			<SubmitNotification
			error={postError}
			success={postData}
			page={page} />
			</form>
			<hr/>
		</>
	);
};

export default AddPartName;