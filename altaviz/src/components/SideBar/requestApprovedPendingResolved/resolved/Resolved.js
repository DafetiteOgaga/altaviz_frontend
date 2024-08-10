import "../resolveAndPending.css"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Resolved ({text}) {
	const confirmResolve = 3;
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	useEffect(() => {
		if (isDropdownVisible && text !== "Kindly Confirm Resolution:") {
			const resolvedDropdowns = document.querySelectorAll('#dropdown-position');
			resolvedDropdowns.forEach(identifier => {
				// console.log('old id attr if:', identifier);
				identifier.setAttribute('id', 'dropdownposition')
				// const changeAttr = identifier.setAttribute('id', 'dropdownposition')
				// console.log('new id attr if:', changeAttr)
				// return changeAttr;
		})} else {
			const resolvedDropdowns = document.querySelectorAll('#dropdownposition');
            resolvedDropdowns.forEach(identifier => {
				// console.log('old id attr else:', identifier);
                // const changeAttr = identifier.setAttribute('id', 'dropdown-position');
				identifier.setAttribute('id', 'dropdown-position');
				// console.log('new id attr else:', changeAttr)
                // return identifier;
		})}
	}, [isDropdownVisible, text])
	const toggleDropdown = (e) => {
		e.preventDefault();
		setIsDropdownVisible(!isDropdownVisible);
	}
	const closeDropdown = () => {
		if (isDropdownVisible) {
			setIsDropdownVisible(false);
		}
	}
	// console.log('id array:', document.querySelectorAll('#dropdown-position'));
	// console.log('prop message from parent:', text)
	// console.log('prop message from parent:', text.prop)
	return (
		<>
			{<div onClick={closeDropdown} className="pending-faults">
				<p><strong>{text} </strong></p>
					{confirmResolve ? (
						<>
							<p>{confirmResolve}</p>
							<p>
								<a href="/fault-details/" onClick={toggleDropdown}> View
								</a>
							</p>
						</>
					) : (<p>All Faults Resolved</p>)}
				{isDropdownVisible && (
				<div className="dropdown-menu resolved-positn" id="dropdown-position">
					<ul>
						<li>Dispender issue <Link className="" to="/fault-details/1">Confirm</Link></li>
						<li>Card Reader issue <Link className="" to="/fault-details/2">Confirm</Link></li>
						<li>Cash Jam issue <Link className="" to="/fault-details/3">Confirm</Link></li>
					</ul>
				</div>
				)}
			</div>}
		</>
	)
}
export default Resolved;