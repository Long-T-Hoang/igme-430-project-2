import NavBar from "./NavBar";

function KitList (){
    return (
        <div className="kit-list">
            <NavBar />
            
            <main>
                <h3>Search GunPla kits</h3>
                <form id="searchForm" action="/getKits" method="get">
                    <div className="form-div">
                        <label for="name">Name: </label>
                        <input id="nameField" type="text" name="name" />
                    </div>
                    <div className="form-div">
                        <label for="releaseYear">Release Year: </label>
                        <input id="releaseYearField" type="number" name="releaseYear" min="2000" max="2021" step="1" value="2018"/>
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