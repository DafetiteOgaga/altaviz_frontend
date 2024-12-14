// import logo from "../../logo/altaviz_logo.png"
import "./detailsUpdateStyle.css"
import { AuthContext } from "../../../context/checkAuth/AuthContext";
import usePullCompleteList from "../../../paginationComp/usePullCompleteList";
import { useContext, useState, useEffect } from "react"
import { FetchContext } from "../../../context/FetchContext";
import { useParams, useNavigate } from "react-router-dom";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
// import { SharedDataContext } from "../../../context/sharedData/SharedDataContext";
// import { useNavigate } from 'react-router-dom';

function Buttons ({buttonProps}) {
	const buttonStyle = {
		display: 'flex',
		justifyContent:'space-evenly',
		color: '#555',
		fontSize: '19px',
	}
	return (
	<>
		<div style={buttonStyle}>
			<div className="custum-button"
			onClick={(e)=>{buttonProps.submitHandler({response: 'approve'})}}
			type='submit'>
				<h5>{buttonProps.patchLoading ? 'Approving ...' : 'Approve'}</h5>
			</div>
			<div className="custum-button"
			onClick={(e)=>{buttonProps.submitHandler({response: 'reject'})}}
			type='submit'>
				<h5>{buttonProps.patchLoading ? 'Rejecting ...' : 'Reject'}</h5>
			</div>
		</div>
	</>)
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
function DetailsUpdate () {
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext)
	const { authData } = useContext(AuthContext)
	const navigate = useNavigate()
	const [updateData, setUpdateData] = useState(null)
	const userParams = useParams()
	const userID = userParams.id
	console.log('userID:', userID)
	// get and post setup
	// get setup
	let updateDetailData = usePullCompleteList(
		`approve-user-details-update/list`, authData.id,
		'updateDetailData',
	).arrayData
	if (updateDetailData) {updateDetailData = updateDetailData.find?.(update => update.id === Number(userParams.updateID))}
	const { useGetDataAPI, usePatchDataAPI } = useContext(FetchContext);
	const { getData, getError, getLoading } = useGetDataAPI(
		`user/${userID}/`, true
	);
	// const [response, setResponse] = useState(false);
	useEffect(() => {
		if (getData||getError) {
			console.log('RESPONSE IS HERE')
			if (getData) {
				console.log('getData:', getData)
				setUpdateData(getData)
			}
		}
	}, [getData, getError, getLoading])
	// post setup
	const [patchTrigger, setPatchTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	console.log('patchTrigger (11111):', patchTrigger)
	const { patchData, patchLoading, patchError } = usePatchDataAPI(
		`approve-user-details-update/${authData.id}/`,
		formData, patchTrigger, // `/user/${userParams.id}`,
	);
	useEffect(() => {
		if (patchData||patchError) {
			if (patchData) {
				console.log('patchData:', patchData)
				navigate('/success', {state: {currentPage: `/user/${userParams.id}`}})
			}
		}
	}, [patchData, patchError, patchLoading])
	const submitHandler = ({response}) => {
		const updatedFormData = new FormData();
		updatedFormData.append(response, true);
		updatedFormData.append('userID', userID);
		updatedFormData.append('updateRequestID', userParams.updateID);
		setFormData(updatedFormData);
		// localStorage.removeItem('accountUpdateRequestContext')
		// localStorage.removeItem('updateDetailData')
		setPatchTrigger(true);
		console.log('PATCH TRIGGERED');
    };
	console.log(updateData ? `apiBaseUrl: ${apiBaseUrl}/user/${updateData.id}/` : '');
	console.log('patchError:', patchError)
	console.log('patchLoading:', patchLoading)
	console.log('patchData:', patchData)
	console.log('getData:', getData)
	console.log('updateData:', updateData)
	const newStyle = {
		color: '#3E3E85',
	}
	const assertUpdate = (value1, value2) => {
		console.log(
			'\nvalue1:', value1,
			'\nvalue2:', value2,
			'\nequal:', value1 !== value2
		)
		if (value1 !== value2) {
			return ({color: 'red'});
		}
	};
	console.log(
		'\nupdateDetailData:', updateDetailData,
		'\nuserParams:', userParams,
		'\nupdateData:', updateData,
		'\nbetter user page:', `/user/${userParams.id}`,
	)
	const buttonProps = {
		submitHandler: submitHandler,
		patchLoading: patchLoading,
	}
	if (updateDetailData?.newBranch==='' && updateData) {updateDetailData.newBranch = updateData.branch.name}
	console.log(
		'\nupdateDetailData:', updateDetailData,
		'\nupdateDetailData?.newBranch:', updateDetailData?.newBranch
	)
	return (
		<>
			{getLoading && <h4 style={{
				padding: '1rem',
				color: '#B5B5BD',
				fontSize: '1.2rem',
				textAlign: 'center',
			}}>Loading ...</h4>}
			{getError && <h4>{getError}</h4>}
			{updateData &&
			<div className="background-color user-page">
				<div className="user-info">
					<div>
						<div className="user-page">
							<img src={`${apiBaseUrl}${updateData.profile_picture}`} alt="profile pic" />
						</div>
						{(updateData?.role==='custodian') &&
							<>
								<div className="uDetaisRight">
									<h4>Bank: {toSentenceCase(updateData.branch.bank.name)}</h4>
									<h4>State: {toSentenceCase(updateData.branch.state.name)}</h4>
									<h4>Branch: <span style={assertUpdate(updateData.branch.name, updateDetailData.newBranch)}>{toSentenceCase(updateData.branch.name)}</span>{' -> '}<span style={newStyle}>{toSentenceCase(updateDetailData.newBranch)}</span></h4>
									<h4>Location: <span style={assertUpdate(updateData.branch.location.location, updateDetailData.newLocation)}>{toSentenceCase(updateData.branch.location.location)}</span>{' -> '}<span style={newStyle}>{toSentenceCase(updateDetailData.newLocation)}</span></h4>
									{/* <p>Request ID: {updateData[0].id}</p> */}
								</div>
								<Buttons buttonProps={buttonProps} />
							</>
							}
					</div>

					{/* vertical line */}
					<div
					style={{
						borderLeft: '2px inset',
						height: 'auto',
						width: '0',
						margin: '0 1rem',
						}}>
					</div>

                    <div className="user-page uDetaisLeft">
						<h4>First Name: {toSentenceCase(updateData.first_name)}</h4>
						<h4>Middle Name: {toSentenceCase(updateData.middle_name)}</h4>
						<h4>Last Name: {toSentenceCase(updateData.last_name)}</h4>
						<h4>Username: {toSentenceCase(updateData.username)}</h4>
						<h4>Phone: {updateData.phone}</h4>
						<h4>Whatsapp: {updateData.wphone}</h4>
						<h4>Email: {updateData.email}</h4>
						<h4>Role: {toSentenceCase(updateData.role)}</h4>
						{updateData.role !== 'custodian' &&
							<>
								<h4>Location: <span style={assertUpdate(updateData.location.location, updateDetailData.newLocation)}>{toSentenceCase(updateData.location.location)}</span>{' -> '}<span style={newStyle}>{toSentenceCase(updateDetailData.newLocation)}</span></h4>
								<h4>deliveries: {updateData.deliveries}</h4>
								<h4>Pendings: {updateData.pendings}</h4>
							</>}
						<h4>Address: {toSentenceCase(updateData.address)}</h4>
						<h4>Status: {!updateData.is_deleted ? 'Yes' : 'No'}</h4>
						<h4>About Me: {trimString(updateData.aboutme??'', 40)}</h4>
						{updateData.role!=='custodian' && <Buttons buttonProps={buttonProps} />}
					</div>
                </div>
            </div>}
		</>
	)
}
export default DetailsUpdate;
