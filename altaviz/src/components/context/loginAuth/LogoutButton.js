import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginOutContext";

const LogoutButton = () => {
    const { Logout } = useContext(LoginContext);
    const navigate = useNavigate();  // To redirect after logout

    const handleLogout = async () => {
        const result = await Logout();
        if (result.success) {
			console.log('Logout:', result.success);
            navigate('/');  // Redirect to login page after logout
        } else {
            console.error('Logout failed');
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
