import React from 'react';
import './style.css'

import Book1 from '../../Assets/Images/book1.jpg'
import profileUser from '../../Assets/Images/profile-user.png'

const BookCard = ({ ShowFollowButton, ShowLikeButton, ShowEditButton, ShowDeleteButton, followedPostsData, allPostsData, myPostsData }) => {
    const dataToRender = followedPostsData || allPostsData || myPostsData || [];
    console.log(dataToRender) 
    return (
        <div className='card-main-container fullwidth'>
            {dataToRender.map((item, index) => {
                console.log('post',item);
                return (
                    <div className="card-container" key={item._id}>
                        <div className="top-card flex">
                            <div className="user-container flex">
                                <img src={profileUser} alt="Profile Pic" />
                                <h3>{item.postedBy.firstName} {item.postedBy.lastName}</h3>
                            </div>
                            {ShowFollowButton && <button className='pointer'>Follow</button>}
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
                                    {ShowEditButton && <button className="edit-button">Edit</button>}
                                    {ShowDeleteButton && <button className="delete-button">Delete</button>}
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
