// import React, { createContext, useState } from 'react';
import React, { createContext, useEffect, useState } from 'react';
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
			value = true;
			// console.log('btn_btn (else): ', btn_btn);
			// console.log('disable_btn (else):', value);
        }
		btn_btn = btn_btn.toLowerCase();
		
		// console.log('btn:', btn);
		// console.log('btn_btn:', btn_btn);
		// console.log('value:', value);
			return <button
				type={btn_btn}
				className={btn_btn}
				disabled={!value}
				>
					{toSentenceCase(btn_btn)}
				</button>
		};
	
	// GET-request api function
	function useFetchGET(url) {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);
		// console.log('processing GET from context ...')
		// console.log('data from context (GET):', data)
		// console.log('loading from context (GET):', loading)
		// console.log('error from context: (GET)', error)
	
		useEffect(() => {
			const fetchData = async () => {
				try {
					const response = await fetch(url);
					if (!response.ok) {
					throw new Error("could not connect");
					}
					const data = await response.json();
					setData(data);
				} catch (error) {
					setError(error.message);
				} finally {
					setLoading(false);
				}
			};
	
			fetchData();
		}, [url]);
	
		return { data, loading, error };
	}

	// POST-request api function
	function useFetchPost(url, formData, trigger) {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);
		// const [ prevData, setPrevData ] = useState(formData);
		// console.log('processing POST from context ...')
		// console.log('data from context: (POST)', data)
		// console.log('loading from context: (POST)', loading)
		// console.log('error from context: (POST)', error)
		const redirectTo = useNavigate()
		// console.dir('payload before (not stringify): ' + formData);
		// alert(`Form Data: ${formData}`);
		useEffect(() => {
			const PostData = async () => {
				setLoading(true);
				try {
					const response = await fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(formData),
					});
					if (response.ok) {
						const responseData = await response.json();
						// alert('Form submitted successfully');
						// console.dir('payload (stringify): ' + JSON.stringify(formData));
						// console.dir('payload after (not stringify): ' + formData);
						setData(responseData)
						// console.log('Response from server:', responseData);

						// remove this alert
						alert(Object.entries(responseData)
								.map(([key, value]) => `${key}: ${value}\n`)); // remove
						// console.log('response:', response);
						// console.log('response.ok:', response.ok);
						// console.log('responseData:', responseData);
						// console.log('data:', data);
						// if (data) {
						// 	alert(data.status)
						// }
						redirectTo('/success');
						setTimeout(() => {
							redirectTo('/');
						  }, 2500);
						// redirectTo('/');

						// onSuccess(responseData);
					} else {
						alert('Failed to submit the form');
						// setPrevData(fields);
						// setPrevData(formData);
					}
				} catch (error) {
					console.error('Error submitting the form:', error);
					setError(error.message);
				} finally {
					setLoading(false);
				}
			};
			if (trigger) {
				PostData();
			}
			// PostData();
		}, [url, formData, trigger, redirectTo, data]);
		return { data, loading, error };
	}

	// mock data
	// remove ................................................
	// function getImages(r) {
	// 	return r.keys().map(r);
	// }
	// const images = getImages(require.context('../product_images/', false, /\.(png|jpe?g|svg)$/));
	// const titles = [
	// 	'H22V series',
	// 	'H68NL Series Intelligent Cash Recycler',
	// 	'grg-200-v-sorting-machine',
	// 	'H34 series',
	// ]
	// const detailedDescriptions = ATMDescription()
	// const descriptions = ATMDescriptionSummary()
	// const cardData = images.map((image, index) => {
	// 	// console.log('index', index, 'title', titles[index] , 'descriptions', descriptions[index], 'image', image)
	// 	return ({
	// 		id: index,
	// 		title: titles[index],
    //         description: descriptions[index],
	// 		detailedDescriptions: detailedDescriptions[index],
    //         image: image,
	// 	})});
	// remove ................................................

	return (
		// <GlobalContext.Provider value={{ globalVariable, setGlobalVariable, bookVariable }}>
		// <GlobalContext.Provider value={{ companyName, useNavigation, useButton, useFetchGET, useFetchPost, cardData }}>
		<GlobalContext.Provider value={{ companyName, useNavigation, useButton, useFetchGET, useFetchPost }}>
		{children}
		</GlobalContext.Provider>
	);
};
