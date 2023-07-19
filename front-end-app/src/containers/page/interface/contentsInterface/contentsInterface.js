// @flow 
import React, {useContext, useState, useEffect} from 'react';
import './style.scss';

import {useHistory} from 'react-router-dom';

import socketEvt from '../../../../core/sockEvt';
import Blockchain from '../../../../core/blockchain';
import io from 'socket.io-client';
import { Modal } from '../../../../components/modal/modal';
import {Dashboard, SendTransaction, HistoryTransaction} from './interfaceOptions';

import { interfaceOptionContext } from '../../../../contexts/interfaceOptionContext';
import { authContext } from '../../../../contexts/authContext';
const enumState = {
    HIDDEN: 'hidden',
    CLOSE: 'close',
    VISIBLE: 'visible'
}
let socket,blockchain;
const server = 'http://192.168.43.217:8080';
export const ContentsInterface = (props) => {
    const history = useHistory();

    const {option} = useContext(interfaceOptionContext);
    const {auth, myWallet, resetWallet} = useContext(authContext);
    const [modalState, setModalState] = useState(enumState.HIDDEN);
    const [balance, setBalance] = useState(0);
    const [lastBlockIndex, setLastBlockIndex] = useState(1);
    useEffect(() => {
        if (!auth){
            history.push('/access-wallet');
        }
        socket = io(server);
        blockchain = new Blockchain(socket);

        return () => {
            socket.disconnect();
            socket.off();

            resetWallet();
        }
    }, []);

    //setup socket
    useEffect(() => {
        socket.on(socketEvt.ADD_NODE, (mainChain)=>{
            blockchain.parseChain(mainChain);

            setBalance(blockchain.getBalance(myWallet.publicKey.substring(2, myWallet.publicKey.length)));
            setLastBlockIndex(blockchain.getLastBlock().index);
        });
        socket.on(socketEvt.ADD_TRANSACTION, (transaction) => {
            blockchain.addTransaction(transaction);
        });
        socket.on(socketEvt.START_MINING, async ({ index, transactions, timeStamp, prevHash }) => {
            console.log('start mining............');
            blockchain.setMine(true);
            transactions.push(blockchain.addTransactionReward(myWallet.publicKey.substring(2, myWallet.publicKey.length)));
            const newblock = blockchain.proofOfWork(index, transactions, timeStamp, prevHash, 0);
            newblock.then(result => {
                console.log('stop mining....');
                if (result !== null){
                    blockchain.addBlock(result);
                    setBalance(blockchain.getBalance(myWallet.publicKey.substring(2, myWallet.publicKey.length)));
                    setLastBlockIndex(blockchain.getLastBlock().index);
                    socket.emit(socketEvt.BROADCAST_ENDMINING, ({result: result}));
                }
            });
        });
        socket.on(socketEvt.END_MINING, (newBlock) => {
            console.log('end mining....');
            blockchain.setMine(false);    
            blockchain.addBlock(newBlock);

            setBalance(blockchain.getBalance(myWallet.publicKey.substring(2, myWallet.publicKey.length)));
            setLastBlockIndex(blockchain.getLastBlock().index);
        });

    }, []);

    //setup logout
    

    const handleClickBtnInfo = () => {
        setModalState(enumState.VISIBLE);
    }

    return (
        <div className='contents-interface'>
            <div className='top-content'>

                <div className='content-item item--color-main'>
                    <div className='content-item__image' style={{backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADx0lEQVR4Xu3dsXFUMRSFYTl3SiukFECIC6ABInfhlCo8Y0IKIKUHKqAIExPu+zVzR7MfMfdJe/Tr6EirfX54fnx5X4P/Pj59Sa3/fvuR6mvx6f1/AEBDAABNv3W6gKf3nwPcOcAAAIAQWBiwBBT11pIBhncxloA7BxgAAJABCgMyQFFPBljTJ5mWgDsHGAAAkAEKAzJAUU8GkAFOn0Gn9//h9euf0fsA0yk4GlgurwDVDgCgKhjrATB8Fh7HL5cDAAAZovIAS0BRb0MtB+AAGzC6/ggOcF27LZUcgANsAenqQzjAVeU21XEADrAJpWuP4QDXdNtWxQE4wDaYrjyIA1xRbWMNB+AAG3G6/VEc4HbNtlZwAA6wFahbH5bvBH7+dWuT////v9/b+wE+fJt9P8B0/39+avoDoOm3AMABEkLVwTiAJSABaAlI8i1LgBA4G2ItAZaA5GGWgCSfJWBZAiwBaQ5N76NT5xcH4ADDJ5lCoBCYTEwITPJZAiwBloA2hYTA9m2mDCADpBmYbwRN/76/nkMk9dZadQbW9uuNIgDEEQDA8JUuDtBOIjkAB2jvCJIBIkGxXAaIV9Ki/kIgB6gItXoOwAESQUJgks85wPirTm0DbQPjHG7lDoIcBDWCYrUQKAQmhITAJJ8QKATGX+dG/vLfXeQAcQSEwBgCa4iZPomc7n9tf9wB6gcAwOHnAABodwKrfhwgZoA6ANXBavsAAMDshZBKcJ1BcfzzNqz2v+rHASIBdQAA8NRSbBUwjj8HqAMwPYMAEP9wJABmHaxOIBkgWkAdgOkJBAAA2AYWBjiAL4MKP/nr9AqgJSAN37INnA4xtf04/ucD8Pz48l5EqBZUB/D0a+HT+uWXRE1/AAC0r5MBUOxvwxtCpicQAAAgAxQG6qVQDhDPEWQAGaBM4FzLAYa/z+cAHCDP4vIADsABCj/jJ4m2gWn4+o9D7QLsAhKC9SidAyT5OcD4GmYXYBcQ53ArtwuwC0gE3X0ITOopzlfKxkOgMWwKHL8LaB9fNQDunAEAACApIAMk+eaLOcD8GIz2AACj8s83DoD5MRjtAQBG5Z9vHADzYzDaAwCMyj/fOADmx2C0BwAYlX++cQDMj8FoDwAwKv984xmA1+HXxFUJT78SVj9/vVAy/oqYKgAA2nsKARAJrHcCY/P5Ui4A4ggAIP6wI+q/LAGWgMpQqucAHCABVIvtAvzp2MSQEJjk678NjM3bBQiBQmCdRKleCBQCE0C1WAgUAhNDQmCSTwjMv06N+jsJjD/P5wCRwNND4D8Byyv9ACQ3RgAAAABJRU5ErkJggg==')`}}>
                        <img src=''></img>
                    </div>
                    <div className='content-item__main'>
                        <div className='text'>
                            <p className='text__title'>Address</p>
                            <p className='text__desc'>{myWallet.publicKey}</p>
                        </div>
                        <div className='content-item__subIcon' onClick={handleClickBtnInfo}>
                            <img src='https://www.myetherwallet.com/img/more.f9583c86.svg'></img>
                        </div>
                    </div>
                    <Modal state={modalState} onClickOverlay={() => {setModalState(enumState.CLOSE)}}>
                        <div className='address-info'>
                            <div className='address-info__header'>
                                <p className='address-info__header-title'>Detail Infomation</p>
                                <i className="fa fa-times fa-2x address-info__header-icon" aria-hidden="true" onClick={() => {setModalState(enumState.CLOSE)}}></i>
                            </div>

                            <div className='address-info__body'>
                                <div className='info-item item--info'>
                                    <p className='info-item__title'>My Address</p>
                                    <p className='info-item__content'>{myWallet.publicKey}</p>
                                </div>
                                <div className='info-item item--warning'>
                                    <p className='info-item__title'>Private key</p>
                                    <p className='info-item__content'>{myWallet.privateKey}</p>
                                </div>
                            </div>

                        </div>
                    </Modal>
                </div>

                <div className='content-item item--border-none item--color-submain'>
                    <div className='content-item__image'>
                        <img src='https://www.myetherwallet.com/img/wallet.66b8433e.svg'></img>
                    </div>
                    <div className='content-item__main'>
                        <div className='text text--large'>
                            <p className='text__title'>Balance</p>
                            <p className='text__desc'><span>{balance}</span> MC</p>
                        </div>
                        <div className='content-item__subIcon'>
                            <img src=''></img>
                        </div>
                    </div>
                </div>

                <div className='content-item'>
                    <div className='content-item__image'>
                        <img src='https://www.myetherwallet.com/img/eth-logo.7fe75c25.svg'></img>
                    </div>
                    <div className='content-item__main'>
                        <div className='text'>
                            <p className='text__title'>Network</p>
                            <p className='text__desc'>Last block# : {lastBlockIndex}</p>
                        </div>
                        <div className='content-item__subIcon'>
                            <img src=''></img>
                        </div>
                    </div>
                </div>

            </div>
            <div className='interface-option'>

                {
                    (()=>{
                        switch (option) {
                            case 1:
                                return <Dashboard></Dashboard>;
                            
                            case 2:
                                return <SendTransaction></SendTransaction>
                        
                            case 3: 
                                return <HistoryTransaction></HistoryTransaction>
                            default:
                                break;
                        }
                    })()
                }
            </div>
        </div>
    );
};
