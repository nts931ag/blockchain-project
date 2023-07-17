// @flow 
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './style.scss';
import { Modal } from '../../../../../../components/modal/modal';

const enumState = {
    VISIBLE: 'visible',
    CLOSE: 'close',
    HIDDEN: 'hidden'
}

export const SaveWallet = (props) => {
    const history = useHistory();
    const [stateModal, setStateModal] = useState(enumState.HIDDEN);

    const handleDowloadFile = () => {
        setStateModal(enumState.VISIBLE);
    }

    const handleRedirect = () => {
        document.body.style = 'overflow-y: auto';
        history.push('/access-wallet');
    }

    return (
        <>
            <h2 className='title'>Save My Keystore File</h2>
            <Modal state={stateModal} onClickOverlay={(e) => {
                        setStateModal(enumState.CLOSE);
                }}>
                    <div className='modal-block'>
                        <div className='status-modal'>
                            <i className='fa fa-check fa-5x status-modal__icon ' aria-hidden='true'></i>
                            <p className='status-modal__title'>Success</p>
                            <h5 className='status-modal__desc'>You have created your wallet successfully.</h5>
                        </div>
                    
                    <div className='basic-button button--icon-hidden' onClick={handleRedirect}>
                            Access My Wallet
                                <i className="fa fa-arrow-right basic-button__icon" aria-hidden="true"></i>
                        </div>
                    </div>
            </Modal>
            <div className='save-wallet-content'>
                {
                    contentBlocks.map((item, index) => {
                        return (
                            <div className='save-wallet-content__block'>
                                <div className='icon-block'>
                                    <img src={item.srcImg}></img>
                                </div>
                                <div className='text-block'>
                                    <p className='text-block__title'>{item.title}</p>
                                    <h5 className='text-block__desc'>{item.desc}</h5>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className='basic-button button--icon-hidden' onClick={handleDowloadFile}>
                Download Keystore File
                    <i className="fa fa-arrow-right basic-button__icon" aria-hidden="true"></i>
            </div>
            
        </>
    );
};

const contentBlocks = [
    {srcImg: 'https://www.myetherwallet.com/img/no-lose.ef5e7643.svg', title: 'Don\'t Lose It', desc: 'Be careful, it can not be recovered if you lose it.'},
    {srcImg: 'https://www.myetherwallet.com/img/no-share.295ef578.svg', title: 'Don\'t Share It', desc: 'Your funds will be stolen if you use this file on a malicious phishing site.'},
    {srcImg: 'https://www.myetherwallet.com/img/make-a-backup.e461a34b.svg', title: 'Make a Backup', desc: 'Secure it like the millions of dollars it may one day be worth.'}
]