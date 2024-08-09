<div className="dash-form">
						<div>
							<h4>Make your Requests here</h4>
						</div>
						<div>
							<div className="to-form">
								{/* <h4>Log a Fault</h4> */}
								{/* <a href={"/custodian"} onClick={(e) => goTo(e)}> */}
								<h4>Customer Engineer</h4>
								{/* </a> */}
							</div>
							<hr />
							<form onSubmit={handleSubmit}>
								<div>
									{/* row 1 */}
									<div className="cust-row">
										<div className="input-field">
											<label htmlFor="name">Name:</label>
											<input
											type="text"
											name="name"
											id="name"
											value={formValues.name}
											readOnly
											/>
										</div>
										<div className="input-field">
											<label htmlFor="department">Department:</label>
											<input
											type="text"
											name="department"
											id="department"
											value={formValues.department}
											readOnly
											// onChange={handleInputChange}
											// readOnly={!isEditable}
											/>
											{/* {errors.state && <span className="error">{errors.state}</span>} */}
										</div>
										<div className="input-field">
											<label htmlFor="deliveries">Deliveries:</label>
											<input
											type="text"
											name="deliveries"
											id="deliveries"
											value={formValues.deliveries}
											readOnly
											// onChange={handleInputChange}
											// readOnly={!isEditable}
											/>
											{/* {errors.branch && <span className="error">{errors.branch}</span>} */}
										</div>
									</div>
									{/* row 2 */}
									<div className="cust-row">
										<div className="input-field">
											<label htmlFor="pendings">Pendings:</label>
											<input
											type="text"
											name="pendings"
											id="pendings"
											value={formValues.pendings}
											// onChange={handleInputChange}
											readOnly
											/>
											{/* {errors.engineer && <span className="error">{errors.engineer}</span>} */}
										</div>
										<div className="input-field">
											<label htmlFor="phone">Phone:</label>
											<input
											type="text"
											name="phone"
											id="phone"
											value={formValues.phone}
											// onChange={handleInputChange}
											readOnly
											/>
											{/* {errors.helpDesk && <span className="error">{errors.helpDesk}</span>} */}
										</div>
										<div className="input-field">
											<label htmlFor="whatsapp">Whatsapp Number:</label>
											<input
											type="text"
											name="whatsapp"
											id="whatsapp"
											value={formValues.whatsapp}
											// onChange={handleInputChange}
											// readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div>
									</div>
									{/* row 3 */}
									<div className="cust-row">
										<div className="input-field">
											<label htmlFor="photo">Profile Photo:</label>
											<input
											type="text"
											name="photo"
											id="photo"
											value={formValues.photo}
											// onChange={handleInputChange}
											readOnly
											/>
											{/* {errors.engineer && <span className="error">{errors.engineer}</span>} */}
										</div>
										<div className="input-field">
											<label htmlFor="email">Email:</label>
											<input
											type="text"
											name="email"
											id="email"
											value={formValues.email}
											// onChange={handleInputChange}
											readOnly
											/>
											{/* {errors.helpDesk && <span className="error">{errors.helpDesk}</span>} */}
										</div>
										<div className="input-field">
											<label htmlFor="status">Status:</label>
											<input
											type="text"
											name="status"
											id="status"
											value={formValues.status}
											// onChange={handleInputChange}
											// readOnly={!isEditable}
											readOnly
											/>
											{errors.atmType && <span className="error">{errors.atmType}</span>}
										</div>
									</div>






									{/* <div className="cust-row">
										<div className="input-field">
											<label htmlFor="total-atms">Total Number of ATMs:</label>
											<input
											type="text"
											name="total-atms"
											id="total-atms"
											value={formValues.totalNumberOfATMs}
											// readOnly={!isEditable}
											/>
											{errors.totalNumberOfATMs && <span className="error">{errors.totalNumberOfATMs}</span>}
										</div>
									</div> */}


									{/* Request components parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{requestComponent.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Request for Components:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{components.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Components:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
												</div>
											</div>
										))}
										</div>
									</div>

									{/* Request parts */}
									<div className="cust-row">
										<div className="dynamic-cust-row">
										{RequestParts.map((field, index) => (
											<div className="b-line" key={index}>
												<div className="input-field">
													<label htmlFor={`parts-${index}`}>Request for Part:</label>
													<select id={`parts-${index}`} name={`parts-${index}`}>
													{parts.map(part => (
														<option key={part} value={part}>
														{part}
														</option>
													))}
													</select>
												</div>
												<div className="input-field">
													<label htmlFor={`amount-${index}`}>Amount of Part:</label>
													<select id='amount' name={`amount-${index}`}>
													{Array.from({ length: 15 }, (_, i) => i + 1).map((number) => (
														<option key={number} value={number}>
														{number}
														</option>
													))}
													</select>
												</div>
											</div>
										))}
										</div>
									</div>
									
									<div>
										<div className="input-field textarea-box">
											<label htmlFor="others">Others:</label>
											<textarea
											type="text"
											name="others"
											id="others"
											placeholder="Pls, specify ..."
											rows={3}
											// value={formValues.otherFaults}
											onChange={handleInputChange}
											/>
										</div>
									</div>
								</div>
								<div className="cust-button">
									<button type="submit">Post</button>
									{/* <button onClick={EditHandler}>Edit Fields</button> */}
									<button type="button" onClick={addRequestPartFieldSet}>
											Add Part
										</button>
									<button type="button" onClick={addRequestComponentFieldSet}>
										Add Component
									</button>
								</div>
							</form>
						</div>
					</div>

					{/* ........................................................................... */}

					
					<div style={{
							borderLeft: '2px inset',
							height: 'auto',
							width: '0',
							margin: '0 auto',
							// backgroundColor: 'white',
							// boxShadow: 'inset 0 0 5px white',
						}}>
					</div>

					{/* ........................................................................... */}
