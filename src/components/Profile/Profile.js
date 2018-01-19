import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import {Link} from "react-router-dom"

class Profile extends React.Component {
	constructor() {
		super()
		this.state = {
            user: "",
            data: []
        }
	}

	componentDidMount() {
		axios
			.get(`http://localhost:3001/user/${this.props.match.params.id}`)
			.then(res => {
                this.setState({ 
                    user: res.data, 
                    data:res.data.interested 
                })})
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
        console.log(user, this.state.data)
		return (
            <div>
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
                    {this.state.data.map((l, i) => {
                    return (
                        <div className = "row">
                        <div className="col-sm-6 col-sm-offset-3" style={styles.containerStyle}>
                            <Link to={`/listing/${l._id}`}>
                                <div style={styles.cardStyle}>
                                    <Image className="col-sm-6" cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSize}/>
                                    <div className="card-block">
                                        <h4 style={styles.mainStyle} className="card-title text-left">{l.title}</h4>
                                        <h6 style={styles.secondStyle} className="card-text text-left">{l._host.first}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    )
                })}
            </div>
		)
	}
}

export default Profile
