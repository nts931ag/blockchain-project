// @flow 
import React, { useState } from 'react';
import './style.scss';

import { Modal } from '../components/modal/modal';

const enumState = {
    HIDDEN: 'hidden',
    CLOSE: 'close',
    VISIBLE:'visible'
}

export const MinerBlock = (props) => {
    const [isAccess, setAccess] = useState(false);

    const [modalState, setModalState] = useState(enumState.HIDDEN);

    const handleChangeAccessOption = (e) => {
        const target = e.currentTarget;
        setAccess((target.value.length));
    }
    return (
        <div className='miner-block'>
            <div className='access-wallet'>
                <input onChange={handleChangeAccessOption} className={`access-wallet__item`} placeholder='Private Key'></input>

                <div className={`btn-basic ${(isAccess) ? '' : 'btn--disable'}`}>
                    Access Wallet
                </div>
            </div>

            <div className='miner-block__body hidden'>
                <div className='header'>
                    <div className='header__cover'>
                        <p className='header__balance'>Balance: <span>0</span> MC</p>
                        <p className='header__lst-block'>Transactions: <span>0</span></p>
                        <div className='btn-outline-basic'>
                            Log out
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='transaction-list'>
                        <table>
                            <tr>
                                <th>Hash</th>
                                <th>Time</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    6279348f3c4ddf64878371031957cb15d02becbbf0dd47934b2b828ccd35ace0</td>
                                <td>
                                    2021-04-28 20:20</td>
                                <td>24,096.82</td>
                                
                                <td><i className="fa fa-plus-square fa-2x" aria-hidden="true"></i></td>
                            </tr>
                            
                        </table>
                        <div className='btn-generate-block' onClick={()=>{setModalState(enumState.VISIBLE)}}>
                            Create Block
                        </div>
                    </div>

                    <Modal state={modalState} onClickOverlay={() => {setModalState(enumState.CLOSE)}}>
                    <div className='block'>
                        <div className='block-item'>
                            <p className='block-item__label'>Block:</p>
                            <div className='block-item__input'>
                                <div className='block-item__content content-before--index'>1.000</div>
                            </div>
                        </div>
                        <div className='block-item'>
                            <p className='block-item__label'>Nonce:</p>
                            <div className='block-item__input'>
                                <div className='block-item__content'>1.000</div>
                            </div>
                        </div>
                        <div className='block-item'>
                            <p className='block-item__label'>Reward:</p>
                            <div className='block-item__input'>
                                <div className='input-item'>
                                    <div className='block-item__content content-before--money'>1.000</div>
                                    <div className='block-item__content content-before--to'>1.000</div>
                                </div>
                            </div>
                        </div>
                        <div className='block-item'>
                            <p className='block-item__label'>Tx:</p>
                            <div className='block-item__input'>
                                <div className='input-item'>
                                    <div className='block-item__content content-before--tx'>6279348f3c4ddf64878371031957cb15d02becbbf0dd47934b2b828ccd35ace0</div>
                                </div>
                                <div className='input-item'>
                                    <div className='block-item__content content-before--tx'>6279348f3c4ddf64878371031957cb15d02becbbf0dd47934b2b828ccd35ace0</div>
                                </div>
                                <div className='input-item'>
                                    <div className='block-item__content content-before--tx'>6279348f3c4ddf64878371031957cb15d02becbbf0dd47934b2b828ccd35ace0</div>
                                </div>
                                
                            </div>

                        </div>
                        <div className='block-item'>
                            <p className='block-item__label'>Prev:</p>
                            <div className='block-item__input'>
                                <div className='block-item__content content-before--index'>1.000</div>
                            </div></div>
                        <div className='block-item'>
                            <p className='block-item__label'>Hash</p>
                            <div className='block-item__input'>
                                <div className='block-item__content content-before--index'>1.000</div>
                            </div></div>
                        <div className='btn-basic'>Mine</div>
                    </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};