import React, { useState } from 'react';
import './style.css';

const PostModal = ({ modalVisible, closeModal }) => {
    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        picture: null, // Use null initially for the image file
        review: '',
    });

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
       
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: e.target.files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handlePost = () => {
        const jsonData = JSON.stringify(formData);

        
        console.log('JSON Data:', jsonData);

        
        closeModal();
    };

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
                            <input
                                type="file"
                                name="picture"
                                accept="image/*"
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
