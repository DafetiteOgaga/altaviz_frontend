// {dynamicfields.map((field, dynIndex) => (
// 	<div className="b-line" key={`field-${dynIndex}`}>
// 		<>
// 			<div className="input-field">
// 				{/* <hr/> */}
// 				{/* for custodian */}
// 				{(componentPage === '/custodian') &&
// 				(<>
// 					{/* <hr/> */}
// 					<label htmlFor={`fault-${dynIndex}`}>Fault:</label>
// 					<select id={`fault-${dynIndex}`} name={`fault-${dynIndex}`}>
// 					{faults.map((fault, faultIndex) => (
// 						<option key={faultIndex} value={fault}>
// 						{fault}
// 						</option>
// 					))}
// 					</select>
// 				</>)}
// 				{/* for workshop/engineer/human-resource */}
// 				{(componentPage === '/workshop' ||
// 					componentPage === '/engineer' ||
// 					componentPage === '/human-resource'
// 				) &&
// 				(<>
// 					<label htmlFor={`${item[1]}-${dynIndex}`}>{item[2]}:</label>
// 					<select id={`${item[1]}-${dynIndex}`} name={`${item[1]}-${dynIndex}`}>
// 					{/* {fixedParts.map(fault => (
// 						<option key={fault} value={fault}>
// 						{fault}
// 						</option>
// 					))} */}
// 					{/* first loop */}
// 					{(mainIndex === 0) && (fixedParts.map((fault, fixedPartsIndex) => (
// 						<option key={fixedPartsIndex} value={fault}>
// 							{fault}
// 						</option>
// 					)))}
// 					{/* second loop */}
// 					{(mainIndex === 1) && (reqComponents.map((fault, reqCompIndex) => (
// 						<option key={reqCompIndex} value={fault}>
// 							{fault}
// 						</option>
// 					)))}
// 					</select>
// 				</>)}
// 			</div>
// 			<div className="with-rm-btn">
// 				<div className="input-field">
// 					{/* for custodian */}
// 					{(componentPage === '/custodian') &&
// 					(<>
// 						<label htmlFor={`atm-number-${dynIndex}`}>ATM:</label>
// 						<select id={`atm-number-${dynIndex}`} name={`atm-number-${dynIndex}`}>
// 						{Array.from({ length: formValues.totalNumberOfATMs }, (_, i) => i + 1).map((number, num1Index) => (
// 							<option key={num1Index} value={number}>
// 							{number}
// 							</option>
// 						))}
// 						</select>
// 					</>)}
// 					{/* for workshop/engineer/human-resource */}
// 					{(componentPage === '/workshop' ||
// 						componentPage === '/engineer' ||
// 						componentPage === '/human-resource'
// 					) &&
// 					(<>
// 						<label htmlFor={`${item[3]}-${dynIndex}`}>Quantity:</label>
// 						<select id={`${item[3]}-${dynIndex}`} name={`${item[3]}-${dynIndex}`}>
// 						{/* for workshop/engineer */}
// 						{(componentPage !== '/human-resource') &&
// 						(Array.from({ length: 16 }, (_, i) => i + 1).map((number, num2Index) => (
// 							<option key={num2Index} value={number}>
// 							{number}
// 							</option>
// 						)))}
// 						{/* for human-resource */}
// 						{(componentPage === '/human-resource') &&
// 						(Array.from({ length: 100 }, (_, i) => i + 1).map((number, num3Index) => (
// 							<option key={num3Index} value={number}>
// 							{number}
// 							</option>
// 						)))}
// 						</select>
// 					</>)}
// 				</div>
// 				<div>
// 					<button
// 						type="button"
// 						onClick={() => removedynamicfieldsFieldSet(dynIndex)}
// 						>Remove
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	</div>
// ))}



// </div>
// 											</div>
// 											<div>
// 												<div className="input-field textarea-box">
// 													<label htmlFor={`other-${mainIndex}`}>Others:</label>
// 													<textarea
// 													type="text"
// 													name={`other-${mainIndex}`}
// 													id={`other-${mainIndex}`}
// 													placeholder="Pls, specify ..."
// 													rows={3}
// 													onChange={handleInputChange}
// 													/>
// 												{/* </div> */}
// 											</div>
// 										</div>
// 										<div className="cust-button">
// 											{/* for custodian */}
// 											{(componentPage === '/custodian') && (<button onClick={EditHandler}>{!isEditable ? 'Edit Fields' : 'Done Editing'}</button>)}
// 											{(componentPage === '/custodian') && (<button>Update Fields</button>)}
// 											{/* <button onClick={handleUpdateFields}>Update Fields</button> */}
// 											<button type="submit">
// 												{/* for custodian */}
// 												{(componentPage === '/custodian') &&
// 												('Log Fault')}
// 												{/* for workshop/engineer/human-resource */}
// 												{(componentPage === '/workshop' ||
// 													componentPage === '/engineer' ||
// 													componentPage === '/human-resource'
// 												) &&
// 												(`${item[4]}`)}
// 											</button>
// 											<button type="button" onClick={addFieldSet}>
// 												Add More
// 											</button>
// 										</div>
// 										</div>