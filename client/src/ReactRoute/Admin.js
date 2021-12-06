import NavBar from "./NavBar"
import ReactDOM from 'react-dom';
import React from "react";
import helper from '../helper/helper.js';

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
            const List = data.kits.map((kit) => 
                <div key={kit._id} className="kit-result">
                    <p>Name: {kit.name}</p>
                    <p>Release Year: {kit.releaseYear}</p>
                    <a className="detail-page" href={`kit/${kit._id}`}>Details</a>
                    <button className="remove-btn btn" type="button" data-id={kit._id} onClick={ event => addToAccount(event.target.dataset.id, csrf)}>Add kit to account</button>
                    <button className="remove-btn btn" type="button" data-id={kit._id} onClick={ event => deleteKit(event.target.dataset.id, csrf)}>Remove kit</button>
                    <hr className="content-divider" />
                </div>
            );

            ReactDOM.render(<div>{List}</div>, document.getElementById('kits'));
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
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    // delete kit from database event
    const deleteKit = (kitID, csrf) => {
        console.log(kitID);

        fetch(`/deleteKit?id=${kitID}&_csrf=${csrf}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(() => fetchAllKits())
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    helper.getToken((data) => {
        fetchAllKits(data.csrfToken);
    });
    
    return (
        <div className="admin">
            <NavBar/>
            
            <main>
                <h2>Admin page</h2>
                <p id="content"></p>
                <hr/>
                <div id="kits">
                </div>
            </main>
        </div>
    );
};

export default Admin;