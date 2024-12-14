import { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components"
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from "../../context/checkAuth/AuthContext";
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import useGetWithEncryption from "../../paginationComp/useGetWithEncryption";
// import QueryFieldFromDB from "../human_resource/QueryFieldFromDB";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
// import { FetchContext
// import Engineer from "../../engineer/Engineer";
// import { first, initial } from "lodash";
import { useNavigate, useLocation } from 'react-router-dom';
// import useNavigation from '../../hooks/useNavigate';
// import { useLocation } from 'react-router-dom';
import { FetchContext } from '../../../context/FetchContext';

const MainButtonContainer = styled.div`
	display: flex;
	cursor: pointer;
	// padding-top: 4rem;
	// flex-direction: row;
	justify-content: space-evenly;
`
// const Label = styled.label`
// 	font-size: large;
// `
const SelectItem = styled.select`
	height: 100%;
	margin: 0
`
const MainButton = styled.h6`
	text-decoration: none;
	white-space: pre;
	color: #555;
	padding: 0 0.7rem;
	border: 0.01px solid;
	border-radius: 5px;
	font-family: sans-serif;
	font-size: 20px;
	background-color: #E5E5E5;
	// font-weight: 900;
	margin: 0;
	&:hover {
		box-shadow: -5px 5px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a935d;
	}
	&:active {
		box-shadow: -1px 1px 0 rgba(0, 0, 0, 0.068);
		background-color: #8a8a93;
	}
`
const NewFieldContainer = styled.div`
	display: flex;
	flex-direction: row;
`
function EngineerToLocation () {
	const navigate = useNavigate()
	const currentPage = useLocation().pathname
	const { authData } = useContext(AuthContext)
	const [rSwitch, setRSwitch] = useState(null)
	const [newLocations, setNewLocations] = useState(null);
	const [showNotifi, setShowNotifi] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [regionEngineers, setRegionEngineers] = useState(null);
	const [selectedEngineers, setSelectedEngineers] = useState({});
	const [newBranchQuery, setNewBranchQuery] = useState('');
	const [isNewBranchExist, setIsNewBranchExist] = useState(false);
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [newUser, setNewUser] = useState([]);
	const [newUserError, setNewUserError] = useState({});
	const [showError, setShowError] = useState(false);
	const refInput = useRef(null);
	const [locationBranchesList, setLocationBranchesList] = useState(null)
	// const [bankBranchList, setBankBranchList] = useState(null)
	const [notCustodianList, setNotCustodianList] = useState(null)
	const [custodianList, setCustodianList] = useState(null)
	const [getNewLocationTrigger, setGetNewLocationTrigger] = useState(true);
	const [getRegionEngineersTrigger, setGetRegionEngineersTrigger] = useState(true);
	const [patchTrigger, setPatchTrigger] = useState(false);
	const [postTrigger, setPostTrigger] = useState(false);
	const [formData, setFormData] = useState(new FormData());
	const { usePostDataAPI, useGetDataAPI, usePatchDataAPI } = useContext(FetchContext);

	console.log('url:', `new-location-assignment/list/8/`)
	const { getData:newLocationsData, getLoading:newLocationsLoading, getError:newLocationsError } = useGetDataAPI(
		`new-location-assignment/list/${authData.id}/`,
		getNewLocationTrigger
	);
	const { getData:regionEngineersData, getLoading:regionEngineersLoading, getError:regionEngineersError } = useGetDataAPI(
		`region-engineers/${authData.id}/`,
		getRegionEngineersTrigger
	);
	const { patchData, patchLoading, patchError } = usePatchDataAPI(
		`new-location-assignment/${authData.id}/`,
		formData, patchTrigger
	);
	useEffect(() => {
		if (newLocationsData||newLocationsError) {
			console.log({newLocationsData})
			setNewLocations(newLocationsData)
			setGetNewLocationTrigger(false)
		}
	}, [newLocationsData, newLocationsLoading, newLocationsError])
	useEffect(() => {
		if (regionEngineersData||regionEngineersError) {
			console.log({regionEngineersData})
			setRegionEngineers(regionEngineersData)
			setGetRegionEngineersTrigger(false)
		}
	}, [regionEngineersData, regionEngineersLoading, regionEngineersError])

	const EditHandler = () => {setIsEditable(!isEditable);
	};
	const changeHandler = (e) => {
		setSelectedEngineers(prev => ({...prev, [e.target.name]: e.target.value}))
	}
	const handleFormSubmission = (e) => {
		e.preventDefault();
		if (Object.keys(selectedEngineers).length !== 0) {
			const newFormData = new FormData()
			for (const [key, value] of Object.entries(selectedEngineers)) {
				console.log('#######################')
				console.log({key}, {value})
				console.log('#######################')
				newFormData.append(key, value)
			}
			setFormData(newFormData)
			setPatchTrigger(true)
			console.log({selectedEngineers})
		}
		else {
			console.log("Please select atleast one of engineer to a new location")
		}
	}
	console.log('EngineerToLocation component')
	useEffect(()=>{
		if (patchData||patchError) {
			console.log({patchData})
			console.log({patchError})
			setPatchTrigger(false)
			setSelectedEngineers({})
			navigate('/success', {state: {currentPage}})
		}
	}, [patchData, patchLoading, patchError])
	const placeholder = {
		first_name: 'Select Engineer',
		id: 0.000001,
		location: {
			location: 'Select Engineer'
		},
		state: {
			name: 'Select Engineer',
			initial: 'Select Engineer'
		}
	}
	console.log(
		'\nnewLocationsData:', newLocationsData,
		'\nnewLocationsError:', newLocationsError,
		'\nregionEngineersData:', regionEngineersData,
		'\nregionEngineersError:', regionEngineersError,
		'\nselectedEngineers:', selectedEngineers
	)
	const style = {
		input: {
			padding: "4px",
			fontSize: "16px",
			border: "1px solid #ccc",
			borderRadius: "5px",
		}
	}
	return (
		<>
			<div className="background-color custodian-page">
				<div className="dash-form">
					<div>
						<h4>The Following Locations are yet to be assigned to Engineers:</h4>
					</div>
					<div>
						<div className="to-form">
						</div>
						<hr />
						<form onSubmit={handleFormSubmission}>
							<div>
								<div className="cust-row-user">
									{(<>
										{(<>
											{/* ............. location .................. */}
											<ul style={{listStyleType: 'none'}}>
												{newLocations?.map((location, index) => {
													console.log(
														'\nlocation:', location,
														'\nlocation.location:', location.location,
														'\nlocation.location.location:', location.location.location,
													)
													return(
														<>
														<li key={index}>
															<div style={{padding: '0.1rem 0'}} className="user-fields-row">
																<div className="input-field">
																	<p style={{margin: '0'}}><strong>New Location: </strong>
																		<span
																		// title={`State: ${location.location.state.name}|${location.location.state.initial}`}
																		style={{color: 'green'}}>{toSentenceCase(location?.location?.location)}</span> in <span style={{color: 'seagreen'}}>{toSentenceCase(location?.location?.state?.name)}|{location?.location?.state?.initial}</span>
																	</p>
																</div>
																{/* ............... Select Engineers ................ */}
																<div className="input-field">
																	<NewFieldContainer>
																		<label>Select Engineer:</label>
																		<SelectItem
																		style={{...style.input, width: '45%',}}
																		name={`${location.location.location}-${location.location.id}`}
																		id={`${location.location.location}-${location.location.id}`}
																		ref={refInput}
																		disabled={!isEditable}
																		onChange={(e)=>changeHandler(e, index)}
																		>
																		{regionEngineers &&
																		[placeholder, ...regionEngineers].map((engineer, i) => {
																			console.log({engineer})
																			return (
																			<option key={engineer.first_name + i} value={`${engineer.first_name})-(${engineer.email})-(${engineer.id}`}
																			title={`Location: ${engineer.location.location}\nState: ${engineer.state.name}\nPhone: ${engineer.phone}\nWhatsapp: ${engineer.wphone}`}>
																				{toSentenceCase(engineer.first_name)}
																			</option>
																		)})}
																		</SelectItem>
																	</NewFieldContainer>
																</div>
															</div>
														</li>
														<hr style={{width: '70%'}} />
														</>
													)})}
											</ul>
										</>)}
									</>)}
									{/* {(showNotifi && !postLoading) && <p style={{...styleObj, color: 'green'}}>{rSwitch.msg}</p>} */}
								</div>
							</div>
							<MainButtonContainer>
								{/* submit button */}
								<MainButton
									onClick={handleFormSubmission}
									type="submit"
									disabled={patchLoading}
									>
									{patchLoading ? 'Assigning...' : 'Assign Engineers'}
								</MainButton>
								{/* edit button */}
								<MainButton type="button"
									onClick={EditHandler}
									>
										{!isEditable ? 'Edit Details' : 'Stop Editing'}
									</MainButton>
							</MainButtonContainer>
							<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								flexDirection: 'column',
								textAlign: 'center',
								marginTop: '0.5rem',
							}}>
								
							</div>
						</form>
					</div>
				</div>
				<hr/>
			</div>
			{console.log(
				'\nnewLocationsData:', newLocationsData,
				'\nnewLocationsError:', newLocationsError,
				'\nregionEngineersData:', regionEngineersData,
				'\nregionEngineersError:', regionEngineersError,
				'\nselectedEngineers:', selectedEngineers,
				'\ncurrent page:', currentPage
			)}
		</>
	)
}
export default EngineerToLocation;