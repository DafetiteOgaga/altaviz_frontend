import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

function SubmitNotification({error, success, page}) {
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [showNotifi, setShowNotifi] = useState(false);
	// const pageName = useLocation().pathname.split('/')[1];
	// console.log('pagename:', pageName);
	// console.log('page:', page);
	// const [itemExist, setItemExist] = useState(false);

	useEffect(() => {
		// if (success.exist) {
		// 	setItemExist(true);
		// }
		if (error) {
            setIsError(true);
			setIsSuccess(false);
			setShowNotifi(true);
        } else if (success && !success.exist) {
            setIsSuccess(true);
			setIsError(false);
			setShowNotifi(true);
        } else {
			setIsError(false);
		}
	}, [error, success]);
	useEffect(() => {
		if (isSuccess || isError) {
			const timer = setTimeout(() => {
				// console.log('success response:', success);
				setShowNotifi(false);
			}, 2500);
			return () => clearTimeout(timer);
		}
		setShowNotifi(false);
	}, [showNotifi])
	useEffect(() => {
		if (isSuccess || isError) {
			console.log('success response (no timer):', success);
		}
	}, [isSuccess, isError])
	const styleObj = {
		paddingLeft: '1rem',
		fontWeight: 'bold',
		margin: '0',
		opacity: showNotifi ? 1 : 0,
		transition: 'opacity 0.05s ease-out',
	}
	// console.log('submit notification worked!')
	// console.log('success:', success);
	// console.log('error:', error);
	// if (isSuccess) {
	console.log('success response (bare):', success);
	// }
	return (
		(showNotifi) &&
			(<>
			{isError &&
			<p style={{
				...styleObj, color: 'red',
			}}>
				Error: {error}: {(success.exist !== null) && success.exist}
			</p>}
			{isSuccess &&
			<p style={{
				...styleObj, color: 'green',
			}}>
				Success!
			</p>}
		</>)
	)
}
export default SubmitNotification;