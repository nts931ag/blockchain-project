import './style.scss';

export const Navbar = (props) => {

    return (
        <div className={`navbar row ${props.className}`}>
            <div className='navbar__container'>
                <a href='/' className='navbar__container__logo'>
                    <img src='https://www.myetherwallet.com/img/short-hand-logo-web.5d962d4e.png'></img>
                </a>
                <ul className='navbar__container__items'>
                    <li><a href='/#about'>About</a></li>
                    <li><a href='/#FAQs'>FAQ</a></li>
                    <li><a href='/#contact'>Contact</a></li>
                </ul>
            </div>
        </div>
    );
};