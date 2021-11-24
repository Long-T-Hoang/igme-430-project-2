import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";

function KitList (){
    const date = new Date();
    const [name, setName] = React.useState("RG Nu Gundam");
    const [releaseYear, setReleaseYear] = React.useState(2021);

    const handleSubmit = (event) => {
        const url = `getKits?name=${name}&releaseYear=${releaseYear}`;
        // adding new kit
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data.kits);
            const List = data.kits.map((kit) => 
                <div key={kit._id} className="kit-result">
                    <p>Name: {kit.name}</p>
                    <p>Release Year: {kit.releaseYear}</p>
                    <a className="detail-page" href={`kit/${kit._id}`}>Details</a>
                    <hr className="content-divider" />
                </div>
            );

            ReactDOM.render(<div>{List}</div>, document.getElementById('kits'));
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    };

    return (
        <div className="kit-list">
            <NavBar />
            
            <main>
                <h3>Search GunPla kits</h3>
                <form id="searchForm" onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label>Name: </label>
                        <input id="nameField" type="text" name="name" value={name} onChange={ event => setName(event.target.value) } />
                    </div>
                    <div className="form-div">
                        <label>Release Year: </label>
                        <input id="releaseYearField" type="number" name="releaseYear" min="2000" max={date.getFullYear()} step="1" value={releaseYear} onChange={ event => setReleaseYear(event.target.value) } />
                    </div>

                    <input className="btn" type="submit" value="Get Kit" />

                    <p id="content"></p>
                </form>
                
                <hr id="main-divider" />

                <div id="kits"></div>
            </main>
        </div>
    );
};

export default KitList;