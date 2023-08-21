import React from 'react';
import './style.css'

import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';
import PostModal from '../../Components/PostModal';

const MyPosts = ({ activeLink, handleLinkClick, modalVisible, closeModal, myPostsBookCardProps }) => {

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
                    <BookCard {...myPostsBookCardProps}/>
                </div>
            </div>
            {modalVisible && <PostModal closeModal={closeModal} modalVisible={modalVisible} />}

        </div>
    );
}

export default MyPosts;
