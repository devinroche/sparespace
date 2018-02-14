import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';
import Modal from 'react-modal';
import {Message} from "../Styles";

const socket = openSocket('http://localhost:3001');

class SendMessage extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            modalIsOpen: false
        }

        socket.on('peer-msg', () => {
            this.getMsg()
        });

        this.toggleShow = this.toggleShow.bind(this)
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    toggleShow() {
        this.setState({ show: !this.state.show })
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    buttonClick() {
        console.log('fart')
    }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        return (
            <div>
                <Message className="btn btn-success" onClick={
                this.openModal
                    // swal({
                    //     title: 'Send a Message!',
                    //     input: 'text',
                    //     html:`
                    //         <input type='button' id="swal-input1" class="swal2-input" />
                    //     `, preConfirm: () => {
                    //         return [
                    //             // $('#swal-input1').val(),
                    //             // $('#swal-input2').val()
                    //         ]
                    //     },
                    //     inputPlaceholder: 'Questions, Comments, or Concerns',
                    //     showCancelButton: true,
                    //     inputValidator: (value) => {
                    //         return !value && 'You need to write something!'
                    //     }
                    // }).then((value) => {
                    //     if (value.value) {
                    //         swal({ type: 'success', title: 'Your message has been sent!' }).then(() => {
                    //             axios.post('http://localhost:3001/message', {
                    //                 host: this.props.host,
                    //                 renter: this.props.renter,
                    //                 author: this.props.renter,
                    //                 text: value.value
                    //             })
                    //             this.props.callback()
                    //         })
                    //     } else {
                    //         swal(
                    //           'Cancelled',
                    //           "Your message wasn't sent",
                    //           'error'
                    //         )
                    //       }
                    // })


                }>Message
                </Message>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}

                >

                    <button onClick={this.closeModal}>close</button>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Send a Message!</h2>
                    <form>
                        <button>message 1</button>
                        <button>message 2</button>
                        <button>message 3</button>
                        <button>message 4</button>
                        <input placeholder="Questions, Comments, or Concerns" />
                    </form>
                </Modal>

                </div>
        );
    }
}

export default SendMessage;