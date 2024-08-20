import "../generalNotifications.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import NotificationDropdown from "../notificationDropdown/NotificationDropdown";

function PendingRequest () {
	const componentPage = useLocation().pathname;
	const noOfPendingRequests = 7;
	// test
	const [testNum, setTestNum] = useState(noOfPendingRequests)
	const [bkColor, setBkColor] = useState('rgba(255, 255, 0, 0.6)');
	const [currentNoOfAttention, setcurrentNoOfAttention] = useState(testNum);
	useEffect(() => {
		if (currentNoOfAttention !== noOfPendingRequests) {
			setcurrentNoOfAttention(noOfPendingRequests);
			console.log('currentNoOfAttention updated');
		}
	}, [noOfPendingRequests, currentNoOfAttention])

	// test
	const testFeat = () => {
		if (testNum === 0) {
			setTestNum(8);
			setBkColor('rgba(255, 255, 0, 0.6)');
		} else if (testNum < 10) {
			setTestNum(27);
			setBkColor('red');
		} else {
			setTestNum(0);
			setBkColor('');
		}
	}
	// ...

	
	const details = [
		[1, 'Yemi'],
		[2, 'Obinna'],
		[3, 'Isaac'],
		[4, 'Yakubu'],
		[5, 'Julius'],
		[6, 'Enoch'],
		[7, 'Prince'],
	]
	// console.log('testNum:', testNum)
	// console.log('currentNoOfAttention:', currentNoOfAttention)
	// const bkColor = 'rgba(255, 255, 0, 0.6)';
	return (
		<>
			<div className="pending-faults">
				<button onClick={testFeat}>test</button> {/* remove */}
				<p><strong>Pending Requests: </strong></p>
					{testNum ? (
						<NotificationDropdown
						currentNoOfAttention={testNum}
						details={details}
						bkColor={bkColor}
						componentPage={componentPage}
						/>
						) : (
						<p>No Pending Requests</p>
					)}
			</div>
		</>
	)
}
export default PendingRequest;