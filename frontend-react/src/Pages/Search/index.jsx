import React from 'react';
import './style.css'

import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const SearchPage = ({ activeLink, handleLinkClick, searchBookCardProps }) => {

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
                    <BookCard {...searchBookCardProps}/>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
