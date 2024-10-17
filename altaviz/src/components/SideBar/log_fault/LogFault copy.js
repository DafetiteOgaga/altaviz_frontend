import cMockData from "../custodian/custodianMockData";
// import wMockData from "../workshop/workshopMockData";
import "../sidebar_pages.css";
import { useState , useContext, useEffect } from "react";
import { FetchContext } from "../../context/FetchContext";
import { AuthContext } from "../../context/checkAuth/AuthContext";
// import CustomTime from "../../hooks/CustomTime";
import { useLocation } from "react-router-dom";
// import wMockData from "../workshop/workshopMockData";
// import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";
// import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";


function LogFault({childList}) {
	const { authData } = useContext(AuthContext);
	const { faults } = cMockData();
	const currentPage = useLocation().pathname
	const initialValue = {
		other: '',
	}
	const [formValues, setFormValues] = useState(initialValue);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI, useGetDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		'http://127.0.0.1:8000/fault/',
		formData,
		postTrigger,
		currentPage,
	);
	// get setup
	// const [getTrigger, setGetTrigger] = useState(false)
	// const { getData, getLoading } = useGetDataAPI(
	// 	'http://127.0.0.1:8000/fault/'
	// );
	useEffect(() => {
        if (postTrigger) {
			// Reset postTrigger after posting
            setPostTrigger(false);
			setFormValues([initialValue]);
			// setFormValues({ other: '' });  // Reset formValues to initial state
			setDynamicfields([{ id: Date.now(), fault: '' }]); // Reset dynamic fields to a single initial fieldset
			setFormData(new FormData());
        }
    }, [postTrigger]);

	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
			setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted:', formValues);
		Object.entries(formValues).forEach(([key, value]) => {
			console.log('key:', key, '\nvalue:', value);
			if (!value) { return; }  // Skip falsy values
			if (key === '0') { return; }
			formData.append(key, value);
		});
		formData.append('location', authData.custodian.location);
		formData.append('email', authData.email);

		// delete
		// Inspection
		// for (const [key, value] of formData.entries()) {
		// 	console.log(`checking form content: >>> ${key}: ${value}`);
		// }
		setPostTrigger(true)
		// Reset form values and dynamic fields
		// setFormValues({ other: '' });  // Reset formValues to initial state
		// setDynamicfields([{ id: Date.now(), fault: '' }]); // Reset dynamic fields to a single initial fieldset
		// setFormData(new FormData());
	};
	const [dynamicfields, setDynamicfields] = useState([{ fault: '' }]);
	const addFieldSet = () => {
		setDynamicfields(prevFields => [...prevFields, { id: Date.now() }]);
	};
	// dynamically remove forms
	const removedynamicfieldsFieldSet = (id) => {
		// const updatedComponents = dynamicfields.filter((_, i) => i !== index);
		setDynamicfields(prevFields => prevFields.filter(field => field.id !== id));
		setFormValues((prevValues) => {
			// Remove the corresponding field from formValues
			const updatedValues = { ...prevValues };
			delete updatedValues[`fault-${id}`];
			return updatedValues;
		});
	};
	return (
		<>
			<div className="dash-form">
					<div>
						<div>
							<h4>Having difficulty with your machine?</h4>
						</div>
						<div>
							<div className="to-form">
								<h4>Log a Fault</h4>
							</div>
							<hr />
							<form>
								<div>
									<div className="cust-row-form dynamic-cust-row">
										{/* <div className="dynamic-cust-row"> */}
										{dynamicfields.map((field, index) => (
										<div className="b-line" key={(field.id)*(index)}>
												<>
													<div className="input-field">
														<label htmlFor={`fault-${field.id}`}>Fault:</label>
														<select
														id={`fault-${field.id}`}
														name={`fault-${field.id}`}
														onChange={handleInputChange}>
														{faults.map((fault, faultIndex) => (
															<option key={`${fault}-${faultIndex}`} value={fault}>
															{fault}
															</option>
														))}
														</select>
													</div>
													<div className="input-field textarea-box">
														<label htmlFor='other'>Others:</label>
														<textarea
														type="text"
														name='other'
														id='other'
														placeholder="Pls, specify ..."
														rows={1}
														onChange={handleInputChange}
														value={formValues.other}
														/>
													</div>
													<div className="with-rm-btn">
														<div>
															<button
																type="button"
																onClick={() => removedynamicfieldsFieldSet(field.id)}
																>Remove
															</button>
														</div>
													</div>
												</>
											</div>
										))}
										</div>
										<div className="">
									</div>
								</div>
								<div className="cust-button">
									<button
									onClick={handleSubmit}
									type="submit">
										Log Fault
									</button>
									<button type="button" onClick={addFieldSet}>
										Add More
									</button>
								</div>
							</form>
							<hr/>
						</div>
					</div>
			</div>
		</>
	)
};

export default LogFault;