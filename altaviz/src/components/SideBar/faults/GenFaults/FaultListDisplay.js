import "./sidebar_pages.css"
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import usePullCompleteList from "../../../paginationComp/usePullCompleteList";
// import usePaginationWithEncryption from "../../../paginationComp/usePaginationWithEncryption";
// import FaultDetailsGenTest from "./yyyyyyyyyyyyFaultDetailsGenTest";
import FaultBarGen from "../../faults/GenFaults/FaultBarGen";
// import FaultDetailsGenTest from "./FaultDetailsGenTest";
import { AuthContext } from '../../../context/checkAuth/AuthContext';
// import { RotContext } from "../../../context/RotContext";

function FaultListDisplay ({faultUrl, faultKeyContext}) {
	// const {encrypt, decrypt, RotCipher} = useContext(RotContext)
	// const [, setNewData] = useState(true)
	const [isFading, setIsFading] = useState(true);
	const dept = useLocation().pathname.split('/')[1]
	// const { SetPendingFaultsContext } = useContext(SharedDataContext);
	// const [unityPageNum, setUnityPageNum] = useState(1);
	const { authData } = useContext(AuthContext);

	// const [newData, setNewData] = useState(false)
	// console.log('1111111111111111111')
	let faults = usePullCompleteList(
		faultUrl, authData.id, faultKeyContext
	)
	// console.log('faults.freshPull.current:', faults.freshPull.current)
	// if (faults.freshPull.current) {
	// 	console.log(
	// 	'\n555555555555555555555555555555555555555555555555',
	// 	'\n555555555555555555555555555555555555555555555555',
	// 	'\n555555555555555555555555555555555555555555555555',
	// 	)
	// 	faults = localStorage.getItem(faultKeyContext)
	// 	faults = RotCipher(faults, decrypt)
	// 	faults = JSON.parse(faults)
	// }
	// console.log({faults})
	// useEffect(() => {
	// 	console.log(
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 	)
	// 	console.log('faults.freshPull.current:', faults.freshPull.current)

	// 	if (faults.freshPull.current
	// 		// && authData.role === "engineer"
	// 	) {
	// 		console.log('unmounting ...')
	// 		setNewData(false); // Unmount the component
	// 		setTimeout(() => {
	// 			console.log('re-mounting ...')
	// 			setNewData(true); // Remount the component after a brief delay
	// 		}, 50); // Delay can be adjusted if needed
	// 		faults.freshPull.current = false;
	// 	}
	// }, [faults.freshPull.current])
	// console.log('faults.freshPull.current:', faults.freshPull.current)

	// if (faults.freshPull.current
	// 	// && authData.role === "engineer"
	// ) {
	// 	console.log(
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 		'\n555555555555555555555555555555555555555555555555',
	// 	)
	// 	console.log('unmounting ...')
	// 	setNewData(false); // Unmount the component
	// 	setTimeout(() => {
	// 		console.log('re-mounting ...')
	// 		setNewData(true); // Remount the component after a brief delay
	// 	}, 50); // Delay can be adjusted if needed
	// 	faults.freshPull.current = false;
	// }
	const allFaults = faults?.pageHandler(faults?.pageNum, faults?.arrayData)
	console.log(
		'\narrayData:', faults?.arrayData,
		'\nlength.arrayData:', faults?.arrayData?.length,
		'\nfaults:', faults,
		'\nFaultListDisplay:', faults?.pageHandler(faults?.pageNum, faults?.arrayData),
		'\npage number:', faults.pageNum,
		'\nfaults.theTotalPage:', faults?.theTotalPage,
		'\nfaults.getLoading:', faults.arrayLoading,
		// '\nfaults.freshPull:', faults.freshPull,
		// '\nfaults.freshPull.current:', faults.freshPull.current,
	)
	// const [isFading, setIsFading] = useState(false);
	useEffect(() => {
		if (allFaults.length) {
			const fadein = setTimeout(() => {
				setIsFading(false);
			}, 300);
			return () => {
				clearTimeout(fadein);
			};
		}
	}, [allFaults])
	const transitStyles = {
		transition: 'opacity 0.3s ease-in-out',
		opacity: isFading ? 0 : 1,
		pointerEvents: isFading ? 'none' : 'auto',
	}
	console.log({dept})
	// const emptyList = []
	// console.log('\nemptylist.length?', !!emptyList.length)
	return (
		<>
		{(!faults.arrayData && faults.arrayLoading) ?
			(<p style={{
				padding: '1rem',
				color: '#888',
				fontSize: '1.2rem',
				textAlign: 'center',
			}}>Loading List ...</p>) :
			(allFaults.length ?
			<>
				<div style={transitStyles}>
					<FaultBarGen allFaults={allFaults} page={faults.pageNum} type={dept} />
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '1rem',
						paddingBottom: '1rem',
						}}>
						{(faults.arrayData && faults.pageNum > 1) && (
							<button onClick={() => faults.setPageNum(faults.pageNum - 1)}>
								Previous
							</button>
						)}
						{(faults.arrayData && (faults.pageNum > 0) && (faults.pageNum < faults.theTotalPage)) && (
							<button onClick={() => {
								// faults.handleNextPage();
								faults.setPageNum(faults.pageNum + 1);
								}}>
								Next
							</button>
						)}
					</div>
				</div>
			</>:null)}
		</>)
}
export default FaultListDisplay;