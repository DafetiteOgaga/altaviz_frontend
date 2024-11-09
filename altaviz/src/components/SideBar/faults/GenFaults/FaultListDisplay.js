import "./sidebar_pages.css"
import { useLocation } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import usePullCompleteList from "../../../paginationComp/usePullCompleteList";
import usePaginationWithEncryption from "../../../paginationComp/usePaginationWithEncryption";
// import FaultDetailsGenTest from "./yyyyyyyyyyyyFaultDetailsGenTest";
import FaultBarGen from "../../faults/GenFaults/FaultBarGen";
// import FaultDetailsGenTest from "./FaultDetailsGenTest";
import { AuthContext } from '../../../context/checkAuth/AuthContext';

function FaultListDisplay ({faultUrl, faultKeyContext}) {
	const [isFading, setIsFading] = useState(true);
	const dept = useLocation().pathname.split('/')[1]
	// const { SetPendingFaultsContext } = useContext(SharedDataContext);
	// const [unityPageNum, setUnityPageNum] = useState(1);
	const { authData } = useContext(AuthContext);
	const faults = usePullCompleteList(
		faultUrl, authData.id, faultKeyContext
	)

	const allFaults = faults?.pageHandler(faults?.pageNum, faults?.arrayData)
	console.log(
		'\narrayData:', faults?.arrayData,
		'\nlength.arrayData:', faults?.arrayData?.length,
		'\nfaults:', faults,
		'\nFaultListDisplay:', faults?.pageHandler(faults?.pageNum, faults?.arrayData),
		'\npage number:', faults.pageNum,
		'\nfaults.theTotalPage:', faults?.theTotalPage,
		'\nfaults.getLoading:', faults.arrayLoading,
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
						{(faults.arrayData && faults.pageNum > 0 && faults.pageNum < faults.theTotalPage) && (
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