import { set } from "lodash";
import React from "react";
import ReactDOM from 'react-dom';
import NavBar from "./NavBar";

function KitList (){
    const date = new Date();
    const [name, setName] = React.useState("RG Nu Gundam");
    const [releaseYear, setReleaseYear] = React.useState(2019);
    const [grade, setGrade] = React.useState("RG");
    const [minPrice, setMinPrice] = React.useState(500);
    const [maxPrice, setMaxPrice] = React.useState(5000);

    // clamp for max and min price sliders
    const maxPriceClamp = (newMin) => {
        if(newMin > maxPrice){
            setMaxPrice(newMin);
        }

        setMinPrice(newMin);
    };

    const minPriceClamp = (newMax) => {
        if(newMax < minPrice)
        {
            setMinPrice(newMax);
        }

        setMaxPrice(newMax);
    };

    const handleSubmit = (event) => {
        const url = `getKits?name=${name}&releaseYear=${releaseYear}&grade=${grade}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        // adding new kit
        fetch(url, {
            method: 'GET',
            mode: 'cors',
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const List = data.kits.map((kit) => 
                <div key={kit._id} className="entry box content">
                    <p>Name: {kit.name}</p>
                    <p>Release Year: {kit.releaseYear}</p>
                    <a className="detail-page button is-primary" href={`kit/${kit._id}`}>Details</a>
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
        <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
            <NavBar />
                
            <main className="background fill-page is-flex is-flex-direction-column is-justify-content-center">
                <h3 className="title">Search GunPla kits</h3>
            
                <form id="searchForm" className="is-flex is-flex-direction-column is-align-content-stretch" onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Name: </label>
                        <input className="input is-primary" id="nameField" type="text" name="name" value={name} onChange={ event => setName(event.target.value) } />
                    </div>

                    <div className="field">
                        <label>Release Year: </label>
                        <input className="input is-primary" id="releaseYearField" type="number" name="releaseYear" min="2000" max={date.getFullYear()} step="1" value={releaseYear} onChange={ event => setReleaseYear(event.target.value) } />
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
                        <label>Min MSRP (in Yen): {minPrice}</label> <br/>
                        <input id="minPriceField" type="range" min="100" max="50000" step="100" value={minPrice} onChange={ event => setMinPrice(event.target.value)} />
                    </div>

                    <div className="field">
                        <label>Max MSRP (in Yen): {maxPrice}</label> <br/>
                        <input id="maxPriceField" type="range" min="100" max="50000" step="100" value={maxPrice} onChange={ event => setMaxPrice(event.target.value)} />
                    </div>

                    <input className="button is-primary" type="submit" value="Get Kit" />

                    <p id="content"></p>
                </form>
                
                <div id="kits"></div>
            </main>

            <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>
        </div>
    );
};

export default KitList;