import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";
import { useNavigate } from "react-router";
import ReactObserver from 'react-event-observer';
import helper from '../helper/helper.js';

var observer = ReactObserver();

function SignupForm(props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");

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
            observer.publish('redirect', json);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="signup">
            <h3>Signup</h3>
            <form id="signupForm" className="is-flex is-flex-direction-column is-align-content-stretch" onSubmit={(event) => handleSignup(event, props.csrf)}>
                <div className="field">
                    <label>Username: </label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-primary" id="usernameField" type="text" name="username" placeholder="username" 
                        value={username} onChange={ event => setUsername(event.target.value) } />

                        <span className="icon is-left">
                            <i className="fas fa-user"></i>
                        </span>

                        <span className="icon is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label>Password:</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-primary" id="paswordField" type="password" name="password" placeholder="password" 
                        value={password} onChange={ event => setPassword(event.target.value) } />

                        <span className="icon is-left">
                            <i className="fas fa-lock"></i>
                        </span>

                        <span className="icon is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>

                <div className="field">
                    <label>Re-enter Password:</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-primary" id="pasword2Field" type="password" name="password2" placeholder="re-enter your password" 
                        value={password2} onChange={ event => setPassword2(event.target.value) } />

                        <span className="icon is-left">
                            <i className="fas fa-lock"></i>
                        </span>

                        <span className="icon is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                </div>

                <p>Already have an account? <a className="span-btn" href="/login">Log in here!</a></p>
                
                <input className="button is-primary" type="submit" value="Signup" />

                <div id="message"></div>
            </form>
        </div>
    );
};

function SignupPage() {
    // creating observer event to redirect 
    const navigate = useNavigate();
    const listener = observer.subscribe('redirect', (data) => {
        sessionStorage.username = data.username;
        navigate(data.redirect);
    });

    helper.checkLoggedIn((data) => {
        if(data.loggedIn)
        {
            observer.publish('redirect', { redirect: '/account', username: data.username });
        }
    });
    
    helper.getToken((data) => {
        ReactDOM.render(<SignupForm csrf={data.csrfToken} />, document.querySelector("main"))
    });

    return (
        <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar/>

            <main className="background fill-page">
            </main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>
        </div>
    );
};

export default SignupPage;