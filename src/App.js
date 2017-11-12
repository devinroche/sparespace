import React, { Component } from "react";
import Navbar from "./components/Nav-bar";
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <Navbar/>
        </Router>
      </div>
    );
  }
}

export default App;
