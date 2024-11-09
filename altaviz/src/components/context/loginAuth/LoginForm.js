import { useState, useContext } from "react";
import { LoginContext } from "./LoginOutContext";

function LoginForm() {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
	// const [loginTrigger, setLoginTrigger] = useState(false);

	// post setup
	const { Login, authData, authLoading, authError } = useContext(LoginContext);
	const handleLogin = async () => {
		const result = await Login(email, password, true);
		if (result !== null && result.success) {
			console.log('Login successful', result.data);
		} else {
			console.log('Login failed', result);
		}
			// setLoginTrigger(false);ogagadafetite@gmail.com
	};
	console.log('email:', email);
	console.log('password:', password);
	// console.log('loginTrigger:', loginTrigger);
	console.log('authData:', authData);
	return (
		<div>
			<form onSubmit={(e) => {
				e.preventDefault();
				handleLogin()}}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
				type="submit"
				disabled={authLoading}>
					{authLoading ? "Logging in..." : "Login"}
				</button>
				{authError && <p style={{ color: 'red' }}>{authError}</p>}
			</form>
		</div>
	)
}
export default LoginForm;