// import useFetch from "../hooks/useFetch";
// import { useState, useContext } from "react";
import CustomTime from "../../hooks/CustomTime";
// import { GlobalContext } from "../../context/Context";
import { useNavigate } from "react-router-dom"
import "./custodian.css"
// import Custodian from "./Custodian";

function CustodianLandingPage() {
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
		// {
		// 	id: 2,
		// 	name: 'Iyare',
		// 	profile_photo: 'placeholder.png',
		// 	phone1: '12345678901',
		// 	whatsapp: '09876543210',
        //     email: 'iyare@fcmb.com',
        //     location: 'EN',
		// 	bank: 'FM',
		// },
		// {
		// 	id: 3,
		// 	name: 'Hauwa',
		// 	profile_photo: 'placeholder.png',
		// 	phone1: '12345678901',
		// 	whatsapp: '09876543210',
        //     email: 'hauwa@ecobank.com',
        //     location: 'KD',
		// 	bank: 'EC',
		// },
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
	// const faults = ['Select Fault',
	// 	'Blank Screen',
	// 	'Cash Jam',
	// 	'Card Not Smart',
	// 	'Poor Facial Image',
	// 	'Unable to Clear/Load Cash',
	// 	'ATM not Dispensing notes',
	// 	'Reject Bin Full',
	// 	'Dispenser not Spinning',
	// 	'Dispenser spins too many times without paying',
	// 	'ATM/Dispenser dirty',
	// 	'Screen Touch/Buttons not working',
	// 	'ATM Screen buttons not working',
	// 	'Too many ATM card rejects',
	// 	'Trappng cards',
	// 	'Card cannot be Read',
	// 	'Pin pad keys not working',
	// 	'ATM not Booting Up',
	// 	'Cash counter reset on power disruption',
	// 	'High Rejects',
	// 	'Calibration Unsuccessful',
	// 	'No Good Cassetes',
	// 	'Out of Service',
	// 	'Unable to Print Cash',
	// ]
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

	// const fields = {
	// 	bank: banks[location.bank.name],
	// 	state: locations[location.bank.state],
	// 	branch: location.bank.branch.branchName,
	// 	engineer: location.bank.branch.cEngineer,
	// 	helpDesk: location.bank.branch.helpDesk,
	// 	atmType: location.bank.branch.ATMs.type,
	// 	totalNumberOfATMs: location.bank.branch.ATMs.totalNumberOfATMs,
	// 	otherFaults: ''
	//   }
	// const { useButton } = useContext(GlobalContext)
	// const [formValues, setFormValues] = useState(fields);
	// const [isEditable, setIsEditable] = useState(false);
	// const [errors, setErrors] = useState({});
	
	// const EditHandler = (e) => {
	// 	e.preventDefault();
	// 	setIsEditable(!isEditable);
	// };

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setFormValues({
	// 	  ...formValues,
	// 	  [name]: value,
	// 	});
	//   };

	// const validateForm = () => {
	// 	let formErrors = {};
	// 	if (!formValues.state) formErrors.state = 'State is required';
	// 	if (!formValues.branch) formErrors.branch = 'Branch is required';
	// 	if (!formValues.engineer) formErrors.engineer = 'Engineer is required';
	// 	if (!formValues.helpDesk) formErrors.helpDesk = 'Help Desk is required';
	// 	if (!formValues.atmType) formErrors.atmType = 'ATM type is required';
	// 	if (!formValues.totalNumberOfATMs) formErrors.totalNumberOfATMs = 'Number of ATMs is required';
	// 	setErrors(formErrors);
	
	// 	return Object.keys(formErrors).length === 0;
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (validateForm()) {
	// 	// Form is valid, proceed with submission logic
	// 	console.log('Form submitted:', formValues);
	// 	}
	// };
	const name = "Amanda"
	const navigateTo = useNavigate();
	const goTo = (e) => {
		e.preventDefault();
		navigateTo("/custodian/form");
	}

	return (
		<>
			<div className="background-color custodian-page">
				<CustomTime name={name} />
				<div>
					<h4>Having difficulty with your machine?</h4>
				</div>
				<div>
					<div className="to-form">
						{/* <h4>Log a Fault</h4> */}
						<a href={"/custodian/form"} onClick={(e) => goTo(e)}>
							<h4> Log a Fault  </h4>
						</a>
					</div>
					<hr />
					<div>
						<div className="cust-row">
							<div className="input-field">
									<p>
										{banks[location.bank.name]}
									</p>
								</div>
								<div className="input-field">
									<p>
										{locations[location.bank.state]}
									</p>
								</div>
								<div className="input-field">
									<p>
										{location.bank.branch.branchName}
									</p>
								</div>
							</div>
							<div className="cust-row">
								<div className="input-field">
									<p>
										{location.bank.branch.cEngineer}
									</p>
								</div>
								<div className="input-field">
									<p>
										{location.bank.branch.helpDesk}
									</p>
								</div>
								<div className="input-field">
									<p>
										{location.bank.branch.ATMs.type}
									</p>
								</div>
							</div>
							<div className="cust-row">
								<div className="input-field">
									<p>
										fault
									</p>
								</div>
								<div className="input-field">
									<p>
										{location.bank.branch.ATMs.type}
									</p>
								</div>
								<div className="input-field">
									<p>
										{location.bank.branch.ATMs.totalNumberOfATMs}
									</p>
								</div>
							</div>
							<div className="input-field textarea-box">
								<p>textarea</p>
							</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustodianLandingPage;