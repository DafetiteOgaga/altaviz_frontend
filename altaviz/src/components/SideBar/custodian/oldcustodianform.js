// function CustodianLandingPage() {
// 	// const { location, banks, locations, faults } = cMockData();

// 	// const pathlocation = useLocation();
// 	// console.log("current location: " + pathlocation);
// 	// console.log("current location: " + pathlocation.pathname);

// 	// const fields = {
// 	// 	bank: banks[location.bank.name],
// 	// 	state: locations[location.bank.state],
// 	// 	branch: location.bank.branch.branchName,
// 	// 	engineer: location.bank.branch.cEngineer,
// 	// 	helpDesk: location.bank.branch.helpDesk,
// 	// 	atmType: location.bank.branch.ATMs.type,
// 	// 	totalNumberOfATMs: location.bank.branch.ATMs.totalNumberOfATMs,
// 	// 	otherFaults: ''
// 	//   }
// 	// // const { useButton } = useContext(GlobalContext)
// 	// const [formValues, setFormValues] = useState(fields);
// 	// const [isEditable, setIsEditable] = useState(false);
// 	// const [errors, setErrors] = useState({});
	
// 	// const EditHandler = (e) => {
// 	// 	e.preventDefault();
// 	// 	setIsEditable(!isEditable);
// 	// };

// 	// const handleInputChange = (e) => {
// 	// 	const { name, value } = e.target;
// 	// 	setFormValues({
// 	// 	  ...formValues,
// 	// 	  [name]: value,
// 	// 	});
// 	//   };

// 	// const validateForm = () => {
// 	// 	let formErrors = {};
// 	// 	if (!formValues.state) formErrors.state = 'State is required';
// 	// 	if (!formValues.branch) formErrors.branch = 'Branch is required';
// 	// 	if (!formValues.engineer) formErrors.engineer = 'Engineer is required';
// 	// 	if (!formValues.helpDesk) formErrors.helpDesk = 'Help Desk is required';
// 	// 	if (!formValues.atmType) formErrors.atmType = 'ATM type is required';
// 	// 	if (!formValues.totalNumberOfATMs) formErrors.totalNumberOfATMs = 'Number of ATMs is required';
// 	// 	setErrors(formErrors);
	
// 	// 	return Object.keys(formErrors).length === 0;
// 	// };

// 	// const handleSubmit = (e) => {
// 	// 	e.preventDefault();
// 	// 	if (validateForm()) {
// 	// 	// Form is valid, proceed with submission logic
// 	// 	console.log('Form submitted:', formValues);
// 	// 	}
// 	// };
// 	// const handleUpdateFields = (e) => {
// 	// 	e.preventDefault();
// 	// 	if (validateForm()) {
// 	// 	// Form is valid, proceed with submission logic
// 	// 	console.log('Form submitted:', formValues);
// 	// 	}
// 	// };
// 	// const name = "Amanda"
// 	// const message = "Kindly Confirm Resolution:";
// 	// const [dynamicfields, setDynamicfields] = useState([{ fault: '', atmNumber: '' }]);

// 	// const addFieldSet = () => {
// 	// 	setDynamicfields([...dynamicfields, { fault: '', atmNumber: '' }]);
// 	// };
// 	// const removedynamicfieldsFieldSet = (index) => {
// 	// 	const updatedComponents = dynamicfields.filter((_, i) => i !== index);
// 	// 	setDynamicfields(updatedComponents);
// 	// };

// 	const name = 'custodian';
// 	const childList = [
// 		['nothing'],
// 	]
// 	return (
// 		<>
// 			{/* <div className="background-color custodian-page">
// 				<CustomTime name={name} />
// 				<div className="split-container">
// 					<div className="dash-form">
// 						<div>
// 							<h4>Having difficulty with your machine?</h4>
// 						</div>
// 						<div>
// 							<div className="to-form">
// 								<h4>Log a Fault</h4>
// 							</div>
// 							<hr />
// 							<form onSubmit={handleSubmit}>
// 								<div>
// 									<div className="cust-row">
// 										<div className="input-field">
// 											<label htmlFor="state">State:</label>
// 											<input
// 											type="text"
// 											name="state"
// 											id="state"
// 											value={formValues.state}
// 											onChange={handleInputChange}
// 											readOnly={!isEditable}
// 											/>
// 											{errors.state && <span className="error">{errors.state}</span>}
// 										</div>
// 										<div className="input-field">
// 											<label htmlFor="branch">Branch:</label>
// 											<input
// 											type="text"
// 											name="branch"
// 											id="branch"
// 											value={formValues.branch}
// 											onChange={handleInputChange}
// 											readOnly={!isEditable}
// 											/>
// 											{errors.branch && <span className="error">{errors.branch}</span>}
// 										</div>
// 									</div>
// 									<div className="cust-row">
// 									</div>
// 									<div className="cust-row">
// 										<div className="dynamic-cust-row">
// 										{dynamicfields.map((field, index) => (
// 											<div className="b-line" key={index}>
// 												<div className="input-field">
// 													<label htmlFor={`fault-${index}`}>Fault:</label>
// 													<select id={`fault-${index}`} name={`fault-${index}`}>
// 													{faults.map(fault => (
// 														<option key={fault} value={fault}>
// 														{fault}
// 														</option>
// 													))}
// 													</select>
// 												</div>
// 												<div className="with-rm-btn">
// 													<div className="input-field">
// 														<label htmlFor={`atm-number-${index}`}>ATM:</label>
// 														<select id={`atm-number-${index}`} name={`atm-number-${index}`}>
// 														{Array.from({ length: formValues.totalNumberOfATMs }, (_, i) => i + 1).map((number) => (
// 															<option key={number} value={number}>
// 															{number}
// 															</option>
// 														))}
// 														</select>
// 													</div>
// 													<div>
// 														<button
// 															type="button"
// 															onClick={() => removedynamicfieldsFieldSet(index)}
// 															>Remove
// 														</button>
// 													</div>
// 												</div>
// 											</div>
// 										))}
// 										</div>
// 									</div>
// 									<div>
// 										<div className="input-field textarea-box">
// 											<label htmlFor="other-faults">Other Faults/Details:</label>
// 											<textarea
// 											type="text"
// 											name="other-faults"
// 											id="other-faults"
// 											placeholder="Pls, specify ..."
// 											rows={3}
// 											onChange={handleInputChange}
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 								<div className="cust-button">
// 									<button onClick={EditHandler}>{!isEditable ? 'Edit Fields' : 'Done Editing'}</button>
// 									<button onClick={handleUpdateFields}>Update Fields</button>
// 									<button type="submit">Log Fault</button>
// 									<button type="button" onClick={addFieldSet}>
// 										Add Fault
// 									</button>
// 								</div>
// 							</form>
// 						</div>
// 					</div>

// 					...........................................................................

					
// 					<div style={{
// 							borderLeft: '2px inset',
// 							height: 'auto',
// 							width: '0',
// 							margin: '0 auto',
// 						}}>
// 					</div>

// 					...........................................................................

// 					<div className="dash-form">
// 						<div>
// 							<h4>Dashboard</h4>
// 						</div>
// 						<div>
// 							<div className="to-form">
// 							</div>
// 							<hr />
// 							<div>
// 								<div className="cust-row">
// 									<div className="input-field">
// 											<p><strong>Bank: </strong>
// 												{banks[location.bank.name]}
// 											</p>
// 										</div>
// 										<div className="input-field">
// 											<p><strong>State: </strong>
// 												{locations[location.bank.state]}
// 											</p>
// 										</div>
// 										<div className="input-field">
// 											<p><strong>Branch: </strong>
// 												{location.bank.branch.branchName}
// 											</p>
// 										</div>
// 									</div>
// 									<div className="cust-row">
// 										<div className="input-field">
// 											<p><strong>Engineer: </strong>
// 												<Link
// 												style={{color: '#333'}}
// 												to="/user/1">
// 													{location.bank.branch.cEngineer}
// 												</Link>
// 											</p>
// 										</div>
// 										<div className="input-field">
// 											<p><strong>Help Desk: </strong>
// 												<Link
// 													style={{color: '#333'}}
// 													to="/user/1">
// 													{location.bank.branch.helpDesk}
// 												</Link>
// 											</p>
// 										</div>
// 										<div className="input-field">
// 											<p><strong>ATM Brand: </strong>
// 												{location.bank.branch.ATMs.type}
// 											</p>
// 										</div>
// 									</div>
// 									<div className="pend-resol">
// 										<PendingFaults />
// 										<Resolved text={message} />
// 									</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div> */}
// 			<div className="background-color custodian-page">
// 				<Dashboard name={name} pageName={`/${name}`} />
// 				<hr style={{width: '80%'}} />
// 				<LogFault childList={childList} />
// 			</div>
// 		</>
// 	);
// };