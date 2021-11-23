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
import Upload from './ReactRoute/Upload';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/kits" element={<KitList />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

