// import React, { createContext, useState } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from'react-router-dom';
// import ATMDescription from './ATMDescription';
// import ATMDescriptionSummary from './ATMDescriptionSummary';

// const details = ATMDescription()
// console.log('length of ATMDescription: ' + details.length)

// Create a Context
export const GlobalContext = createContext();

// converts text to sentence case
const toSentenceCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const spaceToHiphen = (str) => {
	// console.log('str:', str)
	let newStr = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] === ' ') {
			newStr += '-';
			continue;
		}
		newStr += str[i];
	}
	// console.log('newStr:', newStr)
	return newStr;
};

// slice texts by words
// const sliceTextByWords = (text, wordLimit) => {
// 	const words = text.split(' ');
// 	return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
//   };

// Create a Provider component
export const GlobalProvider = ({ children }) => {
//   const [globalVariable, setGlobalVariable] = useState('Initial Value');
	// company name
	const companyName = 'Altaviz Support Limited';

	// navigation
	const useNavigation = (page) => {
		let text = ''
		let remainingText = ''
		if (page.includes(' ')) {
			const parts = page.split(' ', 2);
			page = parts[0];
			text = parts[1];
			if (text.includes(' ')) {
			const otherParts = text.split(' ', 2);
				text = otherParts[0];
				remainingText = otherParts[1];
			}
			text = ' ' + text;
		}
		const navigate = useNavigate();
		page = page.toLowerCase();
		const path = `/${page}`;
		const goToPage = (e) => {
		e.preventDefault();
		navigate(path);
		};
		// console.log('usenavigation is working...');
		return (
			<>
				<a
					href={path}
					className={page}
					onClick={goToPage}
					style={{
						display: 'inline-block',
					}}
					>
						{toSentenceCase(page)}{text}
				</a>{remainingText}
			</>
			);
	};

	// button
	const useButton = (btn) => {
		let btn_btn = null;
		let value = null;
		if (btn.length === 2) {
			[btn_btn, value] = btn;
			// console.log('btn_btn (if): ', btn_btn);
			// console.log('disable_btn (if):', value);
		} else if (btn.length === 1) {
			btn_btn = btn[0];
			// if (value === true || value === false) {
			value = true;
			// }
			
			// console.log('btn_btn (else): ', btn_btn);
			// console.log('disable_btn (else):', value);
        }
		btn_btn = btn_btn.toLowerCase();
		
		// console.log('btn:', btn);
		// console.log('btn_btn:', btn_btn);
		// console.log('value:', value);
			return <button
				type='submit'
				className={spaceToHiphen(btn_btn)}
				id={spaceToHiphen(btn_btn)}
				disabled={!value}
				// onClick={value}
				>
					{toSentenceCase(btn_btn)}
				</button>
		};

	return (
		// <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, bookVariable }}>
		// <GlobalContext.Provider value={{ companyName, useNavigation, useButton, useFetchGET, useFetchPost, cardData }}>
		<GlobalContext.Provider value={{ companyName, useNavigation, useButton }}>
		{children}
		</GlobalContext.Provider>
	);
};
