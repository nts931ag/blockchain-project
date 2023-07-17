import './style.scss'; 
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Content } from './content/content';

import { CreateWalletProvider } from '../../../contexts/createWalletContext';

export const CreateWallet = (props) => {
    return (
        <div className='create-wallet'>
            <div className='header'>
                <h2>Get a New Wallet</h2>
                <p>Already have a wallet? <Link className='header__link'>Access My Wallet</Link></p>
            </div>
            <div className='create-wallet__content'>
                <CreateWalletProvider>
                    <Content></Content>
                </CreateWalletProvider>
            </div>
            <div className='bottom'>
                Want to learn more about Blockchain or MEW? Please go to <Link className='bottom__link'>FAQs</Link>
            </div>
        </div>
    );
};