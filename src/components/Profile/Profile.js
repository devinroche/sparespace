import React from "react"
import axios from "axios"
import Cookies from '../../Cookies'
import {Redirect} from 'react-router-dom'
import UserChats from "./UserChats";
import UserListings from "./UserListings";
import {WelcomeText} from "../Styles";
import EditUser from "./EditUser";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            data: [],
            msg: []
        }
    }

    componentDidMount() {
        if (this.props.match.params.id != Cookies.getId()) {
            window.location.href = "/users/" + Cookies.getId(); 
        } else{
            axios.get(`http://localhost:3001/user/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({
                        user: res.data,
                    })
                })
            }
    }

    render() {

        const user = this.state.user ? this.state.user : "";

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3" >
                        <WelcomeText>Welcome, {user.first}!</WelcomeText>
                    </div>
                </div>
                <EditUser/>
                <UserChats user={this.props.match.params.id}/>
                <UserListings listings={user.listings}/>
            </div>
        )
    }
}

export default Profile
