import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a QueryClient instance
const queryClient = new QueryClient();

function QueryProvider({ children }) {
return (
	<QueryClientProvider client={queryClient}>
	{children}
	{/* Add React Query DevTools (optional) */}
	<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
}

export default QueryProvider;
