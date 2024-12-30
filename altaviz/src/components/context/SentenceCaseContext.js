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
    const separateChars = (text) => {
        // console.log({text})
        if (!text) return;
        // Extract specific chunks using slice
        const separated1 = text.slice(0, 3); // First 3 characters
        const separated2 = text.slice(3, 7); // Next 4 characters
        const separated3 = text.slice(7, 10); // Last 3 characters
    
        // Log the separated chunks
        // console.log('separated1:', separated1);
        // console.log('separated2:', separated2);
        // console.log('separated3:', separated3);
    
        // Combine the chunks with a space
        return [separated1, separated2, separated3].filter(Boolean).join('-');
    };

    const addHyphen = (text) => {
        return text.split(' ').join('-');
    }

    const removeHyphen = (text) => {
        return text.split('-').join(' ');
    }

    return (
        <SentenceCaseContext.Provider value={{toSentenceCase, trimString, separateChars, addHyphen, removeHyphen}}>
            {children}
        </SentenceCaseContext.Provider>
    );
}