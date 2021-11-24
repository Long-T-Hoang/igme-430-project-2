import NavBar from "./NavBar"
import ReactDOM from 'react-dom';
import React from "react";

function Admin() {
    const fetchAllKits = () => {
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
                    <button className="remove-btn btn" type="button" data-id={kit._id} onClick={ event => deleteKit(event.target.dataset.id)}>Remove kit</button>
                    <hr className="content-divider" />
                </div>
            );

            ReactDOM.render(<div>{List}</div>, document.getElementById('kits'));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    fetchAllKits();
    
    // bind delete event
    const deleteKit = (kitID) => {
        console.log(kitID);

        fetch(`/deleteKit?id=${kitID}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(data => fetchAllKits())
        .catch((error) => {
            console.error('Error:', error);
        });
    };

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