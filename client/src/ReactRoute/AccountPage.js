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

const updateAccountKit = (event, csrf, kitID) => {
    event.preventDefault();

    const newData = {
        kitID: kitID,
        quantity: event.target.querySelector('input[type="number"]').value,
    }
    console.log(newData);
    fetch(`/updateAccountKit?_csrf=${csrf}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json);
        helper.getToken((data) => ReactDOM.render(<AccountKits csrf={data.csrfToken} />, document.querySelector("#content")));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// fetch all kits in the account
const fetchKits = (csrf) => {
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
        
        if(data.kits.length === 0)
        {
            return ReactDOM.render(<div className="entry"><p>No kits added to account.</p></div>, document.querySelector("#accountKitList"));
        }

        const List = data.kits.map((kit) => {
            
            // getting the kit details
            getKitDetail(csrf, kit.kitID, (data) => {
                console.log(data);
                ReactDOM.render(
                    <div>
                        <p>Name: {data.kits[0].name}</p>
                        <p>Release Year: {data.kits[0].releaseYear}</p>
                    </div>,
                    document.querySelector(`.kitDetail[value='${kit.kitID}']`)
                );
            });

            return (
                <div key={kit._id} className="entry box field is-flex is-justify-content-space-between is-flex-direction-row is-align-content-baseline">
                    <div>
                        <div className="kitDetail" key={kit.kitID} value={kit.kitID}>
                        </div>
                        <p>Quantity: {kit.quantity}</p>
                    </div>

                    <form className="is-flex is-flex-direction-column is-align-content-stretch is-justify-content-space-between"
                    onSubmit={(event) => { updateAccountKit(event, csrf, kit.kitID) }}>
                        <div className="control">
                            <label>New quantity: </label>
                            <input className="input" type="number" min="0" placeholder="1" />
                        </div>

                        <div className="control">
                            <input className="button is-primary" type="submit" value="Update"/>
                        </div>
                    </form>

                    <a className="button is-link" href={`kit/${kit.kitID}`}>Details</a>
                </div>
            );
        });

        return ReactDOM.render(<div>{List}</div>, document.querySelector("#accountKitList"));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

// wrapper for account's kit list
function AccountKits(props) {
    fetchKits(props.csrf);

    return (
        <div id="accountKit">
            <input type="hidden" id="_csrf" value={props.csrf} />

            <div id="accountKitList">
            </div>
        </div>
    );
};

function AccountPage() {
    helper.getToken((data) => ReactDOM.render(<AccountKits csrf={data.csrfToken} />, document.querySelector("#content")));

    return (
        <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar/>

            <main className="background fill-page">
                <h2 className="title">Account</h2>

                <div id="content"></div>

            </main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>  
        </div>
    );
};

export default AccountPage;