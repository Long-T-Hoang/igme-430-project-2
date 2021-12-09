import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";
import helper from "../helper/helper.js";
import { set } from "lodash";

function UploadForm(props) {
    const date = new Date();
    const [name, setName] = React.useState("RG Nu Gundam");
    const [releaseYear, setReleaseYear] = React.useState(2019);
    const [msrp, setMSRP] = React.useState(100);
    const [image, setImage] = React.useState();
    const [grade, setGrade] = React.useState("RG");
    const [message, setMessage] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // setup formData to send to the server
        const formData = new FormData();
        formData.append("name", name);
        formData.append("releaseYear", releaseYear);
        formData.append("msrp", msrp);
        formData.append("grade", grade);

        if(event.target.querySelector('input[type="file"]').files[0])
        {
            formData.append("image", event.target.querySelector('input[type="file"]').files[0]);
        }

        // adding new kit
        fetch(`/addKit?_csrf=${props.csrf}`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div id="uploadForm" className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <form id="uploadForm" className="is-flex is-flex-direction-column is-align-content-stretch" onSubmit={handleSubmit}>
                <h3 className="title">Add GunPla kits</h3>
                <div className="field">
                    <label>Name: </label>
                    <input className="input is-primary" id="nameField" type="text" name="name" value={name} onChange={ event => setName(event.target.value) } />
                </div>

                <div className="field">
                    <label>Release Year: </label>
                    <input className="input is-primary" id="releaseYearField" type="number" name="releaseYear" min="2000" max="2021" step="1" value={releaseYear} onChange={ event => setReleaseYear(event.target.value) } />
                </div>

                <div className="field">
                    <label>MSRP (in Yen):</label>
                    <input className="input is-primary" id="msrpField" type="number" name="msrp" min="100" step="100" value={msrp} onChange={ event => setMSRP(event.target.value) } />
                </div>
                
                <div className="field">
                    <label>Grade:</label>
                    <select className="input select is-primary" id="gradeField" list="grades" name="grade" value={grade} onChange={ event => setGrade(event.target.value)}>
                        <option value="HG">High Grade (HG)</option>
                        <option value="RG">Real Grade (RG)</option>
                        <option value="MG)">Master Grade (MG)</option>
                        <option value="PG">Perfect Grade (PG)</option>
                    </select>
                </div>

                <div className="field">
                    <label>Image:</label>
                    <div className="file is-boxed is-small">
                        <label className="file-label">
                            <input className="file-input is-primary" id="imageField" type="file" name="image" value={image} onChange={ event => setImage(event.target.value) } />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"></i>
                                </span>
                                <span className="file-label">
                                    Choose a file...
                                </span>
                            </span>
                        </label>
                    </div>
                </div>

                <p>{message}</p>

                <input className="button is-primary" type="submit" value="Add Kit" />

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
        <div className="background content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar />
            
            <main id="kits-content" className="background fill-page"></main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>
        </div>
    );
};

export default Upload;