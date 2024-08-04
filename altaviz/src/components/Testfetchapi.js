// import useFetch from "./hooks/useFetch";
import { useContext } from "react";
import { GlobalContext } from "./context/Context";


function Testfetchapi() {
	const { useFetchGET } = useContext(GlobalContext)
	const { data, loading, error } = useFetchGET('http://localhost:8000');

	if (loading) return <h6 className="error-and-loading">Loading...</h6>;
	if (error) return <h6 className="error-and-loading">{error}</h6>;
	console.log(data);

	return (
		<>
			<h2>Test Page</h2>
			{/* <h3>Contact form to send inquiries or feedback</h3> */}
		</>
	);
}
export default Testfetchapi;
