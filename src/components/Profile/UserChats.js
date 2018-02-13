import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import Cookies from '../../Cookies'
import {MessageCard, MessageName} from "../Styles";


class UserChats extends React.Component {
    constructor() {
        super()
        this.state = {
            msg: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/messages/${this.props.user}`).then(r => {
            this.setState({
                msg: r.data
            })
        })
    }

    render() {

        const activeChat = this.state.msg.length !== 0 ? this.state.msg.map((chat) => {
            let otherPart;
            let otherName;
            if (chat.renter_id === Cookies.getId()) {
                otherPart = chat.host_id
                otherName = chat.host
            } else {
                otherPart = chat.renter_id
                otherName = chat.renter
            }
            return (
            <Link to={`/chat/${chat.host_id}/${chat.renter_id}`}>
                <MessageCard>
                    <MessageName>{otherName}</MessageName>
                </MessageCard>
            </Link>)
            }) :
            <MessageCard>
                <MessageName>
                    No Messages :(
                </MessageName>
            </MessageCard>
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <MessageName style={{fontSize: "24", fontWeight: "300"}}>Your Messages</MessageName>
                    {activeChat}
                </div>
            </div>
        )
    }
}

export default UserChats
