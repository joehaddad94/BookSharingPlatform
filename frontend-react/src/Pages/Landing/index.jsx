import React, { useState } from 'react';
import './style.css';

import { useNavigate } from "react-router-dom";


import Navbar from '../../Components/Navbar';
import FeedsPage from '../Feeds/index'
import SearchPage from '../Search'
import MyPosts from '../MyPosts'


const Landing = () => {
    const [activeLink, setActiveLink] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [ShowFollowButton, setShowFollowButton] = useState(false);
    const [ShowLikeButton, setShowLikeButton] = useState(false);
    const [ShowEditButton, setShowEditButton] = useState(false);
    const [ShowDeleteButton, setShowDeleteButton] = useState(false);
    const navigation = useNavigate();

    const isAuthenticated = !localStorage.getItem("authToken");

    if (!isAuthenticated) {
        navigation("/login");
        return null;
    }

    const handleLinkClick = (index) => {
        setActiveLink(index);
    };

    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

      const feedsNavbarProps = {
        showSearchBar: false,
        showNewPostButton: false
    };

    const searchNavbarProps = {
        showSearchBar: true,
        showNewPostButton: false
    };

    const myPostsNavbarProps = {
        openModal: openModal,
        showSearchBar: false,
        showNewPostButton: true
    };

    const feedsBookCardProps = {
        ShowFollowButton: false,
        ShowLikeButton: true,
        ShowEditButton: false,
        ShowDeleteButton: false
    }

    const searchBookCardProps = {
        ShowFollowButton: true,
        ShowLikeButton: false,
        ShowEditButton: false,
        ShowDeleteButton: false
    }

    const myPostsBookCardProps = {
        ShowFollowButton: false,
        ShowLikeButton: false,
        ShowEditButton: true,
        ShowDeleteButton: true
    }

    let navbarProps = {};
    let feedsPageBookCardProps = {};
    let searchPageBookCardProps = {};
    let myPostsPageBookCardProps = {};
    if (activeLink === 0) {
        navbarProps = feedsNavbarProps;
        feedsPageBookCardProps = feedsBookCardProps; 
    } else if (activeLink === 1) {
        navbarProps = searchNavbarProps;
        searchPageBookCardProps = searchBookCardProps; 
    } else if (activeLink === 2) {
        navbarProps = myPostsNavbarProps;
        myPostsPageBookCardProps = myPostsBookCardProps; 
    }

    const handleSignOut = () => {
        localStorage.clear();
        navigation("/");
    }

    return (
        <div>
            <Navbar {...navbarProps} handleSignOut={handleSignOut}/>
            <div className='body-container flex'>
                <div className="body-content">
                    {activeLink === 0 && 
                        <FeedsPage 
                            activeLink = {activeLink} 
                            handleLinkClick = {handleLinkClick}
                            feedsBookCardProps = {feedsPageBookCardProps} 
                        />}

                    {activeLink === 1 && 
                        <SearchPage 
                            activeLink = {activeLink}
                            handleLinkClick = {handleLinkClick}
                            searchBookCardProps = {searchPageBookCardProps} 
                        />}

                    {activeLink === 2 && 
                        <MyPosts 
                            activeLink = {activeLink} 
                            handleLinkClick = {handleLinkClick}
                            modalVisible = {modalVisible}
                            closeModal = {closeModal}
                            myPostsBookCardProps = {myPostsPageBookCardProps}
                        />}
                </div>
            </div>
        </div>
    );
}

export default Landing;
