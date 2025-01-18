import { useEffect, useState, useContext } from "react";
import { useChatNotification } from "../../context/RealTimeNotificationContext/useChatsNotification";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";

function OnlineStatus({id, currentBuddy=null, typing=null, onlineIDs}) {
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [status, setStatus] = useState(null);
	const { observer } = useChatNotification();

	useEffect(() => {
		// Observe the user's status
		observer(id, (observedStatus) => {
			setStatus(observedStatus);
			if ((observedStatus==='online'||observedStatus==='typing')&&
				!onlineIDs?.current?.includes(id)
			) {
				console.log('for', id, observedStatus)
				// console.log({onlineIDs})
				if (onlineIDs) onlineIDs.current = [...onlineIDs.current, id]
			}
			if (observedStatus==='offline'&&onlineIDs?.current?.includes(id)) {
				onlineIDs.current = onlineIDs?.current?.filter(item => item!==id)
			}
		});

		return () => {
			// Cleanup if necessary
			setStatus(null);
		};
	}, [id]); // Re-run if the avatar ID changes

	return (
		<>
			{typing&&
			<>
				{status==='typing'&&
				<div style={styles.typingStatus}>
					<strong>{currentBuddy}</strong> is {status}...
				</div>}
				{/* <span> </span>
				<span style={styles.online}>{(status==='online'||status==='typing')&&'Online'}</span> */}
			</>}
			{!typing&&
			<>
				<span> </span>
				<span style={styles.online}>{(status?.toLowerCase()==='online'||status?.toLowerCase()==='typing')&&toSentenceCase('online')}</span>
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