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
	const dept = authData?.role
	const deptStyles = {
		color: '#999',
		pointerEvents: 'none',
		cursor: 'default'
	}
	console.log({dept})
	const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
	console.log('\napiBaseUrl url:', apiBaseUrl)
	return (
		<aside className='side-bar'>
			<nav>
				<h2>Sections</h2>
				<ul className='sidebar-ul'>
					{/* <Link to="/"><li>Home</li></Link> */}
					<Link style={dept==='custodian'?null:deptStyles} to={`/${dept}`}><li>Custodian</li></Link>
					<Link style={dept==='workshop'?null:deptStyles} to={`/${dept}`}><li>Workshop</li></Link>
					<Link style={dept==='engineer'?null:deptStyles} to={`/${dept}`}><li>Engineer</li></Link>
					<Link style={dept==='help-desk'?null:deptStyles} to={`/${dept}`}><li>Help Desk</li></Link>
					<Link style={dept==='supervisor'?null:deptStyles} to={`/${dept}`}><li>Supervisor</li></Link>
					<Link style={dept==='human-resource'?null:deptStyles} to={`/${dept}`}><li>Human Resource</li></Link>
					{!isAuthenticated ?
						(<Link to="/login"><li>Login</li></Link>) :
						(<Link onClick={logHandler} to="/"><li>Logout</li></Link>)
					}
					<Link to="/profile"><li>Profile</li></Link>
					{
					apiBaseUrl==='http://127.0.0.1:8000' &&
					<>
						<Link to="/test-auth"><li>test authentication</li></Link>
						<Link to="/test"><li>testing backend</li></Link>
					</>}
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
