import { useNavigate, useParams} from 'react-router-dom'
// import PasswordRestConfirm from './PasswordRestConfirm'

function CheckResetLink () {
	const navigate = useNavigate()
	const urlData = useParams()
	// check validity of link
	const MAX_SESSION_TIME = 1000 * 60 * 60 * 3 // 3hrs
	// const MAX_SESSION_TIME = 1000 * 10 // 1 minute, for testing purpose
	const currentTime = new Date().getTime();
	let timeElapsed = parseInt(urlData.timer, 10)
	console.log(
		'\nMAX_SESSION_TIME:', MAX_SESSION_TIME,
		'\ncurrentTime:', currentTime,
		'\ntimeElapsed:', timeElapsed,
	)
	timeElapsed = currentTime - timeElapsed;
	console.log(
		'\ntimeElapsed (milisecs):', timeElapsed,
		'\ntimeElapsed (secs):', timeElapsed/1000,
		'\ntimeElapsed (mins):', timeElapsed/(60*1000),
		'\ntimeElapsed (hours):', timeElapsed/(60*60*1000),
	)
	if (timeElapsed >= MAX_SESSION_TIME) {
		const errorText = 'Link has expired, please request for a new one'
		// toast.error(errorText)
		navigate('/reset-update-password/',
			{state: { type: 'error', text: errorText }})
	}
	return true

}
export default CheckResetLink