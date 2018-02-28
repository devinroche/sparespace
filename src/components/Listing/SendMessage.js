import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';
import Cookies from '../../Cookies'
import Modal from 'react-modal';
import {Message, SmallMsg, CloseBtn, FormStyle} from "../Styles";
import ReactTooltip from 'react-tooltip'


const socket = openSocket('http://localhost:3001');

class SendMessage extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            modalIsOpen: false,
            value: ''
        }

        socket.on('peer-msg', () => {
            this.getMsg()
        });

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    buttonClick(btnNum) {
        switch(btnNum){
            case 1:
                this.setState({value: 'is this still available'})
                break
            case 2:
                this.setState({ value: 'is the start/end date strict?' })
                break
            case 3:
                this.setState({ value: 'give me more info' })
                break
            default:
                break
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/message', {
            host: this.props.host,
            renter: this.props.renter,
            author: this.props.renter,
            text: this.state.value
        })
        swal(
            'Message Sent',
            'Your message has been sent',
            'success'
        ).then((value) => {
            this.closeModal() 
        });
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
                <div data-tip data-for='message'>
                    <Message disabled={!Cookies.isVerified()} className="btn btn-success" onClick={this.openModal}>Message</Message>
                </div>
                {!Cookies.isVerified() &&
                <ReactTooltip id='message' type='error'>
                    <span>Please verify your account!</span>
                </ReactTooltip>
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}

                >
                    <div className="row">
                        <div className="col-sm-10">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Send a message!</h2>
                        </div>
                        <div className="col-sm-2">
                            <CloseBtn onClick={this.closeModal}>x</CloseBtn>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <SmallMsg type="button" onClick={this.buttonClick.bind(this, 1)}>is this still available?</SmallMsg>
                        <SmallMsg type="button" onClick={this.buttonClick.bind(this, 2)}>is the start/end date strict?</SmallMsg>
                        <SmallMsg type="button" onClick={this.buttonClick.bind(this, 3)}>give me more info</SmallMsg> 
                        <div className="row">
                            <div className="col-sm-9">
                                <FormStyle style={{width: '100%'}}value={this.state.value} onChange={this.handleChange} placeholder="Questions, Comments, or Concerns" />
                            </div>
                            <div className="col-sm-3">
                                <button style={btnStyle} type="submit">Send</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default SendMessage;

const btnStyle = {marginTop: 40, backgroundColor: '#FC5B45', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6'}