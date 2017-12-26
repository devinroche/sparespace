import React, { Component } from 'react';
import Message from '../Message'
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class Interest extends Component {
    constructor(){
        super()

        this.state = {
            messages: [],
            show: false
        }

        socket.on('peer-msg', () => {
            console.log('foo')
            this.getMsg()
        });

        this.toggleShow = this.toggleShow.bind(this)
        this.getMsg = this.getMsg.bind(this)
    }
    componentDidMount(){
        this.getMsg()
    }

    toggleShow(){
        this.setState({show: !this.state.show})
    }
    getMsg(){
        axios.get("http://localhost:3001/message", {
            params: {
                renter: this.props.renter
            }
        }).then(response => {
            this.setState({
                messages: response.data
            })
            console.log(this.state.messages)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

render() {
  return (
      <div>
    <button className="btn btn-success" onClick={() => {
        if(Cookies.isExpress()){
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


            <ul>
                {this.state.messages.map((m, i) => {
                    return(<li>{m.text}</li>)
                })}
            </ul>
        <button className="btn btn-info" onClick={() => {
        if(Cookies.isExpress()){
            this.toggleShow()
        }else{
            swal("You must be logged in to do this.")
        } 
        this.props.callback()
        }}>Send Message</button>

        {this.state.show && <Message/>}
      </div>
    
    );
  }
}
 
export default Interest;