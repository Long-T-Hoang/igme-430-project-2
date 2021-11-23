import NavBar from "./NavBar";

function Upload () {
    return (
        <div className="upload">
            <NavBar />
            
            <main>
                <h3>Add GunPla kits</h3>
                <form id="uploadForm" action="/addKit" method="post">
                    <div className="form-div">
                        <label for="name">Name: </label>
                        <input id="nameField" type="text" name="name" />
                    </div>

                    <div className="form-div">
                        <label for="releaseYear">Release Year: </label>
                        <input id="releaseYearField" type="number" name="releaseYear" min="2000" max="2021" step="1"/>
                    </div>

                    <div className="form-div">
                        <label for="msrp">MSRP (in Yen):</label>
                        <input id="msrpField" type="number" name="msrp" step="100"/>
                    </div>
                    
                    <div className="form-div">
                        <label for="imageURL">Link to image:</label>
                        <input id="imageURLField" type="text" name="imageURL"/>
                    </div>

                    <input className="btn" type="submit" value="Add Kit" />

                    <div id="content"></div>
                </form>
            </main>
        </div>
    );
};

export default Upload;