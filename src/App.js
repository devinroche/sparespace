import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./components/Navbar/Routes"
import Footer from "./components/Footer/Footer"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <div>
                <Navbar/>
                <Routes/>
                <Footer/>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
