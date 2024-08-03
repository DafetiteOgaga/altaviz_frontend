import { useState, useContext } from 'react';
// import useButton from '../hooks/useButton';
import { GlobalContext } from '../Context/Context';
// import useFetchPost from '../hooks/useFetchPost';

const Contact = () => {
	const fields = {
		name: '',
		email: '',
		message: '',
	}
	const { useButton, useFetchPost } = useContext(GlobalContext);
	const [formData, setFormData] = useState(fields);

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [isFormValid, setIsFormValid] = useState(false);
	const [submitTrigger, setSubmitTrigger] = useState(false);
    useFetchPost('http://localhost:8000', formData, submitTrigger);
	// const { data, loading, error } = useFetchPost('http://localhost:8000', formData, submitTrigger);
	// console.log('data:', data);
	// console.log('loading:', loading);
	// console.log('error:', error);

	const handleChange = (e) => {
		const { name, value } = e.target;
		// console.log(name, value);
		setFormData({
		...formData,
		[name]: value,
		});
		validateForm();
	};

	const validateForm = () => {
		let formValid = true;
		let errors = {};

		// disabled the name field from being required
		// if (!formData.name.trim()) {
		// 	errors.name = 'Name is required';
		// 	formValid = false;
		// }

		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			formValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is invalid';
			formValid = false;
		}

		if (!formData.message.trim()) {
			errors.message = 'Message is required';
			formValid = false;
		}

		setErrors(errors);
		setIsFormValid(formValid);
		return formValid;
	};

	const useHandleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log('Form submitted:', formData);
			setSubmitTrigger(true);
			setFormData(fields)

		// form submission logic
		// const postData = async () => {
		// 	try {
		// 		const response = await fetch('https://example.com/api/contact', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(formData),
		// 		});
		// 		if (response.ok) {
		// 		// Handle successful form submission
		// 		alert('Form submitted successfully');
		// 		} else {
		// 		// Handle errors during form submission
		// 		alert('Failed to submit the form');
		// 		}
		// 	} catch (error) {
		// 		console.error('Error submitting the form:', error);
		// 	}
		// }
	};};

	return (
		<div className='backgroung-color contact-page'>
			<h2>Contact Us</h2>
			<form className='contact-form-page'
				onSubmit={useHandleSubmit}>
				<div className='element-container'>
				<input
					type="text"
					name="name"
					placeholder='Name'
					value={formData.name}
					onChange={handleChange}
				/>
				{errors.name && <span>{errors.name}</span>}
				</div>
				<div className='element-container'>
				<input
					type="email"
					name="email"
					placeholder='Email address'
					value={formData.email}
					onChange={handleChange}
				/>
				{errors.email && <span>{errors.email}</span>}
				</div>
				<div className='element-container'>
				<textarea
					name="message"
					placeholder='Message ...'
					value={formData.message}
					rows='6'
					onChange={handleChange}
				/>
				{errors.message && <span>{errors.message}</span>}
				</div>
				{useButton(['submit', isFormValid])}
				{/* {loading && <p>Loading...</p>} */}
            	{/* {error && <p>{error}</p>} */}
				{/* {data && <div>
					<h3>Submission Successful</h3>
					<p>{JSON.stringify(data)}</p>
				</div>} */}
				{/* Display the response data */}
			</form>
		</div>
	);
};

export default Contact;
