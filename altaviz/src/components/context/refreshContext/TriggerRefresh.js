import React, { createContext, useState } from 'react';

export const RefreshContext = createContext();

export const RefreshComponentProvider = ({ children }) => {
const [refresh, setRefresh] = useState(false);
const triggerRefresh = () => setRefresh(!refresh);

return (
	<RefreshContext.Provider value={{ refresh, triggerRefresh }}>
	{children}
	</RefreshContext.Provider>
);
};
