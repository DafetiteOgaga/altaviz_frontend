import CustomTime from "../../hooks/CustomTime";

function Inventory() {
	const name = 'Inventory';
	return (
		<>
			<div className="background-color custodian-page">
				<CustomTime name={name} />
				<div className="split-container">
					<h1>Inventory</h1>
					<div style={{
							borderLeft: '2px inset',
							height: 'auto',
							width: '0',
							margin: '0 auto',
						}}>
					</div>
					<h1>More Inventories</h1>
				</div>
			</div>
		</>
	)
}
export default Inventory;