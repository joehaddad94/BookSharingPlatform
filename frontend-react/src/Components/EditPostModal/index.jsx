import React, { useState } from 'react';
import './style.css';

const EditPostModal = ({ modalVisible, closeModal, handleOverlayClick, handleInputChange, handleEditPost, formData, editPostData }) => {
   

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
                                value={editPostData.bookName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={editPostData.author}
                                onChange={handleInputChange}
                            />
                            <textarea
                                name="review"
                                placeholder="Review"
                                value={editPostData.review}
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
                                value={editPostData.picture}
                                onChange={handleInputChange}
                            />

                            <div className="modal-buttons flex">
                                <button className="post-button" onClick={() => handleEditPost(editPostData)}>Edit</button>
                                <button className="close-button" onClick={closeModal}>Cancel</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditPostModal;
