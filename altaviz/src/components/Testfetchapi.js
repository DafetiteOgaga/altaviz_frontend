import OnlineStatus from "./SideBar/chatsSetup/OnlineStatus";

function Testfetchapi() {
	// listenForUpdates(7)
	// const { authData } = useContext(AuthContext);
	// console.log('authData', authData);
	return (
		<>
			<h2>Test Page</h2>
			<OnlineStatus id={5} />
			<p>Test Page ends</p>
		</>
	);
}

export default Testfetchapi;
