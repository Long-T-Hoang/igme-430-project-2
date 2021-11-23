import React from 'react';

import '../App.css';
import NavBar from './NavBar.js'

function App() {
  const [word, setWord] = React.useState('software');
  const [associations, setAssociations] = React.useState(null);
  const getAssociations = () => {
    fetch('/api/associations/' + word)
    .then(result => result.json())
    .then(body => setAssociations(body))
    .catch(error => console.log(error))
  };

  return (
    <div className="app">
      <NavBar/>

      <main>
          <h2>Welcome to GunPla Collection!</h2>
          <h4>Find a kit:</h4>
          <p>You can search for it <a href="/kits">here</a> using the name and/or the release year of the kit.</p>
          <hr/>
          <h4>Add a kit:</h4>
          <p>You can do it <a href="/upload">here</a>. A kit must have a name and a release year. Image URL is optional.</p>
          <hr/>
          <h4>Manage added kits:</h4>
          <p>You can manage them <a href="/admin">here</a>. You can remove kits from there.</p>
      </main>
    </div>
  );
}

export default App;
