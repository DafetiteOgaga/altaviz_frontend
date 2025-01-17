import { useState, useContext, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom'
import { PasswordCheckFxn } from "../../SideBar/human_resource/createAndUpdateUserForms/password";
import { FetchContext } from "../FetchContext";
import { toast } from "react-hot-toast";

const Button = styled.button`
	padding: 10px;
	font-size: 16px;
	color: #fff;
	background-color: #B5B5BD;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s, transform 0.2s;
	&:hover {
		background-color: #A5A5B9;
	}
	&:active {
		backgroundColor: #909090;
		transform: scale(0.9)
	}
`
const styles = {
	container: {
		maxWidth: "400px",
		margin: "100px auto",
		padding: "20px",
		backgroundColor: "#f9f9f9",
		border: "1px solid #ddd",
		borderRadius: "8px",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	},
	header: {
		textAlign: "start",
		marginTop: "0",
		marginBottom: "10px",
		color: "#788",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "15px",
	},
	inputGroup: {
		display: "flex",
		flexDirection: "column",
	},
	label: {
		marginBottom: "5px",
		fontSize: "14px",
		color: "#555",
	},
	input: {
		padding: "10px",
		fontSize: "16px",
		border: "1px solid #ccc",
		borderRadius: "4px",
		width: '100%',
		boxSizing: 'border-box',
	},
	errorStylings: {
		color: 'red',
		fontSize: 'small',
		fontStyle: 'italic',
		marginTop: '-15px'
	},
	successMessage: {
		// marginTop: "20px",
		// textAlign: "center",
		color: "#909099",
		fontSize: "small",
		fontStyle: "italic",
		marginTop: '-10px'
	},
	error: {
		color: "red",
		fontSize: "14px",
		textAlign: "center",
	},
};
const visiButtonStyle = {
	position: 'absolute',
	right: '3%',
	top: '60%',
	transform: 'translateY(-50%)',
	color: '#999',
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	padding: '0',
	margin: '0',
	fontSize: '19px',
}

function PasswordRestConfirm() {
	const { usePostDataAPI } = useContext(FetchContext);
	const trigger = useRef(false);
	const urlData = useParams()
	const navigate = useNavigate()
	const refInput = useRef(null);
	const [userPassword, setUserPassword] = useState({
		password1: '',
		password2: '',
	});
	const [passwordError, setPasswordError] = useState({});
	const [formData, setFormData] = useState(new FormData());
	const [delayRender, setDelayRender] = useState(false);
    // const [password, setPassword] = useState("");
	const [showPassword1, setShowPassword1] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const { passwordCheck } = PasswordCheckFxn(
		userPassword, setUserPassword,
		passwordError, setPasswordError
	)
	const setTrigger = (e) => {
		if (passwordCheck) {
			const newFormData = new FormData();
			newFormData.append('new_password', userPassword.password);
			newFormData.append('uid', `${urlData.uid}`);
			newFormData.append('token', `${urlData.token}`);
			// newFormData.append('FEUrl', apiBaseUrl);
			setFormData(newFormData)
			trigger.current = true
		}
	}
	const { postData, postLoading, postError } = usePostDataAPI(
		`reset-password-done/${urlData.uid}/${urlData.token}/`, formData,
		trigger.current,
		// `/success`
	)
	useEffect(() => {
		if (postData||postError) {
			if (postData?.msg) {
				toast.success(postData.msg)
				navigate('/reset-update-password/',
					{state: { type: 'resetDone', text: postData?.msg, url: '/login'}})
			}
			if (postError) setDelayRender(true)
			console.log(
				'useffectresponse',
				'\npostData:', postData,
				'\npostError:', postError
			)
			trigger.current = false
			setFormData(new FormData())
			// toDashboard('/dashboard')
		}
	}, [postData, postLoading, postError])
	useEffect(() => {
        refInput.current.focus();
    }, [])
	const handleInput = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setUserPassword({...userPassword, [name]: value})
	}

	const togglePasswordVisibility1 = () => {
		setShowPassword1(!showPassword1);
	}
	const togglePasswordVisibility2 = () => {
		setShowPassword2(!showPassword2);
	}

	// console.log('email:', email);
	console.log(
		'\npassword1:', userPassword.password1,
		'\npassword2:', userPassword.password2,
	);
	console.log(
		'\npasswordError:', passwordError,
		'\nuserPassword:', userPassword,
		'\npasswordCheck:', passwordCheck,
	)
	console.log(
		'\npostData:', postData,
		'\npostError:', postError,
		'\npostLoading:', postLoading,
		'\nurlData:', urlData,
		'\nuid:', urlData.uid,
		'\ntoken:', urlData.token,
	)
	useEffect(() => {
		if (delayRender) {
			const timeOID = setTimeout(() => {
				setDelayRender(false)
			}, 2000)
			return () => clearTimeout(timeOID)
		}
	}, [delayRender])
	return (
		<div style={styles.container}>
			<h4 style={styles.header}>Password Reset</h4>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// handleLogin();
				}}
				style={styles.form}
			>
				<div style={styles.inputGroup}>
					<label htmlFor="password1" style={styles.label}>Password</label>
					<div style={{position: 'relative'}}>
						<input
							id="password1"
							name="password1"
							ref={refInput}
							type={showPassword1 ? 'text' : 'password'}
							placeholder="Enter your password"
							value={userPassword.password1}
							onChange={(e) => handleInput(e)}
							style={styles.input}
							required/>
						<button
						type="button"
						onClick={togglePasswordVisibility1}
						style={visiButtonStyle}>
							{showPassword1 ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>
				{!passwordCheck && <span style={styles.errorStylings}>{passwordError.password1}</span>}
				<div style={{...styles.inputGroup}}>
					<label htmlFor="password2" style={styles.label}>Confirm Password</label>
					<div style={{position: 'relative'}}>
						<input
							id="password2"
							name="password2"
							type={showPassword2 ? 'text' : 'password'}
							placeholder="Confirm your password"
							value={userPassword.password2}
							onChange={(e) => handleInput(e)}
							style={styles.input}
							required/>
						<button
						type="button"
						onClick={togglePasswordVisibility2}
						style={visiButtonStyle}>
							{showPassword2 ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>
				{!passwordCheck && <span style={styles.errorStylings}>{passwordError.password2}</span>}
				{/* <button type="submit" style={styles.button} disabled={authLoading}> */}
				<Button
				onClick={(e)=>setTrigger(e)}
				type="submit"
				disabled={postLoading}
				>
					{postLoading ? "Resetting ..." : "Reset Password"}
				</Button>
				{(postError&&delayRender)&&<p style={styles.error}>{postError}</p>}
				{/* {authError && <p style={styles.error}>{authError}</p>} */}
			</form>
		</div>
	);
}

export default PasswordRestConfirm;
