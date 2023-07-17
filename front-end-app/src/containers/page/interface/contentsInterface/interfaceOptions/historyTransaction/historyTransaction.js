// @flow 
import * as React from 'react';
import './style.scss';
export const HistoryTransaction = (props) => {
    return (
        <div className='history-transaction'>
            <div className='history-transaction__title'>
                <p>History Transaction</p>
            </div>
            <div className='history-transaction__body'>
                <table>
                    <tr>
                        <th>Txn</th>
                        <th>Amount</th>
                        <th>TxFee</th>
                        <th>Date Time</th>
                    </tr>
                    <tr>
                        <td>0xc96640Ca43902726a64a68e93f0A0ec25CcC50eD</td>
                        <td>1.02 MC</td>
                        <td>0.000861000030639 MC</td>
                        <td>{new Date(Date.now()).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste Alfreds</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};