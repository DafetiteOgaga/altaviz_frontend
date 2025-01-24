import { AuthContext } from "../../context/checkAuth/AuthContext";
import { useContext, useRef, useState } from "react";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
import OnlineStatus from "./OnlineStatus";
import { setKeyToLocalStorage } from "../../hooks/setToLocalStorage";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)

function ContactSection({contactObjs, setChatID}) {
	const onlineIDs = useRef([])
	const [isHovered, setIsHovered] = useState(null);
	const { authData } = useContext(AuthContext)
	const { toSentenceCase } = useContext(SentenceCaseContext)
	console.log('onlineIDs:', onlineIDs.current)
	return (
	<>
		{/* contact container */}
		<div style={{...styles.chatContainer, backgroundColor: "#F0F0F0",}}>
		{/* Chat Header */}
		<div style={{...styles.chatHeader, backgroundColor: "#9c9c9ca4",}}>
			<h3 style={{margin: '0'}}>Contacts</h3>
		</div>
		{/* contact box */}
		<div style={styles.chatBoxArea}>
			{contactObjs?.everyone?.arrayData
			?.sort?.((a, b) => {
				const aIsOnline = onlineIDs.current?.includes(a.id) ? 1 : 0; // Check if `a.id` is online
				const bIsOnline = onlineIDs.current?.includes(b.id) ? 1 : 0; // Check if `b.id` is online

				// First, prioritize online IDs
				if (aIsOnline !== bIsOnline) {
				return bIsOnline - aIsOnline; // Online IDs come first
				}

				// If both are online or both are not, sort by ID
				return a.id - b.id; // Ascending order by ID
			})
			?.filter?.(user => {
				// console.log({user})
				return user.id!==authData.id
			})?.map?.((avatar, index) => {
				const activeNotification = contactObjs?.chatNotification?.idList?.includes(avatar.id)
				// console.log('avater:', avatar)
				return (
			<div key={index}>
				<div
				style={{...styles.contactListContainer, backgroundColor: isHovered===index ? '#D9D9DF' : 'transparent',}}
				onClick={() => {
					contactObjs.oldID.current = localStorage.getItem('chatID')
					// localStorage.setItem('chatID', avatar.id);
					setKeyToLocalStorage('chatID', avatar.id)
					setChatID(avatar.id);
				}}
				onMouseEnter={() => setIsHovered(index)} // Triggered when the pointer enters
				onMouseLeave={() => setIsHovered(null)} // Triggered when the pointer leaves
				role="button"
				tabIndex="0"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						// e.preventDefault();
						contactObjs.oldID.current = localStorage.getItem('chatID')
						// localStorage.setItem('chatID', avatar.id);
						setKeyToLocalStorage('chatID', avatar.id)
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
						<strong style={{whiteSpace: 'pre',
							// color: (!isHovered? '': (avatar.role==='engineer')?'brown':
							// (avatar.role==='supervisor')?'darkblue':
							// (avatar.role==='custodian')?'forestgreen':
							// (avatar.role==='workshop')?'darkcyan':
							// (avatar.role==='help-desk')?'darkgoldenrod':'darkmagenta')
						}}> {toSentenceCase(avatar.first_name)}</strong>: <span style={{color: 'grey'}}>({avatar.id})</span>

						{/* notification dot alert */}
						{/* <span style={{...styles.notification, display: (chatNotification?.values?.[avatar.id]?.notificationCount===0||!activeNotification?'none':null), ...((chatNotification?.values?.[avatar.id]?.notificationCount||0)>9?styles.greater:styles.less)}}>{(chatNotification?.idList?.includes(avatar.id))?(chatNotification?.values?.[avatar.id].notificationCount||0):null}</span> */}

						{/* online status */}
						<OnlineStatus id={avatar.id} onlineIDs={onlineIDs} />
					</div>
				</div>
			</div>
			)})}
		</div>
		</div>
	</>)
}
export default ContactSection

// Inline Styles
const styles = {
	chatContainer: {
		borderRadius: "8px",
		display: "flex",
		flexDirection: "column",
		height: "650px",
		// backgroundColor: "#E5E5E5",
	},
	chatHeader: {
		color: "white",
		textAlign: "center",
		borderRadius: "8px 8px 0 0",
	},
	chatBoxArea: {
		padding: "0 0 0 20px",
		height: "650px", // Set a fixed height for the scrollable area
		overflowY: "auto", // Enable vertical scrolling
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
	message: {
		padding: "o 10px 0 0",
		borderRadius: "8px",
		// maxWidth: "70%",
		wordWrap: "break-word",
	},
};
