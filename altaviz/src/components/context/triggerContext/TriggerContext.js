import { createContext, useState } from "react";

export const TriggerContext = createContext();

export const TriggerProvider = ({ children }) => {
	const [triggercustodianDetailsUpdate, setTriggercustodianDetailsUpdate] = useState(false)
	const [triggerConfirmNotifi, setTriggerConfirmNotifi] = useState(false)
	const [triggerPendingNotifi, setTriggerPendingNotifi] = useState(false)
	const [stateTrigger, setStateTrigger] = useState(() => (false));

	return (
		<TriggerContext.Provider value={{
			stateTrigger, setStateTrigger,
			triggercustodianDetailsUpdate, setTriggercustodianDetailsUpdate,
			triggerConfirmNotifi, setTriggerConfirmNotifi,
			triggerPendingNotifi, setTriggerPendingNotifi,
			}}>
			{children}
		</TriggerContext.Provider>
	)
}