const setKeyList = (item) => {
	const keyList = localStorage.getItem('altavizKeys');
	if (!keyList) {
		localStorage.setItem('altavizKeys', JSON.stringify([item]));
	} else {
		const updatedList = JSON.parse(keyList);
		if (!updatedList.includes(item)) updatedList.push(item);
		localStorage.setItem('altavizKeys', JSON.stringify(updatedList));
	}
}

function setKeyToLocalStorage (key, value) {
	localStorage.setItem(key, value);
	setKeyList(key);
}
export {setKeyToLocalStorage};

function setListToLocalStorage (list) {
	for (let i; i < list.length; i++) {
		localStorage.setItem(list[0], list[1]);
		setKeyList(list[0]);
	}
}
export {setListToLocalStorage};
