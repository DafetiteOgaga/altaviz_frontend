// import useFetch from '../hooks/useFetch';
import logo from '../../logo/altaviz_logo.png';
import Navigation from './Navigation';

function Header() {
	return (
		<header>
			<div className='logo-nav'>
				<img src={logo} alt='alterviz logo' />
				<Navigation />
			</div>
			<h1 className='nav-h1'>searchbar goes here</h1>
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