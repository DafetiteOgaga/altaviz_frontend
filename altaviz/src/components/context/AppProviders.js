import { FetchProviders } from "./FetchContext";
import { GlobalProvider } from "./Context";
import { LoginProvider } from "./loginAuth/LoginOutContext";
import { AuthProvider } from "./checkAuth/AuthContext";
import { SentenceCaseProvider } from "./SentenceCaseContext";
// import { SharedDataProvider } from "./sharedData/SharedDataContext";
import { TimeDifferenceProvider } from "./timeDifference/TimeDifferenceContext";
// import { TriggerProvider } from "./triggerContext/TriggerContext";
import { RotProvider } from "./RotContext";
import { RefreshProvider } from "./RefreshContext";
// import { RefreshComponentProvider } from "./refreshContext/TriggerRefresh";
// import { SSENotificationProvider } from "./SSEContext/SSENotificationContext";
import { WebSocketNotificationProvider } from "./RealTimeNotificationContext/useWebSocketNotificationContext";

const providers = [
	// the first is the child
	GlobalProvider,
	SentenceCaseProvider,
	// SharedDataProvider,
	TimeDifferenceProvider,
	// SSENotificationProvider,
	// WebSocketNotificationProvider,
	WebSocketNotificationProvider,
	FetchProviders,
	AuthProvider,
	LoginProvider,
	// TriggerProvider,
	// RotProvider,
	RefreshProvider,
	// RefreshComponentProvider,
	RotProvider,
	// the last is the outer most parent (grandest parent)
];
function AppProviders({ children }) {
	return providers.reduce(
	(AccumulatedProviders, CurrentProvider) => (
		<CurrentProvider>{AccumulatedProviders}</CurrentProvider>
	),
	children
	);
}

export default AppProviders;
