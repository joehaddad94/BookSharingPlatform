import React from 'react';
import './style.css'

import profileUser from '../../Assets/Images/profile-user.png'

const BookCard = ({ ShowFollowButton, ShowLikeButton, ShowEditButton, ShowDeleteButton, followedPostsData, allPostsData, myPostsData, handleDeletePost, openEditPostModal, filteredPostsData, onFollow }) => {
    const dataToRender = followedPostsData || filteredPostsData || allPostsData || myPostsData || [];
    console.log(dataToRender)
    return (
        <div className='card-main-container fullwidth'>
            {dataToRender.map((item, index) => {
                {/* const isFollowed = followedPostsData?.some(post => post._id === item._id);
                console.log('item._id:', item._id);
                console.log('followedPostsData:', followedPostsData);
                console.log('isFollowed:', isFollowed); */}
                {/* console.log('post',item); */}
                return (
                    <div className="card-container" key={item._id}>
                        <div className="top-card flex">
                            <div className="user-container flex">
                                <img src={profileUser} alt="Profile Pic" />
                                <h3>{item.postedBy.firstName} {item.postedBy.lastName}</h3>
                            </div>
                            {ShowFollowButton && <button className='pointer' onClick={() => onFollow(item._id)}>Follow</button>}
                        </div>
                        <div className="bot-card flex">
                            <div className="bot-left-card">
                                <div className='card-img-container'>
                                    <img src={item.picture} alt="" />
                                </div>
                            </div>
                            <div className="bot-right-card">
                                <div className="book-info">
                                    <h2 className="book-title">Book Name:</h2>
                                    <p>"{item.bookName}"</p>
                                    <div className="spacer-30"></div>
                                    <h2 className="book-title">Author:</h2>
                                    <p>{item.author}</p>
                                    <div className="spacer-30"></div>
                                    <h2 className="book-title">Review:</h2>
                                    <p>"{item.review}"</p>
                                </div>
                                <div className="spacer-30"></div>
                                <div className="bot-right-buttons">
                                    <div className="likes flex">
                                    {ShowLikeButton && <p>{item.likesCount}</p>} 
                                    {ShowLikeButton &&
                                    <button className="like-button">Like</button>}
                                    </div>
                                    {ShowEditButton && <button className="edit-button" onClick = {() => openEditPostModal(item)}>Edit</button>}
                                    {ShowDeleteButton && <button className="delete-button" onClick= {() => handleDeletePost(item._id)}>Delete</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default BookCard;
