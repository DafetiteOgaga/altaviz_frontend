import { useState, useEffect } from "react";

function Overdue() {
	const overdue = 0;
	// do a little subtraction of the logged date and the current date
	// or simply do so on the backend
	const [status, setStatus] = useState('No');
	// const [bkColor, setBkColor] = useState('rgba(255, 255, 0, 0.6)');
	const [bkColor, setBkColor] = useState('');
	const [testNum, setTestNum] = useState(overdue)
	useEffect(() => {
		if (testNum === 1) {
			setStatus('Yes');
			setBkColor('rgba(255, 255, 0, 0.6)');
            console.log('Yes');
		} else {
			setStatus('No');
			setBkColor('');
            console.log('No');
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
export default Overdue;