import "../generalNotifications.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import NotificationDropdown from "../notificationDropdown/NotificationDropdown";

function PostRecievedParts () {
	const componentPage = useLocation().pathname.split('/')[1];
	const posts = 4;
	const recieved = 9;
	const [noOfPosts, setNoOfPosts] = useState(posts);
	const [noOfRecieved, setNoOfReceived] = useState(recieved);
	useEffect(() => {
		if (noOfPosts !== posts) {
			setNoOfPosts(posts);
		}
	}, [noOfPosts])
	useEffect(() => {
		if (noOfRecieved !== recieved) {
			setNoOfReceived(noOfRecieved);
		}
	}, [noOfRecieved])

	// test
	const [testPost, setTestPost] = useState(noOfPosts)
	const [testReceived, setTestReceived] = useState(noOfRecieved)
	const testPostReceieveFxn = () => {
		if (componentPage === 'workshop') {
			setTestPost(testPost+2);
		} else if (componentPage === 'human-resource') {
			setTestReceived(testReceived+5);
		}
	}
	// ...

	
	const details = [
		[1, 'GRG Note Transport'],
		[2, 'Wincor Stacker'],
		[3, 'Wincor V-Module'],
		[4, 'NCR Card Reader'],
		[5, 'NCR PowerPack'],
		[6, 'Wincor Clamp'],
		[7, 'NCR PC'],
	]
	const bkColor = 'rgba(255, 255, 0, 0.6)';
	return (
		<>
			<div className="pending-faults">
				<button onClick={testPostReceieveFxn}>test</button> {/* remove */}
				<p><strong>{componentPage === 'workshop' ? 'Awaiting Confirmation' : 'Confirm Receive'}: </strong></p>
					{testPostReceieveFxn ? (
						<NotificationDropdown
						noOfPosts={noOfPosts}
						noOfRecieved={noOfRecieved}
						details={details}
						bkColor={bkColor}
						componentPage={componentPage}
						/>
						) : (
						<p>No Pending Fault</p>
					)}
			</div>
		</>
	)
}
export default PostRecievedParts;