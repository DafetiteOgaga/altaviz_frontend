import { createContext } from "react";

export const SentenceCaseContext = createContext();

export const SentenceCaseProvider = ({ children }) => {
	const toSentenceCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return (
        <SentenceCaseContext.Provider value={{toSentenceCase}}>
            {children}
        </SentenceCaseContext.Provider>
    );
}