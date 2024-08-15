import { useState, useEffect } from "react";
import hrMockData from "./humanresourceMockData";

function UpdateUser() {
	const { user } = hrMockData();
	const displayPhotoUpdate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('updateImage');
			output.src = reader.result;
			output.style.display = 'block';
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('updateImage').style.display = 'none';
		}
	}
	useEffect(() => {
		const photoSampleUpdate = document.getElementById('u-ppicture');
		// let photoSample = null;
		if (photoSampleUpdate) {
			photoSampleUpdate.addEventListener('change', displayPhotoUpdate);
		}
		return () => {
			photoSampleUpdate.removeEventListener('change', displayPhotoUpdate);
		}
	}, []);
	const fields = {
		fname: user.names.firstname,
		lname: user.names.lastname,
		mname: user.names.middlename,
        email: user.email,
        wphone: user.phone,
        address: user.address,
        department: user.department.department,
		aboutme: user.aboutme,
	}
	const [formValues, setFormValues] = useState(fields);
	const [isEditable, setIsEditable] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState('');
	const [errors, setErrors] = useState({});
	const EditHandler = (e) => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};
	const handleInputChange = (e) => {
		const { name, value, type, files } = e.target;
		
		// Handle file inputs separately
		if (type === "file") {
			setFormValues({
				...formValues,
				// Store the file
				[name]: files[0],
			});
		} else {
			setFormValues({
				...formValues,
				// store other texts
				[name]: value,
			});
		}
		if (name === 'department') {
			console.log('department set value:', value);
			setSelectedOptions(value);
			console.log('department set selectedOptions:', selectedOptions);
		}
	};
	const validateForm = () => {
		let formErrors = {};
		if (!formValues.fname) formErrors.fname = 'Firstname is required';
		if (!formValues.lname) formErrors.lname = 'Lastname is required';
		if (!formValues.email) formErrors.email = 'Email is required';
		if (!formValues.wphone) formErrors.wphone = 'Whatsapp Phone Number is required';
		if (!formValues.address) formErrors.address = 'Address is required';
		if (!formValues.department) formErrors.department = 'Department is required';
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
	return (
		<>
			<div className="dash-form">
				<div className="title-and-get-user">
					<h4>Update User Account</h4>
					<div className="input-field">
						<label htmlFor="user">Get User:</label>
						<input
						className="get-user-infield"
						type="text"
						name="user"
						id="user"
						placeholder="First Name ..."
						onChange={handleInputChange}
						value={formValues.fname}
						readOnly={!isEditable}
						/>
						{/* {errors.fname && <span className="error">{errors.fname}</span>} */}
					</div>
				</div>
				<div>
					<div className="to-form">
						{/* <h4>Log a Fault</h4> */}
						{/* <a href={"/custodian"} onClick={(e) => goTo(e)}> */}
						{/* <h4>Workshop</h4> */}
						{/* </a> */}
					</div>
					<hr />
					<form onSubmit={handleSubmit}>
						<div>
							{/* row 1 */}
							<div className="cust-row-user">
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="u-fname">First Name:</label>
										<input
										type="text"
										name="fname"
										id="u-fname"
										onChange={handleInputChange}
										value={formValues.fname}
										// readOnly={!isEditable}
										/>
										{errors.fname && <span className="error">{errors.fname}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="u-mname">Middle Name:</label>
										<input
										type="text"
										name="mname"
										id="u-mname"
										onChange={handleInputChange}
										value={formValues.mname}
										// readOnly={!isEditable}
										/>
										{/* {errors.lname && <span className="error">{errors.lname}</span>} */}
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="u-lname">Last Name:</label>
										<input
										type="text"
										name="lname"
										id="u-lname"
										onChange={handleInputChange}
										value={formValues.lname}
										// readOnly={!isEditable}
										/>
										{errors.lname && <span className="error">{errors.lname}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="u-email">Email:</label>
										<input
										type="email"
										name="email"
										id="u-email"
										onChange={handleInputChange}
										value={formValues.email}
										// readOnly={!isEditable}
										/>
										{errors.email && <span className="error">{errors.email}</span>}
									</div>
								</div>
								<div className="user-fields-row">
								<div className="input-field">
										<label htmlFor="u-wphone">Whatsapp No.:</label>
										<input
										type="tel"
										name="wphone"
										id="u-wphone"
										onChange={handleInputChange}
										value={formValues.wphone}
										// readOnly={!isEditable}
										/>
										{errors.wphone && <span className="error">{errors.wphone}</span>}
									</div>
									<div className="input-field">
										
										<label htmlFor="u-department">Department:</label>
										<select
										id="u-department"
										name="department"
										onChange={handleInputChange}
										value={formValues.department}
										// readOnly={!isEditable}
										>
										{/* {(!isEditable) ? (<option>{formValues.department}</option>) : (['Select Department', 'Engineering', 'Workshop', 'Help Desk'].map(part => ( */}
											{/* <option key={part} value={part}>
											{part}
											</option>
										)))} */}
										</select>
									</div>
								</div>
								{/* <div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="password1">Password:</label>
										<input
										type="password"
										name="password1"
										id="password1"
										onChange={handleInputChange}
										/>
										{errors.password1 && <span className="error">{errors.password1}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="password2">Password confirmation:</label>
										<input
										type="password"
										name="password2"
										id="password2"
										onChange={handleInputChange}
										/>
										{errors.password2 && <span className="error">{errors.password2}</span>}
									</div>
								</div> */}
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="u-address">Address:</label>
										<input
										type="text"
										name="address"
										id="u-address"
										onChange={handleInputChange}
										value={formValues.address}
										// readOnly={!isEditable}
										/>
										{errors.address && <span className="error">{errors.address}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="u-aboutme">About Me:</label>
										<textarea
										// type="text"
										name="aboutme"
										id="u-aboutme"
										onChange={handleInputChange}
										value={formValues.aboutme}
										// readOnly={!isEditable}
										/>
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="u-ppicture">Profile Picture:</label>
										<input
										type="file"
										accept="image/*"
										name="ppicture"
										id="u-ppicture"
										value={formValues.ppicture}
										readOnly={!isEditable}
										/>
										{/* {errors.aboutme && <span className="error">{errors.aboutme}</span>} */}
										{<img id="updateImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
									</div>
								</div>
							</div>
						</div>
						<div className="cust-button">
							<button type="submit">Update User</button>
							<button onClick={EditHandler}>{!isEditable ? 'Edit Fields' : 'Done Editing'}</button>
							{/* <button type="button" onClick={addFixedFieldSet}>
									Add More
								</button> */}
							{/* <button type="button" onClick={addRequestComponentFieldSet}>
								Add Request
							</button> */}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
export default UpdateUser;