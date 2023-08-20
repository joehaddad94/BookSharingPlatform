import React from 'react';

import './style.css'
import logOut from '../../Assets/Images/log-out.png'
import SearchBar from '../SearchBar';

const Navbar = () => {
    return (
        <div className='navbar-main-container flex'>
            <div className='nav-left'>
                <h1>BookShelf</h1>
            </div>
            <div className='nav-center'>
                <SearchBar/>
            </div>
            <div className='nav-right'>
                <img src={logOut} alt="Log Out Icon" />
            </div>
        </div>
    );
}

export default Navbar;
