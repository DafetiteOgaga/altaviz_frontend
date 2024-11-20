// import logo from "../../logo/altaviz_logo.png"
import "./profile.css"
import { useContext, useState, useEffect } from "react"
import { FetchContext } from "../context/FetchContext"
import { AuthContext } from "../context/checkAuth/AuthContext";
import { useParams, useLocation } from "react-router-dom";
import useGetWEncryptionSingleItem from "../paginationComp/useGetWEncryptionSingleItem";
import { initial } from 'lodash';

function Profile () {
	const { authData } = useContext(AuthContext)
	console.log('authData', authData)
	// const [response, setResponse] = useState(false);
	// const [authData, setauthData] = useState(false);
	const locatn = useLocation()
	const para = useParams().id
	console.log('location:', locatn)
	console.log('para:', para)
	// const [postTrigger, setPostTrigger] = useState(false);
	// const [formData, setFormData] = useState(new FormData());
	// const { useGetDataAPI } = useContext(FetchContext);
	// const user = useGetWEncryptionSingleItem(
	// 	`http://127.0.0.1:8000/user/${para}/`,
	// 	`user-${para}`,
	// 	// isRefresh
	// )
	// const { getData, getLoading } = useGetDataAPI(
	// 	// `http://127.0.0.1:8000/user/${para}/`,
	// 	`http://127.0.0.1:8000/user/${para}/`,
	// );
	// useEffect(() => {
	// 	if (user.getData || user.localDataStoreVar) {
	// 		console.log('user:', user)
	// 		if (user.getData) setauthData(user.getData)
	// 		if (user.localDataStoreVar) setauthData(user.localDataStoreVar)
	// 	}
	// }, [user.getData, user.localDataStoreVar])
	// useEffect(() => {
	// 	if (user.getData) {
	// 		// setResponse(true);
	// 		console.log('profile data:', user.getData)
	// 		setauthData(user.getData)
	// 		// console.log('is_active:', getData.is_active)
	// 	}
	// }, [user.getData])
	// console.log('user:', user)
	// console.log('getData:', user.getData)
	console.log(`user-${para}`)
	// console.log('authData:', authData)
	return (
		authData &&
			<>
				<div className="background-color user-page">
					<div className="user-info">
						<div>
							<div className="user-page">
								<img src={`http://127.0.0.1:8000/${authData.profile_picture}`} alt="profile pic" />
								{/* <img src={`/${authData.profile_picture}`} alt="profile pic" /> */}
							</div>
							{authData.role === 'custodian' &&
								<div className="uDetaisRight">
									<h4>Bank: {authData.branch.bank.name}</h4>
									<h4>State: {authData.branch.state.name}|{authData.branch.state.initial}</h4>
									<h4>Branch: {authData.branch.name}</h4>
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
							<h4>First Name: {authData.first_name}</h4>
							<h4>Middle Name: {authData.middle_name}</h4>
							<h4>Last Name: {authData.last_name}</h4>
							<h4>Username: {authData.username}</h4>
							<h4>Phone: {authData.phone}</h4>
							<h4>Whatsapp: {authData.wphone}</h4>
							<h4>Email: {authData.email}</h4>
							<h4>Role: {authData.role}</h4>
							<h4>Location: {authData.location.location}</h4>
							<h4>deliveries: {authData.deliveries}</h4>
							<h4>Pendings: {authData.pendings}</h4>
							<h4>Address: {authData.address}</h4>
							<h4>Status: {!authData.is_deleted ? 'Active' : 'Inactive'}</h4>
							<h4>About Me: {authData.aboutme}</h4>
						</div>
					</div>
				</div>
			</>
		//  : (<h4>{user.getLoading}</h4>)
	)
}
export default Profile;
