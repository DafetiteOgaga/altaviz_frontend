import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from "styled-components"

const Button = styled.div`
	// display: flex;
	cursor: pointer;
	// justify-content: center;
	color: #555;
	border: 0.01px solid;
	border-radius: 5px;
	font-family: sans-serif;
	font-size: 20px;
	padding: 0.1rem 1rem;
	&:hover {
		box-shadow: -5px 5px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a935d;
	}
	&:active {
		box-shadow: -1px 1px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a93;
	}
`

export function PasswordCheckFxn (
	userPassword, setUserPassword,
	passwordError, setPasswordError
) {
	const [passwordCheck, setPasswordCheck] = useState(false);
	useEffect(() => {
		if (userPassword.password1 && userPassword.password2) {
			// enforce other checks here
			setPasswordCheck(userPassword.password1===userPassword.password2);
		}
	}, [
		// password1, password2,
		userPassword
	]);

	useEffect(() => {
		if (passwordCheck) {
			setPasswordError({
				...passwordError,
				password1: '',
				password2: '',
			})
			setUserPassword({
				...userPassword,
				password: userPassword.password1||userPassword.password2,
			});
		} else if (!passwordCheck && userPassword.password1 !== '' && userPassword.password2 !== '') {
			setPasswordError({
				...passwordError,
				password1: 'Passwords do not match',
				password2: 'Passwords do not match',
			})
			setUserPassword({
				...userPassword,
				password: '',
			});
		}
	}, [passwordCheck, userPassword.password1, userPassword.password2]);
	return { passwordCheck }
}
//  {passwordCheckFxn};

function Passwords({passwordValue, postState, submission}) {
	const [userPassword, setUserPassword] = useState({
		oldPassword: '',
		password1: '',
		password2: ''
	});
	const [passwordError, setPasswordError] = useState({});
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const toggleOldPasswordvisi1 = () => {
		setShowOldPassword(!showOldPassword);
	}
	const togglePasswordvisi1 = () => {
		setShowPassword1(!showPassword1);
	}
	const togglePasswordvisi2 = () => {
		setShowPassword2(!showPassword2);
	}

	const { passwordCheck } = PasswordCheckFxn(
		userPassword, setUserPassword,
		passwordError, setPasswordError
	)

	useEffect(() => {
		if (userPassword.password&&userPassword.oldPassword) {
			console.log('password:', userPassword.password)
			passwordValue({
				oldPassword: userPassword.oldPassword,
				password: userPassword.password,
			})
		}
	}, [userPassword]);

	const HandlePasswordInput = (e) => {
		const { name, value } = e.target;
		// if (name==='password1'||name==='password2') {
		setUserPassword(prevState => ({
			...prevState,
			[name]: value,
		}));
	}
	console.log(
		'\npasswordError:', passwordError,
		'\nuserPassword:', userPassword,
		'\npasswordCheck:', passwordCheck,
	)
	return (
		<>
			{/* ............... password and confirmation ................ */}
			<div style={{
				display: 'flex',
				justifyContent: 'space-around',
				padding: '30px 0'
			}}
			className="user-fields-row">
				<div className="input-field">
					<label style={styles.label} htmlFor="oldPassword">Old Password:</label>
					<div style={{ position: 'relative' }}>
						<input
						type={showOldPassword ? 'text' : 'password'}
						name="oldPassword"
						id="oldPassword"
						style={styles.input}
						value={userPassword.oldPassword}
						onChange={HandlePasswordInput}
						placeholder=' Required'
						/>
						<button
						type="button"
						onClick={toggleOldPasswordvisi1}
						style={{
							...styles.visiButtonStyle,
						}}
						>
							{showOldPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
					{(!userPassword.oldPassword&&(userPassword.password1||userPassword.password2)) && <span style={{...styles.errorStylings}}>Enter old password</span>}
				</div>
				<div className="input-field">
					<label style={styles.label} htmlFor="password1">Password:</label>
					<div style={{ position: 'relative' }}>
						<input
						type={showPassword1 ? 'text' : 'password'}
						name="password1"
						id="password1"
						style={styles.input}
						value={userPassword.password1}
						onChange={HandlePasswordInput}
						placeholder=' Required'
						/>
						<button
						type="button"
						onClick={togglePasswordvisi1}
						style={{
							...styles.visiButtonStyle,
						}}
						>
							{showPassword1 ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
					{!passwordCheck && <span style={{...styles.errorStylings}}>{passwordError.password1}</span>}
				</div>
				<div className="input-field">
					<label style={styles.label} htmlFor="password2">Password confirmation:</label>
					<div style={{ position: 'relative' }}>
						<input
						type={showPassword2 ? 'text' : 'password'}
						name="password2"
						id="password2"
						style={styles.input}
						value={userPassword.password2}
						onChange={HandlePasswordInput}
						placeholder=' Required'
						/>
						<button
						type="button"
						onClick={togglePasswordvisi2}
						style={{
							...styles.visiButtonStyle,
						}}
						>
							{showPassword2 ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
					{!passwordCheck && <span style={{...styles.errorStylings}}>{passwordError.password2}</span>}
				</div>
			</div>
			{/* update password button */}
			<div style={{
				display: 'flex',
				justifyContent: 'center',
			}}>
				<Button type="button"
				onClick={()=> {
					console.log('clicked'.repeat(20));
					submission({url: 'change-password'});
				}}
				>
					{!postState ? 'Update Password': 'Updating...'}
				</Button>
			</div>
		</>
	)
}
export default Passwords;

const styles = {
	label: {
		fontSize: 'large',
		color: '#444',
		// fontWeight: 'bold',
	},
	input: {
		padding: "4px",
		fontSize: "16px",
		border: "1px solid #ccc",
		borderRadius: "5px",
		width: "100%",
	},
	visiButtonStyle: {
		position: 'absolute',
		right: '0',
		top: '60%',
		transform: 'translateY(-50%)',
		color: '#999',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		padding: '0',
		margin: '0',
		fontSize: '20px',
	},
	errorStylings: {
		color: 'red',
		fontSize: 'small',
		fontStyle: 'italic',
	},
}

// to use this component, import it into the parent
// component and pass a function as a prop to receive
// the password value
//
// use state variable: const [passwordValue, setPasswordValue] = useState(null);
//
// define a function to receive the password value from the
// child and set it to the state variable in the parent:
// const passwordValue = (data) => {
// 	setPasswordValue(data)
// 	console.log('data received:', data)
// }
//
// pass the function as a prop to the child component as
// passwordValue