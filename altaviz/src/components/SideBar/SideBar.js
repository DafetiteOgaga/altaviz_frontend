import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
	return (
		<aside>
			<nav>
				<ul className='sidebar-ul'>
					<li><Link to="/section1">Section1</Link></li>
					<li><Link to="/section2">Section2</Link></li>
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