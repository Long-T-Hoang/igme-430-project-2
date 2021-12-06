import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './ReactRoute/App';
import Admin from './ReactRoute/Admin';
import KitList from './ReactRoute/KitList';
import Kit from './ReactRoute/Kit'
import Upload from './ReactRoute/Upload';
import Login from './ReactRoute/Login';
import AccountPage from './ReactRoute/AccountPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/kits" element={<KitList />}></Route>
        <Route path="/kit/:id" element={<Kit />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

