import { createContext } from "react";

export const SentenceCaseContext = createContext();

export const SentenceCaseProvider = ({ children }) => {
	const toSentenceCase = (str) => {
        // console.log('str:', str)
        if (str) {
            let sentenceArray;
            if (str.includes(' ')) {
                sentenceArray = str.split(' ');
                // console.log('sentenceArray:', sentenceArray)
                sentenceArray = sentenceArray.map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
                sentenceArray = sentenceArray.join(' ');
            } else if (str.includes('-')) {
                sentenceArray = str.split('-');
                sentenceArray = sentenceArray.map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
                sentenceArray = sentenceArray.join('-');
            } else {
                sentenceArray = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            }
            return sentenceArray;
        }
    };
    function trimString(str, maxLength) {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + '...'; // Adjusting for the length of '...'
        }
        return str; // Return the original string if it's already shorter than maxLength
    }

    return (
        <SentenceCaseContext.Provider value={{toSentenceCase, trimString}}>
            {children}
        </SentenceCaseContext.Provider>
    );
}