// import useFetch from "../hooks/useFetch";
import { useState } from "react";
import CustomTime from "../../hooks/CustomTime";
import { useNavigate } from "react-router-dom";
// import { GlobalContext } from "../../context/Context";
import "./custodian.css"
// import 

function CustodianForm() {
	// if faultStatus is true, the button should be disabled permanently
	// const [ faultStatus, setFaultStatus ] = useState(false)
	// json structure for this page
	const location = {
		bank: {
			name: 'FB',
			state: 'LA',
			branch: {
				branchName: 'Addo Branch',
				custodian: 'Peter',
				cEngineer: 'Kenneth',
				helpDesk: 'Nonye',
				ATMs: {
					type: 'GRG',
					totalNumberOfATMs: 4,

				}
			}
		}
	}

	// const custodianUserDetails = [
	// 	{
	// 		id: 1,
	// 		name: 'Bayo',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'bayo@fidelitybank.com',
    //         location: 'OG',
	// 		bank: 'FB',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Iyare',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'iyare@fcmb.com',
    //         location: 'EN',
	// 		bank: 'FM',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Hauwa',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'hauwa@ecobank.com',
    //         location: 'KD',
	// 		bank: 'EC',
	// 	},
	// ]
	// console.log('custodianUserDetails:', custodianUserDetails);
	// const banksd = ['Select Bank',
	// 	'UB|UBA', 'WB|WEMA Bank', 'FM|FCMB', 'EC|Ecobank', 'UB|Union Bank',
	// 	'FB|Fidelity Bank', 'HB|Heritage Bank', 'PB|Polaris Bank',
	// 	'AB|Access Bank',
	// ]
	const banks = {
		'UA': 'UBA',
		'WB': 'WEMA Bank',
		'FM': 'FCMB',
		'EC': 'Ecobank',
		'UB': 'Union Bank',
		'FB': 'Fidelity Bank',
		'HB': 'Heritage Bank',
		'PB': 'Polaris Bank',
		'AB': 'Access Bank',
	}
	const locations = {
		'FC': 'Abuja State',
		'AB': 'Abia State',
		'AD': 'Adamawa State',
		'AK': 'Akwa Ibom State',
		'AN': 'Anambra State',
		'BA': 'Bauchi State',
		'BY': 'Bayelsa State',
		'BE': 'Benue State',
		'BO': 'Borno State',
		'CR': 'Cross River State',
		'DE': 'Delta State',
		'EB': 'Ebonyi State',
		'ED': 'Edo State',
		'EK': 'Ekiti State',
		'EN': 'Enugu State',
		'GO': 'Gombe State',
		'IM': 'Imo State',
		'JI': 'Jigawa State',
		'KD': 'Kaduna State',
		'KN': 'Kano State',
		'KT': 'Katsina State',
		'KE': 'Kebbi State',
		'KO': 'Kogi State',
		'KW': 'Kwara State',
		'LA': 'Lagos State',
		'NA': 'Nassarawa State',
		'NI': 'Niger State',
		'OG': 'Ogun State',
		'ON': 'Ondo State',
		'OS': 'Osun State',
		'OY': 'Oyo State',
		'PL': 'Plateau State',
		'RI': 'Rivers State',
		'SO': 'Sokoto State',
		'TA': 'Taraba State',
		'YO': 'Yobe State',
		'ZA': 'Zamfara State',
	}
	// const atmType = ['GRG', 'Wincor-Nixdorf', 'NCR']
	const faults = ['Select Fault',
		'Blank Screen',
		'Cash Jam',
		'Card Not Smart',
		'Poor Facial Image',
		'Unable to Clear/Load Cash',
		'ATM not Dispensing notes',
		'Reject Bin Full',
		'Dispenser not Spinning',
		'Dispenser spins too many times without paying',
		'ATM/Dispenser dirty',
		'Screen Touch/Buttons not working',
		'ATM Screen buttons not working',
		'Too many ATM card rejects',
		'Trappng cards',
		'Card cannot be Read',
		'Pin pad keys not working',
		'ATM not Booting Up',
		'Cash counter reset on power disruption',
		'High Rejects',
		'Calibration Unsuccessful',
		'No Good Cassetes',
		'Out of Service',
		'Unable to Print Cash',
	]
	// const cEngineers = [
	// 	{
	// 		id: 1,
	// 		name: 'Yemi',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'yemi@example.com',
    //         location: 'lagos state',
	// 		supervisor: 'Banji',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Udo',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'udo@example.com',
    //         location: 'Osun state',
	// 		supervisor: 'Gmoney',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Ahmed',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'ahmed@example.com',
    //         location: 'Kogi state',
	// 		supervisor: 'Owolabi',
	// 	},
	// ]
	// const helpDesk = [
	// 	{
	// 		id: 1,
	// 		name: 'Nonye',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'nonye@example.com',
    //         location: 'Delta state',
	// 		supervisor: 'Collins',
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Nike',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'nike@example.com',
    //         location: 'Abuja state',
	// 		supervisor: 'Collins',
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Blessing',
	// 		profile_photo: 'placeholder.png',
	// 		phone1: '12345678901',
	// 		whatsapp: '09876543210',
    //         email: 'blessing@example.com',
    //         location: 'Plateau state',
	// 		supervisor: 'Collins',
	// 	},
	// ]
	// const faultStatus = ['Resolved', 'Pending']
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);

	const fields = {
		bank: banks[location.bank.name],
		state: locations[location.bank.state],
		branch: location.bank.branch.branchName,
		engineer: location.bank.branch.cEngineer,
		helpDesk: location.bank.branch.helpDesk,
		atmType: location.bank.branch.ATMs.type,
		totalNumberOfATMs: location.bank.branch.ATMs.totalNumberOfATMs,
		otherFaults: ''
	  }
	// const { useButton } = useContext(GlobalContext)
	const [formValues, setFormValues] = useState(fields);
	const [isEditable, setIsEditable] = useState(false);
	const [errors, setErrors] = useState({});
	// const name = "Amanda"
	const EditHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
		  ...formValues,
		  [name]: value,
		});
	  };

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

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
		// Form is valid, proceed with submission logic
		console.log('Form submitted:', formValues);
		}
	};
	const name = "Amanda"
	const navigateTo = useNavigate();
	const goTo = (e) => {
		e.preventDefault();
		navigateTo("/custodian");
	}

	return (
		<>
			<div className="background-color custodian-page">
				<div>
					<CustomTime name={name} />
				</div>
				<div>
					<h4>Having difficulty with your machine?</h4>
				</div>
				<div>
					<div className="to-form">
						{/* <h4>Log a Fault</h4> */}
						<a href={"/custodian"} onClick={(e) => goTo(e)}>
							<h4> Back  </h4>
						</a>
					</div>
					<hr />
					<form onSubmit={handleSubmit}>
						<div>
							<div className="cust-row">
								<div className="input-field">
									<label htmlFor="bank">Bank:</label>
									<input
									type="text"
									name="bank"
									id="bank"
									value={formValues.bank}
									readOnly
									/>
								</div>
								<div className="input-field">
									<label htmlFor="state">State:</label>
									<input
									type="text"
									name="state"
									id="state"
									value={formValues.state}
									onChange={handleInputChange}
									readOnly={!isEditable}
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
									readOnly={!isEditable}
									/>
									{errors.branch && <span className="error">{errors.branch}</span>}
								</div>
							</div>
							<div className="cust-row">
								<div className="input-field">
									<label htmlFor="engineer">Engineer:</label>
									<input
									type="text"
									name="engineer"
									id="engineer"
									value={formValues.engineer}
									onChange={handleInputChange}
									readOnly
									/>
									{errors.engineer && <span className="error">{errors.engineer}</span>}
								</div>
								<div className="input-field">
									<label htmlFor="help-desk">Help Desk:</label>
									<input
									type="text"
									name="help-desk"
									id="help-desk"
									value={formValues.helpDesk}
									onChange={handleInputChange}
									readOnly
									/>
									{errors.helpDesk && <span className="error">{errors.helpDesk}</span>}
								</div>
								<div className="input-field">
									<label htmlFor="atm-type">ATM:</label>
									<input
									type="text"
									name="atm-type"
									id="atm-type"
									value={formValues.atmType}
									onChange={handleInputChange}
									// readOnly={!isEditable}
									/>
									{errors.atmType && <span className="error">{errors.atmType}</span>}
								</div>
							</div>
							<div className="cust-row">
								
								<div className="input-field">
									<label htmlFor="fault">Fault:</label>
									<select id="fault" name="fault">
									{faults.map(fault => (
										<option key={fault} value={fault}>
										{fault}
										</option>
									))}
									</select>
								</div>
								<div className="input-field">
									<label htmlFor="atm-number">ATM Number:</label>
									<select id="atm-number" name="atm-number">
										{Array.from({ length: formValues.totalNumberOfATMs }, (_, i) => i + 1).map((number, index) => (
										<option key={index} value={number}>
											{number}
										</option>
										))}
									</select>
								</div>


								{/* <div className="input-field">
									<label htmlFor="no-of-atms">Number of ATMs:</label>
									<input
									type="text"
									name="no-of-atms"
									id="no-of-atms"
									value={formValues.numberOfATMs}
									// readOnly={!isEditable}
									/>
									{errors.numberOfATMs && <span className="error">{errors.numberOfATMs}</span>}
								</div> */}
								<div className="input-field">
									<label htmlFor="total-atms">Total Number of ATMs:</label>
									<input
									type="text"
									name="total-atms"
									id="total-atms"
									value={formValues.totalNumberOfATMs}
									// readOnly={!isEditable}
									/>
									{errors.totalNumberOfATMs && <span className="error">{errors.totalNumberOfATMs}</span>}
								</div>
							</div>
							<div>
								<div className="input-field textarea-box">
									<label htmlFor="other-faults">Other Faults:</label>
									<textarea
									type="text"
									name="other-faults"
									id="other-faults"
									placeholder="Pls, specify ..."
									rows={3}
									// value={formValues.otherFaults}
									onChange={handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="cust-button">
							<button type="submit">Log Fault</button>
							<button onClick={EditHandler}>Edit Fields</button>
						</div>
					</form>
				</div>
			</div>
		</>
);
};

export default CustodianForm;