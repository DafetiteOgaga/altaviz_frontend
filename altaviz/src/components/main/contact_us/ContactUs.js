import { useState, useContext } from 'react';
// import useButton from '../hooks/useButton';
import { FetchContext } from '../../context/FetchContext';
import { GlobalContext } from '../../context/Context';
// import useFetchPost from '../hooks/useFetchPost';
import "./contactus.css"

// const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
// console.log('\napiBaseUrl:', apiBaseUrl)
const Contact = () => {
	const fields = {
		name: '',
		email: '',
		message: '',
	}
	const { useButton } = useContext(GlobalContext);
	const { usePostDataAPI } = useContext(FetchContext);
	const [formData, setFormData] = useState(fields);

	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	});

	const [isFormValid, setIsFormValid] = useState(false);
	const [submitTrigger, setSubmitTrigger] = useState(false);
	// const [ IsSubmitted, setIsSubmitted] = useState(false);
    usePostDataAPI(`contact-us/`, formData, submitTrigger, fields);

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
			// setIsSubmitted(!IsSubmitted);
		};
	};
	// useEffect(() => {
	// 	if (postData || postError) {
	// 		setPostTrigger(() => {
	// 			console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
	// 			return false
	// 		});
	// 		// Reset formValue to default state
	// 		setFormValue([{ item: '' }]);
	// 	}
	// }, [postTrigger, postData, postLoading, postError])

	return (
		<div className='background-color contact-page'>
			<h2>Contact Us</h2>
			<form className='contact-form-page'
				onSubmit={useHandleSubmit}
				onClick={useHandleSubmit}>
				<div className='element-container'>
					<input
						type="text"
						name="name"
						placeholder='Name (Optional)'
						autoComplete='name'
						value={formData.name}
						onChange={handleChange}
					/>
					<div className='span-container'>
						{errors.name && <span>{errors.name}</span>}
					</div>
				</div>
				<div className='element-container'>
					<input
						type="email"
						name="email"
						placeholder='Email address'
						autoComplete='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<div className='span-container'>
						{errors.email && <span>{errors.email}</span>}
					</div>
				</div>
				<div className='element-container'>
					<textarea
						name="message"
						placeholder='Message ...'
						value={formData.message}
						rows='6'
						onChange={handleChange}
					/>
					<div className='span-container'>
						{errors.message && <span>{errors.message}</span>}
					</div>
				</div>
				{useButton(['submit', isFormValid])}
			</form>
		</div>
	);
};

export default Contact;
