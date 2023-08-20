import React, { useState } from 'react';
import './style.css'

import feedIcon from '../../Assets/Images/category.png'
import searchIcon from '../../Assets/Images/search.png'

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(null);

    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    return (
        <div className='sidebar-container'>
            <div className={`sidebar flex column ${activeLink === 0 ? 'sticky' : ''}`}>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
