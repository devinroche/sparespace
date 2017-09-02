import React, { Component } from 'react';
import {Header} from "./Header"
import {WhatIsSS} from "./WhatIsSS";



class App extends Component {
  render() {

    return (
      <div className="App">
          <Header/>
          <WhatIsSS/>
      </div>
    );
  }
}

export default App;
