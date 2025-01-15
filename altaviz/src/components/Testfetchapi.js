import useBeaconTests from "./testcomponents/beacontests";
import Exampletoast from "./testcomponents/toasttrigger";
import EmailForm from "./testcomponents/testemail";
import Passwords from "./SideBar/human_resource/createAndUpdateUserForms/password";
import { useState } from "react";
function Testfetchapi() {
	const [passwordValue, setPasswordValue] = useState(null);
	useBeaconTests()
	console.log({passwordValue})
	const pValue = (data) => {
		setPasswordValue(data)
		console.log('data received:', data)
	}
	return (
		<>
			<p style={toastStyle.success.style}>Test Page</p>
			<Exampletoast />
			<EmailForm />
			<hr />
			<Passwords passwordValue={pValue}/>
			<p style={toastStyle.error.style}>Test Page ends</p>
		</>
	);
}
export default Testfetchapi;
// darkgray gainsboro lightgrey silver
// dimgrey grey lightslategrey slategrey
const toastStyle = {
    success: {
		style: {
			background: 'gray',
			color: 'whitesmoke',
		},
    },
    error: {
		style: {
			background: 'gray',
			color: 'white',
		},
	},
}
