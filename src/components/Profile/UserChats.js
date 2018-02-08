import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import Cookies from '../../Cookies'

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
        const styles = {
            msgCard: {
                marginTop: 25,
                marginBottom: 70,
                padding: 15,
                textAlign: 'left',
                border: '1px solid rgba(0, 0, 0, .2)',
                borderRadius: 3,
                boxShadow: "0 0 3px rgba(0,0,0,0.15)"
            },
            nameStyle: {
                marginBottom: 0,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#2f3542',
            }
        }


        const activeChat = this.state.msg.length != 0 ? this.state.msg.map((chat) => {
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
                <div style={styles.msgCard}>
                    <p style={styles.nameStyle}>
                        <img src="http://www.clker.com/cliparts/8/0/i/u/v/L/woman-headshot-silhouette-grey-hi.png" width="15" style={styles.avatarStyle} />
                        {otherName}
                    </p>
                </div>
            </Link>)
        }) : "No Messages :("
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <h3>Your Messages</h3>
                    {activeChat}
                </div>
            </div>
        )
    }
}

export default UserChats
