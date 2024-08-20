// import logo from "../../logo/altaviz_logo.png"
import "./user.css"
import { useContext, useState, useEffect } from "react"
import { FetchContext } from "../context/FetchContext"

function User () {
	// post setup
	// const [postTrigger, setPostTrigger] = useState(false);
	// const [formData, setFormData] = useState(new FormData());
	const { useGetDataAPI } = useContext(FetchContext);
	// const { getData, getLoading, getError } = useGetDataAPI(
	const { getData, getLoading } = useGetDataAPI(
		'http://127.0.0.1:8000/user/1',
	);
	const [response, setResponse] = useState(false);
	useEffect(() => {
		if (getData) {
			setResponse(true);
			console.log('profile data:', getData)
			// console.log('is_active:', getData.is_active)
		}
	}, [getData])

	// const user = {
	// 	name: 'James',
	// 	department: {
	// 		dept: 'workshop',
	// 		numberOfPartsDelivered: 52,
	// 		numberOfPendingParts: 9,
	// 	},
	// 	phone: '12345678902',
	// 	whatsapp: '98765432103',
	// 	profile_photo: 'placeholder.png',
	// 	email: 'james@example.com',
	// 	address: '12, kudirat way, lagos',
	// 	status: 'active',
	// }
	
	return (
		response ?
			(<>
			<div className="background-color user-page">
				<div className="user-info">
					<div>
						<div className="user-page">
							<img src={getData.profile_picture} alt="profile pic" />
						</div>
						{getData.custodian &&
							<div className="uDetaisRight">
								<h4>Bank: {getData.custodian.bank}</h4>
								<h4>State: {getData.custodian.state}</h4>
								<h4>Branch: {getData.custodian.branch}</h4>
								<h4>Location: {(getData.custodian.location) ? (getData.custodian.location) : 'None'}</h4>
							</div>}
					</div>
					<div
					style={{
						borderLeft: '2px inset',
						height: 'auto',
						width: '0',
						margin: '0 1rem',
						}}
					></div>
                    <div className="user-page uDetaisLeft">
						<h4>First Name: {getData.first_name}</h4>
						<h4>Middle Name: {getData.middle_name}</h4>
						<h4>Last Name: {getData.last_name}</h4>
						<h4>Username: {getData.username}</h4>
						<h4>Phone: {getData.phone}</h4>
						<h4>Whatsapp: {getData.wphone}</h4>
						<h4>Email: {getData.email}</h4>
						<h4>Department: {getData.department}</h4>
						<h4>deliveries: {getData.deliveries}</h4>
						<h4>Pendings: {getData.pendings}</h4>
						<h4>Address: {getData.address}</h4>
						<h4>Status: {!getData.is_deleted ? 'Yes' : 'No'}</h4>
						<h4>About Me: {getData.aboutme}</h4>
					</div>
                </div>
            </div>
		</>) : (<h4>{getLoading}</h4>)
	)
}
export default User;

// deliveries
// 'id', 'first_name', 'last_name', 'middle_name',
// 'username', 'email', 'phone', 'wphone', 'address',
// 'department', 'deliveries', 'profile_picture', 'aboutme',
// 'password'