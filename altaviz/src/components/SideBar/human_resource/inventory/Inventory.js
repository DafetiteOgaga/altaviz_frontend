import "./inventory.css";
import { useContext, useState, useEffect } from "react";
// import AddComponentName from "./AddComponentName";
// import AddPartName from "./AddPartName";
import { RotContext } from "../../../context/RotContext";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
// import { FaSync, FaSpinner } from 'react-icons/fa';
import { useRefreshContext } from "../../../context/RefreshContext";
// import { useNavigate}
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import AddInventoryName from "./AddInventoryName";
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

function Inventory() {
	const { toSentenceCase } = useContext(SentenceCaseContext)
	// const currentPage = useLocation().pathname.split('/')[1];
	// const refreshPage = useNavigate()
	// const [refreshValue, setRefreshValue] = useState(false);
	const { refreshIcon, handleRefresh } = useRefreshContext();
	const { encrypt, RotCipher } = useContext(RotContext)
	const [componentInventoryList, setComponentInventoryList] = useState(null);
	const [partInventoryList, setParttInventoryList] = useState(null);
	// const [refreshing, setRefreshing] = useState(false);
	// const [isRefresh, setIsRefresh] = useState(false)
	// const refreshChildComponent = () => {
		
	// }
	// useEffect(() => {
	// 	if (refreshValue) {
	// 		handleRefreshAll()
	// 		refreshPage('/success')
	// 		const delay = setTimeout(() => {
	// 			refreshPage(`/${currentPage}`)
	// 			setRefreshValue(false)
	// 		});
	// 		return () => clearTimeout(delay);
	// 	}
	// }, [refreshValue])

	// get setup
	// inventoryComponents
	const inventoryComponents = useGetWithEncryption(
		`components/`,
		'inventoryComponents',
		// isRefresh,
	)
	useEffect(() => {
		if (inventoryComponents) {
			console.log('inventoryComponents with encryption: ', inventoryComponents)
			if (inventoryComponents?.getData) {
				// if (inventoryComponents.getData?.exist) {
				// 	console.log(
				// 		'inventoryComponents response:'.toUpperCase(),
				// 		inventoryComponents.getData.exist
				// 	)
				// } else {
					// creates and/or updates the localStorage
					const data = inventoryComponents.getData
					const encodedData = RotCipher(JSON.stringify(data), encrypt)
					localStorage.setItem('inventoryComponents', encodedData)
					setComponentInventoryList(data)
					console.log('setting/updating'.toUpperCase())
				// }
			} else {
				// gets updates from localStorage
				setComponentInventoryList(inventoryComponents.localDataStoreVar)
				console.log('retreiving'.toUpperCase())
			}
			// setComponentInventoryList(inventoryComponents.localDataStoreVar)
		}
	}, [inventoryComponents])
	console.log('componentInventoryList:', componentInventoryList);

	// inventoryParts
	const inventoryParts = useGetWithEncryption(
		`parts/`,
		'inventoryParts',
		// isRefresh,
	)
	useEffect(() => {
		if (inventoryParts) {
			console.log('inventoryParts with encryption: ', inventoryParts)
			if (inventoryParts.getData) {
				// creates and/or updates the localStorage
				const data = inventoryParts.getData
				const encodedData = RotCipher(JSON.stringify(data), encrypt)
				localStorage.setItem('inventoryParts', encodedData)
				setParttInventoryList(data)
				console.log('setting/updating'.toUpperCase())
				// handleRefresh(['inventoryComponents', 'inventoryParts'])
			} else {
				// gets updates from localStorage
				setParttInventoryList(inventoryParts.localDataStoreVar)
				console.log('retreiving'.toUpperCase())
			}
			// setComponentInventoryList(inventoryParts.localDataStoreVar)
		}
	}, [inventoryParts])
	console.log('partInventoryList:', partInventoryList);
	// refreshes the items
	const refreshComponent = () => handleRefresh(['inventoryComponents', 'inventoryParts'])
	const calculateStylesForComps = (value) => {
		if (value === 0) {
			return {
				color: 'gray',
				status: 'Not Available',
			};
		} else if (value >= 50) {
			return {
				// backgroundColor: '',
				color: 'green',
				// border: '',
				// fontWeight: 'bold',
				status: 'Available',
			};
		} else if (value >= 15 && value < 50) {
			return {
				// backgroundColor: 'rgba(255, 255, 0, 0.6)',
				// color: 'rgba(255, 255, 0, 0.6)',
				color: 'blue',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Low',
			};
		} else if (value < 15) {
			return {
				// backgroundColor: 'rgba(255, 255, 0, 0.6)',
				// color: 'rgba(255, 255, 0, 0.6)',
				color: 'red',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Critical',
			};
		} else {
			return {
				// backgroundColor: 'red',
				color: '',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Not Available',
			};
		}
	};
	const calculateStylesForParts = (value) => {
		if (value === 0) {
			return {
				color: 'gray',
				status: 'Not Available',
			};
		} else if (value >= 10) {
			return {
				// backgroundColor: '',
				color: 'green',
				// border: '',
				// fontWeight: 'bold',
				status: 'Available',
			};
		} else if (value >= 5 && value < 10) {
			return {
				// backgroundColor: 'rgba(255, 255, 0, 0.6)',
				// color: 'rgba(255, 255, 0, 0.6)',
				color: 'blue',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Low',
			};
		} else if (value < 5) {
			return {
				// backgroundColor: 'rgba(255, 255, 0, 0.6)',
				// color: 'rgba(255, 255, 0, 0.6)',
				color: 'red',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Critical',
			};
		} else {
			return {
				// backgroundColor: 'red',
				color: '',
				// border: '1px solid',
				// fontWeight: 'bold',
				status: 'Not Available',
			};
		}
	};
	const staticStles = {
		border: '1px solid',
		padding: '0.5rem',
		borderBottom: '2px solid',
		textWrap: 'nowrap',
	};
	// console.log('componentsData:', componentsData);
	const [addCompNames, setAddCompNames] = useState(false);
	const [addPartNames, setAddPartNames] = useState(false);
	const toggleAddCompNames = () => {
		setAddCompNames(!addCompNames);
	}
	const toggleAddPartNames = () => {
		setAddPartNames(!addPartNames);
	}
	const activeStyles = {
		backgroundColor: '#8A8A93',
	}
	const buttonStyle = {
		paddingTop: '2rem',
	}
	// console.log('refreshvalue:', refreshValue)
	return (
		<div className="background-color custodian-page">
			{/* <CustomTime name={name} /> */}
			<div>
				{/* <h3>Inventory</h3> */}
				<h3 style={{display: 'flex', gap: '0.3rem'}}>
					<span>
						Inventory
					</span>
					<div onClick={refreshComponent}>
						{refreshIcon}
					</div>
				</h3>
			</div>
			<div className="split-container">
				<div className="inventory-list">
					<h4>Components</h4>
					{/* <hr/> */}
					{/* <table style={{borderCollapse: 'collapse'}}> */}
					<table>
						<thead>
							<tr>
								<th style={staticStles}>S/N</th>
								<th style={staticStles}>Component</th>
								<th style={staticStles}>Quantity</th>
								<th style={staticStles}>Status</th>
							</tr>
						</thead>
						<tbody>
						{componentInventoryList &&
						(componentInventoryList.map((component, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForComps(component.quantity);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{toSentenceCase(component.name)}
									</td>
									<td style={staticStles}>
										{component.quantity}
									</td>
									<td
									style={{
										// backgroundColor,
										color,
										fontWeight: 'bold',
										...staticStles,
									}}
									>
										({status})
									</td>
								</tr>
							);
						}))}
						</tbody>
					</table>
					<div
					style={buttonStyle}
					className="custum-button">
						<h5 style={addCompNames ? {...activeStyles} : {}}  onClick={toggleAddCompNames}>{addCompNames ? 'Close Form' : 'Add New Component Name'}</h5>
					</div>
					<div>
						{addCompNames && (
							<>
								{/* <hr /> */}
								<AddInventoryName inventoryName='component' />
								{/* <AddComponentName /> */}
								{/* <LogFault childList={childList} /> */}
							</>
						)}
					</div>
				</div>

				<div
					style={{
						borderLeft: '2px inset',
						height: 'auto',
						width: '0',
						margin: '0 auto',
					}}
				></div>

				<div className="inventory-list">
				<h4>Parts</h4>
					{/* <h4>Parts</h4> */}
					{/* <hr/> */}
					<table>
						<thead>
							<tr>
								<th style={staticStles}>S/N</th>
								<th style={staticStles}>Parts</th>
								<th style={staticStles}>Quantity</th>
								<th style={staticStles}>Status</th>
							</tr>
						</thead>
						<tbody>
						{partInventoryList && (partInventoryList.map((part, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForParts(part.quantity);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{toSentenceCase(part.name)}
									</td>
									<td style={staticStles}>
										{part.quantity}
									</td>
									<td
									style={{
										// backgroundColor,
										color,
										fontWeight: 'bold',
										...staticStles,
									}}
									>
										({status})
									</td>
								</tr>
							);
						}))}
						</tbody>
					</table>
					<div
					style={buttonStyle}
					className="custum-button">
						<h5 style={addPartNames ? {...activeStyles} : {}}  onClick={toggleAddPartNames}>{addPartNames ? 'Close Form' : 'Add New Part Name'}</h5>
					</div>
					<div>
						{addPartNames && (
							<>
								{/* <hr /> */}
								<AddInventoryName inventoryName='part' />
								{/* <AddPartName /> */}
								{/* <LogFault childList={childList} /> */}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Inventory;
