import { SentenceCaseContext } from "../../context/SentenceCaseContext"
import { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react"
import OnlineStatus from "./OnlineStatus"
import usePostRequest from "./PostChat";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import { useChatNotification } from "../../context/RealTimeNotificationContext/useChatsNotification";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)

const getCurrentContactID = (currentChatID) => {
	const chatID = localStorage.getItem('chatID')
	if (chatID) {
		currentChatID.current = Number(chatID)
	}
}

function detectDayStatus(dateString) {
	const inputDate = new Date(dateString); // Convert the input string to a Date object
	const today = new Date(); // Current date and time

	// Remove the time part for comparison
	const inputDateWithoutTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
	const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

	// Calculate the difference in days
	const diffInTime = todayWithoutTime - inputDateWithoutTime; // Difference in milliseconds
	const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Convert to days

	// Format the time as "hh:mm AM/PM"
	const formattedTime = inputDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

	if (diffInDays === 0) {
		return `Today at ${formattedTime}`;
	} else if (diffInDays === 1) {
		return `Yesterday at ${formattedTime}`;
	} else {
		return inputDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) + ` at ${formattedTime}`;
	}
}

function Chatbox ({chatsObjs}, ref) {
	const firebaseChatValue = useRef(null) // delete afterwards
	const currentChatID = useRef(null)
	const firebaseNotificationKey = useRef(null)
	const { authData } = useContext(AuthContext)
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const { chatNotifications:fromContext, deleteNotification,
		listenForUpdates, stopListening, isOnline, observer,
		// listenForPresence,
		updatePresence, presenceData } = useChatNotification();
	const [messages, setMessages] = useState(null);
	// const [everyoneTrigger, setEveryoneTrigger] = useState(false)
	const [currentMessage, setCurrentMessage] = useState("");
	// const [chatNotification, setChatNotification] = useState(null);
	const [getTrigger, setGetTrigger] = useState(false)
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const getChatData = usePullCompleteList(
		`chat-user/${currentChatID.current}`, `${authData.id}`,
		'chats', getTrigger, authData.role, authData.region.name
	)
	if (!currentChatID.current) {getCurrentContactID(currentChatID)}
	const { postData:postChatData, postError:postChatError, postLoading:postChatLoading } = usePostRequest({
		currentChatID, authData, formData, postTrigger,
	});
	useEffect(() => {
		if (currentMessage.trim()) {updatePresence(authData.id, 'typing')}
		else if (!currentMessage.trim()) {updatePresence(authData.id, 'online')}
		return () => {
			updatePresence(authData.id, 'offline')}
	}, [currentMessage])
	const handleSendMessage = (e) => {
		e.preventDefault();
		// console.log('handleSendMessage() triggered');
		if (currentMessage.trim()) {
			// console.log('currentMessage:', currentMessage.trim())
			const newFormData = new FormData();
			newFormData.append("currentUser", authData.email);
			newFormData.append("message", `${authData.username}=${currentMessage}`);
			setPostTrigger(true);
			setFormData(newFormData);
		}
	};
	const handleTyping = (e) => {
		const value = e.target.value
		if (value.trim()) {
			// updatePresence(authData.id, 'typing')
		}
		setCurrentMessage(value)
	}
	const setChatID = (id) => {
		getCurrentContactID(currentChatID)
		deleteNotification(authData.id, chatsObjs.oldID.current, firebaseNotificationKey.current)
		// currentChatID.current = id
		setGetTrigger(true);
		// console.log('url:', `chat-user/${currentChatID.current}/${authData.id}/`)
	}
	useImperativeHandle(ref, () => ({setChatID}))
	useEffect(() => {
		if (getChatData.arrayData) {
			// console.log(one.repeat(5))
			setMessages(getChatData.arrayData)
			// console.log('getChatData.arrayData:', getChatData.arrayData)
			setGetTrigger(false);
		}
		if (chatsObjs?.everyone.arrayData && chatsObjs?.everyoneTrigger) {
			chatsObjs?.setEveryoneTrigger(false);
		}
	}, [getChatData, chatsObjs?.everyone])
	useEffect(() => {
		// console.log({postChatData}, {postTrigger})
		if (postChatData || postChatError) {
			setPostTrigger(() => {
				// console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			setCurrentMessage("");
			setFormData(new FormData());
			if (postChatData) {
				setGetTrigger(true)
			}
			// else console.log(postChatError)
        }
    }, [postTrigger, postChatData, postChatLoading, postChatError])
	const disableButton = !currentMessage.trim()||postChatLoading
	const chatStore = localStorage.getItem('chatID')
	const currentBuddy = chatsObjs?.everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.first_name
	const chatroomHeader = currentBuddy?`chats with ${currentBuddy}`:'Chat Room'
	useEffect(() => {
		if (currentBuddy && chatStore && apiBaseUrl!=='http://127.0.0.1:8000' && apiBaseUrl!=='http://localhost:8000') {
			const intervalId = setInterval(() => {
				setGetTrigger((prev) => !prev);
			}, 1500);
			return () => clearInterval(intervalId);
		}
	}, [currentBuddy, chatStore]);
	if (!disableButton) {
		deleteNotification(authData.id, chatsObjs?.oldID.current, firebaseNotificationKey.current)
	}
	useEffect(() => {
		// Start listening for updates
		listenForUpdates(authData?.id, (data) => {
			const chatNotificationObjects = {
				values: data?.firebaseChatValue?.sendersList,
				idList: Object.keys(data?.firebaseChatValue?.sendersList||{}).map(num => Number(num))
			}
			firebaseNotificationKey.current = data?.firebaseChatKey
			firebaseChatValue.current = chatNotificationObjects
			chatsObjs?.setChatNotification(chatNotificationObjects)
		});

		// Cleanup on unmount
		return () => stopListening(authData?.id);
	}, [authData]);
	console.log({isOnline})
	return (
	<>
		{/* Chat room container */}
		<div style={{...styles.chatContainer, border: "1px solid #ccc", backgroundColor: "#E5E5E5",}}>
			{/* Chat Header */}
			<div style={{...styles.chatHeader, backgroundColor: "#3e3e9762",}}>
				<h3
				style={{
					margin: '0',
					color: currentBuddy?'darkslateblue':''
				}}>{toSentenceCase(chatroomHeader)}</h3>
			</div>

			{/* Chat Messages Area */}
			{<div style={styles.chatMessages}>
				{/* typing status */}
				<OnlineStatus id={chatStore} currentBuddy={currentBuddy} typing={true}/>
				{messages?.map?.((message, index) => {
					// console.log('message:', message)
					let [isUsername, isMessage] = message?.message?.split?.('=')||[null, null]
					let when = message.timestamp
					// console.log({when})
					when = detectDayStatus(when)
					// console.log({when})
					isUsername = isUsername === authData?.username
					const newMessageMarke = chatsObjs?.chatNotification?.values?.[currentChatID?.current]?.notificationCount
					return (
						<>
							{/* new message bar (in chats) */}
							{/* {index===newMessageMarke?<span style={styles.newMessage}>New Chats</span>:null} */}
							<div
								key={index+message}
								style={{
								...styles.messageContainer,
								flexDirection: (isUsername)?"row-reverse":"row",
								}}>
								{message?.message&&
								<>
									<div>
										<div
										style={{
											...styles.message,
											// alignSelf: (isUsername)?"flex-end":"flex-start",
											// backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
											display: 'flex',
											flexDirection: (isUsername) ? 'row-reverse' : 'row',
											// width: "150%",
										}}>
											{/* User Avatar */}
											{/* {console.log(
												'here '.repeat(50),
												'\neveryone:', chatsObjs?.everyone?.arrayData,
												'\ncurrID:', currentChatID?.current,
												'\npicurl:', `${apiBaseUrl}${(chatsObjs?.everyone?.arrayData?.find?.(name=>name.id===currentChatID?.current)?.profile_picture)}`,
											)} */}
											<img
											src={`${apiBaseUrl}${(isUsername)?(authData.profile_picture):(chatsObjs?.everyone?.arrayData?.find?.(name=>name.id===currentChatID?.current)?.profile_picture)}`}
											alt={`${(isUsername)?(authData.first_name):(chatsObjs?.everyone?.arrayData?.find?.(name=>name.id===currentChatID?.current)?.first_name)}'s avatar`}
											style={styles.avatar}/>

											{/* user first name */}
											<strong style={{
												...styles.noWrapText,
												alignSelf: "center",
												// backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
												padding: (isUsername)?'':'0 0 0 5px',
												borderRadius: (isUsername)?'10px 0 0 10px':'10px 0 0 0',
												}}>
												{(isUsername)?'You  ':toSentenceCase(message?.user?.first_name+':'||'')}
											</strong>
												
										</div>
										<div
										style={{
											marginLeft: (isUsername)?null:'30px',
											marginRight: (isUsername)?'30px':null,
											// (isUsername)?{marginLeft: '30px'}:null,
											// (isUsername)?null:marginRight: '30px',
											// backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
											// padding: '10px',
											
										}}>
											<div
											style={{
												backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
												padding: '0 10px',
												borderRadius: (isUsername)?'10px 0 10px 10px':'0 10px 10px 10px',
											}}>
											{/* message */}
											<span style={{
												boxSizing: 'border-box',
											// ...styles.noWrapText,
											// backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
											// padding: (isUsername)?'':'10px',
											// borderRadius: (isUsername)?'0 10px 0 0':'0 10px 10px 0',
											}}>{isMessage}</span>
											</div>
											{/* timestamp */}
											<span style={{...styles.timestampST, flexDirection: (isUsername)?"row-reverse":"row"}}>{when}</span>
										</div>
									</div>
								</>}
							</div>
						</>
						)})}
			</div>}

			{/* Message Input */}
			<form onSubmit={handleSendMessage}>
				<div style={styles.chatInput}>
					<input
					type="text"
					placeholder="Type your message..."
					value={currentMessage}
					onChange={(e) => handleTyping(e)}
					style={styles.inputField}
					// disabled={chatsObjs?.chatroomHeader==='Chat Room'}
					/>
					<button
					onClick={handleSendMessage} style={{
						...styles.sendButton,
						backgroundColor: disableButton?'#8f8de7':'#3E3E97',
						cursor: disableButton?'not-allowed':'pointer',
					}}>
					{postChatLoading?'Sending':'Send'}
					</button>
				</div>
			</form>
		</div>
	</>)
}
export default forwardRef(Chatbox)

// Inline Styles
const styles = {
	chatContainer: {
		borderRadius: "8px",
		display: "flex",
		flexDirection: "column",
		height: "650px",
	},
	chatHeader: {
		color: "white",
		textAlign: "center",
		borderRadius: "8px 8px 0 0",
	},
	chatMessages: {
		flex: 1,
		padding: "10px",
		overflowY: "auto", // Enable vertical scrolling
		display: "flex",
		flexDirection: "column-reverse", // Reverse the order of the messages (newest at the bottom)
		gap: "5px",
	},
	messageContainer: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	avatar: {
		width: "30px",
		height: "30px",
		borderRadius: "50%",
		border: "1px solid #ccc",
	},
	message: {
		padding: "o 10px 0 0",
		borderRadius: "8px",
		wordWrap: "break-word",
	},
	noWrapText: {
		whiteSpace: 'pre',
	},
	timestampST: {
		color: 'grey',
		fontSize: '11px',
		display: 'flex',
		fontStyle: 'italic',
	},
	chatInput: {
		display: "flex",
		borderTop: "1px solid #ccc",
		padding: "10px",
	},
	inputField: {
		flex: 1,
		padding: "10px",
		fontSize: "16px",
		borderRadius: "4px",
		border: "1px solid #ccc",
		marginRight: "10px",
	},
	sendButton: {
		padding: "10px 20px",
		fontSize: "16px",
		color: "white",
		border: "none",
		borderRadius: "4px",
		transition: 'background-color 0.3s, color 0.3s, cursor 0.3s',
	},
};
