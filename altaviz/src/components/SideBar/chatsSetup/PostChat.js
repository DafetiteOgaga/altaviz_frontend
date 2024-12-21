import { useEffect, useRef, useState } from "react";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)
const usePostRequest = ({ currentChatID, authData, formData, postTrigger }) => {
	const prevChatID = useRef(null)
	const [chatID, setChatID] = useState(null)
    const [postData, setPostData] = useState(null); // To hold the POST response
    const [postError, setPostError] = useState(null); // To hold any error
	const [postLoading, setPostLoading] = useState(false);
	// const [chatID, setChatID] = useState(false)

	useEffect(() => {
        // Only update chatID when currentChatID changes
        if (currentChatID.current !== prevChatID.current) {
            setChatID(currentChatID.current); // Update chatID
            prevChatID.current = currentChatID.current; // Store the new chatID
        }
    }, [currentChatID.current]);

    useEffect(() => {
        // Only make the request if postTrigger is true
        if (!postTrigger || !chatID || !authData?.id) return;

        const makePostRequest = async () => {
			setPostLoading(true);
            try {
                const url = `chat-user/${currentChatID.current}/${authData.id}/`;
                console.log("Sending POST request to:", `${apiBaseUrl}/${url}`);
                
                const response = await fetch(`${apiBaseUrl}/${url}`, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("POST response:", responseData);
                    setPostData(responseData); // Save the response
				} else {
					const three = '\n8888888888888888888888888888888'
					console.log(
						three.repeat(10),
						"\nResponse status:", response.status, response.statusText,
						three.repeat(10)
					);
					throw new Error(`Failed to post. Status: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error making POST request:", error.message);
                setPostError(error.message); // Save the error
            } finally {
                setPostLoading(false); // End loading state
            }
        };

        makePostRequest();
	}, [postTrigger, chatID]); // Controlled by postTrigger

    return { postData, postError, postLoading }; // Return relevant state for usage in the component
};

export default usePostRequest;
