import cMockData from "../custodian/custodianMockData";
import wMockData from "../workshop/workshopMockData";
import "../sidebar_pages.css";
import { useState , useEffect} from "react";
// import CustomTime from "../../hooks/CustomTime";
import { useLocation } from "react-router-dom";
// import wMockData from "../workshop/workshopMockData";
// import Resolved from "../requestApprovedPendingResolved/resolved/Resolved";
// import PendingFaults from "../requestApprovedPendingResolved/pending_faults/PendingFaults";


function LogFault({childList}) {
	let componentPage = useLocation();
	componentPage = componentPage.pathname;
	const pageName = '/custodian';
	const { location, banks, locations, faults } = cMockData();
	const { location:wuser, parts:fixedParts, components:reqComponents } = wMockData();
	const [isEditable, setIsEditable] = useState(false);
	const validateForm = () => {
		let formErrors = {};
		if (!formValues.state) formErrors.state = 'State is required';
		if (!formValues.branch) formErrors.branch = 'Branch is required';
		if (!formValues.engineer) formErrors.engineer = 'Engineer is required';
		if (!formValues.helpDesk) formErrors.helpDesk = 'Help Desk is required';
		if (!formValues.atmType) formErrors.atmType = 'ATM type is required';
		if (!formValues.totalNumberOfATMs) formErrors.totalNumberOfATMs = 'Number of ATMs is required';
		setErrors(formErrors);
		return Object.keys(formErrors).length === 0;
	};

	const fields = [];
	console.log('fields before:', fields);

	const [formValues, setFormValues] = useState(fields);
	const [errors, setErrors] = useState({});

	useEffect(() => {
	if (componentPage === pageName) {
		// for custodian page
		setFormValues({
			bank: banks[location.bank.name],
			state: locations[location.bank.state],
			branch: location.bank.branch.branchName,
			engineer: location.bank.branch.cEngineer,
			helpDesk: location.bank.branch.helpDesk,
			atmType: location.bank.branch.ATMs.type,
			totalNumberOfATMs: location.bank.branch.ATMs.totalNumberOfATMs,
			otherFaults: ''
		});}
		// } else {
		// 	setFields([]);
		// }
	}, [componentPage]);
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
			setFormValues({
			...formValues,
			[name]: value,
			});
		};
	const EditHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Form is valid, submission logic
			console.log('Form submitted:', formValues);
			const formData = new FormData();
			for (const key in formData) {
				formData.append(key, formValues[key]);
            }
			console.log('Form data: obj', formData);
		} else {
			console.log('Form submitted is not valid');
		}
	};
	// const handleUpdateFields = (e) => {
	// 	e.preventDefault();
	// 	if (validateForm()) {
	// 	// Form is valid, proceed with submission logic
	// 	console.log('Form submitted:', formValues);
	// 	}
	// };
	// dynamically add more forms
	const [dynamicfields, setDynamicfields] = useState([{ fault: '', atmNumber: '' }]);
	const addFieldSet = () => {
		setDynamicfields([...dynamicfields, { fault: '', atmNumber: '' }]);
	};
	// dynamically remove forms
	const removedynamicfieldsFieldSet = (index) => {
		const updatedComponents = dynamicfields.filter((_, i) => i !== index);
		setDynamicfields(updatedComponents);
	};
	console.log('fields after:', fields);
	console.log('formvalues after:', formValues);
	console.log('childList:', childList);
	const [mapList, setMapList] = useState([]);
	useEffect(() => {
		setMapList(childList);
	}, [childList, componentPage])
	return (
		<>
			<div className="dash-form">
				{mapList.map((item, mainIndex) => {
				return (<>
							<div key={mainIndex}>
								<div>
									{/* for custodian */}
									{(componentPage === '/custodian') &&
									(<h4>Having difficulty with your machine?</h4>)}
									{/* for workshop/engineer/human-resource */}
									{(componentPage === '/workshop' ||
										componentPage === '/engineer' ||
										componentPage === '/human-resource'
									) &&
									(<h4>{item[0]}</h4>)}
								</div>
								<div>
									{/* for custodian */}
									{(componentPage === '/custodian') &&
									(<div className="to-form">
										<h4>Log a Fault</h4>
									</div>)}
									<hr />
									<form onSubmit={handleSubmit}>
										<div>
											{/* for custodian */}
											{(componentPage === '/custodian') &&
											(<div className="cust-row">
												<div className="input-field">
													<label htmlFor="state">State:</label>
													<input
													type="text"
													name="state"
													id="state"
													value={formValues.state}
													onChange={handleInputChange}
													// readOnly={!isEditable}
													readOnly={(componentPage === pageName && !isEditable) ? true : false}
													/>
													{errors.state && <span className="error">{errors.state}</span>}
												</div>
												<div className="input-field">
													<label htmlFor="branch">Branch:</label>
													<input
													type="text"
													name="branch"
													id="branch"
													value={formValues.branch}
													onChange={handleInputChange}
													// readOnly={!isEditable}
													readOnly={(componentPage === pageName && !isEditable) ? true : false}
													/>
													{errors.branch && <span className="error">{errors.branch}</span>}
												</div>
											</div>)}

											<div className="cust-row-form dynamic-cust-row">
												{/* <div className="dynamic-cust-row"> */}
												{dynamicfields.map((field, index) => (
													<div className="b-line" key={index}>
														<>
															<div className="input-field">
																{/* <hr/> */}
																{/* for custodian */}
																{(componentPage === '/custodian') &&
																(<>
																	{/* <hr/> */}
																	<label htmlFor={`fault-${index}`}>Fault:</label>
																	<select id={`fault-${index}`} name={`fault-${index}`}>
																	{faults.map(fault => (
																		<option key={fault} value={fault}>
																		{fault}
																		</option>
																	))}
																	</select>
																</>)}
																{/* for workshop/engineer/human-resource */}
																{(componentPage === '/workshop' ||
																	componentPage === '/engineer' ||
																	componentPage === '/human-resource'
																) &&
																(<>
																	<label htmlFor={`${item[1]}-${index}`}>{item[2]}:</label>
																	<select id={`${item[1]}-${index}`} name={`${item[1]}-${index}`}>
																	{/* {fixedParts.map(fault => (
																		<option key={fault} value={fault}>
																		{fault}
																		</option>
																	))} */}
																	{/* first loop */}
																	{(mainIndex === 0) && (fixedParts.map(fault => (
																		<option key={fault} value={fault}>
																			{fault}
																		</option>
																	)))}
																	{/* second loop */}
																	{(mainIndex === 1) && (reqComponents.map(fault => (
																		<option key={fault} value={fault}>
																			{fault}
																		</option>
																	)))}
																	</select>
																</>)}
															</div>
															<div className="with-rm-btn">
																<div className="input-field">
																	{/* for custodian */}
																	{(componentPage === '/custodian') &&
																	(<>
																		<label htmlFor={`atm-number-${index}`}>ATM:</label>
																		<select id={`atm-number-${index}`} name={`atm-number-${index}`}>
																		{Array.from({ length: formValues.totalNumberOfATMs }, (_, i) => i + 1).map((number) => (
																			<option key={number} value={number}>
																			{number}
																			</option>
																		))}
																		</select>
																	</>)}
																	{/* for workshop/engineer/human-resource */}
																	{(componentPage === '/workshop' ||
																		componentPage === '/engineer' ||
																		componentPage === '/human-resource'
																	) &&
																	(<>
																		<label htmlFor={`${item[3]}-${index}`}>Quantity:</label>
																		<select id={`${item[3]}-${index}`} name={`${item[3]}-${index}`}>
																		{/* for workshop/engineer */}
																		{(componentPage !== '/human-resource') &&
																		(Array.from({ length: 16 }, (_, i) => i + 1).map((number) => (
																			<option key={number} value={number}>
																			{number}
																			</option>
																		)))}
																		{/* for human-resource */}
																		{(componentPage === '/human-resource') &&
																		(Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
																			<option key={number} value={number}>
																			{number}
																			</option>
																		)))}
																		</select>
																	</>)}
																</div>
																<div>
																	<button
																		type="button"
																		onClick={() => removedynamicfieldsFieldSet(index)}
																		>Remove
																	</button>
																</div>
															</div>
														</>
													</div>
												))}
												</div>
											</div>
											<div>
												<div className="input-field textarea-box">
													<label htmlFor={`other-${mainIndex}`}>Others:</label>
													<textarea
													type="text"
													name={`other-${mainIndex}`}
													id={`other-${mainIndex}`}
													placeholder="Pls, specify ..."
													rows={3}
													onChange={handleInputChange}
													/>
												{/* </div> */}
											</div>
										</div>
										<div className="cust-button">
											{/* for custodian */}
											{(componentPage === '/custodian') && (<button onClick={EditHandler}>{!isEditable ? 'Edit Fields' : 'Done Editing'}</button>)}
											{(componentPage === '/custodian') && (<button>Update Fields</button>)}
											{/* <button onClick={handleUpdateFields}>Update Fields</button> */}
											<button type="submit">
												{/* for custodian */}
												{(componentPage === '/custodian') &&
												('Log Fault')}
												{/* for workshop/engineer/human-resource */}
												{(componentPage === '/workshop' ||
													componentPage === '/engineer' ||
													componentPage === '/human-resource'
												) &&
												(`${item[4]}`)}
											</button>
											<button type="button" onClick={addFieldSet}>
												Add More
											</button>
										</div>
									</form>
									<hr/>
								</div>
							</div>
					</>)})}
			</div>
		</>
	)
};

export default LogFault;