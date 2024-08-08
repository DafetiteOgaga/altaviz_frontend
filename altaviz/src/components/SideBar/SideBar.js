import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css"

function Sidebar() {
	return (
		<aside className='side-bar'>
			<nav>
				<h2>Sections</h2>
				<ul className='sidebar-ul'>
					<Link to="/"><li>Home</li></Link>
					<Link to="/custodian"><li>Custodian</li></Link>
					<Link to="/workshop"><li>Workshop</li></Link>
					<Link to="/engineer"><li>Engineer</li></Link>
					<Link to="/help-desk"><li>Help Desk</li></Link>
					<Link to="/supervisor"><li>Supervisor</li></Link>
					<Link to="/human-resource"><li>Human Resource</li></Link>
					<Link to="/test"><li>testing backend</li></Link>
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