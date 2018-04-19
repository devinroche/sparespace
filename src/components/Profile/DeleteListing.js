import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { Redirect } from 'react-router-dom'

class DeleteListing extends Component {
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

    componentDidMount() {
        this.renderDelete();
    }
    handleSubmit(event) {
        axios.delete(`http://localhost:3001/listing/${this.state.listing_id}`)
    }
    renderDelete() {
        return (
            swal({
                title: 'Are you sure?',
                text: 'Your listing will be removed!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.value) {
                    swal(
                        'Deleted!',
                        'Your listing has been removed.',
                        'success'
                    ).then(() => {
                        this.handleSubmit()
                        window.location.href = `/users/${Cookies.getId()}`
                        return <Redirect to={"/users/" + Cookies.getId()} />
                    })
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelled',
                        'Your listing lives to die another day!',
                        'error'
                    ).then(() => this.props.toggle)
                }
            })
        )
    }

    render() {
        return (
            <div>
                {this.renderDelete}
            </div>
        );
    }
}

export default DeleteListing;