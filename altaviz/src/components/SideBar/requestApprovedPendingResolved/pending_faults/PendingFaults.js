import "../resolveAndPending.css"
import { useState } from "react";
import { Link } from "react-router-dom"

function PendingFaults () {
	const pendingFaults = 4;
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const toggleDropdown = (e) => {
		e.preventDefault();
		setIsDropdownVisible(!isDropdownVisible);
	}
	const closeDropdown = () => {
		if (isDropdownVisible) {
			setIsDropdownVisible(false);
		}
	}
	return (
		<>
			{<div onClick={closeDropdown} className="pending-faults">
				<p><strong>Pending Fault: </strong></p>
					{pendingFaults ? (
						<>
							<p>{pendingFaults}</p>
							<p>
								<a href="/fault-details/" onClick={toggleDropdown}> View
								</a>
							</p>
						</>
						) : (<p>No Pending Fault</p>)}
				{isDropdownVisible && (
				<div className="dropdown-menu pending-positn" id="dropdown-position">
					<ul>
						<li><Link to="/fault-details/1">Page 1</Link></li>
						<li><Link to="/fault-details/2">Page 2</Link></li>
						<li><Link to="/fault-details/3">Page 3</Link></li>
					</ul>
				</div>
				)}
			</div>}
		</>
	)
}
export default PendingFaults;