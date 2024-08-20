import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FetchContext = createContext();
export const FetchProviders = ({ children }) => {
	const [getData, setGetData] = useState(null);
	const [getLoading, setGetLoading] = useState(true);
	const [getError, setGetError] = useState(null);

	const [postData, setPostData] = useState(null);
	const [postLoading, setPostLoading] = useState(false);
	const [postError, setPostError] = useState(null);
	const redirectTo = useNavigate()

	function useGetDataAPI(url) {
		useEffect(() => {
			const fetchData = async () => {
				try {
					const response = await fetch(url);
					if (!response.ok) {
					throw new Error("could not connect");
					}
					const getData = await response.json();
					setGetData(getData);
				} catch (getError) {
					setGetError(getError.message);
				} finally {
					setGetLoading(false);
				}
			};
			fetchData();
		}, [url]);
		return { getData, getLoading, getError };
	}

	// function usePostDataAPI(url, formData, trigger, redirectToPage) {
	// 	useEffect(() => {
	// 		const PostData = async () => {
	// 			setPostLoading(true);
	// 			try {
	// 				const response = await fetch(url, {
	// 					method: 'POST',
	// 					// headers: {
	// 					// 	'Content-Type': 'application/json',
	// 					// },
	// 					// body: JSON.stringify(formData),
	// 					body: formData
	// 				});
	// 				if (response.ok) {
	// 					const responseData = await response.json();
	// 					// alert('Form submitted successfully');
	// 					// console.dir('payload (stringify): ' + JSON.stringify(formData));
	// 					// console.dir('payload after (not stringify): ' + formData);
	// 					setPostData(responseData)
	// 					// setLoading(false);
	// 					// console.log('Response from server:', responseData);

	// 					// remove this alert
	// 					alert(Object.entries(responseData)
	// 							.map(([key, value]) => `${key}: ${value}\n`)); // remove
	// 					// console.log('response:', response);
	// 					// console.log('response.ok:', response.ok);
	// 					// console.log('responseData:', responseData);
	// 					// console.log('data:', data);
	// 					// if (data) {
	// 					// 	alert(data.status)
	// 					// }
	// 					if (redirectToPage) {
	// 						redirectTo('/success');
	// 						setTimeout(() => {
	// 							redirectTo(redirectToPage);
	// 						}, 2500);
	// 					}
	// 					// redirectTo('/');

	// 					// onSuccess(responseData);
	// 				} else {
	// 					// setLoading(false);
	// 					alert('Failed to submit the form');
	// 					throw new Error('Could not post request.');
	// 					// setPrevData(fields);
	// 					// setPrevData(formData);
	// 				}
	// 			} catch (postError) {
	// 				// setLoading(false);
	// 				setPostError(postError.message);
	// 				console.log('server error:', postError.message);
	// 				console.error('Error submitting the form:', postError);
	// 			} finally {
	// 				setPostLoading(false);
	// 			}
	// 		};
	// 		if (trigger) {
	// 			PostData();
	// 		}
	// 		// PostData();
	// 	}, [url, formData, trigger, redirectToPage]);
	// 	return { postData, postLoading, postError };
	// }
	function usePostDataAPI(url, formData, trigger, redirectToPage) {
		// const [trigger, setTrigger] = useState(false);
	
		useEffect(() => {
			if (!trigger) return;
			const postData = async () => {
				try {
				setPostLoading(true);
				const response = await fetch(url, {
					method: "POST",
					body: formData,
				});
				if (response.ok) {
					const responseData = await response.json();
					setPostData(responseData);

					if (redirectToPage) {
					redirectTo("/success");
					setTimeout(() => {
						redirectTo(redirectToPage);
					}, 2500);
					}
				} else {
					throw new Error("Could not post request.");
				}
				} catch (error) {
				setPostError(error.message);
				} finally {
				setPostLoading(false);
				}
			};

			if (trigger) {
				postData();
				// setTrigger(false);
			}
		// }, [trigger, url, formData, redirectToPage]);
		}, [trigger]);

		// Function to trigger the post request
		// const initiatePost = () => setTrigger(true);

		return { postData, postLoading, postError };
		// return { postData, postLoading, postError, initiatePost };
	}
	return (
		<FetchContext.Provider value={{ useGetDataAPI, usePostDataAPI }}>
			{children}
		</FetchContext.Provider>
	);
}


