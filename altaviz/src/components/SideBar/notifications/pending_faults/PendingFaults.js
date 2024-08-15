import "../generalNotifications.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import NotificationDropdown from "../notificationDropdown/NotificationDropdown";

function PendingFaults () {
	const componentPage = useLocation().pathname;
	const noOfPendingFaults = 4;
	const [currentNoOfAttention, setcurrentNoOfAttention] = useState(noOfPendingFaults);
	useEffect(() => {
		if (currentNoOfAttention !== noOfPendingFaults) {
			setcurrentNoOfAttention(noOfPendingFaults);
		}
	}, [noOfPendingFaults, currentNoOfAttention])

	// test
	const [testNum, setTestNum] = useState(noOfPendingFaults)
	const testFeat = () => {
		if (testNum) {
			setTestNum(0);
		} else {
			setTestNum(noOfPendingFaults);
		}
	}
	// ...

	
	const details = [
		[1, 'Dispenser Fault'],
		[2, 'Blank Screen'],
		[3, 'High Rejects'],
		[4, 'Camera Issue'],
		[5, 'Cash Jam'],
		[6, 'Card Reader Fault'],
		[7, 'Unable to Clear Counter'],
	]
	const bkColor = 'rgba(255, 255, 0, 0.6)';
	return (
		<>
			<div className="pending-faults">
				<button onClick={testFeat}>test</button> {/* remove */}
				<p><strong>Pending Fault: </strong></p>
					{testNum ? (
						<NotificationDropdown
						currentNoOfAttention={currentNoOfAttention}
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
export default PendingFaults;