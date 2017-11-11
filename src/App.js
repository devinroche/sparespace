import React, { Component } from "react";
import Navbar from "./components/Nav-bar";
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (

        //
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar/>
              {/*<ImageUpload/>*/}
            </header>{" "}
          </div>
        </Router>
    );
  }
}

export default App;
