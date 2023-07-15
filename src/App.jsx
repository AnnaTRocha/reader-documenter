import './App.css';
import React from "react";
import Footer from "./components/template/Footer";
import Nav from "./components/template/Nav";
import Routers from "./components/Routers/Routers";
import { BrowserRouter } from 'react-router-dom'

export default props => 
  <BrowserRouter>
    <div className="app">
      <Nav />
      <Routers />
      <Footer />
    </div>
  </BrowserRouter>
