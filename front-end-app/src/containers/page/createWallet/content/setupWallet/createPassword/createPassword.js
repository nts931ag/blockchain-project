// @flow 
import React, {useContext} from 'react';

import { createWalletContext } from '../../../../../../contexts/createWalletContext';

import './style.scss';
import { Input } from '../../../../../../components/input/input';


export const CreatePassword = (props) => {
    const {step,setStep} = useContext(createWalletContext);

    const nextStep = () => {
        setStep(step+1);
    }

    return (
        <>
            <h2 className='title'>Your Password</h2>
            <div className='password'>
                <Input className='input--access' type='password' placeHolder='Please Enter At Least 9 Characters' name='password'></Input>
                <div className='basic-button' onClick={nextStep}>
                    Next
                        <i class="fa fa-arrow-right basic-button__icon" aria-hidden="true"></i>
                </div>
            </div>
            <div className='notice'>
                <span className='span--danger'>DO NOT FORGET</span> to save your password. You will need this <br></br> <span className='span--danger'>Password + Keystore</span> File to unlock your wallet.
            </div>
        </>
    );
};