import "../../sidebar_pages.css";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import { useState , useContext, useEffect, useRef } from "react";
import { FetchContext } from "../../../context/FetchContext";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
import { useLocation } from "react-router-dom";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import { TriggerContext } from "../../../context/triggerContext/TriggerContext";

function LogFault() {
	const refInput = useRef(null);
	const { toSentenceCase } = useContext(SentenceCaseContext);
	const [faultNamesList, setFaultNamesList] = useState([]);
	const [noselection, setNoselecton] = useState(false);
	const { setTriggerPendingNotifi } = useContext(TriggerContext)
	const { authData } = useContext(AuthContext);
	const [formIndex, setFormIndex] = useState(0);
	// const { faults } = cMockData();
	const currentPage = useLocation().pathname
	const initialValue = {}
	const [formValues, setFormValues] = useState(initialValue);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		'http://127.0.0.1:8000/fault/',
		formData,
		postTrigger,
		currentPage,
	);
	// get setup
	const faultNames = useGetWithEncryption(
		'http://127.0.0.1:8000/fault-name/',
		'faultnames',
	)
	useEffect(() => {
		console.log('faultNames', faultNames)
        if (faultNames.getData) {
			console.log('faultNames getData: ', faultNames.getData)
            setFaultNamesList(faultNames.getData)
        } else if (faultNames.localDataStoreVar) {
			console.log('faultNames localDataStoreVar: ', faultNames.localDataStoreVar)
            setFaultNamesList(faultNames.localDataStoreVar)
        }
    }, [faultNames])
	console.log('faultNamesList:', faultNamesList);
	useEffect(() => {
		if (postData || postError) {
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			setFormValues([initialValue]);
			// setFormValues({ other: '' });  // Reset formValues to initial state
			setDynamicfields([{ id: Date.now(), fault: '' }]); // Reset dynamic fields to a single initial fieldset
			setFormData(new FormData());
        }
    }, [postTrigger, postData, postLoading, postError])

	// const [isOkay, setIsOkay] = useState(true);
	const checkField = () => {
		// let noFault = false;
		let keyList = []
		const formList = Object.entries(formValues)
		console.log('initList', formList)
		for (let i = 0; i < formList.length; i++) {
			console.log('filter:', formList[i])
			if (formList[i][1] === 'Select Fault') continue;
			if (Number(formList[i][0]) === 0) continue;
			// console.log('qqqqqqqqq'.toUpperCase())
			keyList.push(formList[i][0])
			// console.log('ppppppppp'.toUpperCase())
		};
		console.log('keyList:', keyList);
		if (keyList.length === 0) {
			console.log('length of keyList:', keyList.length)
			return false;
		}
		for (let i = 0; i < keyList.length; i++) {
			if (keyList[i].includes('other')) {
				console.log('check:', keyList[i]);
				let tailName = keyList[i].split('-')
				tailName = `fault-${tailName[1]}`
				console.log('tailname:', tailName)
				console.log(`##### ${i}`);
				console.log(tailName, 'in', keyList, ':', keyList.includes(tailName))
				if (!keyList.includes(tailName)) {
					console.log('no fault selected'.toUpperCase())
					return false;
				}
			}
		}
		return true;
	}
	useEffect(() => {
        refInput.current.focus();
    }, [])
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		console.log('######################');
		console.log('value:', value);
			setFormValues({
			...formValues,
			[name]: value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form submitted:', formValues);
		console.log('#####################')
		const fieldOkay = checkField()
		console.log('fieldOkay:'.toUpperCase(), fieldOkay);
		if (fieldOkay) {
			for (const [key, value] of Object.entries(formValues)) {
				console.log('key:', key, '\nvalue:', value);
				if (key === '0') {
					console.log('skipping ...')
					continue;
				}
				if (key === 'Select Fault') {
					console.log('breaking out ...')
					setNoselecton(true);
					return; // break out early
				}
				formData.append(key, value);
			}
			// formData.append('email', authData.email);
			formData.append('location', authData.branch.location.location);
			formData.append('region', authData.branch.region.name);
			formData.append('bank', authData.branch.bank.name);
			formData.append('state', authData.branch.state.name);
			formData.append('assigned_to', (authData.branch.branch_engineer?.engineer?.email?(authData.branch.branch_engineer.engineer.email):(authData.region.supervisor.email)));
			formData.append('supervised_by', authData.region.supervisor.email);
			formData.append('managed_by', authData.region.helpdesk.email);
			formData.append('logged_by', authData.email);

			console.log('noselection (before checking):', noselection);
			console.log('noselection (actual):', noselection);
			console.log('noselection (checked for):', !noselection);
			setPostTrigger(true)
			setTriggerPendingNotifi(true);
			localStorage.removeItem('totalfaultsKey');
			localStorage.removeItem('faultsKey');
		} else {
			setFormValues([initialValue]);
			setNoselecton(true)
		}
	};
	useEffect(() => {
		if (noselection) {
			const timer = setTimeout(() => {
				setNoselecton(false);
			}, 3000);
			return () => clearTimeout(timer)
		}
	}, [noselection])
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
	console.log('no selection:', noselection)
	const incrementAddMoreButtonCount = () => setFormIndex(prev => prev + 1)
	const decrementAddMoreButtonCount = () => setFormIndex(prev => prev - 1)
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
							<form onSubmit={handleSubmit}>
								<div>
									<div className="cust-row-form dynamic-cust-row">
										{/* <div className="dynamic-cust-row"> */}
										{dynamicfields.map((field, index) => (
										<>
										{/* consider multiplying the index with date object
										to handle the unique key issue  */}
											<div className="b-line" key={(field.id)*(index)}>
												<>
													<div className="input-field">
														<label htmlFor={`fault-${field.id}`}>Fault:</label>
														{/* <label htmlFor={`fault-${field.id}`}>Fault:</label> */}
														<select
														ref={refInput}
														id={`fault-${field.id}`}
														name={`fault-${field.id}`}
														onChange={handleInputChange}>
														<option>Select Fault</option>
														{
														// ['Select Fault',
														// 'Blank Screen',
														// 'Cash Jam',
														// 'Card Not Smart',
														// 'Poor Facial Image',
														// 'Unable to Clear/Load Cash',
														// 'ATM not Dispensing notes',
														// 'Reject Bin Full',
														// 'Dispenser not Spinning',
														// 'Dispenser spins too many times without paying',
														// 'ATM/Dispenser dirty',
														// 'Screen Touch/Buttons not working',
														// 'ATM Screen buttons not working',
														// 'Too many ATM card rejects',
														// 'Trappng cards',
														// 'Card cannot be Read',
														// 'Pin pad keys not working',
														// 'ATM not Booting Up',
														// 'Cash counter reset on power disruption',
														// 'High Rejects',
														// 'Calibration Unsuccessful',
														// 'No Good Cassetes',
														// 'Out of Service',
														// 'Unable to Print Counter',
														// ]

														// <option key={`${fault}-${faultIndex}`} value={fault}></option>
														faultNamesList.map((fault, faultIndex) => (
															<option key={`${fault.pathname}-${faultIndex}`} value={fault.name}>
															{toSentenceCase(fault.name)}
															</option>
														))}
														</select>
													</div>
													{(index > 0) &&
														<div className="with-rm-btn">
														<div>
															<button
																type="button"
																onClick={() => {
																	removedynamicfieldsFieldSet(field.id);
																	decrementAddMoreButtonCount();
																}}
																>Remove
															</button>
														</div>
													</div>}
												</>
											</div>
											{/* <div className="b-line"> */}
											<div className="input-field textarea-box">
												<label htmlFor={`other-${field.id}`}>Others:</label>
												<textarea
												type="text"
												name={`other-${field.id}`}
												id={`other-${field.id}`}
												placeholder={`Pls, specify ... (Expandable field)`}
												rows={2}
												onChange={handleInputChange}
												value={formValues[`other-${field.id}`] || ''}
												/>
											</div>
											{/* </div> */}
										</>
										))}
										{/* {noselection && <p
										style={{
											margin: '0',
											fontSize: '0.9rem',
                                            color: 'red',
                                            fontWeight: 'light',
											fontStyle: 'italic',
										}}
										>You must make atleast one selection in fault the input field.</p>} */}
										</div>
										<div className="">
									</div>
								</div>
								
								<div className="cust-button">
									<button
									onClick={handleSubmit}
									type="submit">
										{postLoading ? 'Logging' : 'Log Fault'}
									</button>
									{(formIndex < 4) &&
									<button type="button" onClick={() => {
										addFieldSet();
										incrementAddMoreButtonCount();
									}}>
										Add More
									</button>}
								</div>
							</form>
							{noselection &&
							<>
								<hr/>
								<p
								style={{
									// margin: '0',
									fontSize: '0.9rem',
									color: 'red',
									fontWeight: 'light',
									fontStyle: 'italic',
								}}
								>You must make atleast one selection in the fault input fields.</p>
							</>}
							<hr/>
						</div>
					</div>
			</div>
		</>
	)
};

export default LogFault;