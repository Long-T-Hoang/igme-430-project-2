import React from "react";
import NavBar from "./NavBar";

function Upload () {
    const date = new Date();
    const [name, setName] = React.useState("");
    const [releaseYear, setReleaseYear] = React.useState(date.getFullYear());
    const [msrp, setMSRP] = React.useState(0);
    const [imageURL, setImageURL] = React.useState("");

    const handleSubmit = (event) => {
        const kitToUpload = {
            "name": name, 
            "releaseYear": releaseYear,
            "msrp": msrp,
            "imageURL": imageURL,
        };
        console.log(kitToUpload);
        
        // adding new kit
        fetch('/addKit', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kitToUpload),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        event.preventDefault();
    };

    return (
        <div className="upload">
            <NavBar />
            
            <main>
                <h3>Add GunPla kits</h3>
                <form id="uploadForm" onSubmit={handleSubmit}>
                    <div className="form-div">
                        <label>Name: </label>
                        <input id="nameField" type="text" name="name" value={name} onChange={ event => setName(event.target.value) } />
                    </div>

                    <div className="form-div">
                        <label>Release Year: </label>
                        <input id="releaseYearField" type="number" name="releaseYear" min="2000" max="2021" step="1" value={releaseYear} onChange={ event => setReleaseYear(event.target.value) } />
                    </div>

                    <div className="form-div">
                        <label>MSRP (in Yen):</label>
                        <input id="msrpField" type="number" name="msrp" step="100" value={msrp} onChange={ event => setMSRP(event.target.value) } />
                    </div>
                    
                    <div className="form-div">
                        <label>Link to image:</label>
                        <input id="imageURLField" type="text" name="imageURL" value={imageURL} onChange={ event => setImageURL(event.target.value) } />
                    </div>

                    <input className="btn" type="submit" value="Add Kit" />

                    <div id="content"></div>
                </form>
            </main>
        </div>
    );
};

export default Upload;