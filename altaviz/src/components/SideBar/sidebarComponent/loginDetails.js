import { useState, useEffect, useContext } from "react";
import { SentenceCaseContext } from "../../context/SentenceCaseContext";
import { FetchContext } from "../../context/FetchContext";

function LoginDetails () {
	const [listOfAllAccounts, setListOfAllAccounts] = useState(null);
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [getAllAccounts, setGetAllAccounts] = useState(true);
	const { useGetDataAPI } = useContext(FetchContext);

	console.log('url:', `new-location-assignment/list/8/`)
	const { getData, getLoading, getError } = useGetDataAPI(
		`login-details/`,
		getAllAccounts
	);
	useEffect(() => {
		if (getData||getError) {
			console.log({getData})
			console.log({getError})
			setListOfAllAccounts(getData)
			setGetAllAccounts(false)
		}
	}, [getData, getLoading, getError, getAllAccounts])
	console.log('listOfAllAccounts:', listOfAllAccounts)
	return (
		<>
			<div className="background-color custodian-page">
				<div className="dash-form">
					<div>
						<h4>Note: This page is for demonstration purposes only and will be removed when application is in use.</h4>
						<p>
							<span>This is a list of all the accounts that has been created on the app so far.</span><br/>
							<span>Password for all these accounts is: <strong>password123</strong></span>
						</p>
					</div>
					<div>
						<hr />
							<div>
								<div className="cust-row-user">
									{(<>
										{(<>
											<ul style={{listStyleType: 'none'}}>
												{listOfAllAccounts?.map((user, index) => {
													// console.log('\nuser:', user)
													return(
														<>
															<li key={index}>
																<div style={{padding: '0.1rem 0'}} className="user-fields-row">
																<div className="input-field">
																		<p style={{margin: '0'}}>
																			<span style={{whiteSpace: 'pre'}}>{index+1}. </span><strong>Email: </strong>
																			<span>{user?.email}</span>
																		</p>
																	</div>
																	<div className="input-field">
																		<p style={{margin: '0'}}>
																			<span>Role: </span>
																			<span
																			style={{
																				color: (user.role==='engineer')?'brown':
																						(user.role==='supervisor')?'darkblue':
																						(user.role==='custodian')?'forestgreen':
																						(user.role==='workshop')?'darkcyan':
																						(user.role==='help-desk')?'darkgoldenrod':'darkmagenta'
																			}}>{toSentenceCase(user?.role)}</span>
																		</p>
																	</div>
																</div>
															</li>
															<hr style={{width: '70%'}} />
															</>
													)})}
											</ul>
										</>)}
									</>)}
								</div>
							</div>
					</div>
				</div>
				<hr/>
			</div>
		</>
	)
}
export default LoginDetails;