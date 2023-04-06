import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home page</h1>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
    </div>
  );
}

function About() {
  return (
    <div>
       <h1>About us</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
    </div>
  );
}

function Contact() {
  return (
    <div>
       <h1>Contact us</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/"  element = {<Home />} />
          <Route path="/about"  element = {<About />} />
          <Route path="/contact"  element = {<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
