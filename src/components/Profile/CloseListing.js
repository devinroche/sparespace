import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom'

class CloseListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
            listing_id: this.props.list_id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        axios.get(`http://localhost:3001/close/${this.state.listing_id}`)
    }


    render() {
        let alert = (
            swal({
                title: 'Are you sure?',
                text: 'Your listing will be closed!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, close it!',
                cancelButtonText: 'No, keep it.'
            }).then((result) => {
                if (result.value) {
                    swal(
                        'Closed!',
                        'Your listing has been closed.',
                        'success'
                    )
                    this.handleSubmit()
                    window.location.href = `/users/${Cookies.getId()}`
                    return <Redirect to={"/users/" + Cookies.getId()} />

                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelled',
                        'Your listing is still active!',
                        'info'
                    )
                    this.props.toggle
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

export default CloseListing;