import NavBar from "./NavBar"

function Admin() {
    return (
        <div className="admin">
            <NavBar/>
            
            <main>
                <h2>Admin page</h2>
                <p id="content"></p>
                <hr/>
                <div id="kits"></div>
            </main>
        </div>
    );
};

export default Admin;