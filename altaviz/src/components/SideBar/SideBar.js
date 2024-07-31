import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<aside>
			<nav>
				<h2 style={{paddingLeft: '40px'}}>Sections</h2>
				<ul className='sidebar-ul'>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/custodian">Custodian</Link></li>
					<li><Link to="/workshop">Workshop</Link></li>
					<li><Link to="/engineer">Engineer</Link></li>
					<li><Link to="/help-desk">Help Desk</Link></li>
					<li><Link to="/supervisor">Supervisor</Link></li>
					<li><Link to="/human-resource">Human Resource</Link></li>
					<li><Link to="/test">testing backend</Link></li>
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;


// import useFetch from '../../hooks/useFetch';
// function SideBar() {
// 	const { data, loading, error } = useFetch('http://localhost:8000');

// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error: {error}</p>;
// 	console.log(data);

// 	return (
// 			<h1>SideBar</h1>
// 	);
// }

// export default SideBar;