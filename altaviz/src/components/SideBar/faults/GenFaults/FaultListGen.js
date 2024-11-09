import "../../sidebar_pages.css"
import { useContext, useEffect, useState } from "react";
// import usePaginationWithEncryption from "../../../paginationComp/usePaginationWithEncryption";
import FaultBarGen from './FaultBarGen';
import usePullCompleteList from "../../../paginationComp/usePullCompleteList";
import { AuthContext } from '../../../context/checkAuth/AuthContext';
import { useLocation, useParams } from'react-router-dom'
// import { CheckAndFetchFromStorage } from "../../../hooks/fetchFromClient";
// import { useParams } from 'react-router-dom';

function FaultListGen () {
	// const [unityPageNum, setUnityPageNum] = useState(1);
	const { authData } = useContext(AuthContext);
	const currUrl = useLocation().pathname
	const listParams = useParams()
	const dept = listParams.dept
	const type = listParams.type
	const context = listParams.context

	console.log(
		'\ndept:', dept,
		'\ntype:', type,
		'\ncurrUrl:', currUrl,
		'\nlistParams:', listParams,
		'\ncontext:', context,
	)

	// set local variable (for engineer and custodian)
	let localContextVariable;
	if (type==='pending'||context==='faultsKey') {
		localContextVariable = 'faultpendingList';
	} else if (type==='unconfirmed'||context==='unconfirmedKey') {
		localContextVariable = 'faultunconfirmedList';
	}

	let urlPath;
	if (listParams.dept==='custodian') {urlPath = `${listParams.type}-faults`}
	else if (listParams.dept==='engineer') {urlPath = `engineer-${listParams.type}-faults`}
	else if (listParams.dept==='help-desk'||listParams.dept==='supervisor') {urlPath = (listParams.context==='faultsKey'?'user-request':'regional-unconfirmed-faults')}
	else if (listParams.dept==='human-resource') {urlPath = (listParams.context==='faultsKey'?'all-request-faults':'')}
	urlPath = `${urlPath}/list`
	console.log(
		'\nurlPath:', urlPath,
		'\nlocalContextVariable:', localContextVariable
	)
	// console.log()
	// fetch from local storage/db
	const faults = usePullCompleteList(
		urlPath, authData.id, localContextVariable,
	)
	console.log('urlPath:', urlPath)
	console.log('faults:', faults)

	console.log('page number:', faults.pageNum)
	console.log('FaultListGen:', faults.pageHandler(faults.pageNum, faults.arrayData))

	// frontend pagination
	let allFaults;
	let engineer;
	if (type) {allFaults = faults.pageHandler(faults.pageNum, faults.arrayData)}
	else if (faults?.arrayData&&context) {
		allFaults = faults.arrayData.filter(engineerFaults => engineerFaults.id === Number(listParams.id))[0]
		engineer = allFaults.first_name
		allFaults = allFaults.faults
	}
	// if (context) {}
	// useEffect(() => {
	// 	// if (faults.pageNum || confirmReso.pageNum) {
	// 	if (faults.pageNum) {
	// 		setUnityPageNum((faults.pageNum - 1) * 10);
	// 	}
	// // }, [faults.pageNum, confirmReso.pageNum])
	// }, [faults.pageNum])

	console.log('faults:', faults)
	console.log('engineer:', engineer)
	console.log('allFaults:', allFaults)
	// console.log('unityPageNum', unityPageNum)
	console.log('faults.theTotalPage:', faults.theTotalPage)
	console.log(
		'\nfaults?.arrayData::', faults?.arrayData,
		'\nfaults?.arrayLoading:', faults?.arrayLoading,
		'\nallFaults:', allFaults,
		'\nallFaults?.length:', allFaults?.length,
	)
	// console.log(
	// 	'params:', useParams()
	// )
	return (
		// (<>{allFaults &&
			<>
				{(!faults.arrayData && faults.arrayLoading) ?
					(<p style={{
						padding: '1rem',
						color: '#888',
						fontSize: '1.2rem',
						textAlign: 'center',
					}}>Loading ...</p>) :
				(allFaults?.length ?
				<>
					{/* pass allfaults and consolidated page number to faultbars */}
					<FaultBarGen allFaults={allFaults} page={faults.pageNum} total={type?faults.arrayData.length:`${engineer}'s`} />

					{/* frontend pagination/navigation buttons */}
					<div style={{
							display: 'flex',
							justifyContent: 'center',
							gap: '1rem',
							paddingBottom: '1.5rem',
							fontSize: '1.1rem',
							backgroundColor: '#E5E5E5',
							}}>
						{(faults.arrayData && faults.pageNum > 1) && (
							<button onClick={() => faults.setPageNum(faults.pageNum - 1)}>
								Previous
							</button>
						)}
						{(faults.arrayData && faults.pageNum > 0 && faults.pageNum < faults.theTotalPage) && (
							<button onClick={() => {
								// faults.handleNextPage();
								faults.setPageNum(faults.pageNum + 1);
								}}>
								Next
							</button>
						)}
					</div>
				</>:null)}
			</>
		// 	}
		// </>)
		)
}
export default FaultListGen;