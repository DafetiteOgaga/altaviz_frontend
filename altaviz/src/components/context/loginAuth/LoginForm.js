import { useState, useContext, useEffect, useRef } from "react";
import { LoginContext } from "./LoginOutContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { CSSTransition } from "react-transition-group";
// import { useNavigate } from 'react-router-dom'
// import './login.css'

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
	button: {
		padding: "10px",
		// margin: "0 140px",
		fontSize: "16px",
		color: "#fff",
		backgroundColor: "#B5B5BD",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		transition: "background-color 0.3s, transform 0.2s",
	},
	buttonHover: {
		backgroundColor: "#A5A5B9", // Darker shade for hover
	},
	buttonActive: {
		backgroundColor: "#909090", // Even darker shade for active
		transform: "scale(0.99)", // Slightly shrink the button
	},
	error: {
		color: "red",
		fontSize: "14px",
		textAlign: "center",
	},
	successMessage: {
		marginTop: "20px",
		textAlign: "center",
		color: "green",
		fontSize: "16px",
	},
};

function LoginForm() {
	// const toDashboard = useNavigate()
	const refInput = useRef(null);
	const [isHover, setIsHover] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	useEffect(() => {
        refInput.current.focus();
    }, [])
	// const [loginTrigger, setLoginTrigger] = useState(false);

	const getButtonStyle = () => {
		let buttonStyle = { ...styles.button };
		if (isHover) {
			buttonStyle = { ...buttonStyle, ...styles.buttonHover };
		}
		if (isActive) {
			buttonStyle = { ...buttonStyle, ...styles.buttonActive };
		}
		return buttonStyle;
	};

	// post setup
	// let result;
	const { Login, authData, authLoading, authError } = useContext(LoginContext);
	const handleLogin = async () => {
		const result = await Login(email, password, true);
		if (result?.success) {
			console.log('Login successful', result.data);
		} else {
			console.log('Login failed', result);
		}
			// setLoginTrigger(false);ogagadafetite@gmail.com
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}
	const visiButtonStyle = {
		position: 'absolute',
		right: '444px',
		top: '63.3%',
		transform: 'translateY(-50%)',
		color: '#999',
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		padding: '0',
		margin: '0',
		fontSize: '19px',
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
						style={styles.input}
						required
					/>
				</div>
				<div style={styles.inputGroup}>
					<label htmlFor="password" style={styles.label}>Password</label>
					{/* <div style={{position: 'relative'}}> */}
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={{...styles.input, position: 'relative'}}
							required
						/>
					{/* </div> */}
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
				{/* <button type="submit" style={styles.button} disabled={authLoading}> */}
				<button
					type="submit"
					disabled={authLoading}
					style={getButtonStyle()}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onMouseDown={() => setIsActive(true)}
					onMouseUp={() => setIsActive(false)}
				>
					{authLoading ? "Logging in..." : "Login"}
				</button>
				{authError && <p style={styles.error}>{authError}</p>}
			</form>
			{/* {authData && (
				<div style={styles.successMessage}>
					<p>Welcome back, {authData.username}!</p>
				</div>
			)} */}
		</div>
	);
}

export default LoginForm;
