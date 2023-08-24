import React, { useState } from 'react';
import './style.css';

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";


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
    const [allPostsData, setAllPostsData] = useState([]);
    const [filteredPostsData, setFilteredPostsData] = useState([]);
    const [followedPostsData, setFollowedPostsData] = useState([]);
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

    const fetchAllPosts = async () => {
        try {
            const response = await sendRequest({
                route:"/posts/get_all_posts",
                method: requestMethods.GET,
            });
            // console.log(response);
            setAllPostsData(response);
            setFilteredPostsData(response);
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 401) {
            navigation("/");
            }
        }
    }

    const fetchFollowedPosts = async () => {
        try {
            const response = await sendRequest({
                route:"/posts/get_followed_posts",
                method: requestMethods.GET,
            });
            console.log('followedPosts: ', response)
            setFollowedPostsData(response)
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 401) {
            navigation("/");
            }
        }
    }

    const handleSearch = (query) => {
        console.log(query)
        const lowerCaseQuery = query.toLowerCase();
        const filteredPosts = allPostsData.filter((post) =>
            post.bookName.toLowerCase().includes(lowerCaseQuery) ||
            post.author.toLowerCase().includes(lowerCaseQuery) ||
            post.review.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredPostsData(filteredPosts);
        console.log('allPostsData', allPostsData)
        console.log('filteredPostsData', filteredPostsData)
    };
    
    const handleFollow = async (postId) => {
        try {
          const response = await sendRequest({
            route: '/posts/follow_user',
            method: requestMethods.POST,
            body: { userIdToFollow: postId }
          });
      
          console.log(response.message);
         
          const updatedPosts = allPostsData.map(post => 
            post._id === postId ? { ...post, isFollowed: true } : post
          );
      
          setAllPostsData(updatedPosts);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <Navbar {...navbarProps} 
                handleSignOut={handleSignOut}
                onSearch = {handleSearch}
            />
            <div className='body-container flex'>
                <div className="body-content">
                    {activeLink === 0 && 
                        <FeedsPage 
                            activeLink = {activeLink} 
                            handleLinkClick = {handleLinkClick}
                            feedsBookCardProps = {feedsPageBookCardProps}
                            followedPostsData = {followedPostsData}
                            fetchFollowedPosts = {fetchFollowedPosts} 
                        />}

                    {activeLink === 1 && 
                        <SearchPage 
                            activeLink = {activeLink}
                            handleLinkClick = {handleLinkClick}
                            searchBookCardProps = {searchPageBookCardProps}
                            fetchAllPosts = {fetchAllPosts} 
                            allPostsData = {allPostsData}
                            filteredPostsData = {filteredPostsData}
                            followedPostsData = {followedPostsData}
                            onSearch={handleSearch}
                            onFollow={handleFollow}
                        />}

                    {activeLink === 2 && 
                        <MyPosts 
                            activeLink = {activeLink} 
                            handleLinkClick = {handleLinkClick}
                            modalVisible = {modalVisible}
                            // closeModal = {closeModal}
                            myPostsBookCardProps = {myPostsPageBookCardProps}
                            setModalVisible = {setModalVisible}
                        />}
                </div>
            </div>
        </div>
    );
}

export default Landing;
