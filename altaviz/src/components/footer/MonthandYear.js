import React from 'react';
import dafetite from '../../../src/dafelogoBlackTransparent.png'
import styled from 'styled-components';

const Dafe = styled.img`
	width: 60%;
	height: 70%;
	object-fit: cover;
	&:hover {
		cursor: pointer;
		transform: scale(1.1);
		transition: 0.3s;
	}
`
const DafeContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: -25px;
`

const MonthandYear = () => {
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	const dayNames = [
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	];
	const now = new Date();
	const dayOfWeek = dayNames[now.getDay()];
	const month = monthNames[now.getMonth()];
	const dayOfMonth = now.getDate();
	const year = now.getFullYear();

	return (
		<>
			<div>
				<DafeContainer
				className='paragraph'>
					<p>Developed by:</p><a href="https://dafetiteogaga.github.io/dafetite"><Dafe src={dafetite} alt='Dafe logo' /></a>
				</DafeContainer>
				<p>
					{dayOfWeek}, {month} {dayOfMonth}, {year}
				</p>
			</div>
		</>
	);
};
export default MonthandYear;
