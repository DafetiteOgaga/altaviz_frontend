import { FaTimes, FaCheck } from "react-icons/fa";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";

function FaIcon ({iconParameters, icon, btnState, color}) {
	const { toSentenceCase } = useContext(SentenceCaseContext)
	console.log(
		'\niconParameters.requestItemsObj:', iconParameters.requestItemsObj,
		'\nrequestItemsObj:', iconParameters.requestItemsObj,
		'\nrequest:', iconParameters.request,
		'\ntype:', iconParameters.type,
	)
	const iconStyles = {
		cursor: 'pointer',
		padding: '0 0.20rem',
	}
	return (
		<>
			{icon==='check'&&
			<FaCheck
			style={{
				...iconStyles,
				...color,
			}}
			onClick={(e) => {
				iconParameters.requestItemsObj.patchUrlName.current = `request-${iconParameters.type}`
				iconParameters.requestItemsObj.setRequeste(`${btnState}-${iconParameters.type}`)
				iconParameters.requestItemsObj.setItemId(iconParameters.request?.id);
				iconParameters.requestItemsObj.handleClick(e, {type: {id: iconParameters.request?.id, button: `${btnState.slice(0, -1)}`, typeOfRequest: `${iconParameters.type}`}})
			}}
			title={`${toSentenceCase(btnState.slice(0, -1))} ${toSentenceCase(iconParameters.request.name.name)} Request`}
			/>}
			{icon==='times'&&
			<FaTimes
			style={{
				...iconStyles,
				...color,
			}}
			onClick={(e) => {
				iconParameters.requestItemsObj.patchUrlName.current = `request-${iconParameters.type}`
				iconParameters.requestItemsObj.setRequeste(`${btnState==='rejected'?btnState:'request'}-${iconParameters.type}`)
				iconParameters.requestItemsObj.setItemId(iconParameters.request?.id);
				iconParameters.requestItemsObj.handleClick(e, {type: {id: iconParameters.request?.id, button: `${btnState==='rejected'?btnState.slice(0, -2):'withdraw'}`, typeOfRequest: `${iconParameters.type}`}})
			}}
			title={`${btnState==='rejected'?toSentenceCase(btnState.slice(0, -2)):'Delete'} ${toSentenceCase(iconParameters.request.name.name)} Request`}
			/>}
		</>
	)
}
function FaultRequestsItem ({
	request,
	requestItemsObj,
	type
}) {
	const { toSentenceCase } = useContext(SentenceCaseContext)
	console.log(
		'\nrequestItemsObj.updateCompLocalStorage.isDone:', requestItemsObj.updateCompLocalStorage.isDone,
		'\nrequestItemsObj.role:', requestItemsObj.role,
		'\nrequest:', request,
		'\nrequestItemsObj.canMakeRequests:', requestItemsObj.canMakeRequests,
		'\nrequestItemsObj.canApproveOrRejectRequests:', requestItemsObj.canApproveOrRejectRequests,
		// '\nrequestItemsObj.patchUrlName.current:', requestItemsObj.patchUrlName.current,
		// '\nrequestItemsObj.setRequeste:', requestItemsObj.setRequeste,
		// '\nrequestItemsObj.setItemId:', requestItemsObj.setItemId,
		// '\nrequestItemsObj.handleClick:', requestItemsObj.handleClick,
		'\nrequestItemsObj.faultsItem:', requestItemsObj.faultsItem,
		'\nrequestItemsObj.FaultParamDetals:', requestItemsObj.FaultParamDetals,
		'\ntype:', type,
	)
	const iconParameters = {
		request: request,
		requestItemsObj: requestItemsObj,
		type: type
	}
	// const iconStyles = {
	// 	cursor: 'pointer',
	// 	padding: '0 0.20rem',
	// }
	const statusStyle = {
		pending: {
			padding: '0 0.4rem',
			borderRadius: '3px',
			border: '1px dotted',
			color: 'grey',
		},
		approved: {
			color: 'green',
		},
		unconfirmed: {
			color: 'blue',
			// fontStyle: 'bolder',
		},
		rejected: {
			color: 'red',
		}
	}
	return (
		<>
		{/* loads requests from db */}
		{requestItemsObj.updateCompLocalStorage.isDone?
		(<>
		{/* human-resource and supervisor can approve/reject requests and only when request is not approved/rejected and/or flagged as resolved by the engineer */}
		{((requestItemsObj.role==='supervisor'||requestItemsObj.role==='human-resource') && !requestItemsObj.faultsItem?.confirm_resolve &&
				!requestItemsObj.faultsItem?.verify_resolve && !request.approved && !request.rejected && requestItemsObj.canApproveOrRejectRequests
			)&&
				(<>
					<FaIcon
					iconParameters={iconParameters}
					icon='check'
					btnState='approved'
					color={{color: 'green'}}
					/>
					<FaIcon
					iconParameters={iconParameters}
					icon='times'
					btnState='rejected'
					color={{color: 'red'}}
					/>
				</>)}

			{/* engineers and supervisor can delete requests and only when request is not approved/rejected and/or flagged as resolved by the engineer */}
			{((requestItemsObj.role==='engineer'||requestItemsObj.role==='supervisor') && requestItemsObj.canMakeRequests && !requestItemsObj.faultsItem?.verify_resolve &&
				!request.approved && !request.rejected
			)&&
				(<FaIcon
					iconParameters={iconParameters}
					icon='times'
					btnState='request'
					color={{}}
					/>
				)}
				{/* link to the current request */}
				<Link to={`/${requestItemsObj.FaultParamDetals.dept}/${type}-request-details/${requestItemsObj.FaultParamDetals.id}/${request.id}/`}
				style={{color: '#333'}}>
					{toSentenceCase(request.name.name)}
			</Link>
		</>)
		:(toSentenceCase(request.name.name))}
			: <span>
				{request.quantityRequested} {request.quantityRequested === 1 ? 'piece' : 'pieces'}
			</span> <span style={{
					fontStyle: 'italic',
						...request.approved ?
							statusStyle.approved :
							request.rejected ?
								statusStyle.rejected :
								statusStyle.pending
				}}>
				{request.approved ? '(Approved)' : request.rejected ? 'Rejected': 'Pending'}
			</span>
		</>)
}
export default FaultRequestsItem;