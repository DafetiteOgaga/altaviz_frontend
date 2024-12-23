import React from "react";
import { useChatNotification } from "./NotificationContext";

const EditNotificationComponent = () => {
	const { editNotification } = useChatNotification();

	const handleEdit = () => {
		const receiverID = "user123";
		const notificationKey = "notificationKey123";
		const updatedData = {
			title: "Updated Message",
		};

		editNotification(receiverID, notificationKey, updatedData);
	};

	return <button onClick={handleEdit}>Edit Notification</button>;
};

export default EditNotificationComponent;
