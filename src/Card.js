import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './index.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import { gapi } from 'gapi-script';


let customStyle = {
    color: '#4F3BF7'
}
const Card = () => {
    const [data, setData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    const inputEvent = (event) => {
        // console.log(event.target.value);
        // console.log(event.target.name);

        const value = event.target.value;
        const name = event.target.name;
        setData((prev) => {
            if (name === 'fname') {
                return {
                    // fname: value,
                    // lname: prev.lname,
                    // email: prev.email,
                    // password: prev.password
                    ...prev, [name]: value
                };
            }
            else if (name === 'lname') {
                return {
                    ...prev, [name]: value
                };
            }
            else if (name === 'email') {
                return {
                    ...prev, [name]: value
                };
            }
            else if (name === 'password') {
                return {
                    ...prev, [name]: value
                };
            }
        })
    }
    const submitBtn = (event) => {
        event.preventDefault()
        const value = event.target.value;
        const name = event.target.name;

        const mail = document.getElementById('mail');
        // console.log(mail.value);
        let reg = /^[a-zA-Z0-9._]+@+[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
        if (!reg.test(document.getElementById('mail').value)) {
            // const mail = document.getElementById('mail');
            document.getElementById('warning').style.display = 'block';
            mail.style.border = "2px solid red";
            return false;
        }
        else {
            const alertVal = alert(`Welcome ${data.fname} ${data.lname}`);
            setData({ ...data, [name]: value });
            if (alertVal === undefined) {
                setData(() => {
                    return ({
                        fname: "",
                        lname: "",
                        email: "",
                        password: ""
                    })
                })
            }
            mail.style.border = "";
            document.getElementById('warning').style.display = '';
        }
    }
    const onLoginSuccess = () => {
        // console.log('Login Success:', res.profileObj);
        console.log('Login Success');
        alert("You have been logged in successfully. Click on the same link to log out!");
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };
    return (
        <div className="cardDiv d-flex align-items-center justify-content-center">
            <form action="" id="form" className="d-flex flex-column align-items-center justify-content-center">
                <span>
                    <input type="text" className="name inp" id="fname" placeholder="First name" onChange={inputEvent} name="fname" value={data.fname} />
                    <input type="text" className="name inp" placeholder="Last name" onChange={inputEvent} name="lname" value={data.lname} />
                </span>
                <input type="email" className="input inp" id="mail" placeholder="Email address" onChange={inputEvent} name="email" value={data.email} />
                <p id="warning">Please enter valid email address!</p>
                <input type="password" className="input inp" placeholder="Password" onChange={inputEvent} name="password" value={data.password} />
                <span>
                    <input type="checkbox" id="check" /> <label htmlFor="" className="text ms-2 mb-3">Subscribe to our newsletter</label>
                </span>
                <button className="input btn btn-primary p-3 fs-5 mb-5" id="signupBtn" type="submit" onClick={submitBtn}>SIGN UP</button>
                <p className="text mb-5">or sign up with:</p>
                <ul className="d-flex bg-light">
                    <li className="bg-light ms-4 me-5"><i className="fa-brands fa-facebook-f icons fs-3"></i></li>

                    <li className="bg-light ms-4 me-5">
                        {showloginButton ?
                            <GoogleLogin
                                clientId={process.env.REACT_APP_CLIENT_ID}
                                render={renderProps => (
                                    <i onClick={renderProps.onClick} style={customStyle} className="fa-brands fa-google icons fs-3"></i>
                                )}
                                buttonText=""
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            /> : null}

                        {showlogoutButton ?
                            <GoogleLogout
                                clientId={process.env.REACT_APP_CLIENT_ID}
                                render={renderProps => (
                                    <i onClick={renderProps.onClick} style={customStyle} className="fa-brands fa-google icons fs-3 cursor-pointer"></i>
                                )}
                                buttonText=""
                                onLogoutSuccess={onSignoutSuccess}
                            >
                            </GoogleLogout> : null
                        }
                    </li>
                    <li className="bg-light ms-4 me-5"><TwitterIcon className="icons fs-2" /></li>
                    <li className="bg-light ms-4 me-5"><GitHubIcon className="icons fs-2" /></li>
                </ul>
            </form>
        </div>
    )
}

export default Card;