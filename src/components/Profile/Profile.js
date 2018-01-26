import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import {Link} from "react-router-dom"

class Profile extends React.Component {
	constructor() {
		super()
		this.state = {
            user: "",
            data: [],
            msg: []
        }
	}

	componentDidMount() {
        axios.get(`http://localhost:3001/user/${this.props.match.params.id}`)
			.then(res => {
                axios.get(`http://localhost:3001/messages/${this.props.match.params.id}`).then(r => {
                    console.log(r.data)
                    this.setState({
                        user: res.data,
                        data: res.data.interested,
                        msg: r.data
                    })
                })
                })
			.catch(err => console.log("some err occured", err))
	}

	render() {
        const styles = {
            cardStyle : {
                width: '100%',
                marginTop: 25,
                marginBottom: 15,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                padding: 2
            },
            imageSize : {
                width: 150,
                height: 100
            },
            mainStyle : {
                fontFamily: "Roboto",
                color: "#333",
            },

            secondStyle : {
                fontFamily: "Roboto",
                color: "#7F7F7F"
            },
            email: {
                color: '#7f8c8d'
            }

        }
        const user = this.state.user ? this.state.user : ""
        const storage = user.interested ? user.interested: ""
        const activeChat = this.state.msg ? this.state.msg.map((chat) => {
            let otherPart;
            let otherName;
            if(chat.renter_id === user._id){
                otherPart = chat.host_id
                otherName=chat.host
            }else{
                otherPart= chat.renter_id
                otherName = chat.renter
            }
            return(<div>
                <li>{otherName}</li>
            </div>)
        }) : ''
		return (
            <div className="container">
			<div className = "row">
                <div className="col-sm-6 col-sm-offset-3" style={styles.containerStyle}>
                    <div style={styles.cardStyle}>
                        <div className="card-block">
                            <h1>{user.first}</h1>
                            <h5 style={styles.email}>{user.email}</h5>
                        </div>
                    </div>
                </div>
            </div>
                <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <hr/>
                    <h3>active chats</h3>
                    {activeChat}
                </div>
                </div>
            </div>
		)
	}
}

export default Profile
