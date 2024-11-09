import { createContext, useState, useEffect } from "react";

export const TimeDifferenceContext = createContext();

export const TimeDifferenceProvider = ({ children }) => {
	function TimeDifference({date1, date2 = new Date()}) {
		date1 = new Date(date1);
		date2 = new Date(date2);
		console.log('date1 arg:', date1)
		const differenceBetweenDates = date2 - date1;
		// console.log('differenceBetweenDates:', differenceBetweenDates)
		const hoursBetweenDates = differenceBetweenDates / (1000 * 60 * 60);
		const daysBetweenDates = differenceBetweenDates / (1000 * 60 * 60 * 24);
		const wholeDaysBetweenDates = Math.ceil(daysBetweenDates);
		const RDDaysBetweenDates = Math.floor(daysBetweenDates);
		const RDhoursBetweenDates = Math.floor(hoursBetweenDates);
		const wholeHoursBetweenDates = Math.ceil(hoursBetweenDates);

		// console.log('wholeDaysToCurrentDay:', wholeDaysToCurrentDay)
		return { wholeDaysBetweenDates, wholeHoursBetweenDates, RDDaysBetweenDates, RDhoursBetweenDates }
	}
	return (
		<TimeDifferenceContext.Provider value={{TimeDifference}}>
            {children}
        </TimeDifferenceContext.Provider>
	)
}