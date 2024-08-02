import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthContextProvide = ({ children }) => {

    const [isSignnedIn, setIsSignnedIn] = useState(false);

    const doSignIn = () => {
        setIsSignnedIn(true)
    }

    const signout = () => {
        setIsSignnedIn(false)
    }

    return (
        <>
            <authContext.Provider value={{ isSignnedIn, doSignIn, signout }}>
                {children}
            </authContext.Provider>
        </>
    )

}