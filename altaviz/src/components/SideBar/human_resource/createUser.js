import { useState, useEffect } from "react";

function CreateUser () {
	const [createUserFormValues, setCreateUserFormValues] = useState({});
	const [newUserError, setNewUserError] = useState({});
	const displayPhotoCreate = (e) => {
		let reader = new FileReader();
		reader.onload = () => {
			let output = document.getElementById('createImage');
			output.src = reader.result;
			output.style.display = 'block';
		};
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		} else {
			document.getElementById('createImage').style.display = 'none';
		}
	}
	useEffect(() => {
		const photoSampleCreate = document.getElementById('c-ppicture');
		if (photoSampleCreate) {
			photoSampleCreate.addEventListener('change', displayPhotoCreate);
		}
		return () => {
			photoSampleCreate.removeEventListener('change', displayPhotoCreate);
		}
	}, []);
	const handleUserCreationInputChange = (e) => {
		const { name, value, type, files } = e.target;
		// Handle file inputs separately
		if (type === "file") {
			setCreateUserFormValues({
				...createUserFormValues,
				// Store the file
				[name]: files[0],
			});
		} else {
			setCreateUserFormValues({
				...createUserFormValues,
				// store other texts
				[name]: value,
			});
		}};
	const validateUserCreationForm = () => {
		let newUserCreationErrors = {};
		if (!createUserFormValues.fname) newUserCreationErrors.fname = 'Firstname is required';
		if (!createUserFormValues.lname) newUserCreationErrors.lname = 'Lastname is required';
		if (!createUserFormValues.email) newUserCreationErrors.email = 'Email is required';
		if (!createUserFormValues.wphone) newUserCreationErrors.wphone = 'Whatsapp Phone Number is required';
		if (!createUserFormValues.address) newUserCreationErrors.address = 'Address is required';
		if (!createUserFormValues.department) newUserCreationErrors.department = 'Department is required';
		if (!createUserFormValues.password1) newUserCreationErrors.password1 = 'Password is required';
		if (!createUserFormValues.password2) newUserCreationErrors.password2 = 'Password confirmation is required';
		setNewUserError(newUserCreationErrors);
		const noError = Object.keys(newUserCreationErrors).length === 0;
		return noError;
	}
	const handleUserCreationSubmit = (e) => {
		e.preventDefault();
		if (validateUserCreationForm) {
			// proceed with submission
			console.log('User creation successful:', createUserFormValues);
		} else {
			console.log('Validation errors:', newUserError);
		}
	}
	return (
		<>
			<div className="dash-form">
				<div>
					<h4>Create User Account</h4>
				</div>
				<div>
					<div className="to-form">
					</div>
					<hr />
					<form onSubmit={handleUserCreationSubmit}>
						<div>
							{/* row 1 */}
							<div className="cust-row-user">
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="c-fname">First Name:</label>
										<input
										type="text"
										name="fname"
										id="c-fname"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.fname && <span className="error">{newUserError.fname}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="c-mname">Middle Name:</label>
										<input
										type="text"
										name="mname"
										id="c-mname"
										onChange={handleUserCreationInputChange}
										/>
										{/* {newUserError.lname && <span className="error">{newUserError.lname}</span>} */}
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="c-lname">Last Name:</label>
										<input
										type="text"
										name="lname"
										id="c-lname"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.lname && <span className="error">{newUserError.lname}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="c-email">Email:</label>
										<input
										type="email"
										name="email"
										id="c-email"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.email && <span className="error">{newUserError.email}</span>}
									</div>
								</div>
								<div className="user-fields-row">
								<div className="input-field">
										<label htmlFor="c-wphone">Whatsapp No.:</label>
										<input
										type="tel"
										name="wphone"
										id="c-wphone"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.wphone && <span className="error">{newUserError.wphone}</span>}
									</div>
									<div className="input-field">
										
										<label htmlFor="c-department">Department:</label>
										<select id="c-department" name="department">
										{['Select Department', 'Engineering', 'Workshop', 'Help Desk'].map(part => (
											<option key={part} value={part}>
											{part}
											</option>
										))}
										</select>
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="password1">Password:</label>
										<input
										type="password"
										name="password1"
										id="password1"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.password1 && <span className="error">{newUserError.password1}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="password2">Password confirmation:</label>
										<input
										type="password"
										name="password2"
										id="password2"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.password2 && <span className="error">{newUserError.password2}</span>}
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="c-address">Address:</label>
										<input
										type="text"
										name="address"
										id="c-address"
										onChange={handleUserCreationInputChange}
										/>
										{newUserError.address && <span className="error">{newUserError.address}</span>}
									</div>
									<div className="input-field">
										<label htmlFor="c-aboutme">About Me:</label>
										<textarea
										// type="text"
										name="aboutme"
										id="c-aboutme"
										onChange={handleUserCreationInputChange}
										/>
										{/* {newUserError.aboutme && <span className="error">{newUserError.aboutme}</span>} */}
									</div>
								</div>
								<div className="user-fields-row">
									<div className="input-field">
										<label htmlFor="c-ppicture">Profile Picture:</label>
										<input
										type="file"
										accept="image/*"
										name="ppicture"
										id="c-ppicture"
										// onChange={handleUserCreationInputChange}
										/>
										{/* {newUserError.aboutme && <span className="error">{newUserError.aboutme}</span>} */}
										{<img id="createImage" src="#" alt="Profile pic" style={{display: 'none'}} />}
									</div>
								</div>
							</div>
						</div>
						<div className="cust-button">
							<button type="submit">Create User</button>
							{/* <button onClick={EditHandler}>Edit Fields</button> */}
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
export default CreateUser;