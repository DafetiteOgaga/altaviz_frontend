

function cMockData () {
	const location = {
		bank: {
			name: 'FB',
			state: 'LA',
			branch: {
				branchName: 'Addo Branch',
				custodian: 'Peter',
				cEngineer: 'Kenneth',
				helpDesk: 'Nonye',
				ATMs: {
					type: 'GRG',
					totalNumberOfATMs: 4,

				}
			}
		}
	}
	const banks = {
		'UA': 'UBA',
		'WB': 'WEMA Bank',
		'FM': 'FCMB',
		'EC': 'Ecobank',
		'UB': 'Union Bank',
		'FB': 'Fidelity Bank',
		'HB': 'Heritage Bank',
		'PB': 'Polaris Bank',
		'AB': 'Access Bank',
	}
	const locations = {
		'FC': 'Abuja State',
		'AB': 'Abia State',
		'AD': 'Adamawa State',
		'AK': 'Akwa Ibom State',
		'AN': 'Anambra State',
		'BA': 'Bauchi State',
		'BY': 'Bayelsa State',
		'BE': 'Benue State',
		'BO': 'Borno State',
		'CR': 'Cross River State',
		'DE': 'Delta State',
		'EB': 'Ebonyi State',
		'ED': 'Edo State',
		'EK': 'Ekiti State',
		'EN': 'Enugu State',
		'GO': 'Gombe State',
		'IM': 'Imo State',
		'JI': 'Jigawa State',
		'KD': 'Kaduna State',
		'KN': 'Kano State',
		'KT': 'Katsina State',
		'KE': 'Kebbi State',
		'KO': 'Kogi State',
		'KW': 'Kwara State',
		'LA': 'Lagos State',
		'NA': 'Nassarawa State',
		'NI': 'Niger State',
		'OG': 'Ogun State',
		'ON': 'Ondo State',
		'OS': 'Osun State',
		'OY': 'Oyo State',
		'PL': 'Plateau State',
		'RI': 'Rivers State',
		'SO': 'Sokoto State',
		'TA': 'Taraba State',
		'YO': 'Yobe State',
		'ZA': 'Zamfara State',
	}
	const faults = ['Select Fault',
		'Blank Screen',
		'Cash Jam',
		'Card Not Smart',
		'Poor Facial Image',
		'Unable to Clear/Load Cash',
		'ATM not Dispensing notes',
		'Reject Bin Full',
		'Dispenser not Spinning',
		'Dispenser spins too many times without paying',
		'ATM/Dispenser dirty',
		'Screen Touch/Buttons not working',
		'ATM Screen buttons not working',
		'Too many ATM card rejects',
		'Trappng cards',
		'Card cannot be Read',
		'Pin pad keys not working',
		'ATM not Booting Up',
		'Cash counter reset on power disruption',
		'High Rejects',
		'Calibration Unsuccessful',
		'No Good Cassetes',
		'Out of Service',
		'Unable to Print Counter',
	]
	return { location, banks, locations, faults }
}
export default cMockData;
