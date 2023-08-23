import React, { useState, useEffect } from 'react';
import './style.css'

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";

import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const Feeds = ({ activeLink, handleLinkClick, feedsBookCardProps }) => {
    const [followedPostsData, setFollowedPostsData] = useState([]);
    const navigation = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await sendRequest({
                    route:"/posts/get_followed_posts",
                    method: requestMethods.GET,
                });
                console.log(response)
                setFollowedPostsData(response)
            } catch (error) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                navigation("/");
                }
            }
        }
        fetchData();
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
