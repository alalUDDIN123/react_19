import React, { useContext } from 'react';
import { authContext } from './useContext';

const Dashboared = () => {
    const { signout } = useContext(authContext);

    return (
        <div className="container">
            <h1>You are signed in</h1>
            <button onClick={() => signout()}>Sign Out</button>
        </div>
    );
}

export default Dashboared;
