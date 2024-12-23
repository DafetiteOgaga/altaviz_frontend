import React from "react";
import { useChatNotification } from "./NotificationContext";

const CreateNotificationComponent = () => {
	const { createNotification } = useChatNotification();

	const handleCreate = () => {
		const receiverID = "user123";
		const newNotification = {
			title: "New Message",
			body: "You have a new message!",
			timestamp: Date.now(),
		};

		createNotification(receiverID, newNotification);
	};

	return <button onClick={handleCreate}>Create Notification</button>;
};

export default CreateNotificationComponent;
