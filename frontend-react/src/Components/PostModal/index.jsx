import React, { useState } from 'react';
import './style.css';

import { sendRequest } from "../../Core/config/request"
import { requestMethods } from "../../Core/enums/requestMethods";
import { localStorageAction } from "../../Core/config/localstorage";

const PostModal = ({ modalVisible, closeModal, handleOverlayClick, handleInputChange, handlePost, formData }) => {
   

    return (
        <div>
            {modalVisible && (
                <div className="modal">
                    <div className="overlay" onClick={handleOverlayClick}>
                        <div className="modal-content flex column">
                            <h1>Add a New Book</h1>
                            <div className="spacer-30"></div>
                            <input
                                type="text"
                                name="bookName"
                                placeholder="Book Name"
                                value={formData.bookName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={formData.author}
                                onChange={handleInputChange}
                            />
                            <textarea
                                name="review"
                                placeholder="Review"
                                value={formData.review}
                                onChange={handleInputChange}
                            />
                            {/* <input
                                type="file"
                                name="picture"
                                accept="image/*"
                                onChange={handleInputChange}
                            /> */}
                            <input
                                type="text"
                                name="picture"
                                placeholder="Image URL"
                                value={formData.picture}
                                onChange={handleInputChange}
                            />

                            <div className="modal-buttons flex">
                                <button className="post-button" onClick={handlePost}>Post</button>
                                <button className="close-button" onClick={closeModal}>Cancel</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostModal;
