import React from "react";
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
            observer.publish('redirect', json);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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

                <p>Don't have an account? <a className="span-btn" href="/signup">Sign up here!</a></p>
                <input className="btn" type="submit" value="Login" />

                <div id="content"></div>
            </form>
        </div>
    );
};

function LoginPage() {
    // creating observer event to redirect 
    const navigate = useNavigate();
    const listener = observer.subscribe('redirect', (data) => {
        sessionStorage.username = data.username;
        navigate(data.redirect);
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