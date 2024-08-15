

function hrMockData() {
	const user =
		{
			names: {
				firstname: 'John',
				lastname: 'Tunmise',
				middlename: 'Ibidapo',
			},
			department: {
				department: 'human resources',
				numberOfResolutions: 52,
				numberOfPendingFaults: 9,
			},
			phone: '12345678902',
			wphone: '98765432103',
			profile_photo: 'placeholder.png',
			email: 'john@example.com',
			address: '12, kudirat way, lagos',
			status: 'active',
			aboutme: 'I love solving problems',
		}
		return { user };
}
export default hrMockData;