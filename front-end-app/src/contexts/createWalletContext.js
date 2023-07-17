// @flow 
import React, { useState } from 'react';

export const createWalletContext = React.createContext();

export const CreateWalletProvider = (props) => {
    const [step, setStep] = useState(1);

    const setCurrentStep = (value) =>{
        setStep(value);
    }
    
    const exportContext = {
        step,
        setStep: setCurrentStep
    }

    return (
        <createWalletContext.Provider value={exportContext}>
            {props.children}
        </createWalletContext.Provider>
    );
};