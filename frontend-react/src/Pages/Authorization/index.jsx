import React, { useState, useEffect } from 'react';
import "./style.css"

import { sendRequest } from "../../Core/config/request";
import { requestMethods } from "../../Core/enums/requestMethods";
import { useNavigate } from "react-router-dom";
import { localStorageAction } from "../../Core/config/localstorage";


import userIcon from "../../Assets/Images/user.png"
import emailIcon from "../../Assets/Images/email.png"
import passwordIcon from "../../Assets/Images/lock.png"

const Authorization = () => {
    const [action, setAction] = useState("Login");
    const [signupErrorMessage, setSignupErrorMessage] = useState("");
    const [signInErrorMessage, setSignInErrorMessage] = useState("");
    const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);

    const navigation = useNavigate();
    
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (isErrorDisplayed) {
            const timeoutId = setTimeout(() => {
                setSignupErrorMessage("");
                setSignInErrorMessage("");
                setIsErrorDisplayed(false);
            }, 2000);
    
            return () => clearTimeout(timeoutId);
        }
    }, [isErrorDisplayed]);

    const handleActionChange = () => {
        setAction(action === "Login" ? "Sign Up" : "Login");
        setFormData(initialFormData);
    }

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        if (action === "Sign Up") {
            try {
                console.log(formData)
                const response = await sendRequest({
                  route: "/auth/register",
                  method: requestMethods.POST,
                  body: formData
                })
                console.log(response)
              } catch (error) {
                navigation("/");
                if (error.response.status === 400 && error.response.data.message === "Email already exists") {
                    setSignupErrorMessage("Email already exists");
                    setIsErrorDisplayed(true);
                }
              }
        } else {
            try {
                const response = await sendRequest({
                  route: "/auth/login",
                  method: requestMethods.POST,
                  body: formData
                });
                console.log(response)
                localStorageAction('token', response.token);
                localStorageAction('userId', response.user.id);
                localStorageAction('firstName', response.user.firstName);
                localStorageAction('lastName', response.user.lastName);
                localStorageAction('email', response.user.email);
                navigation("/Landing");
              }catch (error) {
                if (error.response && error.response.status === 401) {
                    setSignInErrorMessage("Incorrect username or password.");
                    setIsErrorDisplayed(true);
                } else if (error.response.status === 404) {
                    setSignInErrorMessage("User not found. Please check your email.");
                    setIsErrorDisplayed(true);
                }
            }
        }
        
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
                                    value={formData.firstName}
                                    onChange={e => handleInputChange("firstName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input flex">
                                <img src={userIcon} alt="" />
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    value={formData.lastName}
                                    onChange={e => handleInputChange("lastName", e.target.value)}
                                    required />
                            </div>
                        </>
                    )}
                    <div className="input flex">
                        <img src={emailIcon} alt="" />
                        <input
                            type="email"
                            placeholder='Email'
                            value={formData.email}
                            onChange={e => handleInputChange("email", e.target.value)}
                            required />
                    </div>
                    <div className="input flex">
                        <img src={passwordIcon} alt="" />
                        <input
                            type="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={e => handleInputChange("password", e.target.value)}
                            required />
                    </div>
                    {signupErrorMessage && (
                    <div className="error-message">{signupErrorMessage}</div>)}
                    {signInErrorMessage && (
                    <div className="error-message">{signInErrorMessage}</div>)}
                    {action === "Login" && (
                        <div className="forgot-password flex center">Forgot your password? <span className='pointer'> Click Here!</span></div>
                    )}
                    <div className="submit-container flex center gap-50">
                        {action === "Sign Up" ? (
                            <button className={`submit pointer`} onClick={handleSubmit}>Sign Up</button>
                        ) : (
                            <button className={`submit pointer`} onClick={handleSubmit}>Login</button>
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
