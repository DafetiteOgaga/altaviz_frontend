import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function PendingRequestNotification() {
	const componentPage = useLocation().pathname.split('/')[1];
	console.log('componentPage request-details:', componentPage);
	const pending = -1;
	const [status, setStatus] = useState('Pending');
	const [bkColor, setBkColor] = useState('rgba(255, 255, 0, 0.6)');
	const [fontColor, setFontColor] = useState('');
	const [lnBorder, setLnBorder] = useState('1px solid');
	const [fWeight, setFWeight] = useState('');
	const [testNum, setTestNum] = useState(pending)
	useEffect(() => {
		if (testNum > 0) {
			setStatus('Approved');
			setBkColor('');
			setFontColor('green');
			setLnBorder('');
			setFWeight('bold');
            console.log('Approved');
		} else if (testNum < 0) {
			setStatus('Pending');
			setBkColor('rgba(255, 255, 0, 0.6)');
			setFontColor('');
			setLnBorder('1px solid');
			setFWeight('');
            console.log('Pending');
        } else {
			if (componentPage === 'custodian') {
				setStatus('Pending');
                setBkColor('rgba(255, 255, 0, 0.6)');
                setFontColor('');
                setLnBorder('1px solid');
                setFWeight('');
                console.log('Pending');
			} else {
				setStatus('Rejected');
				setBkColor('');
				setFontColor('red');
				setLnBorder('');
				setFWeight('bold');
				console.log('Rejected');
			}
		}
	}, [testNum, componentPage]);

	// test
	const testFeat = () => {
		if (testNum < 0) {
			setTestNum(5);
		} else if (testNum > 0) {
			setTestNum(0);
		} else {
			setTestNum(-8);
		}
	}
	// ...

    return (
		<>
			{/* <span style={testNum === 0 ? {} :{ */}
			<span style={{
				color: `${fontColor}`,
				backgroundColor: `${bkColor}`,
				borderRadius: '5px',
				border: `${lnBorder}`,
				fontWeight: `${fWeight}`,
				padding: '0 0.5rem',
			}}>
				{status}
			</span>
			<button onClick={testFeat}>test</button> {/* remove */}
		</>
    );
}
export default PendingRequestNotification;