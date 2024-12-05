import "./sidebar_pages.css"
import { useContext } from "react";
import usePullCompleteList from "../../../paginationComp/usePullCompleteList";
// import usePaginationWithEncryption from "../../../paginationComp/usePaginationWithEncryption";
// import FaultBarGen from "../../faults/GenFaults/FaultBarGen";
import UserBar from "./UserBar";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
import { useParams } from 'react-router-dom';

function UserProcessedList ({faultUrl, faultKeyContext}) {
	// const [filteredFaults, setFilteredFaults] = useState(null)
	// const location = useLocation();
	const { authData } = useContext(AuthContext);
	const userParams = useParams()
	console.log(
		// '\nlocation:', location,
		// '\npathname:', location.pathname,
		'\nuserParams:', userParams,
		'\nuserParams.id:', userParams.id,
		'\nuserParams.dept:', userParams.dept,
		'\nuserParams.context:', userParams.context,
	);
	let urlEndpoint;
	let variableContext;
	// other departments
	if (userParams.dept!=='human-resource') {
		if (userParams.context === 'faultsKey') {urlEndpoint = 'user-request/list'; variableContext = 'faultpendingList';}
		else if (userParams.context === 'unconfirmedKey') {urlEndpoint = 'regional-unconfirmed-faults/list'; variableContext = 'faultunconfirmedList';}
	} else {
		// hr department
		if (userParams.context === 'faultsKey') {urlEndpoint = 'all-request-faults/list'; variableContext = 'faultpendingList';}
		else if (userParams.context === 'updateAccount') {urlEndpoint = 'approve-user-details-update/list'; variableContext = 'updateList';}
	}
	console.log(
		'\nurl::', urlEndpoint,
		'\nvariableContext::', variableContext,
	)
	const accounts = usePullCompleteList(
		urlEndpoint, authData.id, variableContext,
	)
	console.log('accounts', accounts)
	console.log('page number:', accounts.pageNum)
	console.log('FaultListGenHelpdesk:', accounts.pageHandler(accounts.pageNum, accounts.arrayData))
	console.log('accounts:', accounts)
	console.log('accounts.theTotalPage:', accounts.theTotalPage)
	console.log('length.arrayData:', accounts.arrayData)
	console.log('accounts.arrayLoading', accounts.arrayLoading)
	return (
		<>
			<UserBar
			allUsers={accounts.arrayData}
			page={accounts.pageNum}
			loading={accounts.arrayLoading} />

			<div style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '1rem',
					paddingBottom: '1.5rem',
					fontSize: '1.1rem',
					backgroundColor: '#E5E5E5',
					}}>
				{(accounts.arrayData && accounts.pageNum > 1) && (
					<button onClick={() => accounts.setPageNum(accounts.pageNum - 1)}>
						Previous
					</button>
				)}
				{(accounts.arrayData && accounts.pageNum > 0 && accounts.pageNum < accounts.theTotalPage) && (
					<button onClick={() => {
						// faults.handleNextPage();
						accounts.setPageNum(accounts.pageNum + 1);
						}}>
						Next
					</button>
				)}
			</div>
		</>
	)
}
export default UserProcessedList;