import "./sidebar_pages.css"
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import usePullCompleteList from "../../paginationComp/usePullCompleteList";
// import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";
// import FaultDetailsGenTest from "./yyyyyyyyyyyyFaultDetailsGenTest";
// import FaultBarGen from "../faults/GenFaults/FaultBarGen";
import RequestBar from "./RequestBar";
// import FaultDetailsGenTest from "./FaultDetailsGenTest";
import { AuthContext } from '../../context/checkAuth/AuthContext';

function RequestListDisplay ({requestUrl, requestKeyContext}) {
	const [isFading, setIsFading] = useState(true);
	const dept = useLocation().pathname.split('/')[1]
	// const { SetPendingFaultsContext } = useContext(SharedDataContext);
	// const [unityPageNum, setUnityPageNum] = useState(1);
	console.log('requestUrl:', requestUrl)
	const { authData } = useContext(AuthContext);
	const requests = usePullCompleteList(
		requestUrl, authData.id, requestKeyContext
	)

	const allRequests = requests?.pageHandler(requests?.pageNum, requests?.arrayData)
	console.log(
		'\narrayData:', requests?.arrayData,
		'\nlength.arrayData:', requests?.arrayData?.length,
		'\nfaults:', requests,
		'\nRequestListDisplay:', requests?.pageHandler(requests?.pageNum, requests?.arrayData),
		'\npage number:', requests.pageNum,
		'\nrequests.theTotalPage:', requests?.theTotalPage,
		'\nrequests.getLoading:', requests.arrayLoading,
	)
	useEffect(() => {
		if (allRequests.length) {
			const fadein = setTimeout(() => {
				setIsFading(false);
			}, 300);
			return () => {
				clearTimeout(fadein);
			};
		}
	}, [allRequests])
	const transitStyles = {
		transition: 'opacity 0.3s ease-in-out',
		opacity: isFading ? 0 : 1,
		pointerEvents: isFading ? 'none' : 'auto',
	}
	console.log({dept})
	return (
		<>
		{(!requests.arrayData && requests.arrayLoading) ?
			(<p style={{
				padding: '1rem',
				color: '#888',
				fontSize: '1.2rem',
				textAlign: 'center',
			}}>Loading List ...</p>) :
			(allRequests.length ?
			<>
				<div style={transitStyles}>
					<RequestBar allRequests={allRequests} page={requests.pageNum} />
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '1rem',
						paddingBottom: '1rem',
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
				</div>
			</>:null)}
		</>)
}
export default RequestListDisplay;