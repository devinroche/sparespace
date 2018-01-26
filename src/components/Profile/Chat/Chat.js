import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import { postMsg } from '../../../sock'
import Messages from './Messages'
import Input from './Input'
import Cookies from "../../../Cookies";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }

        socket.on('update msg', () => {
            axios.get(`http://localhost:3001/message/${this.props.match.params.host}/${this.props.match.params.renter}`)
                .then(response => {
                    this.setState({
                        messages: response.data
                    })
                })
        });
    }

    handleNewMessage = (text) => {
        axios.post('http://localhost:3001/message', {
            host: this.props.match.params.host,
            renter: this.props.match.params.renter,
            author: Cookies.getId(),
            text: text
        }).then(()=>{ postMsg(text)})
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/message/${this.props.match.params.host}/${this.props.match.params.renter}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    messages: res.data
                })
            })
            .catch(err => console.log("some err occured", err))
    }

    render() {
        return (
            <div>
                <Messages messages={this.state.messages} />
                <Input onMessageSend={this.handleNewMessage} />
            </div>
        )
    }
}

export default Chat
