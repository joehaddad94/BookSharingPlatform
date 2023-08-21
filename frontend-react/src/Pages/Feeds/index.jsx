import React from 'react';
import './style.css'

import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const Feeds = ({ activeLink, handleLinkClick, feedsBookCardProps }) => {
    return (
        <div>
            <div className='body-container flex'>
                <div className="body-sidebar">
                    <Sidebar 
                        activeLink = {activeLink} 
                        handleLinkClick = {handleLinkClick} 
                    />
                </div>
                <div className="body-bookcard">
                    <BookCard {...feedsBookCardProps}/>
                </div>
            </div>
        </div>
    );
}

export default Feeds;
