import "./inventory.css";
import { useContext, useState, useEffect } from "react";
import { RotContext } from "../../../context/RotContext";
import useGetWithEncryption from "../../../paginationComp/useGetWithEncryption";
import { useRefreshContext } from "../../../context/RefreshContext";
import { useBackgroundUpdate } from "../../../context/BackgroundUpdates/BackgroundUpdate";
import { SentenceCaseContext } from "../../../context/SentenceCaseContext";
import CreateInventoryName from "./CreateInventoryName";
import UpdateInventoryItems from "../addItemToInventory/UpdateInventoryItems";
import { useNavigate } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl url:', apiBaseUrl)

function Inventory() {
	// const [, forceUpdate] = useReducer((x) => x + 1, 0); // Increment a dummy state to force re-render
	const navigate = useNavigate();
	const delayTime = 3000
	// const queryClient = useQueryClient();
	const { toSentenceCase } = useContext(SentenceCaseContext)
	const [updateInventory, setUpdateInventory] = useState(false);
	const { refreshIcon, handleRefresh } = useRefreshContext();
	const { encrypt, RotCipher } = useContext(RotContext)
	const [componentInventoryList, setComponentInventoryList] = useState(null);
	const [partInventoryList, setParttInventoryList] = useState(null);
	const [Comps, setComps] = useState(false);
	const [Parts, setParts] = useState(false);
	const toggleAddComps = () => setComps(!Comps);
	const toggleAddParts = () => setParts(!Parts);

	const refreshComponent = () => handleRefresh(['inventoryComponents', 'inventoryParts'])
	const inventoryComponents = useGetWithEncryption(
		`components/`,
		'inventoryComponents',
	)
	// inventoryParts
	const inventoryParts = useGetWithEncryption(
		`parts/`,
		'inventoryParts',
	)
	useEffect(() => {
		if (inventoryComponents) {
			console.log('inventoryComponents with encryption: ', inventoryComponents)
			if (inventoryComponents?.getData) {
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
	}, [inventoryParts, inventoryComponents])
	console.log('componentInventoryList:', componentInventoryList);
	console.log('partInventoryList:', partInventoryList);

	const [addCompNames, setAddCompNames] = useState(false);
	const [addPartNames, setAddPartNames] = useState(false);
	const toggleAddCompNames = () => {
		setAddCompNames(!addCompNames);
	}
	const toggleAddPartNames = () => {
		setAddPartNames(!addPartNames);
	}
	// const [refresh, setRefresh] = useState(false)
	const endpoints = [
		`inventoryComponents-/${apiBaseUrl}/components/`,
		`inventoryParts-/${apiBaseUrl}/parts/`,
	];
	useBackgroundUpdate(endpoints, updateInventory).then((responses) => {
		console.log('Fetched data:'.repeat(15), responses);
		if (responses) {
			const delay = setTimeout(() => {
				navigate('/blank', {state: {currentPage: '/inventory', time: 250}})
			}, [delayTime])
			return () => clearTimeout(delay);
		}
	}).catch((error) => {
		console.error('Error during background update:', error);
	});
	useEffect(() => {
		if (updateInventory) {
			console.log('updateInventory:'.repeat(5), updateInventory)
			setUpdateInventory(false)
		}
	}, [updateInventory])
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
					<h4 style={{marginTop: '0'}}>Components</h4>
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
						(componentInventoryList?.map?.((component, index) => {
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
						<h5 style={addCompNames ? {...activeStyles} : {}}  onClick={toggleAddCompNames}>{addCompNames ? 'Close Form' : 'New Component Name'}</h5>
					</div>
					<div>
						{addCompNames && (
							<>
								{/* <hr /> */}
								<CreateInventoryName inventoryName='component' setUpdateInventory={setUpdateInventory} delayTime={delayTime} />
								{/* <AddComponentName /> */}
								{/* <LogFault childList={childList} /> */}
							</>
						)}
					</div>
					<hr style={{width: '80%'}} />
					<div className="custum-button">
						{/* update component form */}
						<h5
						style={Comps ?
							{...activeStyles} :
							{}}
						onClick={toggleAddComps}>{Comps ?
							'Close Form'
							: 'Update Components'}
						</h5>
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
				<h4 style={{marginTop: '0'}}>Parts</h4>
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
						{partInventoryList && (partInventoryList?.map?.((part, index) => {
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
						<h5 style={addPartNames ? {...activeStyles} : {}}  onClick={toggleAddPartNames}>{addPartNames ? 'Close Form' : 'New Part Name'}</h5>
					</div>
					<div>
						{addPartNames && (
							<>
								{/* <hr /> */}
								<CreateInventoryName inventoryName='part' setUpdateInventory={setUpdateInventory} delayTime={delayTime} />
								{/* <AddPartName /> */}
								{/* <LogFault childList={childList} /> */}
							</>
						)}
					</div>
					<hr style={{width: '80%'}} />
					<div className="custum-button">

						{/* update part form */}
						<h5
						style={Parts ?
							{...activeStyles} :
							{}}
						onClick={toggleAddParts}>{Parts ?
							'Close Form':
							'Update Parts'}
						</h5>
					</div>
				</div>
			</div>
			{Comps && (<UpdateInventoryItems itemName='components' setUpdateInventory={setUpdateInventory} delayTime={delayTime} />)}
			{Parts && (<UpdateInventoryItems itemName='parts' setUpdateInventory={setUpdateInventory} delayTime={delayTime} />)}
			<hr style={{width: '80%', marginTop: '5%'}} />
			<div>
				<h5 style={{margin: '0'}}>Note:</h5>
				<table border="1" style={legendStyle.table}>
					<thead>
						<tr>
							<th>Components</th>
							<th>Part</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<table border="1" style={legendStyle.table}>
									<thead>
										<tr>
											<th style={legendStyle.headAndData}>Range</th>
											<th style={legendStyle.headAndData}>Status</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={legendStyle.headAndData}>{'50 >'}</td>
											<td style={{...legendStyle.headAndData, color: 'green' }}>Available</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>15 - 49</td>
											<td style={{...legendStyle.headAndData, color: 'blue' }}>Low</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>1 - 14</td>
											<td style={{...legendStyle.headAndData, color: 'red' }}>Critical</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>0</td>
											<td style={{...legendStyle.headAndData, color: 'gray' }}>Not Available</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td>
								<table border="1" style={legendStyle.table}>
									<thead>
										<tr>
											<th style={legendStyle.headAndData}>Range</th>
											<th style={legendStyle.headAndData}>Status</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={legendStyle.headAndData}>{'10 >'}</td>
											<td style={{...legendStyle.headAndData, color: 'green' }}>Available</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>5 - 9</td>
											<td style={{...legendStyle.headAndData, color: 'blue' }}>Low</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>1 - 4</td>
											<td style={{...legendStyle.headAndData, color: 'red' }}>Critical</td>
										</tr>
										<tr>
											<td style={legendStyle.headAndData}>0</td>
											<td style={{...legendStyle.headAndData, color: 'gray' }}>Not Available</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
			<hr style={{width: '80%'}} />
		</div>
	);
}
export default Inventory;

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

const activeStyles = {
	backgroundColor: '#8A8A93',
}
const buttonStyle = {
	paddingTop: '2rem',
}
const staticStles = {
	border: '1px solid',
	padding: '0.5rem',
	borderBottom: '2px solid',
	textWrap: 'nowrap',
};
const legendStyle = {
	table: {
		border: '1px solid black',
		borderCollapse: 'collapse',
	},
	headAndData: {
		padding: '4px',
		textAlign: 'center',
	}
}
