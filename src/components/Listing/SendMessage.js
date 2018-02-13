import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';
import {Message} from "../Styles";

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
        return (
                <Message className="btn btn-success" onClick={() => {
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
                }}>Message
                </Message>


        );
    }
}

export default SendMessage;