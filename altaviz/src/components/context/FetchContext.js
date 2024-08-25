import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FetchContext = createContext();
export const FetchProviders = ({ children }) => {
	const [postData, setPostData] = useState(null);
	const [postLoading, setPostLoading] = useState(false);
	const [postError, setPostError] = useState(null);
	const redirectTo = useNavigate()

	function useGetDataAPI(url) {
		const [getData, setGetData] = useState(null);
		const [getLoading, setGetLoading] = useState(true);
		const [getError, setGetError] = useState(null);
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

	function usePostDataAPI(url, formData, trigger, redirectToPage) {
		// const [trigger, setTrigger] = useState(false);
		useEffect(() => {
			if (!trigger) {
				console.log('Login trigger is false. POST call not executed.');
				return;
			}
			// delete
			// Inspection
			console.log('from post api #####')
			console.log('url:', url);
			for (const [key, value] of formData.entries()) {
				console.log(`item: ${key}\nvalue: ${value}`);
			}
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
