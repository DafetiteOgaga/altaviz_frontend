import { database } from "./firebaseChatsNotification";
import { ref, onValue, off, get, set, update, remove } from "firebase/database";
import { createContext, useContext, useState } from "react";

const chatNotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [chatNotifications, setChatNotifications] = useState({});
	const [isListening, setIsListening] = useState(false);
	const [presenceData, setPresenceData] = useState({});
	const [isOnline, setIsOnline] = useState(null);

	function listenForUpdates(receiverID, callbackFxn) {
		console.log('listening for updates ...');
		console.log({receiverID})
		console.log("Callback Function Type:", typeof callbackFxn);

		if (typeof callbackFxn !== "function") {
			console.log("callbackFxn is not a function yet");
			return;
		}
		if (receiverID===null||receiverID===undefined) {
			console.log("no ID passed yet");
			return;
		}

		const notificationsRef = ref(database, `chat-notifications/${receiverID}`);
		setIsListening(true);

		onValue(notificationsRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				console.log("New chatNotifications:", data);
				const firebaseChatKey = Object.keys?.(data||{})?.find?.(key => key)
				console.log("\nfirebaseChatKey:", firebaseChatKey);
				const firebaseChatValue = data[firebaseChatKey]
				console.log("\nfirebaseChatValue:", firebaseChatValue);

				// Update notifications state
				setChatNotifications({ firebaseChatKey, firebaseChatValue });

				callbackFxn({ firebaseChatKey, firebaseChatValue });
			}
		});
	// return firebaseChatKey;
	}

	// Cleanup function
	function stopListening(receiverID) {
		const notificationsRef = ref(database, `chat-notifications/${receiverID}`);
		off(notificationsRef);
		setIsListening(false);
		console.log("Stopped listening for updates");
	}

	// Create or add a new notification
	function createNotification(idList) {
		const notificationsRef = ref(database, 'chat-notifications/IDs');
		// const notificationsRef = ref(database, `chat-notifications/${receiverID}`);
		set(notificationsRef, idList)
			.then(() => {
				console.log("Notification created successfully!");
			})
			.catch((error) => {
				console.error("Error creating notification:", error);
			});
	}

	// get presence
	function updatePresence(id, status) {
		const presenceRef = ref(database, 'chat-notifications/IDs');

		// Fetch existing data
		get(presenceRef).then((snapshot) => {
			const presenceData = snapshot.val() || {}; // Get existing data or default to an empty object
			console.log("Current presence data:", presenceData);

			// Update the current user's status
			presenceData[id] = status;
			setPresenceData(presenceData); // to be passed down

			// Save the updated presence data
			set(presenceRef, presenceData)
				.then(() => {
					console.log(`Presence updated successfully to '${status}' for user ${id}`);
				})
				.catch((error) => {
					console.error("Error updating presence:", error);
				});
		});
	}

	// observe presence
	function observer(id, callback) {
		// console.log(`listening for updates on ${id} ...`);
		if (id===null||id===undefined) {
			console.log("no ID passed yet");
			return;
		}
		const observationsRef = ref(database, `chat-notifications/IDs/${id}`);
		const observationDetails = onValue(observationsRef, (snapshot) => {
			const observation = snapshot.val();
			if (observation) {
				console.log("observation:", observation);
				setIsOnline(observation);
				if (typeof callback === "function") {
					callback(observation); // Return the data via the callback
				}
			}
		});
	}


	// Edit an existing notification
	function editNotification(idList) {
		let updateaData = ref(database, 'chat-notifications');
		onValue(updateaData, (snapshot) => {
			const presenceData = snapshot.val();
			if (presenceData) {
				console.log("presenceData:", presenceData);
				console.log("idList:", { IDs: idList });
				const updatedData = { IDs: idList };

			update(updateaData, updatedData)
				.then(() => {
					console.log("Notification updated successfully!");
				})
				.catch((error) => {
					console.error("Error updating notification:", error);
				});
			}
		});
	}

	// Delete a notification
	function deleteNotification(receiverID, sendersID, notificationKey) {
		const notificationRef = ref(database, `chat-notifications/${receiverID}/${notificationKey}/sendersList/${sendersID}`);
		remove(notificationRef)
			.then(() => {
				console.log("Notification deleted successfully!");
			})
			.catch((error) => {
				console.error("Error deleting notification:", error);
			});
	}

	// Context value to expose globally
	const contextValue = {
		chatNotifications,
		isListening,
		listenForUpdates,
		stopListening,
		createNotification,
		editNotification,
		deleteNotification,
		updatePresence,
		presenceData,
		isOnline,
		observer,
	};

	return (
		<chatNotificationContext.Provider value={contextValue}>
			{children}
		</chatNotificationContext.Provider>
	);
};

export const useChatNotification = () => useContext(chatNotificationContext);