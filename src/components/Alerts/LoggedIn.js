import React, { Component } from 'react';
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
                cancelButtonText: 'Create Account',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    window.location.href = '/login'
                    return <Redirect to='login' />
                } else {
                    window.location.href = "/sign_up"
                    return <Redirect to="/sign_up" />
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