import { useState, useContext, useEffect, useRef } from "react";
import { LoginContext } from "./LoginOutContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from "styled-components";
import { AuthContext } from "../checkAuth/AuthContext";
// import { CSSTransition } from "react-transition-group";
import { Link, useNavigate } from 'react-router-dom'

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
		textAlign: "center",
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
	},
	error: {
		color: "red",
		fontSize: "14px",
		textAlign: "center",
	},
	successMessage: {
		// marginTop: "20px",
		// textAlign: "center",
		color: "#909099",
		fontSize: "small",
		fontStyle: "italic",
		marginTop: '-10px'
		
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

function LoginForm() {
	const { authData } = useContext(AuthContext);
	const navigate = useNavigate()
	const refInput = useRef(null);
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	// post setup
	// let result;
	const { Login, authLoading, authError } = useContext(LoginContext);
	const handleLogin = async () => {
		const result = await Login(email, password, true);
		if (result?.success) {
			console.log('Login successful', result.data);
		} else {
			console.log('Login failed', result);
		}
			// setLoginTrigger(false);ogagadafetite@gmail.com
	};
	useEffect(() => {
        refInput.current.focus();
		if (authData) navigate(`/${authData.role}`)
    }, [authData])

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}

	console.log('email:', email);
	console.log('password:', password);
	// console.log('loginTrigger:', loginTrigger);
	console.log('authData:', authData);
	return (
		<div style={styles.container}>
			<h4 style={styles.header}>Login</h4>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
				style={styles.form}
			>
				<div style={styles.inputGroup}>
					<label htmlFor="email" style={styles.label}>Email</label>
					<input
						ref={refInput}
						id="email"
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{
							...styles.input,
							width: '100%',
							boxSizing: 'border-box',
						}}
						required
					/>
				</div>
				<div style={{...styles.inputGroup}}>
					<label htmlFor="password" style={styles.label}>Password</label>
					<div style={{position: 'relative'}}>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={{
								...styles.input,
								width: '100%',
								boxSizing: 'border-box',
							}}
							required
						/>
						<button
						type="button"
						onClick={togglePasswordVisibility}
						style={{
							...visiButtonStyle,
						}}
						>
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					</div>
				</div>
				{/* <button type="submit" style={styles.button} disabled={authLoading}> */}
				<Button
					type="submit"
					disabled={authLoading}
				>
					{authLoading ? "Logging in..." : "Login"}
				</Button>
				<Link
				to={'password-reset'}
				style={styles.successMessage}>
					Forgot password
				</Link>
				{authError && <p style={styles.error}>{authError}</p>}
			</form>
		</div>
	);
}

export default LoginForm;
