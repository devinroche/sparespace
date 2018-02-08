import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

class EditListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
            listing_id: this.props.list_id
        }
        console.log(this.props)
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDescChange(e) {
        this.setState({
            description: e.target.value
        })
    }

    handlePriceChange(e) {
        this.setState({
            price: e.target.value
        })
    }

    handleSubmit(event) {
        axios.put(`http://localhost:3001/listing/${this.state.listing_id}`, {
            title: this.state.title,
            price: this.state.price,
            description: this.state.description
        })
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
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" value={this.state.title} onChange={this.handleTitleChange.bind(this)} placeholder="title"/>
                <input type="text" value={this.state.description} onChange={this.handleDescChange.bind(this)} placeholder="description"/>
                <input type="text" value={this.state.price} onChange={this.handlePriceChange.bind(this)} placeholder="price"/>
                <input type="submit" value="Submit" />
            </form>

        );
    }
}

export default EditListing;