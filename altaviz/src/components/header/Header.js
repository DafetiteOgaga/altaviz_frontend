// import useFetch from '../hooks/useFetch';
import logo from '../../logo/altaviz_logo.png';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import "./header.css"

function Header() {
	const navigateTo = useNavigate();
	return (
		<header>
			<div className='logo-nav'>
				<a
				href='/'
				onClick={(e) => {
					e.preventDefault();
					navigateTo('/');
				}}
				>
					<img src={logo} alt='alterviz logo' />
				</a>
				<Navigation />
			</div>
			<h4>searchbar goes here</h4>
			{/* <span>header end</span> */}
		</header>
	)
	// const { data, loading, error } = useFetch('http://localhost:8000');

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	// console.log(data);

	// return (
	// 		<h1 className='three'>{data ? data['home'] : 'loading ...'}</h1>
	// );
}

export default Header;
