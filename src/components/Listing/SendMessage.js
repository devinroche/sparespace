import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class SendMessage extends Component {
    constructor() {
        super()

        this.state = {
            show: false
        }

        socket.on('peer-msg', () => {
            console.log('foo')
            this.getMsg()
        });

        this.toggleShow = this.toggleShow.bind(this)
    }

    toggleShow() {
        this.setState({ show: !this.state.show })
    }

    render() {
        return (
            <div>
                <button className="btn btn-success" onClick={() => {
                    if (Cookies.isExpress()) {
                        swal({
                            text: 'Message Info',
                            content: "input",
                            button: {
                                text: "Send",
                                closeModal: true,
                            },
                        })
                            .then(message => {
                                if (!message) throw null;

                                axios.post('http://localhost:3001/message', {
                                    host: this.props.host,
                                    renter: this.props.renter,
                                    author: this.props.renter,
                                    text: message
                                })
                            })
                           
                            .then(() => {
                                swal({
                                    title: "Your message has been sent!",
                                    icon: "success"
                                })

                            })
                    } else {
                        swal("You must be logged in to do this.")
                    }
                    this.props.callback()
                }}>Express Your Interest</button>

            </div>

        );
    }
}

export default SendMessage;