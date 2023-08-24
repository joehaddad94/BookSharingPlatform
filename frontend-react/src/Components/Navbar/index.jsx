import React from 'react';
import './style.css';
import logOut from '../../Assets/Images/log-out.png';
import SearchBar from '../SearchBar';

const Navbar = ({ openModal, showSearchBar, showNewPostButton, handleSignOut, onSearch }) => {
    return (
        <div className='navbar-main-container flex'>
            <div className='nav-left'>
                <h1>BookShelf</h1>
            </div>
            <div className='nav-center'>
                {showSearchBar && <SearchBar onSearch={onSearch} />}
            </div>
            <div className='nav-right flex'>
                {showNewPostButton && <button onClick={openModal}>New Post</button>}
                <img className='pointer' src={logOut} alt="Log Out Icon" onClick={handleSignOut}/>
            </div>
        </div>
    );
}

export default Navbar;

