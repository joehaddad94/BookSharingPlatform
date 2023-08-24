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
import EditPostModal from '../../Components/EditPostModal'

const MyPosts = ({ activeLink, handleLinkClick, modalVisible, myPostsBookCardProps, setModalVisible }) => {

    const [myPostsData, setmyPostsData] = useState([]);
    const [isAlteredPost, setIsAlteredPost] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editPostData, setEditPostData] = useState(null);
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
    
            if (editModalVisible) {
                setEditPostData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
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

const handleDeletePost = async (postId) => {
    try {
        console.log(postId);
        const response = await sendRequest({
            route: `posts/delete_post/${postId}`,
            method: requestMethods.DELETE,
        });
        console.log('Response:', response);
        setIsAlteredPost(true);
    } catch (error) {
        console.log('Error deleting post', error);
    }
}

const openEditPostModal = (postData) => {
    setEditModalVisible(true);
    setEditPostData(postData);

};

const handleEditPost = async(editPostData) => {

    const data = {
        'bookName': editPostData.bookName,
        'author': editPostData.author,
        'review': editPostData.review,
        'picture': editPostData.picture
    }

    try {
        const response = await sendRequest({
            route: `/posts/update_post/${editPostData._id}`,
            method: requestMethods.POST,
            body: data,
        });

        console.log(response);
        setIsAlteredPost(true);
        closeModal();
    } catch (error) {
        console.log('Error updating post', error);
    }
}

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
                    <BookCard {...myPostsBookCardProps} 
                        myPostsData = {myPostsData}
                        handleDeletePost ={handleDeletePost}
                        openEditPostModal = {openEditPostModal}
                        />
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
                {editModalVisible && (
                     <EditPostModal
                        closeModal={() => setEditModalVisible(false)}
                        modalVisible={editModalVisible}
                        postData={editPostData}
                        handleOverlayClick={handleOverlayClick}
                        handleInputChange={handleInputChange}
                        editPostData = {editPostData}
                        formData={formData}
                        handleEditPost = {handleEditPost}
                            />
                        )}
        </div>
    );
}

export default MyPosts;
