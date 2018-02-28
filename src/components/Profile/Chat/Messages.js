import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Chat.css'
import Cookies from '../../../Cookies';

class Messages extends Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        messages: [],
    }

    componentDidUpdate = () => {
        this.node.scrollTop = this.node.scrollHeight
    }

    render() {
        return (
            <ul className='chats' id='chat-container' ref={(node) => (this.node = node)}>
                {this.props.messages.map((message, i) =>  (
                    <li className={`chat ${Cookies.getId() === message.author._id ? "right" : "left"}`}>
                        <span>{message.author.first}: </span>
                        <span>{message.text}</span>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Messages