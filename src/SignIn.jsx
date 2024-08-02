import React, { useContext } from 'react';
import { authContext } from './useContext';


const SignIn = () => {
    const { doSignIn } = useContext(authContext);
    return (
        <div className="container">
            <button onClick={() => doSignIn()}>Sign In</button>
        </div>
    );
}

export default SignIn;
