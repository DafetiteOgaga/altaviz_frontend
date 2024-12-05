import { createContext, useCallback, useState, useContext, useEffect } from "react";
import { RotContext } from "../RotContext";
// import { AuthContext } from "../checkAuth/AuthContext";
// import { useNavigate}
import { useNavigate, useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { CSSTransition } from "react-transition-group";
// import './login.css'

export const LoginContext = createContext();
function CsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value ||
        document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
}
const url = 'http://127.0.0.1:8000'
export const LoginProvider = ({ children }) => {
    const urlCheck = useLocation().pathname.split('/')
    // const [isLogin, setIsLogin] = useState(false);
    const [authData, setAuthData] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);
    // const [redirecting, setRedirecting] = useState(false); // Tracks if transition should start
    const { encrypt, RotCipher, decrypt } = useContext(RotContext);
    const toDashboard = useNavigate()

    // efficient idea required here
    useEffect(() => {
        const authdatakey = localStorage.getItem('authData');
        const listKey = (localStorage.getItem('allUnresolvedKey')?localStorage.getItem('allUnresolvedKey'):(localStorage.getItem('allPendingRequests')))
        // console.log('authdatakey', authdatakey)
        if (authdatakey && listKey && urlCheck[1] === 'login') {
            const decodedData = JSON.parse(RotCipher(authdatakey, decrypt));
            // setAuthData(decodedData);
            console.log(
                '\ndecodedData', decodedData,
                '\nredirectUrl:', `/${decodedData?.role}`,
                '\nurlCheck:', urlCheck[1],
            )

            // Redirect to the dashboard if already authenticated and on the login page
            toDashboard(`/${decodedData.role}`);
        }
        // setIsLogin(false);
    }, [urlCheck]);

    // login function
    const Login = useCallback(
        async (email, password,
            trigger = false,
            baseUrl = url
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
            const response = await fetch(`${baseUrl}/login/`, {
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
                localStorage.setItem('authData', encodedData);
                console.log('saving data 111111111:', data)

                // Start transition
                // setRedirecting(true);

                // Delay redirection until the transition ends
                // setTimeout(() => {
                toDashboard(`/${data?.role || "/"}`);
                // }, 300); // Match this to the duration of your CSS animation

                // to redirect and Refresh the page on succcess
                // toDashboard(`/${data?.role || '/'}`)
                 // to Refresh the page on succcess
                window.location.reload();
                // try {
                //     console.log(`tring to redirect to: /${data.department.name}`)
                //     redirectToPage(`/${data.department.name}`)
                // } catch {
                //     console.log('settled for: /home instead')
                //     redirectToPage('/')
                // }
                
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
    // console.log(
        // '\ndecodedData', decodedData,
        // '\nredirectUrl:', `/${decodedData?.role}`,
        // '\nurlCheck:', urlCheck[1],
    // )
    // if (urlCheck[1] === 'login') setIsLogin(true)

   // Logout function
    const Logout = useCallback(async (baseUrl = url) => {
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
                let localList = [] // gather local keys
                for (let i = 0; i < localStorage.length; i++) {
                    console.log('appending localkey:'.toUpperCase(), localStorage.key(i));
                    localList.push(localStorage.key(i));
                }
                console.log(localList.map(key => `key: ${key}`))
                for (const key of localList) {
                    localStorage.removeItem(key);  // Remove local keys and their values from localStorage
                    console.log(`removed key: ${key}`);    // Log the key that was removed
                }
                // localStorage.removeItem('authData');

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