import { createContext, useCallback, useState, useContext, useEffect, useRef } from "react";
import { RotContext } from "../RotContext";
import { useNavigate } from 'react-router-dom';
import { RemoveAllKeys, cleanUpLocalStorage } from "../../hooks/RemoveKeys";
import { setKeyToLocalStorage } from "../../hooks/setToLocalStorage";

export const LoginContext = createContext();
function CsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value ||
        document.cookie.split('; ').find?.(row => row.startsWith('csrftoken='))?.split('=')[1];
}
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
export const LoginProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    // const [redirecting, setRedirecting] = useState(false); // Tracks if transition should start
    const { encrypt, RotCipher, decrypt } = useContext(RotContext);
    const toDashboard = useNavigate()

    // login function
    const Login = useCallback(
        async (email, password,
            trigger = false,
        ) => {
        if (!trigger) {
            console.log('Login trigger is false. POST call not executed.'.toUpperCase());
            return null;
        }

        setAuthLoading(true);
        setAuthError(null);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', CsrfToken());  // Add CSRF token to FormData

        try {
            const response = await fetch(`${apiBaseUrl}/login/`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                console.log('Login successful:', data.message);
                setAuthData(data);

                // Store user data in localStorage
                const encodedData = RotCipher(JSON.stringify(data), encrypt)
                // localStorage.setItem('authData', encodedData);
                setKeyToLocalStorage('authData', encodedData)
                console.log('saving data 111111111:', data)

                window.location.href = `/${data?.role || "/"}`
                // toDashboard(`/${data?.role || "/"}`);
                // window.location.reload();
                
                console.log('data (API) #####:', data);
                return { success: true, data };
            } else {
                console.error("Login failed:", data.message);
                setAuthError(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
        console.error('Login error:', error);
        setAuthError(error.message);
        return { success: false, message: error.message };
        } finally {
            setAuthLoading(false);
        }
    }, []);
    console.log('authData (API):', authData);

   // Logout function
    const Logout = useCallback(async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/logout/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-CSRFToken': CsrfToken(),
                },
            });
            const data = await response.json();
            if (response.ok) {
                setAuthData(null); // Clear authData on logout

                // Remove user data from localStorage
                console.log('deleting user data 333333')
                RemoveAllKeys()
                cleanUpLocalStorage('authData')

                // to redirect and Refresh the page on succcess
                toDashboard('/')
                window.location.reload();
                
                console.log('status:', data.message);
                return { success: data.message };
            } else {
                console.error('Logout failed');
                return { success: false };
            }
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, message: error.message };
        }
    }, []);
    return (
        <LoginContext.Provider value={{ Login, Logout, authData, authLoading, authError }}>
			{children}
		</LoginContext.Provider>
	);
}