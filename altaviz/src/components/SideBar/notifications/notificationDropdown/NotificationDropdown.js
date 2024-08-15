import { useState, useEffect } from "react";
import "./notificationDropdown.css"
import { Link } from "react-router-dom";

function NotificationDropdown({
	currentNoOfAttention,
	details,
	bkColor,
	confirmResolution,
	componentPage
	}) {

	const requestNotification = 6;
	const [notificatn, setNotificatn] = useState(requestNotification);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const spanStyles = {
		color: isActive ? '#333' : isHovered ? 'darkgreen' : 'green',
		padding: '0.5rem 0.8rem',
		borderRadius: '10px',
		cursor: 'pointer',
		fontWeight: 'bold',
		textDecoration: 'underline',
		backgroundColor: isActive ? 'lightgrey' : isHovered ? '#2a2a5f0e' : 'transparent',

		// color: 'green',
		// padding: ' 0 0.3rem',
		// borderRadius: '3px',
		// cursor: 'pointer',
		// fontWeight: 'bold',
		// textDecoration: 'underline',
	};

	useEffect(() => {
	if (notificatn !== requestNotification) {
		setNotificatn(requestNotification);
	}
	}, [requestNotification, notificatn]);
	const toggleDropdown = (e) => {
		e.preventDefault();
		setIsDropdownVisible(!isDropdownVisible);
	}


	function listHandler(listValue) {
		let newList = [];
		console.log('listHandler fxn');
		console.log('newList before fxn:', newList);
		for (let [index, value] of listValue.entries()) {
			console.log('index:', index, 'and value:', value);
			if (index === 5) {
				newList.push(['', 'Click to See All']);
				break;
			}
			newList.push(value);
		}
		console.log('newList after fxn:', newList);
		return newList;
	}
	console.log('old list: ', details);
	details = listHandler(details);
	console.log('new list: ', details);
	console.log('bkColor: ', bkColor);
	const handleResolutionConfirmation = (e, index) => {
		console.log('first came here!');
		if (confirmResolution && index !== details.length - 1) {
			e.preventDefault();
			const form = new FormData();
			form.append('resolution', 1); // 1 indicates yes (confirmed)
			// send to backend via post method
			form.forEach((k, v) => {
				console.log('key:', k, '\nvalue:', v);
			})
			// after every confirmation the server should send updated
			// entries for new rendering (use useEffect)
		}
	}
	return (
	<div className="notification-style">
		<div
		className="notification-bk"
		style={{backgroundColor: `${bkColor}`}}
		>
			<p>
				<a
				href="/fault-details/"
				onClick={toggleDropdown}>
					{currentNoOfAttention} View
				</a>
			</p>
		</div>
		{(componentPage !== '/help-desk' &&
			componentPage !== '/supervisor') &&
		(<div className="notification-dropdown">
			{details.map((data, index) => {
			return (<ul key={index}>
				<li
				style={{display: 'flex',
					flexDirection: 'row'
				}}
				><Link
				style={(index === details.length - 1) ? {
					color: 'blue',
					textDecoration: 'underline'
				} : {}}
				// onClick={(e) => handleResolutionConfirmation(e, index)}
				to={(index === details.length - 1) ? `fault-details/` : `fault-details/${data[0]}`}>
					{data[1]} {confirmResolution && (
						// <>
							<span
							onClick={(e) => handleResolutionConfirmation(e, index)}
							style={spanStyles}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							onMouseDown={() => setIsActive(true)}
							onMouseUp={() => setIsActive(false)}
							// style={{
							// 	color: 'green',
							// 	padding: ' 0 0.3rem',
                            //     borderRadius: '3px',
                            //     cursor: 'pointer',
							// 	fontWeight: 'bold',
							// 	textDecoration: 'underline',
							// }}
							>{index === details.length - 1 ? ('') : (componentPage === 'custodian') ? ('Confirm') : ('Verify')}</span>
						// </>
					)}
				</Link></li>
			</ul>)})}
		</div>)}
	</div>
	);
}

export default NotificationDropdown;
