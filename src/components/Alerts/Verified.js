import React, { Component } from 'react';
import Cookies from '../../Cookies';
import axios from 'axios'
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom'

class VerifiedAlert extends Component {
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
                title: 'Verification Failed',
                text: "You must be verified in to create a listing!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Resend Verification',
                cancelButtonText: 'View Listings',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    swal(
                        'Message Sent!',
                        'Check your email for a verification message!',
                        'success'
                    ).then(() => {
                        axios.post('http://localhost:3001/resendV', { u_id: Cookies.getId() })
                        window.location.href = `/users/${Cookies.getId()}`
                        return <Redirect to={`/users/${Cookies.getId()}`} />
                    })
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

export default VerifiedAlert;