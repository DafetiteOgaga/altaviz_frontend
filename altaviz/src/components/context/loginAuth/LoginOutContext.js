import { createContext, useCallback, useState, useEffect } from "react";

export const LoginContext = createContext();
function CsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value ||
        document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
}
const url = 'http://127.0.0.1:8000'
export const LoginProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    // useEffect(() => {
    //     // Check localStorage for user data
    //     const savedData = localStorage.getItem('authData');
    //     if (savedData) {
    //         setAuthData(JSON.parse(savedData));
    //         console.log('User data found in localStorage 22222222:', authData);
    //     }
    // }, []);

    // login function
    const Login = useCallback(
        async (email, password,
            trigger = false,
            baseUrl = url
        ) => {
        if (!trigger) {
            console.log('Login trigger is false. POST call not executed.');
            return null;
        }
        setAuthLoading(true);
        setAuthError(null);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('csrfmiddlewaretoken', CsrfToken());  // Add CSRF token to FormData

        try {
            const response = await fetch(`${baseUrl}/login/`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data.message);
                setAuthData(data);

                // Store user data in localStorage
                localStorage.setItem('authData', JSON.stringify(data));
                console.log('saving data 111111111:', data)

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
    const logout = useCallback(async (baseUrl = url) => {
        try {
            const response = await fetch(`${baseUrl}/logout/`, {
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
                localStorage.removeItem('authData');

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
        <LoginContext.Provider value={{ Login, logout, authData, authLoading, authError }}>
			{children}
		</LoginContext.Provider>
	);
}