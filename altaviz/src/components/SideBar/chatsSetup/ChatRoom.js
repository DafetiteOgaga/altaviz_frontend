import { useState, useContext, useEffect, useRef } from "react";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../context/checkAuth/AuthContext";
// import { FetchContext } from "../../context/FetchContext";
import usePostRequest from "./PostChat";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)

const getCurrentContactID = (currentChatID) => {
	const chatID = localStorage.getItem('chatID')
	if (chatID) {
		currentChatID.current = Number(chatID)
	}
}

const ChatRoom = () => {
	// const [messages, setMessages] = useState([
	// 	{ sender: "John", avatar: "https://i.pravatar.cc/40?u=John", content: "Hey there!" },
	// 	{ sender: "Jane", avatar: "https://i.pravatar.cc/40?u=Jane", content: "Hi! How are you?" },
	// ]);
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
	const chatroomHeader = everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.first_name||'Chat Room'
	console.log(
		'\n!currentMessage.trim()', !currentMessage.trim(),
		'\npostChatLoading:', postChatLoading,
	)
	const disableButton = !currentMessage.trim()||postChatLoading
	console.log('getChatData.arrayData:', getChatData.arrayData)
	return (
		// grid container
		<div style={styles.boxContainer}>
			{/* Chat room container */}
			<div style={{...styles.chatContainer, border: "1px solid #ccc", backgroundColor: "#E5E5E5",}}>
				{/* Chat Header */}
				<div style={{...styles.chatHeader, backgroundColor: "#3E3E97",}}>
					{/* this heading will change dynamically
						based on user you are chatting with
						or general group */}
					{console.log(
						'\nmessages in jsx:', messages,
						'\nmessages.find in jsx:', messages?.find?.(name=>name),
					)}
					<h3 style={{margin: '0'}}>{chatroomHeader}</h3>
				</div>

				{/* Chat Messages Area */}
				{<div style={styles.chatMessages}>
					{messages?.map?.((message, index) => {
						const xxx = '\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
						console.log(
							xxx.repeat(5),
                            '\nmessage in jsx:', message,
                            // '\nmessage.sender in jsx:', message?.sender,
                        )
						return (
							<div
								key={index}
								style={{
								...styles.messageContainer,
								flexDirection: (message?.message?.split?.('=')[0]===authData?.username)?"row-reverse":"row",
								}}
							>
								{message?.message&&
								<>
									{/* User Avatar */}
									<img
									src={`${apiBaseUrl}${(message?.message?.split?.('=')[0]===authData?.username)?(authData.profile_picture):(everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.profile_picture)}`}
									alt={`${(message?.message?.split?.('=')[0]===authData?.username)?(authData.first_name):(everyone?.arrayData?.find?.(name=>name.id===currentChatID.current)?.first_name)}'s avatar`}
									style={styles.avatar}/>

									{/* Message Content */}
									<div
									style={{
										...styles.message,
										alignSelf: (message?.message?.split?.('=')[0]===authData?.username)?"flex-end":"flex-start",
										backgroundColor: (message?.message?.split?.('=')[0]===authData?.username)?"#DCF8C6":"#F0F0F0",
									}}>
										{/* user first name */}
										<strong>
											{(message?.message?.split?.('=')[0]===authData?.username)?'You':message?.user?.first_name}
										</strong>
											{/* message */}
											: {message?.message?.split?.('=')[1]}
									</div>
								</>}
							</div>
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
				<div style={{...styles.chatHeader, backgroundColor: "#9c9c9c",}}>
					<h3 style={{margin: '0'}}>Contacts</h3>
				</div>
				{/* contact box */}
				<div style={styles.chatBoxArea}>
					{everyone?.arrayData?.filter?.(user => user.id!==authData.id)?.map?.((avatar, index) => (
					<div key={index}>
						<div
						style={{...styles.contactListContainer, backgroundColor: isHovered===index ? 'yellow' : 'transparent',}}
						onClick={() => {
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
								localStorage.setItem('chatID', avatar.id);
								setChatID(avatar.id);
							}
						}}
						>
							{/* contact avatar*/}
							<img src={`${apiBaseUrl}${avatar.profile_picture}`}
							alt='avatar'
							style={styles.avatar}
							/>

							{/* Name of contact */}
							<div style={{...styles.message, alignSelf: "flex-start"}}>
								<strong>{avatar.first_name}</strong>: ({avatar.id})
							</div>
						</div>
					</div>
					))}
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
		height: "500px",
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
		height: "500px", // Set a fixed height for the scrollable area
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
		width: "40px",
		height: "40px",
		borderRadius: "50%",
		border: "1px solid #ccc",
	},
	message: {
		padding: "10px 10px 0 0",
		borderRadius: "8px",
		maxWidth: "70%",
		wordWrap: "break-word",
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
