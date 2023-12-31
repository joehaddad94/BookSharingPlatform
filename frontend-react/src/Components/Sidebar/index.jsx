import React, { useState } from 'react';
import './style.css'

import feedIcon from '../../Assets/Images/category.png'
import searchIcon from '../../Assets/Images/search.png'
import myPostsIcon from '../../Assets/Images/bookmark.png'

const Sidebar = ({ activeLink, handleLinkClick }) => {

    return (
        <div className='sidebar-container'>
            <div className="sidebar flex column">
                <div className="main-container flex column">
                    <div className="link-container flex column center">
                        <div className={`link flex pointer ${activeLink === 0 ? 'bg-dark-purple' : ''}`} onClick={() => handleLinkClick(0)}>
                            <img src={feedIcon} alt="Home Icon" />
                            <h2>Feed</h2>
                        </div>
                        <div className={`link flex pointer ${activeLink === 1 ? 'bg-dark-purple' : ''}`} onClick={() => handleLinkClick(1)}>
                            <img src={searchIcon} alt="Search Icon" />
                            <h2>Search</h2>
                        </div>
                        <div className={`link flex pointer ${activeLink === 2 ? 'bg-dark-purple' : ''}`} onClick={() => handleLinkClick(2)}>
                            <img src={myPostsIcon} alt="Search Icon" />
                            <h2>My Posts</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
