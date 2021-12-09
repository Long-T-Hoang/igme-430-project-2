import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReactObserver from 'react-event-observer';

let observer = ReactObserver();

function LoginSignupBar () {
  const logout = () => {
    fetch("/logout", {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      observer.publish('redirect', data.redirect);
      sessionStorage.removeItem("username");
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  // render this if the user is logged in
  if(sessionStorage.getItem("username"))
  {
    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <p>Welcome back! <span id="username">{sessionStorage.getItem("username")}</span> <a className="button is-danger is-small" onClick={logout}>Logout</a></p>
        </div>
      </div>
    );
  }

  // render this if the user is not logged in
  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link to="/login" className="button is-danger">Login</Link>
          <Link to="/signup" className="button is-light">Signup</Link>
        </div>
      </div>
    </div>
);
}

function NavBar() {
  const navigate = useNavigate();
  const listener = observer.subscribe('redirect', (data) => {
      navigate(data);
  });

  return (
      <div className="nav-bar">

        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" id="nav-title" href="/">
              Gunpla Collection
            </a>

          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/kits">Kits</Link>
              <Link className="navbar-item" to="/upload">Upload</Link>
              <Link className="navbar-item" to="/admin">Admin</Link>
              <Link className="navbar-item" to="/account">Account</Link>
            </div>

            <LoginSignupBar />
          </div>
        </nav>
      </div>
    );
};

export default NavBar;
  