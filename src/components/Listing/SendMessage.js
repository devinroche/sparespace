import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import {Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class SendMessage extends Component {
    constructor() {
        super()

        this.state = {
            show: false
        }

        socket.on('peer-msg', () => {
            this.getMsg()
        });

        this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
        this.setState({ show: !this.state.show })
    }

    render() {


        const messageStyle = {
            fontFamily: "Rubik",
            color: "#FFF",
            fontWeight: "400",
            width: 250,
            height: 50,
            fontSize: 20,
            background: "linear-gradient(to right, #FE947B, #FC5B45)",
            border: "none"
        };

        return (
            <div>
                <button className="btn btn-success" style={messageStyle} onClick={() => {
                    swal({
                        title: 'Send a Message!',
                        input: 'text',
                        inputPlaceholder: 'Questions, Comments, or Concerns',
                        showCancelButton: true,
                        inputValidator: (value) => {
                            return !value && 'You need to write something!'
                        }
                    }).then((value) => {
                        if (value.value) {
                            swal({ type: 'success', title: 'Your message has been sent!' }).then(() => {
                                axios.post('http://localhost:3001/message', {
                                    host: this.props.host,
                                    renter: this.props.renter,
                                    author: this.props.renter,
                                    text: value.value
                                })
                                this.props.callback()
                            })
                        } else if (value.dismiss === swal.DismissReason.cancel) {
                            swal(
                              'Cancelled',
                              "Your message wasn't sent",
                              'error'
                            )
                          }
                    })
                }}>Message</button>

            </div>

        );
    }
}

export default SendMessage;