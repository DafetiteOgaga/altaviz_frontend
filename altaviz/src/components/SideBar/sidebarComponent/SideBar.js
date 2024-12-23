import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./sidebar.css"
import { LoginContext } from '../../context/loginAuth/LoginOutContext';
import { AuthContext } from '../../context/checkAuth/AuthContext';
// import { listenForUpdates, stopListening } from '../../context/RealTimeNotificationContext/useChatsNotification';
import { useChatNotification } from '../../context/RealTimeNotificationContext/useChatsNotification';

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
	// let chatNotification;
	// if (chatNotifications&&chatNotifications?.firebaseChatValue) {
	// 	console.log({chatNotifications})
	// 	chatNotification = getTotalValue(chatNotifications)
	// }
	// console.log('chatsUpdates (Sidebar.js):', chatsUpdates)
	// console.log("setChatNotification Function Type:", typeof setChatNotification);
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

		// const handleNotificationUpdate = (data) => {
		// 	console.log("Received notifications:", data);
		// };

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

		// // Cleanup on unmount
		// return () => stopListening(authData?.id);
	}, [authData,
		// fromContext,
		// listenForUpdates, stopListening
	]);
	console.log('chatNotification:'.repeat(5), chatNotification)
	// console.log({newTotal})
	// const notiNum = 4
	// const chatNotification = 6
	return (
		<aside className='side-bar'>
			<nav>
				<h2>Sections</h2>
				<ul className='sidebar-ul'>
					{/* <Link to="/"><li>Home</li></Link> */}
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