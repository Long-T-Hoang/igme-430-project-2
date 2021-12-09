import NavBar from "./NavBar"
import ReactDOM from 'react-dom';
import React from "react";
import helper from '../helper/helper.js';
import ReactObserver from 'react-event-observer';
import { useNavigate } from "react-router";

var observer = ReactObserver();

function Admin() {
    const fetchAllKits = (csrf) => {
        fetch('/getAllKits', {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.kits.length === 0)
            {
                ReactDOM.render(<div className="entry"><p>No kits in the database</p></div>, document.getElementById('kits'));
                return;
            }
            
            // render list out kits if it's not empty
            const List = data.kits.map((kit) => 
                <div key={kit._id} className="entry box is-flex is-flex-direction-row is-justify-content-space-between">
                    <div className="text">
                        <p>Name: {kit.name}</p>

                        <p>Release Year: {kit.releaseYear}</p>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <a className="button is-link" href={`kit/${kit._id}`}>Details</a>
                        </div>

                        <div className="control">
                            <button className="button is-primary" type="button" data-id={kit._id} onClick={ event => addToAccount(event.target.dataset.id, csrf)}>Add kit to account</button>
                        </div>

                        <div className="control">
                            <button className="button is-primary" type="button" data-id={kit._id} onClick={ event => deleteKit(event.target.dataset.id, csrf)}>Remove kit</button>
                        </div>
                    </div>
                </div>
            );

            ReactDOM.render(<div> {List} </div>, document.getElementById('kits'));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    // add to account event
    const addToAccount = (kitID, csrf) => {
        const url = `/addAccountKit?_csrf=${csrf}`;

        const kitToAdd = {
            kitID: kitID,
            quantity: 1,
        };
        console.log(kitToAdd);
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kitToAdd)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.redirect) observer.publish('redirect', data);
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // delete kit from database event
    const deleteKit = (kitID, csrf) => {
        console.log(csrf);

        fetch(`/deleteKit?id=${kitID}&_csrf=${csrf}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(() => fetchAllKits(csrf))
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    helper.getToken((data) => {
        fetchAllKits(data.csrfToken);
    });

    // creating observer event to redirect 
    const navigate = useNavigate();
    const listener = observer.subscribe('redirect', (data) => {
        navigate(data.redirect);
    });

    return (
        <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar/>
            
            <main className="background fill-page">
                <h2 className="title">Admin page</h2>
                
                <p id="content"></p>
                <div id="kits">
                </div>
            </main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>  
        </div>
    );
};

export default Admin;