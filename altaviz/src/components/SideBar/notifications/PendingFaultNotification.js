import { useState, useEffect } from "react";

function PendingFaultNotification() {
	const pending = 1;
	const [status, setStatus] = useState('Pending');
	const [bkColor, setBkColor] = useState('rgba(255, 255, 0, 0.6)');
	const [testNum, setTestNum] = useState(pending)
	useEffect(() => {
		if (testNum === 0) {
			setStatus('Resolved');
			setBkColor('')
            console.log('Resolved');
		} else {
			setStatus('Pending');
			setBkColor('rgba(255, 255, 0, 0.6)');
            console.log('Pending');
        }
	}, [testNum]);

	// test
	const testFeat = () => {
		if (testNum) {
			setTestNum(0);
		} else {
			setTestNum(1);
		}
	}
	// ...

    return (
		<>
			<span style={testNum === 0 ? {} :{
				backgroundColor: `${bkColor}`,
				borderRadius: '5px',
				border: '1px solid',
				padding: '0 0.5rem',
			}}>
				{status}
			</span>
			<button onClick={testFeat}>test</button> {/* remove */}
		</>
    );
}
export default PendingFaultNotification;