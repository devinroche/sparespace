import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';

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

            fontFamily : "Rubik",
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
                }}>Message</button>

            </div>

        );
    }
}

export default SendMessage;