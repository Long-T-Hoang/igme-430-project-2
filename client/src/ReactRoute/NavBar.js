import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReactObserver from 'react-event-observer';

let observer = ReactObserver();

function LoginSignupBar () {
  const currentHref = window.location.href;

  const logout = () => {
    fetch("/logout", {
      method: 'GET',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
      <nav id="login-signup">
        <p>Welcome back! {sessionStorage.getItem("username")} <a onClick={logout}>Logout</a></p>
      </nav>
    );
  }

  // render this if the user is not logged in
  return (
    <nav id="login-signup">
      <Link to="/login" className="header-link">Login</Link>
      <Link to="/signup" className="header-link">Signup</Link>
    </nav>
);
}

function NavBar() {
  const navigate = useNavigate();
  const listener = observer.subscribe('redirect', (data) => {
      navigate(data);
  });

  return (
      <div className="nav-bar">
        <div id="logo">
          <h1>GunPla Collection</h1>
        </div>
        
        <LoginSignupBar />

        <nav>
            <Link to="/" className="header-link">Main</Link>
            <Link to="/kits" className="header-link">Kits</Link>
            <Link to="/upload" className="header-link">Upload</Link>
            <Link to="/admin" className="header-link">Admin</Link>
            <Link to="/account" className="header-link">Account</Link>
        </nav>
      </div>
    );
};

export default NavBar;
  