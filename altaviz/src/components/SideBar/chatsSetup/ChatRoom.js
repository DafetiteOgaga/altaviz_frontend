import { useState, useContext, useEffect, useRef } from "react";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import Chatbox from "./ChatboxSection";
import ContactSection from "./ContactSection";


const ChatRoom = () => {
	const chatboxRef = useRef(null)
	const oldID = useRef(null)
	const [chatNotification, setChatNotification] = useState(null);
	const [everyoneTrigger, setEveryoneTrigger] = useState(false)
	const { authData } = useContext(AuthContext)

	const everyone = usePullCompleteList(
		`all-users`, 0, 'everyone',
		everyoneTrigger, authData.role, authData.region.name
	)
	useEffect(() => {
		if (!everyoneTrigger) {
			setEveryoneTrigger(true);
		}
	}, [])

	const chatsObjs = {
		chatNotification: chatNotification,
		oldID: oldID,
		everyone: everyone,
		everyoneTrigger: everyoneTrigger,
		setEveryoneTrigger: setEveryoneTrigger,
		setChatNotification: setChatNotification,
	}
	const contactObjs = {
		chatNotification: chatNotification,
		oldID: oldID,
		everyone: everyone,
		everyoneTrigger: everyoneTrigger,
	}
	return (
		// grid container
		<div style={styles.boxContainer}>
			{/* Chat room container */}

			<Chatbox chatsObjs={chatsObjs} ref={chatboxRef} />

			<ContactSection contactObjs={contactObjs}
			setChatID={(id) => chatboxRef.current.setChatID(id)}/>
		</div>
	);
};

// Inline Styles
const styles = {
	boxContainer: {
		display: 'grid',
		gridTemplateColumns: "2fr 1fr",
        gap: "10px",
        padding: "10px",
	},
};

export default ChatRoom;
