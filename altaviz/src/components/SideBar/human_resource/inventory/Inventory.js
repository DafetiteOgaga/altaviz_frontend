import CustomTime from "../../../hooks/CustomTime";
import InventoryMockData from "./inventoryData";
import "./inventory.css";
import { useContext, useState } from "react";
import { FetchContext } from "../../../context/FetchContext";
// import { useState } from "react";
import AddComponentName from "./AddComponentName";
import AddPartName from "./AddPartName";

function Inventory() {
	// const { fetchData, fetchPost, fetchPut, fetchDelete } = useContext(FetchContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const {
		data: componentsData,
		loading: componentsLoading,
		error: componentsError
	} = useGetDataAPI('http://127.0.0.1:8000/components/');
	const {
		data: partsData,
		loading: partsLoading,
		error: partsError
	} = useGetDataAPI('http://127.0.0.1:8000/parts/');
	const name = 'Inventory';
	const { components, parts } = InventoryMockData();

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
	console.log('componentsData:', componentsData);
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
	return (
		<div className="background-color custodian-page">
			<CustomTime name={name} />
			<div>
				<h3>Inventory</h3>
				<div className="custum-button">
					<h5 style={addCompNames ? {...activeStyles} : {}}  onClick={toggleAddCompNames}>{addCompNames ? 'Close Inventory Component Names Form' : 'Add New Component Name'}</h5>
					<h5 style={addPartNames ? {...activeStyles} : {}}  onClick={toggleAddPartNames}>{addPartNames ? 'Close Inventory Part Names Form' : 'Add New Part Name'}</h5>
				</div>
			</div>
			<div>
				{addCompNames && (
					<>
						{/* <hr /> */}
						<AddComponentName />
						{/* <LogFault childList={childList} /> */}
					</>
				)}
				{addPartNames && (
					<>
						{/* <hr /> */}
						<AddPartName />
						{/* <LogFault childList={childList} /> */}
					</>
				)}
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
						{componentsData && (componentsData.map((component, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForComps(component.quantity);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{component.name}
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
						{partsData && (partsData.map((part, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForParts(part.quantity);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{part.name}
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
				</div>
			</div>
		</div>
	);
}

export default Inventory;
