import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";
import helper from "../helper/helper.js";

// fetch kit details
const getKitDetail = (csrf, kitID, callback) => {
    const url = `/getKit?_csrf=${csrf}&id=${kitID}`;
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        callback(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// fetch all kits in the account
const fetchKits = (csrf, callback) => {
    const url = `/getAccountKits?_csrf=${csrf}`;

    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        // redirect
        if(data.redirect)
        {
            window.location.href = data.redirect;
        }

        const List = data.kits.map((kit) => {
            
            // getting the kit details
            getKitDetail(csrf, kit.kitID, (data) => {
                ReactDOM.render(
                    <div>
                        <p>Name: {data.kits[0].name}</p>
                        <p>Release Year: {data.kits[0].releaseYear}</p>
                    </div>,
                    document.querySelector(`.kitDetail[value='${kit.kitID}']`)
                );
            });

            return (
                <div key={kit._id} className="kit-result">
                    <div className="kitDetail" value={kit.kitID}>
                    </div>
                    <p>Quantity: {kit.quantity}</p>
                    <a className="detail-page" href={`kit/${kit.kitID}`}>Details</a>
                    <hr className="content-divider" />
                </div>
            );
        });

        callback(List);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// wrapper for account's kit list
function AccountKits(props) {
    fetchKits(
        props.csrf, 
        (List) => {
            ReactDOM.render(<div>{List}</div>, document.querySelector("#accountKitList"));
        });

    return (
        <div id="accountKit">
            <input type="hidden" id="_csrf" value={props.csrf} />

            <div id="accountKitList">
            </div>
        </div>
    );
};

function AccountPage() {
    helper.getToken((data) => ReactDOM.render(<AccountKits csrf={data.csrfToken} />, document.querySelector("main")));

    return (
        <div className="accountPage">
            <NavBar/>

            <main>
            </main>
        </div>
    );
};

export default AccountPage;