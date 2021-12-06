import React, { useState } from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import ReactObserver from 'react-event-observer';
import helper from '../helper/helper.js';

var observer = ReactObserver();

function LoginForm(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = (e, csrf) => {
        e.preventDefault();

        if(username === "" || password === "")
        {
            console.error("Username or password is empty");
            return;
        }

        // creating POST request body
        const bodyToUpload = {
            "username": username,
            "pass": password,
        };

        // send POST request to server
        const url = `/login?_csrf=${csrf}`;
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyToUpload),
        })
        .then(response => response.json())
        .then(json => {
            observer.publish('redirect', json.redirect);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const renderSignup = (csrf) => {
        console.log(csrf);
        ReactDOM.render(<SignupForm csrf={csrf} />, document.querySelector("main"));
    };
    
    return (
        <div className="login">
            <h3>Login</h3>
            <form id="loginForm" onSubmit={(event) => handleLogin(event, props.csrf)}>
                <div className="form-div">
                    <label>Username: </label>
                    <input id="usernameField" type="text" name="username" value={username} onChange={ event => setUsername(event.target.value) } />
                </div>

                <div className="form-div">
                    <label>Password:</label>
                    <input id="paswordField" type="password" name="password" value={password} onChange={ event => setPassword(event.target.value) } />
                </div>

                <input type="hidden" name="_csrf" value={props.csrf} />
                <p>Don't have an account? <a className="span-btn" onClick={() => renderSignup(props.csrf)}>Sign up here!</a></p>
                <input className="btn" type="submit" value="Login" />

                <div id="content"></div>
            </form>
        </div>
    );
};

function SignupForm(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const csrf = props.csrf;

    const renderLogin = (csrf) => {
        console.log(csrf);
        ReactDOM.render(<LoginForm csrf={csrf} />, document.querySelector("main"));
    };

    const handleSignup = (e, csrf) => {
        e.preventDefault();

        if(username === "" || password === "" || password2 === "")
        {
            console.error("Username, password or password2 is empty");
            return;
        }

        const bodyToUpload = {
            "username": username,
            "pass": password,
            "pass2": password2,
        };
        const url = `/signup?_csrf=${csrf}`;
        
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyToUpload),
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            observer.publish('redirect', json.redirect);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="signup">
            <h3>Signup</h3>
            <form id="signupForm" onSubmit={(event) => handleSignup(event, props.csrf)}>
                <div className="form-div">
                    <label>Username: </label>
                    <input id="usernameField" type="text" name="username" value={username} onChange={ event => setUsername(event.target.value) } />
                </div>

                <div className="form-div">
                    <label>Password:</label>
                    <input id="paswordField" type="password" name="password" value={password} onChange={ event => setPassword(event.target.value) } />
                </div>

                <div className="form-div">
                    <label>Re-enter Password:</label>
                    <input id="pasword2Field" type="password" name="password2" value={password2} onChange={ event => setPassword2(event.target.value) } />
                </div>

                <input type="hidden" name="_csrf" value={props.csrf} />
                <p>Already have an account? <a className="span-btn" onClick={() => renderLogin(props.csrf)}>Log in here!</a></p>
                <input className="btn" type="submit" value="Signup" />

                <div id="content"></div>
            </form>
        </div>
    );
};

function LoginPage() {
    // creating observer event to redirect 
    const navigate = useNavigate();
    const listener = observer.subscribe('redirect', (data) => {
        navigate(data);
    });

    helper.getToken((data) => {
        ReactDOM.render(<LoginForm csrf={data.csrfToken} />, document.querySelector("main"))
    });

    return (
        <div className="login">
            <NavBar/>

            <main>
            </main>
        </div>
    );
};

export default LoginPage;