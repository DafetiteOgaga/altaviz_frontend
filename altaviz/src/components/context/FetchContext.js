import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const FetchContext = createContext();
const checkNull = (url) => url.split('/').some(list => list === 'null')
export const FetchProviders = ({ children }) => {
	// post states
	
	// put states
	
	const redirectTo = useNavigate()

	// get request
	function useGetDataAPI(url, trigger=false) {
		const [getData, setGetData] = useState(null);
		const [getLoading, setGetLoading] = useState(true);
		const [getError, setGetError] = useState(null);

		// Reference for debounce timer
		const debounceTimer = useRef(null);

		useEffect(() => {
			const fetchData = async () => {
				try {
					if (checkNull(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						const response = await fetch(url);
						if (!response.ok) {
							console.log({response})
							console.log(`Error fetching data for ${url}: ${response.statusText}`)
							throw new Error("could not connect");
						}
						const getData = await response.json();
						setGetData(getData);
					}
					// console.log('getData (from fetch):', getData);
				} catch (getError) {
					setGetError(getError.message);
				} finally {
					setGetLoading(false);
				}
			};
			// fetchData();
			for (let i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i); // Retrieve the key at index 'i'
				// let value = localStorage.getItem(key); // Get the value associated with the key
				// console.log(`localKey: ${key}`) //, Value: ${value}`);
			}
			const pageNameIs = url.split('127.0.0.1:8000')[1]
			// Reference for debounce timer
			// const debounceTimer = useRef(null);
			if (trigger) {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				}
	
				// Apply debounce delay before calling fetchData
				debounceTimer.current = setTimeout(() => {
					console.log("Fetching data for:", pageNameIs); // Optional debug log
					fetchData();
				}, 200); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}
	
			// Cleanup: Clear the timer on component unmount or dependency change
			return () => {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current);
				}
			};
		}, [url, trigger]);
		return { getData, getLoading, getError };
	}

	// post request
	function usePostDataAPI(url, formData, trigger, redirectToPage) {
		const [postData, setPostData] = useState(null);
		const [postLoading, setPostLoading] = useState(false);
		const [postError, setPostError] = useState(null);
		// Reference for debounce timer
		const debounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Post trigger is false. POST call not executed.');
				return;
			}
			// delete
			// Inspection
			// console.log('from post api #####')
			// console.log('url:', url);
			for (const [key, value] of formData.entries()) {
				console.log(`item: ${key}\nvalue: ${value}`);
			}
			const postData = async () => {
				try {
					if (checkNull(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setPostLoading(true);
						const response = await fetch(url, {
							method: "POST",
							body: formData,
						});
						if (response.ok) {
							const responseData = await response.json();
							// console.log('response', responseData.msg);
							if (responseData.msg === 'pending update request') {
								const userConfirmed = window.confirm('An Update Request exists.\nSelect OK to Replace the last Update Request');

								// redirect to put starts here
								if (userConfirmed) {
									// console.log('using put request')
									const putResponse = await fetch(url, {
										method: "PATCH",
										body: formData,
									});
									if (putResponse.ok) {
										const putResponseData = await putResponse.json();
										// console.log('PATCH response', putResponseData);
										setPostData(putResponseData);

										if (redirectToPage) {
											redirectTo("/success");
											const timer = setTimeout(() => {
												redirectTo(redirectToPage);
											}, 1000);
											return () => clearTimeout(timer);
										}
									} else {
										console.log(`Error POSTING or PATCHING data for ${url}: ${response.statusText}`)
										setPostError('Could not PATCH request.');
										throw new Error("Could not PATCH request.");
									}
								} else {
									// Cancel action
									// console.log('User chose to cancel');
								}
								return;
							} // redirect to put ends here
							else {
								setPostData(responseData);
							}

							if (redirectToPage) {
								redirectTo("/success");
								const timer = setTimeout(() => {
									redirectTo(redirectToPage);
								}, 1000);
								return () => clearTimeout(timer);
							}
						} else {
							throw new Error("Could not post request.");
						}
					}
				} catch (error) {
				setPostError(error.message);
				} finally {
				setPostLoading(false);
				}
			};

			// Reference for debounce timer
			// const debounceTimer = useRef(null);
			if (trigger) {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				}

				// Apply debounce delay before calling fetchData
				debounceTimer.current = setTimeout(() => {
					postData();
				}, 300); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// Cleanup: Clear the timer on component unmount or dependency change
			return () => {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current);
				}
			};
		// }, [trigger, url, formData, redirectToPage]);
		}, [trigger]);

		// Function to trigger the post request
		// const initiatePost = () => setTrigger(true);

		return { postData, postLoading, postError };
		// return { postData, postLoading, postError, initiatePost };
	}

	// put request
	function usePutDataAPI(url, formData, trigger, redirectToPage) {
		const [putData, setPutData] = useState(null);
		const [putLoading, setPutLoading] = useState(false);
		const [putError, setPutError] = useState(null);
		// Reference for debounce timer
		const debounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Put trigger is false. PUT call not executed.');
				return;
			}
			// delete
			// Inspection
			// console.log('from put api #####')
			// console.log('url:', url);
			for (const [key, value] of formData.entries()) {
				console.log(`item: ${key}\nvalue: ${value}`);
			}
			const putData = async () => {
				try {
					if (checkNull(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setPutLoading(true);
						const response = await fetch(url, {
							method: "PUT",
							body: formData,
						});
						if (response.ok) {
							const responseData = await response.json();
							setPutData(responseData);

							if (redirectToPage) {
								redirectTo("/success");
								const timer = setTimeout(() => {
									redirectTo(redirectToPage);
								}, 1000);
								return () => clearTimeout(timer);
							}
						} else {
							console.log(`Error PUTTING data for ${url}: ${response.statusText}`)
							throw new Error("Could not PUT request.");
						}
					}
				} catch (error) {
					setPutError(error.message);
				} finally {
					setPutLoading(false);
				}
			};
			// Reference for debounce timer
		// const debounceTimer = useRef(null);
			if (trigger) {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				}

				// Apply debounce delay before calling fetchData
				debounceTimer.current = setTimeout(() => {
					putData();
				}, 300); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// Cleanup: Clear the timer on component unmount or dependency change
			return () => {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current);
				}
			};
		// }, [trigger, url, formData, redirectToPage]);
		}, [trigger]);

		// Function to trigger the post request
		// const initiatePost = () => setTrigger(true);

		return { putData, putLoading, putError };
		// return { postData, postLoading, postError, initiatePost };
	}

	// patch request
	function usePatchDataAPI(url, formData, trigger, redirectToPage) {
		const [patchData, setPatchData] = useState(null);
		const [patchLoading, setPatchLoading] = useState(false);
		const [patchError, setPatchError] = useState(null);
		// Reference for debounce timer
		const debounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Patch trigger is false. PATCH call not executed.');
				return;
			}
			console.log('from patch api #####');
			console.log(
				'\nurl:', url,
				'\ntrigger:', trigger,
				'\nredirect:', redirectToPage
			);
			for (const [key, value] of formData.entries()) {
				console.log(`item: ${key}\nvalue: ${value}`);
			}
			console.log('111111111111111111')
			const patchData = async () => {
				console.log('222222222222222222')
				try {
					console.log('33333333333333333')
					if (checkNull(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						console.log('setting patchLoading to true')
						setPatchLoading(true);
						const response = await fetch(url, {
							method: "PATCH",
							body: formData,
						});
						console.log('getting and checking response')
						if (response.ok) {
							const responseData = await response.json();
							setPatchData(responseData);
							console.log('set data to state variable')
							if (redirectToPage) {
								redirectTo("/success");
								const timer = setTimeout(() => {
									redirectTo(redirectToPage);
								}, 1000);
								return () => clearTimeout(timer);
							}
						} else {
							console.log(`Error PATCHING data for ${url}: ${response.statusText}`);
							throw new Error("Could not patch request.");
						}
					}
				} catch (error) {
					setPatchError(error.message);
				} finally {
					setPatchLoading(false);
				}
			};
			// Reference for debounce timer
			// const debounceTimer = useRef(null);
			if (trigger) {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				}

				// Apply debounce delay before calling fetchData
				debounceTimer.current = setTimeout(() => {
					patchData();
				}, 2); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// Cleanup: Clear the timer on component unmount or dependency change
			return () => {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current);
				}
			};
		}, [trigger]);
	
		return { patchData, patchLoading, patchError };
	}
	
	// delete request
	function useDeleteDataAPI(url, trigger, redirectToPage) {
		const [deleteData, setDeleteData] = useState(null);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [deleteError, setDeleteError] = useState(null);
		// Reference for debounce timer
		const debounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Delete trigger is false. DELETE call not executed.');
				return;
			}
			// console.log('from delete api #####');
			// console.log('url:', url);
	
			const deleteData = async () => {
				try {
					if (checkNull(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setDeleteLoading(true);
						const response = await fetch(url, {
							method: "DELETE",
						});
						// console.log('response ok:', response.ok)
						if (response.ok) {
							const responseData = await response.json();
							setDeleteData(responseData);
							// console.log('DELETE response', responseData);
		
							if (redirectToPage) {
								// console.log('redirect to page:', redirectToPage)
								redirectTo("/success");
								const timer = setTimeout(() => {
									redirectTo(redirectToPage);
								}, 1000);
								return () => clearTimeout(timer);
							}
						} else {
							console.log(`Error DELETING data for ${url}: ${response.statusText}`);
							throw new Error("Could not delete request.");
						}
					}
				} catch (error) {
					setDeleteError(error.message);
				} finally {
					setDeleteLoading(false);
				}
			};
			// Reference for debounce timer
			// const debounceTimer = useRef(null);
			if (trigger) {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				}

				// Apply debounce delay before calling fetchData
				debounceTimer.current = setTimeout(() => {
					deleteData();
				}, 300); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// Cleanup: Clear the timer on component unmount or dependency change
			return () => {
				if (debounceTimer.current) {
					clearTimeout(debounceTimer.current);
				}
			};
		}, [trigger]);
	
		return { deleteData, deleteLoading, deleteError };
	}
	
	return (
		<FetchContext.Provider value={{
			useGetDataAPI,
			usePostDataAPI,
			usePutDataAPI,
			usePatchDataAPI,
			useDeleteDataAPI,
			}}>
			{children}
		</FetchContext.Provider>
	);
}
