import React, { useEffect, useState } from 'react';
import firebase from './firebase'; // import the Firebase setup

function ChatNotifications() {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		// Reference to the notifications path in Realtime Database
		const notificationsRef = firebase.database().ref('notifications');

		// Set up a listener to run whenever a new notification is added
		notificationsRef.on('child_added', (snapshot) => {
		const notification = snapshot.val();
		setNotifications(prevNotifications => [...prevNotifications, notification]);
		});

		// Cleanup listener when component is unmounted
		return () => {
		notificationsRef.off('child_added');
		};
	}, []);

	return (
		<div>
		<h1>Notifications</h1>
		<ul>
			{notifications.map((noti, index) => (
			<li key={index}>
				{noti.message} - {noti.timestamp}
			</li>
			))}
		</ul>
		</div>
	);
}

export default ChatNotifications;
