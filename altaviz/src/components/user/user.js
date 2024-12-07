// import logo from "../../logo/altaviz_logo.png"
import "./user.css"
import { SentenceCaseContext } from "../context/SentenceCaseContext";
import { useContext, useState, useEffect } from "react"
import { FetchContext } from "../context/FetchContext"
import { useParams, useLocation } from "react-router-dom";
// import useGetWEncryptionSingleItem from "../paginationComp/useGetWEncryptionSingleItem";

function User () {
	const { toSentenceCase } = useContext(SentenceCaseContext);
	// const [response, setResponse] = useState(false);
	const [userDataToState, setuserDataToState] = useState(false);
	const locatn = useLocation()
	const para = useParams().id
	console.log('location:', locatn)
	console.log('para:', para)
	// const [postTrigger, setPostTrigger] = useState(false);
	// const [formData, setFormData] = useState(new FormData());
	const { useGetDataAPI } = useContext(FetchContext);
	const { getData:userData, getError:userError, getLoading:userLoading } = useGetDataAPI(
		`http://127.0.0.1:8000/user/${para}/`, true
	);
	// const user = useGetWEncryptionSingleItem(
	// 	`http://127.0.0.1:8000/user/${para}/`,
	// 	`user-${para}`,
	// 	// isRefresh
	// )
	// const { getData, getLoading } = useGetDataAPI(
	// 	// `http://127.0.0.1:8000/user/${para}/`,
	// 	`http://127.0.0.1:8000/user/${para}/`,
	// );
	useEffect(() => {
		if (userData) {
			console.log('userData:', userData)
			setuserDataToState(userData)
		}
	}, [userData])
	// useEffect(() => {
	// 	if (user.getData) {
	// 		// setResponse(true);
	// 		console.log('profile data:', user.getData)
	// 		setUserDataToStateToState(user.getData)
	// 		// console.log('is_active:', getData.is_active)
	// 	}
	// }, [user.getData])
	console.log('userData (global):', userData)
	// console.log('getData:', user.getData)
	console.log(`user-${para}`)
	console.log('userDataToState:', userDataToState)
	return (
			<>
			{userLoading && <h4 style={{
				// padding: '1rem',
				color: '#B5B5BD',
				// fontSize: '1.2rem',
				textAlign: 'center',
			}}>loading ...</h4>}
			{userError && <h4>{userError}</h4>}
			{userDataToState &&
			<div className="background-color user-page">
				<div className="user-info">
					<div>
						<div className="user-page">
							<img src={`http://127.0.0.1:8000/${userDataToState.profile_picture}`} alt="profile pic" />
						</div>
						{userDataToState.role === 'custodian' &&
							<div className="uDetaisRight">
								<h4>Bank: {toSentenceCase(userDataToState.branch.bank.name)}</h4>
								<h4>State: {toSentenceCase(userDataToState.branch.state.name)}</h4>
								<h4>Branch: {toSentenceCase(userDataToState.branch.name)}</h4>
								<h4>Branch Location: {toSentenceCase(userDataToState.branch.location.location)}</h4>
								{/* <h4>Location: {(userDataToState.custodian.location) ? (userDataToState.custodian.location) : 'None'}</h4> */}
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
						<h4>First Name: {toSentenceCase(userDataToState.first_name)}</h4>
						<h4>Middle Name: {toSentenceCase(userDataToState.middle_name)}</h4>
						<h4>Last Name: {toSentenceCase(userDataToState.last_name)}</h4>
						<h4>Username: {toSentenceCase(userDataToState.username)}</h4>
						<h4>Phone: {userDataToState.phone}</h4>
						<h4>Whatsapp: {userDataToState.wphone}</h4>
						<h4>Email: {userDataToState.email}</h4>
						<h4>Role: {toSentenceCase(userDataToState.role)}</h4>
						<h4>Location: {toSentenceCase(userDataToState.location.location)}</h4>
						<h4>Region: {toSentenceCase(userDataToState.region.name)}</h4>
						{userDataToState.role !== 'custodian' &&
							<>
								<h4>deliveries: {userDataToState.deliveries}</h4>
								<h4>Pendings: {userDataToState.pendings}</h4>
							</>}
						<h4>Address: {toSentenceCase(userDataToState.address)}</h4>
						<h4>Status: {!userDataToState.is_deleted ? 'Active' : 'Inactive'}</h4>
						<h4>About Me: {userDataToState.aboutme && toSentenceCase(userDataToState.aboutme)}</h4>
					</div>
                </div>
            </div>}
		</>
	)
}
export default User;
