import { useEffect, useState } from "react";
import { useChatNotification } from "../../context/RealTimeNotificationContext/useChatsNotification";

function OnlineStatus({id, currentBuddy=null, typing=null}) {
	const [status, setStatus] = useState(null);
	const { observer } = useChatNotification();

	useEffect(() => {
		// Observe the user's status
		observer(id, (observedStatus) => {
			setStatus(observedStatus);
		});

		return () => {
			// Cleanup if necessary
			setStatus(null);
		};
	}, [id]); // Re-run if the avatar ID changes

	// Conditional rendering
	return (
		<>
			{typing&&
			<>
				{status==='typing'&&
				<div style={styles.typingStatus}>
					<strong>{currentBuddy}</strong> {'is typing...'}
				</div>}
				{/* <span> </span>
				<span style={styles.online}>{(status==='online'||status==='typing')&&'Online'}</span> */}
			</>}
			{!typing&&
			<>
				<span> </span>
				<span style={styles.online}>{(status==='online'||status==='typing')&&'Online'}</span>
			</>}
		</>
	);
}
export default OnlineStatus;

const styles = {
	online: {
		color: "green",
		fontSize: "12px",
		fontStyle: "italic",
	},
	typingStatus: {
		colr: '',
		fontSize: "13px",
		fontStyle: "italic",
		color: 'darkslategrey'
		// darkslategrey, slategrey, olive, grey
	},
}