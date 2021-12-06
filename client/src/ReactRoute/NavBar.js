import { Link } from "react-router-dom";

function NavBar() {
    return (
      <div className="nav-bar">
        <div id="logo">
          <h1>GunPla Collection</h1>
        </div>
        
        <header>
            <Link to="/" className="header-link">Main</Link>
            <Link to="/kits" className="header-link">Kits</Link>
            <Link to="/upload" className="header-link">Upload</Link>
            <Link to="/admin" className="header-link">Admin</Link>
            <Link to="/account" className="header-link">Account</Link>
            <Link to="/login" className="header-link">Login</Link>
        </header>
      </div>
    );
};

export default NavBar;
  