import React, { useState } from 'react';
import "./style.css"

import Input from "../../Components/Input"
import userIcon from "../../Assets/Images/user.png"
import emailIcon from "../../Assets/Images/email.png"
import passwordIcon from "../../Assets/Images/lock.png"

const Authorization = () => {
    const [action, setAction] = useState("Login");

    const handleActionChange = () => {
        setAction(action === "Login" ? "Sign Up" : "Login");
    }

    return (
        <div className="main-auth-container flex center">
            <div className='auth-container flex column center'>
                <div className="header flex column center gap-15">
                    <div className="title">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs flex column">
                    {action === "Sign Up" && (
                        <>
                            <div className="input flex">
                                <img src={userIcon} alt="" />
                                <input
                                    type="text"
                                    placeholder='First Name'
                                    required
                                />
                            </div>
                            <div className="input flex">
                                <img src={userIcon} alt="" />
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    required />
                            </div>
                        </>
                    )}
                    <div className="input flex">
                        <img src={emailIcon} alt="" />
                        <input
                            type="email"
                            placeholder='Email'
                            required />
                    </div>
                    <div className="input flex">
                        <img src={passwordIcon} alt="" />
                        <input
                            type="password"
                            placeholder='Password'
                            required />
                    </div>
                    {action === "Login" && (
                        <div className="forgot-password flex center">Forgot your password? <span className='pointer'> Click Here!</span></div>
                    )}
                    <div className="submit-container flex center gap-50">
                        {action === "Sign Up" ? (
                            <button className={`submit pointer`}>Sign Up</button>
                        ) : (
                            <button className={`submit pointer`}>Login</button>
                        )}
                    </div>
                    <div className="action-toggle flex center">
                        <span className='action-toggle-button pointer' onClick={handleActionChange}>
                            {action === "Login" ? "Sign Up" : "Login"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authorization;
