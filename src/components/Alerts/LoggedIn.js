import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom'

class LoginAlert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
        }

    }

    render() {
        let alert = (
            swal({
                title: 'Not Logged In',
                text: "You must be logged in to create a listing!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'View Listings',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    window.location.href = '/login'
                    return <Redirect to='login' />
                } else {
                    window.location.href = "/listings"
                    return <Redirect to="/listings" />
                }
            })
        )
        return (
            <div>
                {alert}
            </div>
        );
    }
}

export default LoginAlert;