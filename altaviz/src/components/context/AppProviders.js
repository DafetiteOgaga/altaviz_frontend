import { FetchProviders } from "./FetchContext";
import { GlobalProvider } from "./Context";

const providers = [
	// the first is the child
	GlobalProvider,
	FetchProviders,

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
