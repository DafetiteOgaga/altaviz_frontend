import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./sidebar.css"
import { LoginContext } from '../../context/loginAuth/LoginOutContext';
import { AuthContext } from '../../context/checkAuth/AuthContext';

function Sidebar() {
	const redirectTo = useNavigate();
	const { Logout } = useContext(LoginContext);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { authData } = useContext(AuthContext)
	useEffect(() => {
		if (authData) setIsAuthenticated(true);
		else setIsAuthenticated(false);
	}, [authData])
	const logHandler = async () => {
        const result = await Logout();
        if (result.success) {
			console.log('Logout:', result.success);
            redirectTo('/');  // Redirect to login page after logout
        } else {
            console.error('Logout failed');
        }
    };
	return (
		<aside className='side-bar'>
			<nav>
				<h2>Sections</h2>
				<ul className='sidebar-ul'>
					{/* <Link to="/"><li>Home</li></Link> */}
					<Link to="/custodian"><li>Custodian</li></Link>
					<Link to="/workshop"><li>Workshop</li></Link>
					<Link to="/engineer"><li>Engineer</li></Link>
					<Link to="/help-desk"><li>Help Desk</li></Link>
					<Link to="/supervisor"><li>Supervisor</li></Link>
					<Link to="/human-resource"><li>Human Resource</li></Link>
					{!isAuthenticated ?
					(<Link to="/login"><li>Login</li></Link>) :
					(<Link onClick={logHandler} to="/"><li>Logout</li></Link>)}
					<Link to="/profile"><li>Profile</li></Link>
					{/* <Link to="/profile"><li>Profile</li></Link> */}
					<Link to="/test-auth"><li>test authentication</li></Link>
					<Link to="/test"><li>testing backend</li></Link>
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
