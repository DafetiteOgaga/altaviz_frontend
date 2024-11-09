import "../../sidebar_pages.css"
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/checkAuth/AuthContext";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";

function FaultBarGen ({allFaults, page, total=null, type=null, found=null}) {
	const { authData } = useContext(AuthContext);
	const barParams = useParams()
	const [pageNum, setPageNum] = useState(1)
	const { toSentenceCase, trimString } = useContext(SentenceCaseContext)

	console.log("Faults:", allFaults)
	let completeFaults = allFaults
	const pageHandler = (page, localList) => {
		if (page < 1 || page > 10) {
			return [];
		}
		const start = (page - 1) * 10;
		const end = start + 10;
		return localList.slice(start, end);
	};
	if (barParams.context) {completeFaults = pageHandler(pageNum, allFaults)}
	console.log("type:", type)
	console.log("barParams:", barParams)
	console.log("pageNum:", pageNum)
	console.log("page:", page)

	// styles
	console.log("completeFaults:", completeFaults)
	const statusStyle = {
		pending: {
			// padding: '0 0.4rem',
			// borderRadius: '3px',
			// border: '1px dotted',
			// color: 'grey',
			backgroundColor: 'rgba(255, 255, 0, 0.6)',
			padding: ' 0 0.3rem',
			borderRadius: '3px',
			border: '1px dotted',
		},
		approved: {
			color: 'green',
		},
		unconfirmed: {
			// color: 'rgba(0, 0, 255, 1)',
			color: 'blue',
		},
		rejected: {
			color: 'red',
		}
	}
	const barStyles = {
		padding: ' 0 0.3rem',
		borderRadius: '3px',
	}
	const backgroundStyle = {
		backgroundColor:  '#E5E5E5',
		borderTopLeftRadius: '1rem',
		borderTopRightRadius: '1rem',
	}
	return (
		<>
			<div
			style={backgroundStyle}
			className="custodian-page">
				<div className="dash-form">
					{/* heading */}
					<div>
						<h4>
							{/* default render */}
							{!type && 'Faults List'}
							{/* for hr */}
							{type === 'human-resource' && 'Faults Requests List'}
							{/* for helpdesk and supervisor */}
							{(type === 'help-desk'||type === 'supervisor') && 'Faults List'}
							{/* for individual engineer bars */}
							{(type === 'engineer' && completeFaults) && toSentenceCase((completeFaults.replacement_engineer?completeFaults.replacement_engineer:completeFaults[0].assigned_to.first_name)) + "'s Faults"}
							{/* for searches */}
							{type === 'faultSearch' && `Found ${found}`}
							{total && ' ('+total+' ' + (total===1?'Item':'Items') + ')'}
						</h4>
					</div>
					<div>
					<hr />
						<div className="input-field">
							<ul
							style={{listStyleType: 'none'}}>
								{completeFaults &&
								completeFaults.map((fault, index) => {
									console.log({fault})
									return (
								<li key={fault.id}>
									{/* link to fault details */}
									<Link to={`fault-gen-details/${fault.id}`}
									style={{textDecoration: 'none',color: '#333'}}>
										<div className="fault-list-block">
										{/* <pre>{`${((page-1)*10)+index+1}`}. <strong */}
										{/* <pre>{type !== 'faultSearch' ? `${((page-1)*10)+index+1}` : `${((page)*10)+index+1}`}. <strong */}
										<pre>{type !== 'faultSearch' && `${(((barParams.context?pageNum:page)-1)*10)+index+1}. `}<strong
										// <pre>{type !== 'faultSearch' ? `${(((barParams.context?pageNum:page)-1)*10)+index+1}` : (page > 0 ? `${page+String(index+1)}`: `${String(index+1)}`)}. <strong
											style={{fontSize: '1.1rem',}}>
												Fault: #</strong>{fault.id}</pre>

											{/* bank and details */}
											{<div>
												<p><strong>Bank: </strong>
												{fault.logged_by.branch.bank.name.toUpperCase()}</p>
												<p><strong>Details: </strong>
													<span style={{...{color: 'red'},...barStyles}}>
														{trimString((toSentenceCase(fault.title.name)), 20)}
													</span>
												</p>
											</div>}
											{/* engineer and request status */}
											{<div>
												<p><strong>Assigned to: </strong>
													<span style={{...{backgroundColor: '#999',color: 'white'},...barStyles}}>
														{trimString(toSentenceCase(fault.assigned_to.first_name), 12)}
													</span>
												</p>
												<p><strong>Requests: </strong>
													{(fault.requestStatus) ? (
														<>
															<span style={{...{backgroundColor: 'green',color: 'white'},...barStyles}}>
																Yes
															</span><span style={{
																color: '#87823E',
																padding: '0 0.7rem',
																fontWeight: 'bold'
															}}>{(((fault.requestComponent?.length)??0)+((fault.requestPart?.length)??0))}</span>
														</>) : 'No'}
												</p>
											</div>}
											{/* fault status and helpdesk */}
											{<div>
												<p><strong>Status: </strong>
												{<span style={(fault?.confirm_resolve) ? statusStyle.approved : (!fault?.confirm_resolve&&fault.verify_resolve) ? statusStyle.unconfirmed : statusStyle.pending}>
													{(fault?.confirm_resolve) ? 'Resolved': (!fault?.confirm_resolve&&fault.verify_resolve) ? 'Unconfirmed' : 'Pending'}
												</span>}
												</p>
												{/* supervisors and hr can see the helpdesk who manages the fault log */}
												{(authData.role === 'supervisor'||authData.role === 'human-resource') ?
												(<p><strong>Managed By: </strong>
													<span style={{...{backgroundColor: '#999',color: 'white'},...barStyles}}>
														{trimString(toSentenceCase(fault.managed_by.first_name), 12)}
													</span>
												</p>) :
												(<p>{(fault.verify_resolve && !fault.confirm_resolve) ?
													(<span style={{
														...barStyles,
														border: '1px dashed',
														cursor: 'pointer',
														fontWeight: 'bold',
														textDecoration: 'underline',
														color: '#B5B5BD',
													}}>
														Verify this Resolution
													</span>) : null}
												</p>)}
											</div>}
										</div>
									</Link>
								</li>)})}
							</ul>
						</div>
					</div>
				</div>
				{(barParams.context && allFaults.length>10) &&
				(<div style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '1rem',
					paddingBottom: '1rem',
					}}>
					{(completeFaults && pageNum > 1) && (
						<button onClick={() => setPageNum(pageNum - 1)}>
							Previous
						</button>
					)}
					{(completeFaults && pageNum > 0 && pageNum < 10) && (
						<button onClick={() => {
							// faults.handleNextPage();
							setPageNum(pageNum + 1);
							}}>
							Next
						</button>
					)}
				</div>)}
			</div>
		</>
	)
}
export default FaultBarGen;