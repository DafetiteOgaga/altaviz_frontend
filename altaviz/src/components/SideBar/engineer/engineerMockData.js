

function eMockData() {
	const location = {
		user: {
			name: 'Jide',
			department: {
				dept: 'engineering',
				numberOfPartsDelivered: 52,
				numberOfPendingParts: 9,
			},
			phone: '12345678902',
			whatsapp: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'jide@example.com',
			address: '12, kudirat way, lagos',
			status: 'active',
		},
	}
	return { location };
}
export default eMockData;