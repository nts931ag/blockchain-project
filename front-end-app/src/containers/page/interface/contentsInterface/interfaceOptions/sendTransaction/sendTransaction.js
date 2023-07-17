// @flow 
import * as React from 'react';
import './style.scss';
export const SendTransaction = (props) => {
    return (
        <div className='send-transaction'>
            <div className='send-transaction__title'>
                <p>Send Transaction</p>
            </div>
            <div className='send-transaction__body'>
                <div className='send-transaction-form'>
                    <div className='amount'>
                        <div className='amount__type'>
                            <label>Type</label>
                            <p>MC <span style={{opacity: '0.5'}}>- MyCoin</span></p>
                        </div>
                        <div className='amount__main'>
                            <label>Amount</label>
                            <input type='number' placeholder='Amount'/>
                        </div>
                    </div>
                    <div className='address'>
                            <label>Amount</label>
                            <input type='text' placeholder='Please enter the address'/>
                    </div>
                    <div className='tx-fee'>
                            <label>Transaction fee</label>
                            <p>Cost 0.000861000030639 MC = $0.20</p>
                    </div>
                </div>
                <div className='btn-submit'>
                    <div className='basic-button'>
                        Send Transaction
                    </div>
                    <p className='btn-submit__clear-btn'>Clear all</p>
                </div>
            </div>
        </div>
    );
};