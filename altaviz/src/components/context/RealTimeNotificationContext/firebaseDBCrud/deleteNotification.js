import React from "react";
import { useChatNotification } from "./NotificationContext";

const DeleteNotificationComponent = () => {
	const { deleteNotification } = useChatNotification();

	const handleDelete = () => {
		const receiverID = "user123";
		const notificationKey = "notificationKey123";

		deleteNotification(receiverID, notificationKey);
	};

	return <button onClick={handleDelete}>Delete Notification</button>;
};

export default DeleteNotificationComponent;
