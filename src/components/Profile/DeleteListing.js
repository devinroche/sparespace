import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

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


    handleSubmit(event) {
        axios.delete(`http://localhost:3001/listing/${this.state.listing_id}`)
    }


    render() {
        const messageStyle = {
            fontFamily: "Rubik",
            color: "#FFF",
            fontWeight: "400",
            width: '30%',
            height: 30,
            fontSize: 14,
            background: "linear-gradient(to right, #FE947B, #FC5B45)",
            border: "none"
        };

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
                    this.handleSubmit()
                    swal(
                        'Deleted!',
                        'Your imaginary file has been deleted.',
                        'success'
                    )
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    swal(
                        'Cancelled',
                        'Your listing lives to die another day!',
                        'error'
                    )
                }
            })
        );
    }
}

export default DeleteListing;