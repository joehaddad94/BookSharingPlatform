import React from 'react';
import './style.css'

import Book1 from '../../Assets/Images/book1.jpg'
import profileUser from '../../Assets/Images/profile-user.png'

const BookCard = ({ ShowFollowButton, ShowLikeButton, ShowEditButton, ShowDeleteButton }) => {
    return (
        <div className='card-main-container fullwidth'>
            <div className="card-container">
                <div className="top-card flex">
                <div className="user-container flex">
                    <img src={ profileUser} alt="Profile Pic" />
                    <h3>Username</h3>
                </div>
                {ShowFollowButton && <button className='pointer'>Follow</button>}
                </div>
                <div className="bot-card flex">
                    <div className="bot-left-card">
                        <div className='card-img-container'>
                            <img src={Book1} alt="" />
                        </div>
                    </div>
                    <div className="bot-right-card">
                        <div className="book-info">
                            <h2 className="book-title">Book Name:</h2>
                            <p>"Never Split The Difference"</p>
                            <div className="spacer-30"></div>
                            <h2 className="book-title">Author:</h2>
                            <p>Chris Voss</p>
                            <div className="spacer-30"></div>
                            <h2 className="book-title">Review:</h2>
                            <p>"It is a very interesting book."</p>
                        </div>
                        <div className="spacer-30"></div>
                        <div className="bot-right-buttons">
                            {ShowLikeButton && <button className="like-button">Like</button>}
                            {ShowEditButton && <button className="edit-button">Edit</button>}
                            {ShowDeleteButton && <button className="delete-button">Delete</button>}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default BookCard;
