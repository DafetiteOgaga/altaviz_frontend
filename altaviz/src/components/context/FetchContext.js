import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const FetchContext = createContext();
const checkNull = (url) => url.split('/').some?.(list => list === 'null'||list === null)
const checkUndefined = (url) => url.split('/').some?.(list => list === 'undefined'||list === undefined)
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
export const FetchProviders = ({ children }) => {
	const redirectTo = useNavigate()

	// get request
	function useGetDataAPI(url, trigger=false) {
		const [getData, setGetData] = useState(null);
		const [getLoading, setGetLoading] = useState(true);
		const [getError, setGetError] = useState(null);

		// Reference for debounce timer
		const getDebounceTimer = useRef(null);

		useEffect(() => {
			const fetchData = async () => {
				try {
					if (checkNull(url)||checkUndefined(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setGetLoading(true)
						setGetData(null)
						const response = await fetch(`${apiBaseUrl}/${url}`);
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
			// for (let i = 0; i < localStorage.length; i++) {
			// 	let key = localStorage.key(i); // Retrieve the key at index 'i'
				// let value = localStorage.getItem(key); // Get the value associated with the key
				// console.log(`localKey: ${key}`) //, Value: ${value}`);
			// }
			// const pageNameIs = url.split(apiBaseUrl)[1]
			// console.log(
			// 	'\nurl:', url,
			// 	'\nurl has null:', checkNull(url),
			// 	'\npageNameIs:', pageNameIs
			// )
			if (trigger&&!checkNull(url)) {
				console.log(
					'\nurl:', url,
					'\nurl has null:', checkNull(url),
					// '\npageNameIs:', pageNameIs
				)
				// if (debounceTimer.current) {
				// 	clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				// }
	
				// Apply debounce delay before calling fetchData
				getDebounceTimer.current = setTimeout(() => {
					// console.log("Fetching data for:", pageNameIs); // Optional debug log
					fetchData();
				}, 500); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}
	
			// // Cleanup: Clear the timer on component unmount or dependency change
			// return () => {
			// 	if (getDebounceTimer.current) {
			// 		clearTimeout(getDebounceTimer.current);
			// 	}
			// };
		}, [url, trigger]);
		return { getData, getLoading, getError };
	}

	// post request
	function usePostDataAPI(url, formData, trigger, redirectToPage) {
		const [postData, setPostData] = useState(null);
		const [postLoading, setPostLoading] = useState(false);
		const [postError, setPostError] = useState(null);
		// Reference for debounce timer
		const postDebounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Post trigger is false. POST call not executed.');
				return;
			}
			const postData = async () => {
				try {
					if (checkNull(url)||checkUndefined(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setPostLoading(true);
						// setPostData(null);
						const response = await fetch(`${apiBaseUrl}/${url}`, {
							method: "POST",
							body: formData,
						});
						if (response.ok) {
							const responseData = await response.json();
							// const three = '\n8888888888888888888888888888888'
							console.log('\nresponse:', responseData,)
							if (responseData.msg === 'pending update request') {
								const userConfirmed = window.confirm('An Update Request exists.\nSelect OK to Replace the last Update Request');

								// redirect to put starts here
								if (userConfirmed) {
									// console.log('using put request')
									const patchReResponse = await fetch(`${apiBaseUrl}/${url}`, {
										method: "PATCH",
										body: formData,
									});
									if (patchReResponse.ok) {
										const patchReResponseData = await patchReResponse.json();
										// console.log('PATCH response', putResponseData);
										setPostData(patchReResponseData);

										if (redirectToPage) {
											redirectTo("/success");
											const timer = setTimeout(() => {
												redirectTo(redirectToPage);
											}, 700);
											return () => clearTimeout(timer);
										}
									} else {
										console.log(`Error POSTING or PATCHING data for ${url}: ${response.statusText}`)
										setPostError('Could not PATCH request.');
										const rePatResponseErr = await response.json();
										if (rePatResponseErr?.msg) throw new Error(rePatResponseErr.msg);
										else throw new Error("Could not PATCH request.");
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
								}, 700);
								return () => clearTimeout(timer);
							}
						} else {
							const posResponseErr = await response.json();
							if (posResponseErr?.msg) throw new Error(posResponseErr.msg);
							else throw new Error("Oopsy! could not post request.");
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
			if (trigger&&!checkNull(url)) {
				console.log(
					'\nurl:', url,
					'\nurl has null:', checkNull(url),
					// '\npageNameIs:', pageNameIs
				)
				// if (debounceTimer.current) {
				// 	clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				// }

				// Apply debounce delay before calling fetchData
				postDebounceTimer.current = setTimeout(() => {
					postData();
				}, 500); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// Cleanup: Clear the timer on component unmount or dependency change
			// return () => {
			// 	if (postDebounceTimer.current) {
			// 		clearTimeout(postDebounceTimer.current);
			// 	}
			// };
		// }, [trigger, url, formData, redirectToPage]);
		}, [trigger, url]);

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
		const putDebounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Put trigger is false. PUT call not executed.');
				return;
			}
			// delete
			// Inspection
			// console.log('from put api #####')
			// console.log('url:', url);
			// for (const [key, value] of formData.entries()) {
			// 	console.log(`item: ${key}\nvalue: ${value}`);
			// }
			const putData = async () => {
				try {
					if (checkNull(url)||checkUndefined(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						setPutLoading(true);
						const response = await fetch(`${apiBaseUrl}/${url}`, {
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
								}, 700);
								return () => clearTimeout(timer);
							}
						} else {
							console.log(`Error PUTTING data for ${url}: ${response.statusText}`)
							const putResponseErr = await response.json();
							if (putResponseErr?.msg) throw new Error(putResponseErr.msg);
							else throw new Error("Could not PUT request.");
						}
					}
				} catch (error) {
					setPutError(error.message);
				} finally {
					setPutLoading(false);
				}
			};
			// Reference for debounce timer
			if (trigger&&!checkNull(url)) {
				console.log(
					'\nurl:', url,
					'\nurl has null:', checkNull(url),
					// '\npageNameIs:', pageNameIs
				)
				// if (debounceTimer.current) {
				// 	clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				// }

				// Apply debounce delay before calling fetchData
				putDebounceTimer.current = setTimeout(() => {
					putData();
				}, 500); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// // Cleanup: Clear the timer on component unmount or dependency change
			// return () => {
			// 	if (putDebounceTimer.current) {
			// 		clearTimeout(putDebounceTimer.current);
			// 	}
			// };
		// }, [trigger, url, formData, redirectToPage]);
		}, [trigger, url]);

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
		const patchDebounceTimer = useRef(null);
		useEffect(() => {
			if (!trigger) {
				// console.log('Patch trigger is false. PATCH call not executed.');
				return;
			}
			console.log('from patch api #####');
			// console.log(
			// 	'\nurl:', url,
			// 	'\ntrigger:', trigger,
			// 	'\nredirect:', redirectToPage
			// );
			// for (const [key, value] of formData.entries()) {
			// 	console.log(`item: ${key}\nvalue: ${value}`);
			// }
			// console.log('111111111111111111')
			const patchData = async () => {
				// console.log('222222222222222222')
				try {
					// console.log('33333333333333333')
					if (checkNull(url)||checkUndefined(url)) {
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						console.log('setting patchLoading to true')
						setPatchLoading(true);
						const response = await fetch(`${apiBaseUrl}/${url}`, {
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
								}, 700);
								return () => clearTimeout(timer);
							}
						} else {
							console.log(`Error PATCHING data for ${url}: ${response.statusText}`);
							const patResponseErr = await response.json();
							if (patResponseErr?.msg) throw new Error(patResponseErr.msg);
							else throw new Error("Could not patch request.");
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
			if (trigger&&!checkNull(url)) {
				console.log(
					'\nurl:', url,
					'\nurl has null:', checkNull(url),
					// '\npageNameIs:', pageNameIs
				)
				// if (debounceTimer.current) {
				// 	clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				// }

				// Apply debounce delay before calling fetchData
				patchDebounceTimer.current = setTimeout(() => {
					patchData();
				}, 500); // 300ms debounce delay
			} else {
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}

			// // Cleanup: Clear the timer on component unmount or dependency change
			// return () => {
			// 	if (patchDebounceTimer.current) {
			// 		clearTimeout(patchDebounceTimer.current);
			// 	}
			// };
		}, [trigger, url]);
	
		return { patchData, patchLoading, patchError };
	}
	
	// delete request
	function useDeleteDataAPI(url, trigger, redirectToPage) {
		const [deleteData, setDeleteData] = useState(null);
		const [deleteLoading, setDeleteLoading] = useState(false);
		const [deleteError, setDeleteError] = useState(null);
		// Reference for debounce timer
		// const times = 25
		// console.log('0'.repeat(times))
		const deleteDebounceTimer = useRef(null);
		console.log({url})
		useEffect(() => {
			// console.log(('0'+15).repeat(times))
			if (!trigger) {
				// console.log(('0'+16).repeat(times))
				// console.log('Delete trigger is false. DELETE call not executed.');
				return;
			}
			// console.log('from delete api #####');
			// console.log('url:', url);
			// const one = 1
			const deleteData = async () => {
				// console.log(('0'+17).repeat(times))
				try {
					// console.log(('0'+1).repeat(times))
					if (checkNull(url)||checkUndefined(url)) {
						// console.log(('0'+2).repeat(times))
						console.log('found null in url provided:', url)
						throw new Error("found null in url provided");
					} else {
						// console.log(('0'+3).repeat(times))
						setDeleteLoading(true);
						const response = await fetch(`${apiBaseUrl}/${url}`, {
							method: "DELETE",
						});
						// console.log('response ok:', response.ok)
						if (response.ok) {
							// console.log(('0'+4).repeat(times))
							const responseData = await response.json();
							setDeleteData(responseData);
							// console.log('DELETE response', responseData);
		
							if (redirectToPage) {
								// console.log(('0'+5).repeat(times))
								// console.log('redirect to page:', redirectToPage)
								redirectTo("/success");
								const timer = setTimeout(() => {
									// console.log(('0'+6).repeat(times))
									redirectTo(redirectToPage);
								}, 700);
								return () => clearTimeout(timer);
							}
						} else {
							// console.log(('0'+7).repeat(times))
							console.log(`Error DELETING data for ${url}: ${response.statusText}`);
							const delResponseErr = await response.json();
							if (delResponseErr?.msg) throw new Error(delResponseErr.msg);
							else throw new Error("Could not delete request.");
						}
					}
				} catch (error) {
					// console.log(('0'+8).repeat(times))
					setDeleteError(error.message);
				} finally {
					// console.log(('0'+9).repeat(times))
					setDeleteLoading(false);
				}
			};
			// Reference for debounce timer
			// const debounceTimer = useRef(null);
			if (trigger&&!checkNull(url)) {
				console.log(
					'\nurl:', url,
					'\nurl has null:', checkNull(url),
					// '\npageNameIs:', pageNameIs
				)
				// console.log(('0'+10).repeat(times))
				// if (debounceTimer.current) {
				// 	console.log(('0'+11).repeat(times))
				// 	// clearTimeout(debounceTimer.current); // Clear any existing debounce timer
				// }

				// Apply debounce delay before calling fetchData
				deleteDebounceTimer.current = setTimeout(() => {
					// console.log(('0'+12).repeat(times))
					deleteData();
				}, 500); // 300ms debounce delay

				// Cleanup: Clear the timer on component unmount or dependency change
				// return () => {
				// 	console.log(('0'+14).repeat(times))
				// 	if (deleteDebounceTimer.current) {
				// 		clearTimeout(deleteDebounceTimer.current);
				// 	}
				// };
			} else {
				// console.log(('0'+13).repeat(times))
				// console.log('TRIGGER TO GETDATA:', trigger);
				// console.log("CAN'T FETCH DATA FOR", '\n', pageNameIs);
			}
		}, [trigger, url]);
	
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
