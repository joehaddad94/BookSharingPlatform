import React from 'react';
import './style.css'

import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";
import { localStorageAction } from "../../Core/config/localstorage";


import Sidebar from '../../Components/Sidebar';
import BookCard from '../../Components/BookCard';
import PostModal from '../../Components/PostModal';

const MyPosts = ({ activeLink, handleLinkClick, modalVisible, myPostsBookCardProps, setModalVisible }) => {

    const [myPostsData, setmyPostsData] = useState([]);
    const [isAlteredPost, setIsAlteredPost] = useState(false);
    const navigation = useNavigate();

    const closeModal = () => {
        setFormData({
            bookName: '',
            author: '',
            picture: '',
            review: '',
        })
        setModalVisible(false);
      };

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await sendRequest({
                    route:"/posts/get_all_posts",
                    method: requestMethods.GET,
                });
                // console.log(response)
                const userId = localStorageAction('userId')
                // console.log("userId", userId)
                const filteredPosts = response.filter(post => post.postedBy._id === userId);
                // console.log(filteredPosts)
                setmyPostsData(filteredPosts)
                setIsAlteredPost(false)
            } catch (error) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                navigation("/");
                }
            }
        }
        fetchData();
    },[isAlteredPost])

    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        picture: '',
        review: '',
    });

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

   
        const handleInputChange = (e) => {
            const { name, value } = e.target;
    
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };
   

const handlePost = async () => {
    try {
        const response = await sendRequest({
            route: '/posts/create_post',
            method: 'POST',
            body: formData,
        });

        console.log('Response:', response);
        setIsAlteredPost(true)
        closeModal();
    } catch (error) {
        console.error('Error posting:', error);
    }
};

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
                    <BookCard {...myPostsBookCardProps} myPostsData = {myPostsData}/>
                </div>
            </div>
            {modalVisible && <PostModal 
                    closeModal={closeModal} 
                    modalVisible={modalVisible} 
                    handleOverlayClick = {handleOverlayClick} 
                    handleInputChange = {handleInputChange}
                    handlePost = {handlePost}
                    formData = {formData} 

                />}

        </div>
    );
}

export default MyPosts;
