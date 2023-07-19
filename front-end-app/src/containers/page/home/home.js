import './style.scss';
import {useEffect } from 'react';
import { TopBanner } from '../../topBanner/topBanner';
import { About } from '../../about/about';
import { FAQs } from '../../FAQs/FAQs';

import {useLocation} from 'react-router-dom';

import $ from 'jquery';

export const Home = (props) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash.length > 0){
            $('html,body').animate({
                scrollTop: $(location.hash).offset().top,
            }, 500);
        }
        return () => {
             $('html,body').animate({scrollTop: 0}, 500);
        }
    }, [window.location.href]);

    return (
        <div id='#' className="home">
            
            <div className='Home__top-banner'>
                <div className='wrap'>
                    <TopBanner></TopBanner>
                </div>
            </div>
            <div id='about' className="home__about">
                <div className='wrap'>
                    <About></About>
                </div>
            </div>
            <div id='FAQs' className='home__FAQs'>
                <div className='wrap'>
                    <FAQs></FAQs>
                </div>
            </div>
            <div id='contact' className="home__social row">
                <p className='home__social__title'>Join MEW Community</p>
                <div className='home__social__container'>
                    {
                        socials.map((item) => {
                            return (
                                <div className='social'>
                                    <img src={item.icon} className='social--image'></img>
                                    <p className='social--name'>{item.name}</p>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

const socials = [
    { icon: 'https://www.myetherwallet.com/img/facebook.b3e1260a.png', name: 'Facebook' },
    { icon: 'https://www.myetherwallet.com/img/twitter.4021904f.jpg', name: 'Twitter' },
    { icon: 'https://www.myetherwallet.com/img/reddit.342a12c2.svg', name: 'Reddit' },
    { icon: 'https://www.myetherwallet.com/img/github.ea0dc6d2.png', name: 'Github' },
    { icon: 'https://www.myetherwallet.com/img/youtube.2bd2c7d9.png', name: 'Youtube' },
    { icon: 'https://www.myetherwallet.com/img/instagram.86f33cfc.png', name: 'Instagram' },
    { icon: 'https://www.myetherwallet.com/img/telegram.39a27915.svg', name: 'Telegram' }
];