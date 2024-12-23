import { database } from "./firebaseChatsNotification";
import { ref, onValue, off, set, update, remove } from "firebase/database";
import { createContext, useContext, useState } from "react";

const chatNotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [chatNotifications, setChatNotifications] = useState({});
	const [isListening, setIsListening] = useState(false);

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
	function createNotification(receiverID, notificationData) {
		const notificationsRef = ref(database, `chat-notifications/${receiverID}`);
		set(notificationsRef, notificationData)
			.then(() => {
				console.log("Notification created successfully!");
			})
			.catch((error) => {
				console.error("Error creating notification:", error);
			});
	}

	// Edit an existing notification
	function editNotification(receiverID, notificationKey, updatedData) {
		const notificationRef = ref(database, `chat-notifications/${receiverID}/${notificationKey}`);
		update(notificationRef, updatedData)
			.then(() => {
				console.log("Notification updated successfully!");
			})
			.catch((error) => {
				console.error("Error updating notification:", error);
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
	};

	return (
		<chatNotificationContext.Provider value={contextValue}>
			{children}
		</chatNotificationContext.Provider>
	);
};

export const useChatNotification = () => useContext(chatNotificationContext);