import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FetchContext = createContext();
export const FetchProviders = ({ children }) => {
	// post states
	
	// put states
	
	const redirectTo = useNavigate()

	// get request
	function useGetDataAPI(url, trigger=false) {
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
			if (trigger) {
				// console.log('FETCHING DATA:', trigger, '\nFETCHING FOR:', pageNameIs);
				// console.log("FETCHING FOR:", pageNameIs);
				fetchData();
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}
		}, [url, trigger]);
		return { getData, getLoading, getError };
	}

	// post request
	function usePostDataAPI(url, formData, trigger, redirectToPage) {
		const [postData, setPostData] = useState(null);
		const [postLoading, setPostLoading] = useState(false);
		const [postError, setPostError] = useState(null);
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

	// put request
	function usePutDataAPI(url, formData, trigger, redirectToPage) {
		const [putData, setPutData] = useState(null);
		const [putLoading, setPutLoading] = useState(false);
		const [putError, setPutError] = useState(null);
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
						throw new Error("Could not put request.");
					}
				} catch (error) {
					setPutError(error.message);
				} finally {
					setPutLoading(false);
				}
			};

			if (trigger) {
				putData();
				// setTrigger(false);
			}
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
		useEffect(() => {
			if (!trigger) {
				// console.log('Patch trigger is false. PATCH call not executed.');
				return;
			}
			// console.log('from patch api #####');
			// console.log('url:', url);
			for (const [key, value] of formData.entries()) {
				console.log(`item: ${key}\nvalue: ${value}`);
			}
			const patchData = async () => {
				try {
					setPatchLoading(true);
					const response = await fetch(url, {
						method: "PATCH",
						body: formData,
					});
					if (response.ok) {
						const responseData = await response.json();
						// console.log('response', responseData.msg);
						// if (responseData.msg === 'pending update request') {
						// 	const userConfirmed = window.confirm('An Update Request exists.\nSelect OK to Replace the last Update Request');

						// 	// redirect to put starts here
						// 	if (userConfirmed) {
						// 		console.log('using put request')
						// 		const putResponse = await fetch(url, {
						// 			method: "PUT",
						// 			body: formData,
						// 		});
						// 		if (putResponse.ok) {
						// 			const putResponseData = await putResponse.json();
						// 			console.log('PUT response', putResponseData);

						// 			if (redirectToPage) {
						// 				redirectTo("/success");
						// 				const timer = setTimeout(() => {
						// 					redirectTo(redirectToPage);
						// 				}, 2500);
						// 				return () => clearTimeout(timer);
						// 			}
						// 		} else {
						// 			throw new Error("Could not put request.");
						// 		}
						// 	} else {
						// 		// Cancel action
						// 		console.log('User chose to cancel');
						// 	}
						// 	return;
						// } // redirect to put ends here
						// else {
						// 	setPatchData(responseData);
						// }
						setPatchData(responseData);
	
						if (redirectToPage) {
							redirectTo("/success");
							const timer = setTimeout(() => {
								redirectTo(redirectToPage);
							}, 1000);
							return () => clearTimeout(timer);
						}
					} else {
						throw new Error("Could not patch request.");
					}
				} catch (error) {
					setPatchError(error.message);
				} finally {
					setPatchLoading(false);
				}
			};
	
			if (trigger) {
				patchData();
			}
		}, [trigger]);
	
		return { patchData, patchLoading, patchError };
	}
	
	// delete request
	function useDeleteDataAPI(url, trigger, redirectToPage) {
		const [deleteData, setDeleteData] = useState(null);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [deleteError, setDeleteError] = useState(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Delete trigger is false. DELETE call not executed.');
				return;
			}
			// console.log('from delete api #####');
			// console.log('url:', url);
	
			const deleteData = async () => {
				try {
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
						throw new Error("Could not delete request.");
					}
				} catch (error) {
					setDeleteError(error.message);
				} finally {
					setDeleteLoading(false);
				}
			};
	
			if (trigger) {
				deleteData();
			}
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
