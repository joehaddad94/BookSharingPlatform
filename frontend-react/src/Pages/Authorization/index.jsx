import React, { useState } from 'react';
import "./style.css"

import { sendRequest } from "../../Core/config/request";
import { requestMethods } from "../../Core/enums/requestMethods";
import { useNavigate } from "react-router-dom";

import userIcon from "../../Assets/Images/user.png"
import emailIcon from "../../Assets/Images/email.png"
import passwordIcon from "../../Assets/Images/lock.png"

const Authorization = () => {
    const [action, setAction] = useState("Login");
    const navigation = useNavigate();
    
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormData);

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
        const jsonData = JSON.stringify(formData);
        console.log("JSON ", jsonData)
        if (action === "Sign Up") {
            try {
                const response = await sendRequest({
                  route: "/auth/register",
                  method: requestMethods.POST,
                  data: jsonData
                });
                console.log("response: ", response)
              } catch (error) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                  navigation("/");
                }
              }
        } else {
            console.log("jsonData:", jsonData);
            try {
                const response = await sendRequest({
                  route: "/auth/login",
                  method: requestMethods.POST,
                  data: jsonData
                });
                
                // const data = await response.json();
                console.log(response.data)
              } catch (error) {
                console.log(error.response.status);
                if (error.response.status === 401) {
                  navigation("/Landing");
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
