import React from 'react';
import './style.css'

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";

import { useState, useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';

const SearchPage = ({ activeLink, handleLinkClick, searchBookCardProps, onSearch, fetchData, allPostsData, filteredPostsData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigate();

    useEffect(()=>{
        
        fetchData();
    },[])

    useEffect(() => {
       
    }, [onSearch, filteredPostsData]);


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
                {filteredPostsData.length > 0 ? (
                        <BookCard
                            {...searchBookCardProps} 
                            allPostsData={filteredPostsData}
                        />
                    ) : (
                        <BookCard
                            {...searchBookCardProps} 
                            allPostsData={allPostsData}
                        />
                    )}
                </div>
            </div>

        </div>
    );
}

export default SearchPage;
