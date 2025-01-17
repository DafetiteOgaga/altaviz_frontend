import { useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { FetchContext } from "../FetchContext";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
// import './login.css'
import QueryFieldFromDB from "../../SideBar/human_resource/QueryFieldFromDB";

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
		// gap: "15px",
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
	errorMsg: {
		color: "red",
		fontSize: "small",
		// textAlign: "center",
		fontStyle: 'italic',
		margin: '0',
	},
	successMessage: {
		// marginTop: "20px",
		// textAlign: "center",
		color: "green",
		fontSize: "small",
		fontStyle: 'italic',
	},
};

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
function PasswordResetRequest() {
	const hostDetails = window.location.origin
	const { usePostDataAPI } = useContext(FetchContext);
	const [allGood, setAllGood] = useState(false);
	const [dbCheck, setDBCheck] = useState(null);
	const [emailQuery, setEmailQuery] = useState('');
	const [delayRender, setDelayRender] = useState(false);
	// const [trigger, setTrigger] = useState(false);
	const trigger = useRef(false);
	// const respDisplay = useRef(null);
	const navigate = useNavigate()
	const [formData, setFormData] = useState(new FormData());
	const [emailFormat, setEmailFormat] = useState(null);
	const [email, setEmail] = useState("");
	const refInput = useRef(null);
	const handleDataChange = (data) => {
		console.log('data:', data.response)
		setAllGood(data.response==='taken')
		setDBCheck(data.response)
	}
	const handleInput = (e) => {
		const { name, value } = e.target;
		setEmail(value)
		// setEmailQuery(`${name}-${value}`)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (emailRegex.test(value)) {
			setEmailQuery(`${name}-${value}`)
			setEmailFormat(null)
		} else {
			setEmailQuery('')
			setEmailFormat(1)
		}
	}
	// let formData = new FormData();
	const setTrigger = (e) => {
		// e.preventDefault()
		if (email.trim()!=='') {
			const newFormData = new FormData();
			newFormData.append('email', email);
			newFormData.append('FEUrl', hostDetails);
			setFormData(newFormData)
			trigger.current = true
		}
	}
	const { postData, postLoading, postError } = usePostDataAPI(
		`reset-password-request/`, formData,
		trigger.current,
		// `/success`
	)
	useEffect(() => {
		if (postData||postError) {
			if (postData?.msg) {
				toast.success(postData.msg)
				setEmail('')
				navigate('/reset-update-password/',
					{state: { type: 'resetRequest', text: postData?.msg }})
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

	console.log(
		'\nemail:', email,
		'\nemailFormat:', emailFormat,
		'\npostData:', postData,
		'\npostError:', postError,
		'\npostLoading:', postLoading,
		'\nhostDetails:', hostDetails,
	)
	console.log('allGood:', allGood);
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
			<h4 style={styles.header}>Password Reset Request</h4>
			<form
			onSubmit={(e) => {e.preventDefault()}}
			style={styles.form}
			>
				<div style={styles.inputGroup}>
					{/* <label htmlFor="email" style={styles.label}>Email</label> */}
					<input
						ref={refInput}
						name="email"
						id="email"
						type="email"
						placeholder="Kindly enter your email address"
						value={email}
						onChange={(e) => handleInput(e)}
						style={{
							...styles.input,
							width: '100%',
							boxSizing: 'border-box',
						}}
						required
					/>
				</div>
				{
				// newUser.email &&
				<QueryFieldFromDB
				query={emailQuery}
				callbackOnDataChange={handleDataChange}
				passwordReset={true}/>}
				{(emailFormat&&email) && <p style={styles.errorMsg}>{`${email} is not an email`} (For demonstration only)</p>}

				<div style={{display: 'flex', justifyContent: "center", marginTop: '20px'}}>
					<Button
					onClick={(e)=>setTrigger(e)}
					// className="forget-password"
					type="submit"
					disabled={postLoading}
					>
						{postLoading ? "Sending link to email..." :	"Reset Password"}
					</Button>
				</div>
				{(postError&&emailFormat&&delayRender)&&<p style={styles.error}>{`${email} is not an email`}</p>}
				{(postError&&!emailFormat&&dbCheck!=='taken'&&delayRender)&&<p style={styles.error}>{postError}</p>}
			</form>
		</div>
	);
}

export default PasswordResetRequest;
