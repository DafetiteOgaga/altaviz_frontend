import "../sidebar_pages.css";
// import useGetWithEncryption from "../../paginationComp/useGetWithEncryption";
import { useState , useContext, useEffect, useRef } from "react";
import { FetchContext } from "../../context/FetchContext";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
// import { TriggerContext } from "../../context/triggerContext/TriggerContext";
import { toast } from 'react-hot-toast';

const style = {
	input: {
		padding: "4px",
		fontSize: "16px",
		border: "1px solid #ccc",
		borderRadius: "5px",
	}
}

function LogFault() {
	const refInput = useRef(null);
	const { toSentenceCase } = useContext(SentenceCaseContext);
	const [faultNamesList, setFaultNamesList] = useState([]);
	const [noselection, setNoselecton] = useState(false);
	// const { setTriggerPendingNotifi } = useContext(TriggerContext)
	const { authData } = useContext(AuthContext);
	const [formIndex, setFormIndex] = useState(0);
	const navigate = useNavigate();
	const initialValue = {}
	const [formValues, setFormValues] = useState(initialValue);
	// post setup
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI, useGetDataAPI } = useContext(FetchContext);
	const { postData, postLoading, postError } = usePostDataAPI(
		`fault/`,
		formData,
		postTrigger,
		// currentPage,
	);
	// get setup
	const { getData, getLoading, getError } = useGetDataAPI(
		`fault-name/`,
		true,
	)
	useEffect(() => {
		console.log('getData', getData)
        if (getData) {
			console.log('getData: ', getData)
            setFaultNamesList(getData)
        }
    }, [getData])
	console.log('faultNamesList:', faultNamesList);
	useEffect(() => {
		if (postData || postError) {
			if (postData) {toast.success('Fault(s) logged successfully!');}
			else if (postError) {toast.error('Error logging Fault(s)!');}
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			setFormValues([initialValue]);
			// setFormValues({ other: '' });  // Reset formValues to initial state
			setDynamicfields([{ id: Date.now(), fault: '' }]); // Reset dynamic fields to a single initial fieldset
			setFormData(new FormData());
			navigate('/success', {state: {currentPage:`/${authData.role}`}})
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
			formData.append('location', `${authData.branch.location.location}-${authData.branch.location.id}`);
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
														style={{...style.input, borderRadius: '5px'}}
														ref={refInput}
														id={`fault-${field.id}`}
														name={`fault-${field.id}`}
														onChange={handleInputChange}>
														<option style={styles.selectOpts}>Select Fault</option>
														{
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
												style={{...style.input, borderRadius: '4px'}}
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