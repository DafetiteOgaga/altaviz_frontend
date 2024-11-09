function listHandler(listValue) {
	let newList = [];
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		// console.log('title:', listValue[i].title.name);
		newList.push({
			title: listValue[i].title.name,
			id: listValue[i].id,
		});
	}
	// console.log('summarized list:', newList);
	return newList;
}
export default listHandler;

function listHandle(listValue) {
	let newList = [];
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		// console.log('title:', listValue[i].title.name);
		newList.push({
			title: listValue[i].title.name,
			id: listValue[i].id,
		});
	}
	// console.log('summarized list:', newList);
	return newList;
}
export { listHandle };

function requestHandler(listValue) {
	let newList = [];
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		console.log('listValue:', listValue[i]);
		newList.push({
			title: `${(listValue[i].quantityRequested)?listValue[i].name.name:listValue[i].name} : ${(listValue[i].quantityRequested)?listValue[i].quantityRequested:listValue[i].quantity}`,
			id: listValue[i].id,
		});
	}
	// console.log('summarized list:', newList);
	return newList;
}
export { requestHandler };

// function unapprovedHandler(listValue) {
// 	let newList = [];
// 	for (let i = 0; i < listValue.length; i++) {
// 		if (i === 4) {
// 			newList.push('Click to See All');
// 			break;
// 		}
// 		console.log('listValue:', listValue[i]);
// 		newList.push({
// 			title: `${listValue[i].name} : ${listValue[i].quantity}`,
// 			id: listValue[i].id,
// 		});
// 	}
// 	// console.log('summarized list:', newList);
// 	return newList;
// }
// export { unapprovedHandler };

function userRequestHandler(listValue) {
	let newList = [];
	console.log('listValue (entered):', listValue)
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		console.log(
			'listValue:', listValue[i],
			'listValue.title:', listValue[i].engineer.first_name,
		);
		if (newList.some((newListitem) => newListitem.id === listValue[i].engineer.id)) continue
		console.log('############# apending:', listValue[i].engineer.first_name);
		console.log(listValue[i].engineer.first_name, 'in', Object.values(newList), ':', newList.includes(listValue[i].engineer.id));
		newList.push({
			title: `${listValue[i].engineer.first_name}`,
			id: listValue[i].engineer.id,
		});
	}
	console.log('summarized list:', newList);
	return newList;
}
export { userRequestHandler };

function accountUpdate(listValue) {
	let newList = [];
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		console.log(
			'\nlistValue:', listValue[i],
			'\nlistValue firstname:', listValue[i].requestUser.first_name,
			'\nlistValue id:', listValue[i].id,
		);
		newList.push({
			title: `${listValue[i].requestUser.first_name}`,
			id: `${listValue[i].requestUser.id}/${listValue[i].id}`,
			updateID: listValue[i].id,
		});
	}
	console.log('summarized list:', newList);
	return newList;
}
export { accountUpdate };

function userHandler(listValue) {
	let newList = [];
	for (let i = 0; i < listValue.length; i++) {
		if (i === 4) {
			newList.push('Click to See All');
			break;
		}
		console.log('listValue:', listValue[i]);
		newList.push({
			title: `${listValue[i].first_name}`,
			id: listValue[i].id,
		});
	}
	// console.log('summarized list:', newList);
	return newList;
}
export { userHandler };

function noOptions(listValue) {
	return ['Click to See All'];;
}
export { noOptions };
