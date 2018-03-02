import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./components/Navbar/Routes"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <div>
                <Navbar/>
                <Routes/>
            </div>
        </Router>
      </div>
    );
  }
}

export default App;
