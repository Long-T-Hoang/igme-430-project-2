import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";
import helper from "../helper/helper.js";

function UploadForm(props) {
    const input = document.querySelector('input[type="file]');
    const date = new Date();
    const [name, setName] = React.useState("");
    const [releaseYear, setReleaseYear] = React.useState(date.getFullYear());
    const [msrp, setMSRP] = React.useState(0);
    const [image, setImage] = React.useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        const kitToUpload = {
            "name": name, 
            "releaseYear": releaseYear,
            "msrp": msrp,
            "image": "",
        };
        console.log(event.target.querySelector('input[type="file"]').files[0]);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("releaseYear", releaseYear);
        formData.append("msrp", msrp);
        formData.append("image", event.target.querySelector('input[type="file"]').files[0]);

        for(let value of formData.keys())
        {
            console.log(value);
        }
        
        // adding new kit
        fetch(`/addKit?_csrf=${props.csrf}`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    };

    return (
        <div id="uploadForm">
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
                    <label>Image:</label>
                    <input id="imageField" type="file" name="image" value={image} onChange={ event => setImage(event.target.value) } />
                </div>

                <input className="btn" type="submit" value="Add Kit" />

                <div id="content"></div>
            </form>
        </div>
    );
};

function Upload () {
    
    helper.getToken((data) => {
        ReactDOM.render(<UploadForm csrf={data.csrfToken} />, document.querySelector("main"));
    });

    return (
        <div className="upload">
            <NavBar />
            
            <main></main>
        </div>
    );
};

export default Upload;