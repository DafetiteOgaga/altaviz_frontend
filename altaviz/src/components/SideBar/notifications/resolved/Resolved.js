import "../generalNotifications.css"
import { useState, useEffect } from "react";
import NotificationDropdown from "../notificationDropdown/NotificationDropdown";

function Resolved ({text, componentPage}) {
	console.log("page:", componentPage);
	const componentPg = componentPage;
	const noOfPendingFaults = 4;
	const [currentNoOfAttention, setCurrentNoOfPendingFaults] = useState(noOfPendingFaults);
	useEffect(() => {
		if (currentNoOfAttention !== noOfPendingFaults) {
			setCurrentNoOfPendingFaults(noOfPendingFaults);
		}
	}, [noOfPendingFaults, currentNoOfAttention])
	const [testNum, setTestNum] = useState(noOfPendingFaults)
	const testFeat = () => {
		if (testNum) {
			setTestNum(0);
		} else {
			setTestNum(noOfPendingFaults);
		}
	}
	const details = [
		[1, 'Dispenser Fault'],
		[2, 'Blank Screen'],
		[3, 'High Rejects'],
		[4, 'Camera Issue'],
		[5, 'Cash Jam'],
		[6, 'Card Reader Fault'],
		[7, 'Unable to Clear Counter'],
	]
	const bkColor = 'rgba(0, 0, 255, 0.459)';
	return (
		<>
			<div className="pending-faults">
				<button onClick={testFeat}>test</button> {/* remove */}
				<p><strong>{(componentPage === 'custodian') ? ('Confirm Resolution') : ('Verify Resolution')}: </strong></p>
					{testNum ? (
						<NotificationDropdown
						componentPage={componentPg}
						currentNoOfAttention={currentNoOfAttention}
						details={details}
						bkColor={bkColor}
						confirmResolution={true}
						/>
						) : (
						<p>{(componentPage === 'custodian') ? ('All Resolutions Confirmed') : ('All Resolutions Verified')}</p>
					)}
			</div>
		</>
	)
}
export default Resolved;