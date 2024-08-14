

function sMockData() {
	const location = {
		user: {
			name: 'Banji',
			department: {
				dept: 'supervisor',
				numberOfPartsDelivered: 52,
				numberOfPendingParts: 9,
			},
			phone: '12345678902',
			whatsapp: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'banji@example.com',
			address: '12, kudirat way, lagos',
			status: 'active',
		},
	}
	return { location };
}
export default sMockData;