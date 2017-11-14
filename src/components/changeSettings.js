import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class changeSettings extends Component {

    constructor(props) {
    super(props);
    this.state = {
      name_input: '',
      email_input: '',
      phone_input: '',
      address_input: '',
      old_pass_input: '',
      new_pass_input: '',
      new_c_pass_input: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var change = {};
    change[event.target.name] = event.target.value;
    this.setState(
      change
      
    );
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name_input);
    event.preventDefault();
  }

    
      
    

  


  render() {
    return (
      <div className="App">
        <div class = 'container'>
          <h1 class = 'text-center'> Account : Evan Arends </h1>
          <form onSubmit={this.handleSubmit}>
            <div class = 'form-group'>
              <label >Name</label>
              <input  type = 'text' class="form-control" value={this.state.name_input} onChange={this.handleChange} placeholder="Evan Arends"/>
              <small class="form-text text-muted">We'll never share your name with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label ></label>
              <input type = 'email' class="form-control" value={this.state.email_input} onChange={this.handleChange} placeholder="Enter email"/>
              <small  class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label ></label>
              <input type = 'phone' class="form-control" value={this.state.phone_input} onChange={this.handleChange} placeholder="206-000-0000"/>
              <small class="form-text text-muted">We'll never share your phone number with anyone else.</small>
            </div>
            <div class = 'form-group'>
              <label ></label>
              <input type = 'address' class="form-control" value={this.state.address_input} onChange={this.handleChange} placeholder="803 e ermina"/>
              <small class="form-text text-muted">We'll never share your address with anyone else.</small>
            </div>
            <h2> Change Password </h2>
            <div class = 'form-group'>
              <label ></label>
              <input  type="password" class="form-control" value={this.state.old_pass_input} onChange={this.handleChange} placeholder="Old Password"/>
            </div>
            <div class = 'form-group'>
              <label ></label>
              <input  type="password" class="form-control" value={this.state.new_pass_input} onChange={this.handleChange} placeholder="New Password"/>
            </div>
            <div class = 'form-group'>
              <label ></label>
              <input type="password" class="form-control" value={this.state.new_pass_input} onChange={this.handleChange} placeholder="Confirm Password"/>
            </div>
            <button type="submit" value = 'submit' class="btn btn-primary" >Submit Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default changeSettings;
