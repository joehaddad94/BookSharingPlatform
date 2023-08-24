import React, { useState, useEffect } from 'react';
import './style.css'

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";

import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const Feeds = ({ activeLink, handleLinkClick, feedsBookCardProps, fetchFollowedPosts, followedPostsData }) => {
    
    const navigation = useNavigate();

    useEffect(()=>{
        fetchFollowedPosts();
    },[])

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
                    <BookCard {...feedsBookCardProps} followedPostsData = {followedPostsData}/>
                </div>
            </div>
        </div>
    );
}

export default Feeds;
