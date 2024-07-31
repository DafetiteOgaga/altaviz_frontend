import useFetch from "../../hooks/useFetch";

function ContactUs() {
	const { data, loading, error } = useFetch('http://localhost:8000');

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	console.log(data);

	return (
		<>
			<h2>Contact Us Page</h2>
			<h3>Contact form to send inquiries or feedback</h3>
		</>
	);
}
export default ContactUs;