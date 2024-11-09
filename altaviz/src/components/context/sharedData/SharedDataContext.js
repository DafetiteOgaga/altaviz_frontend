import { createContext, useState, useEffect, useContext } from "react";
import { RotContext } from "../RotContext";

export const SharedDataContext = createContext();

export const SharedDataProvider = ({ children }) => {
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const [custodianUpdateRequestDetails, SetCustodianUpdateRequestDetails] = useState(() => {
		// Initial state from localStorage
		const savedDetails = localStorage.getItem('cusodianUpdate');
		// console.log('root error:', typeof(savedDetails))
		const decodedData = RotCipher(savedDetails, decrypt)
		return savedDetails ? JSON.parse(decodedData) : null;
	});
	const [pendingFaultsContext, SetPendingFaultsContext] = useState(() => {
		// Initial state from localStorage
		const savedFaults = localStorage.getItem('faultContext');
		const decodedData = RotCipher(savedFaults, decrypt)
		return savedFaults ? JSON.parse(decodedData) : null;
	});
	const [confirmResolutionsContext, SetConfirmResolutionsContext] = useState(() => {
		// Initial state from localStorage
		const savedConfirmResolutions = localStorage.getItem('confirmResoContext');
		const decodedData = RotCipher(savedConfirmResolutions, decrypt)
		return savedConfirmResolutions ? JSON.parse(decodedData) : null;
	});
	
	useEffect(() => {
		// Save state to localStorage when it changes
		if (custodianUpdateRequestDetails !== null) {
			const encodedData = RotCipher(JSON.stringify(custodianUpdateRequestDetails), encrypt)
			localStorage.setItem('cusodianUpdate', encodedData);
		}
	}, [custodianUpdateRequestDetails]);
	useEffect(() => {
		// Save state to localStorage when it changes
		if (pendingFaultsContext !== null) {
			const encodedData = RotCipher(JSON.stringify(pendingFaultsContext), encrypt)
			localStorage.setItem('faultContext', encodedData);
		}
	}, [pendingFaultsContext]);
	useEffect(() => {
		// Save state to localStorage when it changes
		if (confirmResolutionsContext !== null) {
			const encodedData = RotCipher(JSON.stringify(confirmResolutionsContext), encrypt)
			localStorage.setItem('confirmResoContext', encodedData);
		}
	}, [confirmResolutionsContext]);
	
	return (
		<SharedDataContext.Provider value={{
			custodianUpdateRequestDetails, SetCustodianUpdateRequestDetails,
			pendingFaultsContext, SetPendingFaultsContext,
			confirmResolutionsContext, SetConfirmResolutionsContext,
			}}>
			{children}
		</SharedDataContext.Provider>
	)
}