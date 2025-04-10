import "../sidebar_pages.css"
import RequestBar from "./RequestBar";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
// import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";

function RequestsList ({localContext=null}) {
	const { authData } = useContext(AuthContext);
	const listParams = useParams()
	const role = listParams.dept
	const requestUrlType = useLocation().pathname.split('/');
	const requestType = requestUrlType[2].split('-')[0];
	const localVariable = requestType === 'part' ? 'partPendingList':'componentPendingList'
	//  urlPath;
	let urlPath = role === 'workshop' && requestType === 'part' ? 'post-part':`request-${requestType}`
	if (role === 'human-resource') {
		if (requestType === 'part') {urlPath = 'post-part'}
		else if (requestType === 'component') {urlPath = 'workshop-component-request'};
	}
	urlPath = `${urlPath}/list`
	console.log(
		'\nlocalVariable:', localVariable,
		'\nrequestType:', requestType,
		'\nlistParams:', listParams,
		'\nrole:', role,
		'\nurlPath:', urlPath
	)
	// useEffect(() => {
	// 	// reset or get the updated data locally
	// 	localStorage.removeItem(localVariable)
	// }, [])
	const requests = usePullCompleteList(
		urlPath, authData.id, localVariable,
	)
	console.log(
		'\nurlPath:', urlPath,
		'\nrequests:', requests
	)

	console.log(
		'\npage number:', requests?.pageNum,
		'\nrequests?.arrayData:', requests?.arrayData,
		'\nRequestsList:', requests?.pageHandler(requests?.pageNum, requests?.arrayData)
	)
	const allRequests = requests?.pageHandler(requests?.pageNum, requests?.arrayData)

	console.log('allRequests:', allRequests)
	console.log('requests:', requests)
	// console.log('unityPageNum', unityPageNum)
	console.log('requests.theTotalPage:', requests?.theTotalPage)
	console.log('length.arrayData:', requests?.arrayData)
	return (
		<>
			{(!requests?.arrayData && requests?.arrayLoading) ?
				(<p style={{
					padding: '1rem',
					color: '#B5B5BD',
					fontSize: '1.2rem',
					textAlign: 'center',
				}}>Loading ...</p>) :
			(allRequests?.length ?
			<>
				<RequestBar allRequests={allRequests} page={requests.pageNum} total={requests.arrayData.length} />
				<div className="custodian-page button"
				style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '1rem',
						paddingBottom: '1.5rem',
						fontSize: '1.1rem',
						backgroundColor: '#E5E5E5',
						}}>
					{(requests?.arrayData && requests?.pageNum > 1) && (
						<button onClick={() => requests.setPageNum(requests.pageNum - 1)}>
							Previous
						</button>
					)}
					{(requests?.arrayData && requests?.pageNum > 0 && requests?.pageNum < requests?.theTotalPage) && (
						<button onClick={() => {
							// requests.handleNextPage();
							requests.setPageNum(requests.pageNum + 1);
							}}>
							Next
						</button>
					)}
				</div>
			</>:null)}
	</>)
}
export default RequestsList;