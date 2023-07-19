// @flow 
import React, {useEffect} from 'react';
import './style.scss';
import {ButtonContainer} from './buttonContainer/buttonContainer';
import { FAQs } from '../../FAQs/FAQs';
import { Link } from 'react-router-dom';

import $  from 'jquery';
export const AccessWallet = (props) => {
    useEffect(() => {
        return () => {
            $('html,body').animate({scrollTop: 0}, 500);
        }
    }, []);
    return (
        <div className='access-wallet'>
            <div className='page-container'>
                <div className='wrap'>
                    <div className='header'>
                        <h2>Access My Wallet</h2>
                        <p>Do not have a wallet? <Link className='header__link'>Create A New Wallet</Link></p>
                    </div>
                    <div className='access-wallet__content'>
                        
                            <ButtonContainer></ButtonContainer>
                        
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='wrap'>
                    <FAQs></FAQs>
                </div>
            </div>
        </div>
    );
};