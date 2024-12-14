// import logo from "../../logo/altaviz_logo.png"
import "./profile.css"
import { useContext } from "react"
import { SentenceCaseContext } from "../context/SentenceCaseContext";
// import { FetchContext } from "../context/FetchContext"
import { AuthContext } from "../context/checkAuth/AuthContext";
import { useParams, useLocation } from "react-router-dom";
import Deliveries from "../SideBar/dashboard/DeliveriesPoints";
// import { initial } from 'lodash';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
function Profile () {
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext);
	const { authData } = useContext(AuthContext)
	console.log('authData', authData)
	// const [response, setResponse] = useState(false);
	// const [authData, setauthData] = useState(false);
	const locatn = useLocation()
	const para = useParams().id
	console.log('location:', locatn)
	console.log('para:', para)
	console.log(`user-${para}`)
	// console.log('authData:', authData)
	return (
		authData &&
			<>
				<div className="background-color user-page">
					<div className="user-info">
						<div>
							<div className="user-page">
								<img src={`${apiBaseUrl}${authData.profile_picture}`} alt="profile pic" />
								{/* <img src={`/${authData.profile_picture}`} alt="profile pic" /> */}
							</div>
							{authData.role === 'custodian' &&
								<div className="uDetaisRight">
									<h4>Bank: {toSentenceCase(authData.branch.bank.name)}</h4>
									<h4>State: {toSentenceCase(authData.branch.state.name)}|{authData.branch.state.initial}</h4>
									<h4>Branch: {toSentenceCase(authData.branch.name)}</h4>
									{/* <h4>Location: {(authData.custodian.location) ? (authData.custodian.location) : 'None'}</h4> */}
								</div>
								}
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
							<h4>First Name: {toSentenceCase(authData.first_name)}</h4>
							<h4>Middle Name: {toSentenceCase(authData.middle_name)}</h4>
							<h4>Last Name: {toSentenceCase(authData.last_name)}</h4>
							<h4>Username: {toSentenceCase(authData.username)}</h4>
							<h4>Phone: {authData.phone}</h4>
							<h4>Whatsapp: {authData.wphone}</h4>
							<h4>Email: {authData.email}</h4>
							<h4>Role: {toSentenceCase(authData.role)}</h4>
							<h4>Location: {toSentenceCase(authData.location.location)}</h4>
							<h4>Region: {toSentenceCase(authData.region.name)}</h4>
							{authData.role !== 'custodian' &&
								<>
									<h4>deliveries: {<Deliveries id={authData.id} />}</h4>
									{/* <h4>Pendings: {userDataToState.pendings}</h4> */}
								</>}
							<h4>Address: {authData.address}</h4>
							<h4>Status: {!authData.is_deleted ? 'Active' : 'Inactive'}</h4>
							<h4>About Me: {trimString(authData.aboutme, 100)}</h4>
						</div>
					</div>
				</div>
			</>
		//  : (<h4>{user.getLoading}</h4>)
	)
}
export default Profile;
