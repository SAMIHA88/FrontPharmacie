// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Sidebar';
import Zone from './Zone';
import City from './City'
import Dashboard from './Dashboard';
import Pharmacy from './Pharmacy';
import Search from './Search';
import About from './About';
import Gardes from './Gardes';
import Footer from './Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 px-0">
            <Navbar />
          </div>
          <div className="col-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/villes" element={<City />} />
              <Route path="/zones" element={<Zone />} />
              <Route path="/pharmacies" element={<Pharmacy />} />
              <Route path="/gardes" element={<Gardes />} />
              <Route path="/map" element={<Search />} />
              <Route path="/about" element={<About />} />


            </Routes>
          </div>
        </div>
      </div>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
