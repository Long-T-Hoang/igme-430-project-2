import React from 'react';
import { Link } from "react-router-dom";

import '../App.css';
import NavBar from './NavBar.js'

function App() {
  return (
    <div className="content is-flex is-justify-content-space-between is-flex-direction-column">
      <NavBar/>
      
      <main className="background fill-page">
          <h2>Welcome to GunPla Collection!</h2>

          <div className="box entry">
            <h4>Find a kit:</h4>
            <p>You can search for it <Link to="/kits">here</Link> using the name and/or the release year of the kit.</p>
          </div>

          <div className="box entry">
            <h4>Add a kit:</h4>
            <p>You can do it <Link to="/upload">here</Link>. A kit must have a name and a release year. Image URL is optional.</p>
          </div>

          <div className="box entry">
            <h4>Manage added kits:</h4>
            <p>You can manage them <Link to="/admin">here</Link>. You can remove kits from there.</p>
          </div>
      </main>

      <footer className="footer has-background-primary is-size-7 pb-1 pt-1">Made By Tuan Long Hoang</footer>
    </div>
  );
}

export default App;
