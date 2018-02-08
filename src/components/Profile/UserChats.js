import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"

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
                marginBottom: 25,
                padding: 15,
                textAlign: 'left',
                border: '1px solid rgba(0, 0, 0, .2)',
                boxShadow: "0 4px 12px 0 rgba(0,0,0,0.2)",
                borderRadius: 5
            },
            nameStyle: {
                marginBottom: 0,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#2f3542',
            }
        }

        const activeChat = this.state.msg ? this.state.msg.map((chat) => {
            let otherPart;
            let otherName;
            if (chat.renter_id === this.props.user._id) {
                otherPart = chat.host_id
                otherName = chat.host
            } else {
                otherPart = chat.renter_id
                otherName = chat.renter
            }
            return (
            <Link to={`/chat/${chat.host_id}/${chat.renter_id}`}>
                <div style={styles.msgCard} className="row">
                    <div className="col-sm-2"><img src="http://www.clker.com/cliparts/8/0/i/u/v/L/woman-headshot-silhouette-grey-hi.png" width="55%"/></div>
                    <div className="col-sm-10"><p style={styles.nameStyle}>{otherName}</p></div>
                </div>
            </Link>)
        }) : ''
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
