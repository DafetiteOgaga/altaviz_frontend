import { createContext, useState, useEffect } from "react";

export const RotContext = createContext();

export const RotProvider = ({ children }) => {
	const encrypt = 50;
	const decrypt = -50;
	function RotCipher(text, shift) {
		// Define the character set
		const charset = "!#$%&*+-./0123456789;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ^_abcdefghijklmnopqrstuvwxyz|~";
		const len = charset.length;
	
		// Compute the effective shift value
		const effectiveShift = ((shift % len) + len) % len;
		const rotatedCharset = charset.slice(effectiveShift) + charset.slice(0, effectiveShift);
	
		// Create a map for fast character lookup
		const charMap = {};
		for (let i = 0; i < len; i++) {
			charMap[charset[i]] = rotatedCharset[i];
		}
	
		// Transform the input text
		try {
			return Array.from(text).map(char => charMap[char] || char).join('');
		} catch (e) {
			// console.log('Error:', e)
		}
	}
	return (
		<RotContext.Provider value={{encrypt, decrypt, RotCipher}}>
            {children}
        </RotContext.Provider>
	)
}