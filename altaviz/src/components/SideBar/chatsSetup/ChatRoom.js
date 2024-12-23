import { useState, useContext, useEffect, useRef } from "react";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../context/checkAuth/AuthContext";
// import { FetchContext } from "../../context/FetchContext";
import usePostRequest from "./PostChat";
// import { listenForUpdates, stopListening } from "../../context/RealTimeNotificationContext/useChatsNotification";
import { useChatNotification } from "../../context/RealTimeNotificationContext/useChatsNotification";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)

const getCurrentContactID = (currentChatID) => {
	const chatID = localStorage.getItem('chatID')
	if (chatID) {
		currentChatID.current = Number(chatID)
	}
}

const ChatRoom = () => {
	const { toSentenceCase } = useContext(SentenceCaseContext)
	// const [messages, setMessages] = useState([
	// 	{ sender: "John", avatar: "https://i.pravatar.cc/40?u=John", content: "Hey there!" },
	// 	{ sender: "Jane", avatar: "https://i.pravatar.cc/40?u=Jane", content: "Hi! How are you?" },
	// ]);
	const oldID = useRef(null)
	const firebaseNotificationKey = useRef(null)
	const { chatNotifications:fromContext, deleteNotification, listenForUpdates, stopListening } = useChatNotification();
	const [chatNotification, setChatNotification] = useState(null);
	const [messages, setMessages] = useState(null);
	const [isHovered, setIsHovered] = useState(null);
	// const [currentChatID, setCurrentChatID] = useState(null)
	const currentChatID = useRef(null)
	const [getTrigger, setGetTrigger] = useState(false)
	const [everyoneTrigger, setEveryoneTrigger] = useState(false)
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { authData } = useContext(AuthContext)
	// const { useGetDataAPI, usePostDataAPI,
	// 	usePatchDataAPI, useDeleteDataAPI } = useContext(FetchContext)
	// const { getData:getChatData, getLoading:getChatLoading, getError:getChatError } = useGetDataAPI(
	// 	`chat-user/${currentChatID}/${authData.id}/`, getTrigger
	// );
	const getChatData = usePullCompleteList(
		`chat-user/${currentChatID.current}`, `${authData.id}`,
		'chats', getTrigger, authData.role, authData.region.name
	)
	console.log('getChatData.arrayData:', getChatData.arrayData)
	console.log(
		'\nbefore:',
		'\ncurrentChatID:', currentChatID.current,
		'\nauthData.id:', authData.id,
		'\npostTrigger:', postTrigger,
		'\nurl:', `chat-user/${currentChatID.current}/${authData.id}/`,
	)
	if (!currentChatID.current) {getCurrentContactID(currentChatID)}
	// const { postData:, postLoading:, postError: } = usePostDataAPI(
	// 	`chat-user/${currentChatID.current}/${authData.id}/`,
	// 	formData, postTrigger,
	// );
	const { postData:postChatData, postError:postChatError, postLoading:postChatLoading } = usePostRequest({
		currentChatID, authData, formData, postTrigger,
	});
	console.log(
		'\nafter:',
		'\ncurrentChatID:', currentChatID.current,
		'\nauthData.id:', authData.id,
		'\npostTrigger:', postTrigger,
		'\nurl:', `chat-user/${currentChatID.current}/${authData.id}/`,
	)
	// State to hold messages and the current input
	const [currentMessage, setCurrentMessage] = useState("");
	const everyone = usePullCompleteList(
		`all-users`, 0, 'everyone',
		everyoneTrigger, authData.role, authData.region.name
	)
	useEffect(() => {
		if (!everyoneTrigger) {
			setEveryoneTrigger(true);
		}
	}, [])
	const setChatID = (id) => {
		console.log({id})
		// setCurrentChatID(id);
		getCurrentContactID(currentChatID)
		// `chat-notifications/${receiverID}/${notificationKey}/sendersList/${sendersID}`);
		console.log(
			'\nreceierID:', authData.id,
			'\nsendersID:', oldID.current,
			'\nfirebaseKey:', firebaseNotificationKey.current,
		)
		deleteNotification(authData.id, oldID.current, firebaseNotificationKey.current)
		// currentChatID.current = id
		setGetTrigger(true);
		console.log('url:', `chat-user/${currentChatID.current}/${authData.id}/`)
	}
	useEffect(() => {
		const one = '\n11111111111111111111111111111111'
		// const two = '\n22222222222222222222222222222222'
		// const three = '\n333333333333333333333333333333333'
		if (getChatData.arrayData) {
			console.log(one.repeat(5))
			setMessages(getChatData.arrayData)
			console.log('getChatData.arrayData:', getChatData.arrayData)
			setGetTrigger(false);
		}
		if (everyone.arrayData && everyoneTrigger) {
			setEveryoneTrigger(false);
		}
	}, [getChatData, everyone])

	console.log(
		'\neveryone.arrayData:', everyone.arrayData,
		'\neveryone.arrayLoading:', everyone.arrayLoading,
		'\neveryone.arrayError:', everyone.arrayError,
		'\ngetTrigger:', getTrigger,
		'\npostTrigger:', postTrigger,
		'\npostChatData:', postChatData,
		'\ngetChatData.arrayData:', getChatData.arrayData,
		'\ngetChatData.arrayLoading:', getChatData.arrayLoading,
		'\ngetChatData.arrayError:', getChatData.arrayError,
	)
	// 12345
	useEffect(() => {
		console.log({postChatData}, {postTrigger})
		if (postChatData || postChatError) {
			const yyy = '\nyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
			console.log(yyy.repeat(8))
			setPostTrigger(() => {
				console.log('setting postTrigger from ', postTrigger, ' to ', !postTrigger)
				return false
			});
			setCurrentMessage("");
			setFormData(new FormData());
			if (postChatData) {
				const sss = '\nsssssssssssssssssssssssssssssssssssssss'
				console.log(sss.repeat(6))
				console.log('postchat data:', postChatData)
				console.log(sss.repeat(6))
				// setMessages(prev => [...prev, postChatData])
				setGetTrigger(true)
			} else console.log(postChatError)
        }
    }, [postTrigger, postChatData, postChatLoading, postChatError])

	// Function to handle sending messages
	const handleSendMessage = (e) => {
		e.preventDefault();
		console.log('handleSendMessage() triggered');
		if (currentMessage.trim()) {
			console.log('currentMessage:', currentMessage.trim())
			const newFormData = new FormData();
			newFormData.append("currentUser", authData.email);
			newFormData.append("message", `${authData.username}=${currentMessage}`);
			setPostTrigger(true);
			setFormData(newFormData);
			console.log({postTrigger})
			// ¬`!1"£$%^&&*())_-0+={}][:;@'~#<,>.?/]
		}
	};
	// all-users/
	
	console.log('url:', `chat-user/${currentChatID.current}/${authData.id}/`)
	console.log({messages})
	console.log('postchat data:', postChatData)
	const chatStore = localStorage.getItem('chatID')
	const currentBuddy = everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.first_name
	const chatroomHeader = currentBuddy||'Chat Room'
	console.log(
		'\n!currentMessage.trim()', !currentMessage.trim(),
		'\npostChatLoading:', postChatLoading,
	)
	const disableButton = !currentMessage.trim()||postChatLoading
	console.log('getChatData.arrayData:', getChatData.arrayData)

	// pollination for realtime chats
	useEffect(() => {
		if (currentBuddy && chatStore && apiBaseUrl!=='http://127.0.0.1:8000' && apiBaseUrl!=='http://localhost:8000') {
			const intervalId = setInterval(() => {
				setGetTrigger((prev) => !prev);
			}, 1500);
			return () => clearInterval(intervalId);
		}
	}, [currentBuddy, chatStore]);

	const firebaseChatValue = useRef(null) // delete afterwards
	useEffect(() => {
		// const receiverID = 7
		console.log('\nreceiverIDreceiverIDreceiverIDreceiverID'.repeat(5))

		// Start listening for updates
		listenForUpdates(authData?.id, (data) => {
			console.log('\ndata.firebaseChatKey:', data?.firebaseChatKey);
			console.log('\ndata.firebaseChatValue:', data?.firebaseChatValue);
			console.log('\ndata.firebaseChatValue.notificationCount:', data?.firebaseChatValue?.notificationCount);
			const chatNotificationObjects = {
				values: data?.firebaseChatValue?.sendersList,
				idList: Object.keys(data?.firebaseChatValue?.sendersList||{}).map(num => Number(num))
			}
			firebaseNotificationKey.current = data?.firebaseChatKey
			firebaseChatValue.current = chatNotificationObjects
			setChatNotification(chatNotificationObjects)
		});

		// Cleanup on unmount
		return () => stopListening(authData?.id);
	}, [authData,
		// listenForUpdates, stopListening
	]);
	if (!disableButton) {
		deleteNotification(authData.id, oldID.current, firebaseNotificationKey.current)
	}
	console.log('chatNotification:'.repeat(5), chatNotification)
	console.log({apiBaseUrl})
	console.log(
		'\nfirebaseChatValue.current:', firebaseChatValue.current,
		'\nauthData.id:', authData.id,
		'\nfirebaseNotificationKey.current:', firebaseNotificationKey.current,
	)
	console.log(
		'\nreceierID:', authData.id,
		'\nsendersID:', oldID.current,
		'\nfirebaseKey:', firebaseNotificationKey.current,
	)
	console.log(
		'\nmessages:', messages?.length,
		'\ngetChatData:', getChatData?.arrayData,

	)
	console.log({fromContext})
	// const notiNum = 7
	return (
		// grid container
		<div style={styles.boxContainer}>
			{/* Chat room container */}
			<div style={{...styles.chatContainer, border: "1px solid #ccc", backgroundColor: "#E5E5E5",}}>
				{/* Chat Header */}
				<div style={{...styles.chatHeader, backgroundColor: "#3e3e9762",}}>
					{console.log(
						'\nmessages in jsx:', messages,
						'\nmessages.find in jsx:', messages?.find?.(name=>name),
					)}
					<h3 style={{margin: '0'}}>{toSentenceCase(chatroomHeader)}</h3>
				</div>

				{/* Chat Messages Area */}
				{<div style={styles.chatMessages}>
					{/* typing status */}
					{/* <div style={styles.typingStatus}>
                        <strong>User 1</strong> is typing...
                    </div> */}
					{messages?.map?.((message, index) => {
						console.log('message:', message)
						let [isUsername, isMessage] = message?.message?.split?.('=')||[null, null]
						isUsername = isUsername === authData?.username
						const xxx = '\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
						console.log(
							xxx.repeat(5),
                            '\nmessage in jsx:', message,
                            // '\nmessage.sender in jsx:', message?.sender,
                        )
						const newMessageMarke = chatNotification?.values?.[currentChatID.current]?.notificationCount
						return (
							<>
							{console.log(
								'\nid in noti:', chatNotification?.idList?.includes?.(currentChatID.current),
								'\nchatNotification:', chatNotification,
								'\ncontact id:',
								'\nmessage:', message?.message, 'index', index
								)}
								{/* new message bar (in chats) */}
								{/* {index===newMessageMarke?<span style={styles.newMessage}>New Chats</span>:null} */}
								<div
									key={index}
									style={{
									...styles.messageContainer,
									flexDirection: (isUsername)?"row-reverse":"row",
									}}>
									{message?.message&&
									<>
										{/* User Avatar */}
										<img
										src={`${apiBaseUrl}${(isUsername)?(authData.profile_picture):(everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.profile_picture)}`}
										alt={`${(isUsername)?(authData.first_name):(everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.first_name)}'s avatar`}
										style={styles.avatar}/>

										{/* Message Content */}
										<div
										style={{
											...styles.message,
											alignSelf: (isUsername)?"flex-end":"flex-start",
											backgroundColor: (isUsername)?"#cac6f85b":"#7b7b8177",
											padding: '0 10px'
										}}>
											{/* user first name */}
											<strong>
												{(isUsername)?'You':toSentenceCase(message?.user?.first_name||'')}
											</strong>
												{/* message */}
												: {isMessage}
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
						onChange={(e) => setCurrentMessage(e.target.value)}
						style={styles.inputField}
						// disabled={chatroomHeader==='Chat Room'}
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









			{/* contact container */}
			<div style={{...styles.chatContainer, backgroundColor: "#F0F0F0",}}>
				{/* Chat Header */}
				<div style={{...styles.chatHeader, backgroundColor: "#9c9c9ca4",}}>
					<h3 style={{margin: '0'}}>Contacts</h3>
				</div>
				{/* contact box */}
				<div style={styles.chatBoxArea}>
					{everyone?.arrayData
					?.sort?.((a, b) => {
						if (chatNotification?.idList?.includes(a.id)) return -1;
						// // If b.id matches chatNotification.senderID, it should come first
						// if (a.id !== chatNotification?.senderID && b.id === chatNotification?.senderID) return 1;
						return 0; // If both or neither match, maintain original order
					})
					?.filter?.(user => {
						// console.log({user})
						return user.id!==authData.id
					})?.map?.((avatar, index) => {
						const activeNotification = chatNotification?.idList?.includes(avatar.id)
						return (
					<div key={index}>
						<div
						style={{...styles.contactListContainer, backgroundColor: isHovered===index ? '#D9D9DF' : 'transparent',}}
						onClick={() => {
							oldID.current = localStorage.getItem('chatID')
							localStorage.setItem('chatID', avatar.id);
							setChatID(avatar.id);
						}}
						onMouseEnter={() => setIsHovered(index)} // Triggered when the pointer enters
						onMouseLeave={() => setIsHovered(null)} // Triggered when the pointer leaves
						role="button"
						tabIndex="0"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();  // Prevents default form submission behavior
								oldID.current = localStorage.getItem('chatID')
								localStorage.setItem('chatID', avatar.id);
								setChatID(avatar.id);
							}
						}}>
							{/* contact avatar*/}
							<img src={`${apiBaseUrl}${avatar.profile_picture}`}
							alt='avatar'
							style={styles.avatar}
							/>

							{/* Name of contact */}
							<div style={{...styles.message, alignSelf: "flex-start"}}>
								<strong style={{whiteSpace: 'pre'}}> {toSentenceCase(avatar.first_name)}</strong>: ({avatar.id})<span> </span>

								{/* notification dot alert */}
								<span style={{...styles.notification, display: (chatNotification?.values?.[avatar.id]?.notificationCount===0||!activeNotification?'none':null), ...((chatNotification?.values?.[avatar.id]?.notificationCount||0)>9?styles.greater:styles.less)}}>{(chatNotification?.idList?.includes(avatar.id))?(chatNotification?.values?.[avatar.id].notificationCount||0):null}</span>

								{/* online status */}
								{/* <span> </span><span style={styles.online}>online</span> */}
							</div>
						</div>
					</div>
					)})}
				</div>
			</div>
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
	chatContainer: {
		// width: "400px",
		// margin: "0 auto",
		// border: "1px solid #ccc",
		borderRadius: "8px",
		display: "flex",
		flexDirection: "column",
		height: "650px",
		// backgroundColor: "#E5E5E5",
	},
	chatHeader: {
		color: "white",
		// padding: "10px",
		textAlign: "center",
		borderRadius: "8px 8px 0 0",
		// margin: '0'
	},
	chatBoxArea: {
		padding: "0 0 0 20px",
		height: "650px", // Set a fixed height for the scrollable area
		overflowY: "auto", // Enable vertical scrolling
	},
	chatMessages: {
		flex: 1,
		padding: "10px",
		overflowY: "auto", // Enable vertical scrolling
		display: "flex",
		flexDirection: "column-reverse", // Reverse the order of the messages (newest at the bottom)
		gap: "10px",
	},
	newMessage: {
		backgroundColor: 'rgb(197, 197, 248)'     ,
		color: 'white',
		// padding: '5px',
		borderRadius: '5px',
		textAlign: 'center',
		// margin: '-5px'
	},
	messageContainer: {
		display: "flex",
		alignItems: "center",
		gap: "10px",
	},
	contactListContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: "0 0 0 5px",
		textDecoration: "none",
		cursor: "pointer",
		// backgroundColor: 'yellow',
		margin: '6px'
		// gap: "10px",
	},
	avatar: {
		width: "30px",
		height: "30px",
		borderRadius: "50%",
		border: "1px solid #ccc",
	},
	typingStatus: {
		colr: '',
		fontSize: "13px",
		fontStyle: "italic",
		color: 'darkslategrey'
		// darkslategrey, slategrey, olive, grey
	},
	message: {
		padding: "o 10px 0 0",
		borderRadius: "8px",
		maxWidth: "70%",
		wordWrap: "break-word",
	},
	notification: {
		backgroundColor: "blue",
		// backgroundColor: "#3E3E97",
		color: "white",
		borderRadius: "50%",
		padding: "2px 5px",
		fontSize: "12px",
		fontWeight: 'bolder',
		fontStyle: "italic",
	},
	greater: {
		padding: "3px 4px",
	},
	less: {
		padding: "2px 6px 2px 5px",
	},
	online: {
		color: "green",
		fontSize: "12px",
		fontStyle: "italic",
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
		// backgroundColor: "#3E3E97",
		border: "none",
		borderRadius: "4px",
		// cursor: "pointer",
		// fontWeight: 'bold',
		transition: 'background-color 0.3s, color 0.3s, cursor 0.3s',
	},
};

export default ChatRoom;
