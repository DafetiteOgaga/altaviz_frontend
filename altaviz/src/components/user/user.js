import logo from "../../logo/altaviz_logo.png"
import "./user.css"

function User () {
	const user = {
		name: 'James',
		department: {
			dept: 'workshop',
			numberOfPartsDelivered: 52,
			numberOfPendingParts: 9,
		},
		phone: '12345678902',
		whatsapp: '98765432103',
		profile_photo: 'placeholder.png',
		email: 'james@example.com',
		address: '12, kudirat way, lagos',
		status: 'active',
	}
	return (
		<>
			<div className="background-color user-page">
				<div className="user-info">
					<div className="user-page">
                    	<img src={logo} alt="profile pic" />
					</div>
                    <div className="user-page">
						<h3>Name: {user.name}</h3>
						<h4>Department: {user.department.dept}</h4>
						<h4>Parts delivered: {user.department.numberOfPartsDelivered}</h4>
						<h4>Parts pending: {user.department.numberOfPendingParts}</h4>
						<h4>Phone: {user.phone}</h4>
						<h4>Whatsapp: {user.whatsapp}</h4>
						<h4>Email: {user.email}</h4>
						<h4>Address: {user.address}</h4>
						<h4>Status: {user.status}</h4>
					</div>
                </div>
            </div>
		</>
	)
}
export default User