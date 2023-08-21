import React from 'react';
import './style.css'
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import BookCard from '../../Components/BookCard';

const Landing = () => {
    return (
        <div>
            <Navbar/>
            <div className='body-container flex'>
                <div className="body-sidebar"><Sidebar/></div>
                <div className="body-bookcard"><BookCard/></div>
            </div>
        </div>
    );
}

export default Landing;
