import "../sidebar_pages.css"
import RequestBar from "./RequestBar";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/checkAuth/AuthContext";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";

function RequestsList ({localContext=null}) {
	// const location = useLocation().pathname.split('/');
	// requestType = useLocation().pathname.split('/')[2].split('-')[0];
	// const { SetPendingFaultsContext } = useContext(SharedDataContext);
	// const [unityPageNum, setUnityPageNum] = useState(1);
	const { authData } = useContext(AuthContext);
	const listParams = useParams()
	const role = listParams.dept
	const requestUrlType = useLocation().pathname.split('/');
	// let requestType;
	//  localVariable;
	const requestType = requestUrlType[2].split('-')[0];
	const localVariable = requestType === 'part' ? 'partPendingList':'componentPendingList'
	//  urlPath;
	let urlPath = role === 'workshop' && requestType === 'part' ? 'post-part':`request-${requestType}`
	if (role === 'human-resource') {
		if (requestType === 'part') {urlPath = 'post-part'}
		else if (requestType === 'component') {urlPath = 'workshop-component-request'};
	}
	// if (role === 'workshop' && requestType === 'part') {
	// 	urlPath = 'post-part'
	// } else {
	// 	urlPath = `request-${requestType}`
	// }
	urlPath = `${urlPath}/list`
	// request-${requestType}
	// console.log('params:', useParams())
	// localVariable = requestType === 'part' ? 'partRequestContext':'compRequestContext'
	console.log(
		'\nlocalVariable:', localVariable,
		'\nrequestType:', requestType,
		'\nlistParams:', listParams,
		'\nrole:', role,
		'\nurlPath:', urlPath
	)
	useEffect(() => {
		// reset or get the updated data locally
		localStorage.removeItem(localVariable)
	}, [])
	const requests = usePullCompleteList(
		urlPath, authData.id, localVariable,
		// pending-faults/<str:type>/<int:pk>
		// `http://127.0.0.1:8000/${listParams.type}-faults/${authData.id}/`,
		// 10, `${localContextVariable}
	)
	console.log('urlPath:', urlPath)


	// const requests = usePaginationWithEncryption(
	// 	`http://127.0.0.1:8000/${url}/${authData.id}/`,
	// 	10, `${localVariable}`
	// )


	// const partRompRequests = usePaginationWithEncryption(
	// 	`http://127.0.0.1:8000/request-component/${authData.id}`,
	// 	10, 'compRequestContext'
	// )
	// let requests;
	// if (requestType === 'component') requests = compRequests;
	// if (requestType === 'part') requests = partRompRequests;
	console.log('page number:', requests.pageNum)
	console.log('RequestsList:', requests.pageHandler(requests.pageNum, requests.arrayData))
	// console.log('confirmReso:', confirmReso.pageHandler(confirmReso.pageNum, confirmReso.arrayData))
	// const { confirmResolutionsContext, pendingFaultsContext } = useContext(SharedDataContext);
	const allRequests = requests.pageHandler(requests.pageNum, requests.arrayData)

	// useEffect(() => {
	// 	// if (requests.pageNum || confirmReso.pageNum) {
	// 	if (requests.pageNum) {
	// 		setUnityPageNum((requests.pageNum - 1) * 10);
	// 	}
	// // }, [requests.pageNum, confirmReso.pageNum])
	// }, [requests.pageNum])
	console.log('allRequests:', allRequests)
	console.log('requests:', requests)
	// console.log('unityPageNum', unityPageNum)
	console.log('requests.theTotalPage:', requests.theTotalPage)
	console.log('length.arrayData:', requests.arrayData)
	return (
		<>
			{(!requests.arrayData && requests.arrayLoading) ?
				(<p style={{
					padding: '1rem',
					color: '#888',
					fontSize: '1.2rem',
					textAlign: 'center',
				}}>Loading ...</p>) :
			(allRequests.length ?
			<>
				<RequestBar allRequests={allRequests} page={requests.pageNum} total={requests.arrayData.length} />
				<div style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '1rem',
						paddingBottom: '1.5rem',
						fontSize: '1.1rem',
						backgroundColor: '#E5E5E5',
						}}>
					{(requests.arrayData && requests.pageNum > 1) && (
						<button onClick={() => requests.setPageNum(requests.pageNum - 1)}>
							Previous
						</button>
					)}
					{(requests.arrayData && requests.pageNum > 0 && requests.pageNum < requests.theTotalPage) && (
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