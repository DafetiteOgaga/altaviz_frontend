import { useState, useContext, useEffect } from "react";
import "./notificationDropdown.css"
// import { TriggerContext } from "../../../context/triggerContext/TriggerContext";
import { Link, useLocation } from "react-router-dom";
// import { SharedDataContext } from "../../../context/sharedData/SharedDataContext";
import { listHandle, requestHandler, userRequestHandler, accountUpdate, userHandler, noOptions } from "../../hooks/listHandler";
import { FetchContext } from "../../context/FetchContext";
import { useRefreshContext } from "../../context/RefreshContext";
import { SentenceCaseContext } from '../../context/SentenceCaseContext';
import { AuthContext } from "../../context/checkAuth/AuthContext";

function NotificationDropdownMenu({
	notiList,
	totalData,
	variableContext,
	// totalArrayContext,
	urlPath,
	patchUrl,
    postUrl,
    putUrl,
    deleteUrl,
	handler,
	listPageUrl,
	detailPageUrl,
	button,
	secondButton,
	extraDisplayLocalKeys
}) {
	// const notiParams = useParams()
	const totalArrayContext = `total${variableContext}`
	console.log(
		// '\nbutton:', button,
		'\nurlPath:', urlPath,
		// '\nnotiList:', notiList,
		'\ntotalData:', totalData,
		// '\nvariableContext:', variableContext,
		// '\ntotalArrayContext:', totalArrayContext,
		// '\nlistPageUrl:', listPageUrl,
		// '\ndetailPageUrl:', detailPageUrl,
		// '\nhandler:', handler,
		// '\npatchUrl:', patchUrl,
		// '\npostUrl:', postUrl,
		// '\nputUrl:', putUrl,
		// '\nsecondButton:', secondButton,
		// '\ndeleteUrl:', deleteUrl,
		// '\nextraDisplayLocalKeys:', extraDisplayLocalKeys,
		// '\nnotiParams:', notiParams,
	)

	const { authData } = useContext(AuthContext)
	const role = useLocation().pathname.split('/')[1]
	const [formData, setFormData] = useState(new FormData());
	const { handleRefresh, handleRefreshAll } = useRefreshContext();
	const {
		// useGetDataAPI,
		usePostDataAPI, usePutDataAPI,
		useDeleteDataAPI, usePatchDataAPI,
	} = useContext(FetchContext)
	const [faultId, setFaultId] = useState(null)
	// const [trigger, setTrigger] = useState(false);
	const [patchTrigger, setPatchTrigger] = useState(false);
	const [deleteTrigger, setDeleteTrigger] = useState(false);
	const [postTrigger, setPostTrigger] = useState(false);
	const [putTrigger, setPutTrigger] = useState(false);
	const [cleanedList, setCleanedList] = useState([])
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext);

	// response variables
	let responseData = [];
	let responseLoading = [];
	let responseError = [];

	// console.log('\nresponseData:', responseData)

	// patch
	({ patchData:responseData[0], patchLoading:responseLoading[0], patchError:responseError[0] } = usePatchDataAPI(
			`http://127.0.0.1:8000/${(urlPath==='post-part'&&role==='human-resource')?urlPath:patchUrl}/${authData.id}/`,
			formData,
			patchTrigger,
			// `/${authData.department.name}`
		));

	// delete
	({ deleteData:responseData[1], deleteLoading:responseLoading[1], deleteError:responseError[1] } = useDeleteDataAPI(
			`http://127.0.0.1:8000/${deleteUrl}/${faultId}/delete/`,
			deleteTrigger,
			// `/${authData.department.name}`
		));

	// post
	({ postData:responseData[2], postLoading:responseLoading[2], postError:responseError[2] } = usePostDataAPI(
			`http://127.0.0.1:8000/${postUrl}/${faultId}/`,
			formData,
			postTrigger,
			// `/${authData.department.name}`
		));

	// put
	({ putData:responseData[3], putLoading:responseLoading[3], putError:responseError[3] } = usePutDataAPI(
			`http://127.0.0.1:8000/${putUrl}/${faultId}/`,
			formData,
			putTrigger,
			// `/${authData.department.name}`
		));

	const checkResponseData = responseData.filter(data => !!data)
	const checkResponseError = responseError.filter(error => !!error)
	const responseIndex = responseData.map((data, index) => !!data?index:null).filter(index => index !== null)

	// click events
	const handleClick = (e, button, id) => {
		e.preventDefault();
		console.log('\nbutton:', button)
		// console.log('\nsecondButton:', secondButton)
		if (button.toLowerCase() === 'withdraw') {
			// console.log('\nbutton:', button)
			setDeleteTrigger(true);
		} else if (button.toLowerCase() === 'confirm') {
			// console.log('\nbutton:', button)
			let data = notiList.filter(item => item.id === id)
			data = data[0]
			// console.log('\ndata:', data)
			const newFormData = new FormData();
			newFormData.append('faultID', id)
			newFormData.append('confirm_resolve', true)
			if (data?.replacement_engineer) {
				newFormData.append('resolvedBy', data.replacement_engineer.email)
			} else {
				newFormData.append('resolvedBy', data.assigned_to.email)
			}
			newFormData.append('managedBy', data.managed_by.email)
			newFormData.append('supervisedBy', data.supervised_by.email)
			newFormData.append('deliveries', 1)
			setFormData(newFormData)
			setPatchTrigger(true);
		} else if (button.toLowerCase() === 'seek confirmation') {
			console.log(
				'\nbutton:', button,
				'\nid:', id,
			)
			const newFormData = new FormData();
			newFormData.append('faultID', id)
			newFormData.append('verify_resolve', true)
			setFormData(newFormData)
			setPatchTrigger(true);
		} else if (button.toLowerCase()==='approve'||button.toLowerCase()==='reject') {
			console.log(
				'\nbutton:', button,
				// '\nsecondButton:', secondButton,
				'\nid:', id,
			)
			const newFormData = new FormData();
			newFormData.append((button.toLowerCase()==='approve'?'approved':'rejected'), true)
			newFormData.append('itemID', id)
			setFormData(newFormData)
			setPatchTrigger(true);
		}
		// console.log('\nTRIGGERED set to true');
    };

	// response data and error useeffect
	useEffect(() => {
		if (checkResponseData || checkResponseError) {
			if (!extraDisplayLocalKeys) extraDisplayLocalKeys = [];
			if (deleteTrigger) {
				setDeleteTrigger(() => {
					// console.log('\nsetting Trigger from ', deleteTrigger, ' to ', !deleteTrigger)
					return false
				});
				handleRefresh([...extraDisplayLocalKeys, variableContext, totalArrayContext])
			}
			if (postTrigger) {
				setPostTrigger(() => {
					// console.log('\nsetting Trigger from ', postTrigger, ' to ', !postTrigger)
					return false
				});
			}
			if (patchTrigger) {
				setPatchTrigger(() => {
					// console.log('\nsetting Trigger from ', patchTrigger, ' to ', !patchTrigger)
					return false
				});
				handleRefresh([...extraDisplayLocalKeys, variableContext, totalArrayContext])
			}
			if (putTrigger) {
				setPutTrigger(() => {
					// console.log('\nsetting Trigger from ', putTrigger, ' to ', !putTrigger)
					return false
				});
			}
			// handleRefresh([variableContext, totalArrayContext])
		}
		if (responseData) {
			// console.log('\ndatabase response is successful'.toUpperCase())
			// handleRefreshAll()
		}
	}, [
		deleteTrigger, postTrigger, patchTrigger, putTrigger,
		responseData, responseLoading, responseError
	])

	// useeffect to compress the notiList arrays into 4 final arrays
	useEffect(() => {
		let newList;
		if (notiList) {
			// console.log('\nnotiList:', notiList)
			if (handler === 'help-desk' || handler === 'supervisor'||
				handler === 'human-resource') {
				// for helpdesk, supervisor, human-resource components
				newList = userRequestHandler(notiList);
				setCleanedList(newList)
			} else if (handler === 'requestHandler') {
				// for engineer and workshop components
				newList = requestHandler(notiList);
				setCleanedList(newList)
			} else if (handler === 'accountUpdate') {
				// account update noti in human resouce component
				newList = accountUpdate(notiList);
				setCleanedList(newList)
			// } else if (handler === 'unapprovedHandler') {
			// 	// parts posted noti in human resouce component
			// 	newList = unapprovedHandler(notiList);
			// 	setCleanedList(newList)
			} else if (handler === 'userHandler') {
				// parts posted noti in workshop component
				newList = userHandler(notiList);
				setCleanedList(newList)
			} else if (handler === 'noOptions') {
				// parts posted noti in workshop component
				newList = noOptions(notiList);
				setCleanedList(newList)
			} else {
				// other
				newList = listHandle(notiList);
				setCleanedList(newList)
			}
		}
		// console.log(
		// 	'\nnewList', newList,
		// 	'\nnotiList', notiList,
		// );
	}, [notiList])

	// console.log('\ncleanedList for', variableContext, ':', cleanedList);
	// console.log('\nrole:', role)
	// console.log('totalDataFaults33333:', totalData.total);
	const clickAll = 'Click to See All'
	// console.log('\nbutton:', button)
	return (
	<div className="notification-style">
		<div
		className="notification-bk">
			<p style={{margin: 0, cursor: 'pointer'}}>
				{totalData.total ? (totalData.total) + ' Pendings' : 'Loading ...'}
			</p>
		</div>
		<div className="notification-dropdown">
			{!cleanedList.length ?
			<p style={{textAlign: 'center', fontStyle: 'italic'}}> Loading ...</p>:
			(cleanedList.map((data, index) => {
				// console.log('data:', data)
			return (
			<ul key={index}>
				<li	style={{display: 'flex', flexDirection: 'row'}}>
					{/* dropdown menu list */}
					<Link style={(data === clickAll)?{color: 'blue',textDecoration: 'underline'}:{}}
						to={(data === clickAll)?`${listPageUrl}`:`${detailPageUrl}/${data.id}`}>
							{data!==clickAll?trimString(toSentenceCase(data.title), 21):data}
					</Link>

					{/* dropdown menu button */}
					{(data !== clickAll && button) &&
					<Link style={{color: 'blue',}}
						// to=''
						onClick={(e) => {
							setFaultId(data.id);
							handleClick(e, button, data.id);
						}}>
							{button}
					</Link>}
					{/* {console.log({secondButton}, {data})} */}
					{/* if there is a second button (secondButton) */}
					{(data !== clickAll && secondButton) &&
					<Link style={{color: 'red',}}
						// to=''
						onClick={(e) => {
							setFaultId(data.id);
							handleClick(e, secondButton, data.id);
						}}>
							{secondButton}
					</Link>}
				</li>
			</ul>)}))}
		</div>
	</div>
	);
}

export default NotificationDropdownMenu;
