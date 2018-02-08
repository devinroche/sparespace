import React from "react"
import axios from "axios"
import UserChats from "./UserChats";
import UserListings from "./UserListings";

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
                this.setState({
                    user: res.data,
                })
            })
    }

    render() {
        const styles = {
            cardStyle: {
                width: '100%',
                marginTop: 25,
                marginBottom: 15,
                padding: 2,
                textAlign: 'center'
            },
            imageSize: {
                width: 150,
                height: 100
            },
            mainStyle: {
                fontFamily: "Roboto",
                color: "#333",
            },
            secondStyle: {
                fontFamily: "Roboto",
                color: "#7F7F7F"
            },
            email: {
                color: '#7f8c8d'
            }

        }
        const user = this.state.user ? this.state.user : ""

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3" style={styles.containerStyle}>
                        <div style={styles.cardStyle}>
                            <div className="card-block">
                                <h1>Welcome, {user.first}!</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <UserChats user={this.props.match.params.id}/>
                <UserListings listings={user.listings}/>
            </div>
        )
    }
}

export default Profile
