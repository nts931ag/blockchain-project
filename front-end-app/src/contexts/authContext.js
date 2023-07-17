// @flow 
import React, { useState } from 'react';

export const authContext = React.createContext();

export const AuthProvider = (props) => {
    const [myWallet, setMyWallet] = useState({publicKey: '', privateKey: ''});
    const [auth, setAuth] = useState(true);

    const setWallet = (value) =>{
        setMyWallet(value);
    }

    const setAuthentication = (value) =>{
        setAuth(value);
    }
    
    const exportContext = {
        myWallet,
        setMyWallet: setWallet,
        auth,
        setAuth: setAuthentication
    }

    return (
        <authContext.Provider value={exportContext}>
            {props.children}
        </authContext.Provider>
    );
}