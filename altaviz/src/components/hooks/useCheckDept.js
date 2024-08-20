import { useEffect, useState } from "react";

function useCheckDept(componentPage) {
	const [checkCustodian, setCheckCustodian] = useState(false);
	const [isCustodianPage, setIsCustodianPage] = useState(false);
		// console.log('checkCustodian before:', checkCustodian);
		useEffect(() => {
			const checkUrl = componentPage;
			// console.log('checkUrl:', checkUrl);
			if (checkUrl.includes('custodian')) {
				setCheckCustodian(true);
				setIsCustodianPage(true);
			} else {
				setCheckCustodian(false);
				setIsCustodianPage(false);
			}
		}, [componentPage])
	return { checkCustodian, isCustodianPage };
}

export default useCheckDept;