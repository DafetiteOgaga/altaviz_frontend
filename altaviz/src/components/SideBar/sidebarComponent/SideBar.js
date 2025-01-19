import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./sidebar.css"
import { LoginContext } from '../../context/loginAuth/LoginOutContext';
import { AuthContext } from '../../context/checkAuth/AuthContext';
// import { listenForUpdates, stopListening } from '../../context/RealTimeNotificationContext/useChatsNotification';
import { useChatNotification } from '../../context/RealTimeNotificationContext/useChatsNotification';
// import FlashyButton from './FlashyButton';
import styled, { keyframes } from "styled-components";

// Define the keyframes
const flash = keyframes`
	0% {
		background-position: 0% 50%;
	}
		100% {
		background-position: 100% 50%;
	}
`;

const glow = keyframes`
	0% {
		box-shadow: 0 0 5px #2A2A5F;
	}
	100% {
		box-shadow: 0 0 5px #3E3E87;
	}
`;

// Create the styled button
const FlashyButton = styled.a`
	background: linear-gradient(45deg, #B5B5BD, #3E3E87, #FBFBFB);
	background-size: 200% 200%;
	padding: 1rem 0;
	border-radius: 5px;
	transition: transform 0.2s ease;
	animation: ${flash} 1.5s infinite alternate, ${glow} 2s infinite;
`

const getTotalValue = (data) => {
	const totalNotification = Object.entries(data?.firebaseChatValue?.sendersList||{})
		?.reduce((total, [key, value]) => {
			// Accumulate the notificationCount of each sender
			return total + (value.notificationCount || 0); // Default to 0 if notificationCount is undefined
		}, 0); // Initial value is 0
		return totalNotification
}
function Sidebar() {
	const [chatNotification, setChatNotification] = useState(null);
	// const chatsUpdates = listenForUpdates(7)
	const { chatNotifications, listenForUpdates, stopListening } = useChatNotification();
	const redirectTo = useNavigate();
	const { Logout } = useContext(LoginContext);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { authData } = useContext(AuthContext)
	useEffect(() => {
		if (authData) setIsAuthenticated(true);
		else setIsAuthenticated(false);
	}, [authData])
	const logHandler = async () => {
        const result = await Logout();
        if (result.success) {
			console.log('Logout:', result.success);
            redirectTo('/');  // Redirect to login page after logout
        } else {
            console.error('Logout failed');
        }
    };
	const dept = authData?.role
	const disableStyles = {
		color: '#999',
		pointerEvents: 'none',
		cursor: 'default'
	}
	console.log({dept})
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl)
	useEffect(() => {
		// const receiverID = 7
		console.log('\nreceiverIDreceiverIDreceiverIDreceiverID'.repeat(5))

		// Start listening for updates
		listenForUpdates(authData?.id, (data) => {
			console.log({data})
			console.log('\ndata.firebaseChatKey:', data.firebaseChatKey);
			console.log('\ndata.firebaseChatValue:', data.firebaseChatValue);
			const totalNotification = Object.entries(data?.firebaseChatValue?.sendersList||{})
				?.reduce((total, [key, value]) => {
					// Accumulate the notificationCount of each sender
					return total + (value.notificationCount || 0); // Default to 0 if notificationCount is undefined
				}, 0); // Initial value is 0

			console.log('\ntotalNotification:', totalNotification);
			setChatNotification(totalNotification)
		});
	}, [authData,]);
	console.log('chatNotification:'.repeat(5), chatNotification)
	const handleClick = () => {
		console.log("flah Button Clicked! from sidebar");
		// alert("Styled-Component Button Clicked!");
	};
	return (
		<aside className='side-bar'>
			<nav>
				<h2>Sections</h2>
				<ul className='sidebar-ul'>
					{/* <Link to="/"><li>Home</li></Link> */}
					<FlashyButton href='##'
					onClick={(e)=>{e.preventDefault();redirectTo('/login-details')}}>
						<li
						style={{
							padding: 0,
							backgroundColor: 'transparent',
							boxShadow: 'none',
							color: '#fff',
							// whiteSpace: 'pre',
							// fontSize: '1rem',
						}}>
							{'Get Logins'}
						</li>
					</FlashyButton>
					<Link style={dept==='custodian'?null:disableStyles} to={`/${dept}`}><li>Custodian</li></Link>
					<Link style={dept==='workshop'?null:disableStyles} to={`/${dept}`}><li>Workshop</li></Link>
					<Link style={dept==='engineer'?null:disableStyles} to={`/${dept}`}><li>Engineer</li></Link>
					<Link style={dept==='help-desk'?null:disableStyles} to={`/${dept}`}><li>Help Desk</li></Link>
					<Link style={dept==='supervisor'?null:disableStyles} to={`/${dept}`}><li>Supervisor</li></Link>
					<Link style={dept==='human-resource'?null:disableStyles} to={`/${dept}`}><li>Human Resource</li></Link>
					<Link style={isAuthenticated?null:disableStyles} to="/chatroom"><li>Chat Room <span> </span>
						{/* notification alert */}
						{/* <span style={{...styles.notification, display: ((chatNotification===0||chatNotification===null)?'none':null), ...((chatNotification||0)>9?styles.greater:styles.less)}}>{(chatNotification||0)}</span> */}
					</li></Link>
					{/* {apiBaseUrl==='http://127.0.0.1:8000' &&
						<Link to="/chatroom"><li>Chat Room</li></Link>
					} */}
					{!isAuthenticated ?
						(<Link to="/login"><li>Login</li></Link>) :
						(<Link onClick={logHandler} to="/"><li>Logout</li></Link>)
					}
					<Link style={isAuthenticated?null:disableStyles} to="/profile"><li>Profile</li></Link>
					{apiBaseUrl==='http://127.0.0.1:8000' &&
					<>
						{/* <Link to="/chatroom"><li>Chat Room</li></Link> */}
						<Link to="/reset-password/:uid/:timer/:token"><li>confirm reset</li></Link>
						<Link to="/login/password-reset"><li>password reset</li></Link>
						<Link to="/reset-update-password"><li>password update done</li></Link>
						<Link to="/test-auth"><li>test authentication</li></Link>
						<Link to="/test"><li>testing backend</li></Link>
					</>}
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;

const styles = {
	notification: {
		backgroundColor: "blue",
		// backgroundColor: "#3E3E97",
		color: "white",
		borderRadius: "50%",
		fontSize: "14px",
		fontWeight: 'bolder',
	},
	greater: {
		padding: "3px 5px 3px 2px",
	},
	less: {
		padding: "2px 7px 2px 5px",
	}
}