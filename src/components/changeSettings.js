import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class = 'container'>
          <h1 class = 'text-center'> Account : Evan Arends </h1>
          <form>
            <div class = 'form-group'>
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" id="name_input" aria-describedby="emailHelp" placeholder="Evan Arends"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your name with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="number" class="form-control" id="phone_input" aria-describedby="emailHelp" placeholder="206-000-0000"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your phone number with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="number" class="form-control" id="address_input" aria-describedby="emailHelp" placeholder="803 e ermina"/>
              <small id="emailHelp" class="form-text text-muted">We'll never share your address with anyone else.</small>
            </div>
            <h2> Change Password </h2>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="password" class="form-control" id="old_pass_input" aria-describedby="emailHelp" placeholder="Old Password"/>
            </div>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="password" class="form-control" id="new_pass_input" aria-describedby="emailHelp" placeholder="New Password"/>
            </div>
            <div class = 'form-group'>
              <label for="exampleInputEmail1"></label>
              <input type="password" class="form-control" id="new_c_password" aria-describedby="emailHelp" placeholder="Confirm Password"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
