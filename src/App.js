import React, { Component } from "react";
import AppNavBar from "./components/Nav-bar";
import SearchBar from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppNavBar />
        </header>{" "}
        <p className="App-intro">
          <SearchBar />
        </p>{" "}
      </div>
    );
  }
}

export default App;
