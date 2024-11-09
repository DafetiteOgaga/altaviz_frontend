// import useFetch from '../hooks/useFetch';
// import logo from '../../logo/altaviz_logo.png';
// import Navigation from './Navigation';
import "./announcement.css"
import { useEffect, useState } from "react";

function Announcements() {
	const [ ind, setInd ] = useState(0);
	const [ slide, setSlide ] = useState(false);
	const announcements = [
		`Congratulations to Altaviz Support Limited and
		Its entire staff on the acquisition of 120 of
		Its Brand NEW GRG ATMs and support by WEMA BANK.`,

		`We wish to celerate Banji on his Birthday today
		wish him Good and vibrant health 🎂`,

		`The family of Fadahunsi just welcome a beautiful,
		baby girl yesterday 20.03.2024. On behalf of Altaviz
		Support Limited, we say Congratulations! 🎉`,

		`Wedding bells 🎊💍 Miss Cynthia and Engineer David
		are set to tie the knot and become one on 04.12.2024
		Save the date, and engineers in the region who are
		free should endeavor to attend. Congratulations,
		Engineer.`,
	]
	useEffect(() => {
		// console.log('222222222222222')
		// console.log('initial slide state:', slide)
		const announcement = () => {
			// console.log('55555555555555555')
			setSlide(true);
			setTimeout(() => {
				setInd((ind + 1) % announcements.length)
				setSlide(false);
			}, 500);
			
			
			// console.log('66666666666666666')
			// console.log('new index:', (ind + 1) % announcements.length)
		}
		const interval = setInterval(() => {
			announcement()
		}, 5000)
		// setSlide(false)
		// console.log('3333333333333')
		// setSlide(false)
		return () => clearInterval(interval);
	}, [ind, announcements.length])
	// console.log('11111111111111')
	return (
		<>
			<div className="announcement-bk">
				<h2>Updates!</h2>
				<p className={slide ? "slide" : ""}>
					{announcements[ind]}
				</p>
			</div>
		</>
	)
}

export default Announcements;
