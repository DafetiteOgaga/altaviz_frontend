import { useState, useEffect, useContext, useRef } from "react";
import { FetchContext } from "../context/FetchContext";
import { RotContext } from "../context/RotContext";

const baseUrl = 'http://127.0.0.1:8000';
function usePullCompleteList(
	urlPath, id,
	variableContext,
	triggger=false,
	itemsPerPage=10,
	// type='notification'
) {
	const [pageNum, setPageNum] = useState(1);
	const [theTotalPage, setTheTotalPage] = useState(null);
	const { encrypt, decrypt, RotCipher } = useContext(RotContext);
	const { useGetDataAPI } = useContext(FetchContext);
	const [arrayData, setArrayData] = useState(null)
	const [arrayError, setArrayError] = useState(null)
	const [getTrigger, setGetTrigger] = useState(false);

	console.log('\nendpoint:', `${baseUrl}/${urlPath}/${id}/`)
	const { getData:listData, getLoading:arrayLoading, getError:listError } = useGetDataAPI(
		`${baseUrl}/${urlPath}/${id}/`, getTrigger
	);
	console.log('start ######################'.toUpperCase())

	useEffect(() => {
		// check and fetch from local storage if the data exist
		let decodedData;
		decodedData = localStorage.getItem(variableContext)
		if (decodedData&&!getTrigger&&!triggger) {
			console.log('from local storage  ############'.toUpperCase())
			decodedData = RotCipher(decodedData, decrypt)
			decodedData = JSON.parse(decodedData)
			setArrayData(decodedData);

		} else setGetTrigger(true)
	}, [getTrigger, urlPath, id, variableContext])

	// fetch complete data from server
	useEffect(() => {
		if (listData||listError) {
			console.log('fetch from server direct  ############'.toUpperCase())
			if (listData) {
				setArrayData(listData)
				let encodedData = RotCipher(JSON.stringify(listData), encrypt)
				localStorage.setItem(variableContext, encodedData)
			}
			else if (listError) {setArrayError(listError)}
			setGetTrigger(false)
		}
	}, [listData, listError])

	console.log({listData, listError, arrayData, arrayLoading, arrayError})

	// sets navigation
	useEffect(() => {
		if (arrayData?.length) {
			setTheTotalPage(Math.ceil(arrayData.length / itemsPerPage))
			console.log('total pages:', theTotalPage)

		}
	}, [arrayData])
	if (theTotalPage) console.log({theTotalPage})

	// processes items into pages to be served
	const pageHandler = (page, localList) => {
		if (page < 1 || page > theTotalPage) {
			return [];
		}
		const start = (page - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return localList.slice(start, end);
	};
	console.log(
		'\nlistHandler:', pageHandler(pageNum, arrayData),
		'\npageNum:', pageNum,
	)
	console.log('end ######################'.toUpperCase())
	return {
		arrayData, arrayLoading, arrayError,
		setPageNum, pageNum,
		theTotalPage, setTheTotalPage,
		itemsPerPage,
		pageHandler,
	}
}

export default usePullCompleteList;
