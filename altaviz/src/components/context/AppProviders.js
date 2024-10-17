import { FetchProviders } from "./FetchContext";
import { GlobalProvider } from "./Context";
import { LoginProvider } from "./loginAuth/LoginOutContext";
import { AuthProvider } from "./checkAuth/AuthContext";
import { SentenceCaseProvider } from "./SentenceCaseContext";

const providers = [
	// the first is the child
	GlobalProvider,
	SentenceCaseProvider,
	FetchProviders,
	LoginProvider,
	AuthProvider,
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
