

import "../resolveAndPending.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RequestNotification () {
	const requestNotification = 6;
	const [notificatn, setNotificatn] = useState(requestNotification);
	// const [getText, setGetText] = useState(null);

	useEffect(() => {
		if (notificatn !== requestNotification) {
			setNotificatn(requestNotification);
		}
	}, [requestNotification, notificatn]);
	// const toggleDropdown = (e) => {
	// 	e.preventDefault();
	// 	setIsDropdownVisible(!isDropdownVisible);
	// }
	// const closeDropdown = () => {
	// 	if (isDropdownVisible) {
	// 		setIsDropdownVisible(false);
	// 	}
	// }
	// console.log('id array:', document.querySelectorAll('#dropdown-position'));
	// console.log('prop message from parent:', text)
	// console.log('prop message from parent:', text.prop)
	return (
		<>
			<div className="pending-faults">
				<p><strong>You have  </strong>
					{notificatn ? (
						<Link
						// className="pending-requests"
						style={{
							border: '1px solid',
							padding: '0 0.5rem',
							backgroundColor: 'rgba(255, 255, 0, 0.6)',
							borderRadius: '5px',
							// color: green;
							// color: 'yellow'
						}}
						to='request-list/'>
							{notificatn} Pending Requests
						</Link>
					) : ' No Pending Requests'}</p>
			</div>
		</>
	)
}
export default RequestNotification;