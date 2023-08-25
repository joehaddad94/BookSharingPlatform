import React from 'react';
import './style.css'

const RightSideBar = () => {

    return(
        <div className='right-sidebar-main-container'>
            <div className="sidebar-content flex column">
                <div></div>
            <h1>Top 10 Books 2023</h1>
            <ul>
                <li><strong>To Kill a Mockingbird</strong> by Harper Lee</li>
                <li><strong>1984</strong> by George Orwell</li>
                <li><strong>The Lord of the Rings</strong> by J.R.R. Tolkien</li>
                <li><strong>The Great Gatsby</strong> by F. Scott Fitzgerald</li>
                <li><strong>Pride and Prejudice</strong> by Jane Austen</li>
                <li><strong>The Catcher in the Rye</strong> by J.D. Salinger</li>
                <li><strong>Animal Farm</strong> by George Orwell</li>
                <li><strong>The Hitchhiker's Guide to the Galaxy</strong> by Douglas Adams</li>
                <li><strong>The Handmaid's Tale</strong> by Margaret Atwood</li>
                <li><strong>The Alchemist</strong> by Paulo Coelho</li>
            </ul>
            </div>
        </div>
    )
}

export default RightSideBar;