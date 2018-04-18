import React from "react"
import axios from "axios"
import { postMsg } from '../../../sock'
import { Redirect } from 'react-router-dom'
import Messages from './Messages'
import Input from './Input'
import Cookies from "../../../Cookies";
import openSocket from 'socket.io-client';
import './Chat.css';
import {BackButton} from '../../Styles';
const socket = openSocket('https://testfart420.herokuapp.com');

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }

        this.backToProfile = this.backToProfile.bind(this)

        socket.on('update msg', () => {
            axios.get(`https://testfart420.herokuapp.com/message/${this.props.match.params.host}/${this.props.match.params.renter}`)
                .then(response => {
                    this.setState({
                        messages: response.data
                    })
                })
        });
    }

    handleNewMessage = (text) => {
        axios.post('https://testfart420.herokuapp.com/message', {
            host: this.props.match.params.host,
            renter: this.props.match.params.renter,
            author: Cookies.getId(),
            text: text
        }).then(() => {
            postMsg(text)
        })
    }

    backToProfile() {
        window.location.href = `/users/${Cookies.getId()}`
        return <Redirect to={"/users/" + Cookies.getId()} />
    }
    componentDidMount() {
        axios.get(`https://testfart420.herokuapp.com/message/${this.props.match.params.host}/${this.props.match.params.renter}`)
            .then(res => {
                this.setState({
                    messages: res.data,
                })
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-2 col-sm-offset-1">
                    <BackButton style={btnStyle} onClick={this.backToProfile}>Back</BackButton>
                </div>
                <div className='chatroom col-sm-7'>
                    <Messages messages={this.state.messages} />
                    <Input onMessageSend={this.handleNewMessage} />
                </div>
            </div>
        )
    }
}

export default Chat

const btnStyle = {
    fontFamily: "Rubik",
    color: "#FFF",
    fontWeight: "400",
    width: 150,
    marginBottom: 20,
    height: 50,
    fontSize: 20,
    background: "linear-gradient(to right, #FE947B, #FC5B45)",
    border: "none"
};