import { useNavigate } from 'react-router-dom';
import React from 'react';

const toSentenceCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const useNavigation = (page) => {
	const navigate = useNavigate();
	const path = `/${page.toLowerCase()}`;
	console.log('working page:', page);
	console.log('working path:', path);
	const goToPage = (e) => {
	e.preventDefault();
	navigate(path);
	};

	return (<a href={path} onClick={goToPage}>{toSentenceCase(page)}</a>);
};

export default useNavigation;
