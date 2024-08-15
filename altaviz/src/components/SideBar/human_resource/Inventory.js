import CustomTime from "../../hooks/CustomTime";
import InventoryMockData from "./inventoryData";
import "./inventory.css";
// import { useState } from "react";

function Inventory() {
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

	return (
		<div className="background-color custodian-page">
			<CustomTime name={name} />
			<h3>Inventory</h3>
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
						{components.map((component, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForComps(component[1]);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{component[0]}
									</td>
									<td style={staticStles}>
										{component[1]}
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
						})}
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
						{parts.map((component, index) => {
							// const { backgroundColor, color, border, fontWeight, status } = calculateStylesForComps(component[1]);
							const { color, status } = calculateStylesForParts(component[1]);
							return (
								<tr key={index}>
									<td style={staticStles}>
										{index + 1}
									</td>
									<td style={staticStles}>
										{component[0]}
									</td>
									<td style={staticStles}>
										{component[1]}
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
						})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Inventory;
