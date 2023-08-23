import React from 'react';
import './style.css'

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";

import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const SearchPage = ({ activeLink, handleLinkClick, searchBookCardProps }) => {
    const [allPostsData, setAllPostsData] = useState([]);
    const navigation = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await sendRequest({
                    route:"/posts/get_all_posts",
                    method: requestMethods.GET,
                });
                console.log(response)
                setAllPostsData(response)
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
                    <BookCard {...searchBookCardProps} allPostsData = {allPostsData}/>
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
