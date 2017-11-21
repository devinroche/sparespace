import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Link, Route, Redirect } from "react-router-dom"
import Cookies from '../Cookies';
import swal from 'sweetalert';

class Interest extends Component {

 constructor(props) {
   super(props);
 }

render() {
  return (
    <button className="btn btn-success" onClick={() => {
        if(Cookies.isLoggedIn()){
            axios.post('http://localhost:3001/p2p', {
                host: this.props.host,
                renter: this.props.renter,
                listing: this.props.listing,
            })
            swal({
                title: "An email expressing your interest has been sent!",
                icon: "success"
            })
        }else{
            swal("You must be logged in to do this.")
        } 
        this.props.callback()
        }}>Express Your Interest</button>
    
    );
  }
}
 
export default Interest;