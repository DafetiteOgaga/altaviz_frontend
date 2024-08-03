import { useEffect, useState } from "react";

function useFetchPost(url, formData, trigger) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const postData = async () => {
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
					alert('Form submitted successfully');
					setData(responseData)
				} else {
					alert('Failed to submit the form');
				}
			} catch (error) {
				console.error('Error submitting the form:', error);
				setError(error.message);
			} finally {
				setLoading(false);
            }
		};
		if (trigger) {
			postData();
		}

		postData();
	}, [url, formData, trigger]);

	return { data, loading, error };
}

export default useFetchPost;
