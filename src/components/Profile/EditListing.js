import React, { Component } from 'react';
import axios from 'axios';

class EditListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            price: '',
            listing_id: this.props.list_id
        }
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
        let editedObj = {}
        this.state.title === '' ? '' : editedObj.title = this.state.title
        this.state.description === '' ? '' : editedObj.description = this.state.description
        this.state.price === '' ? '' : editedObj.price = Number(this.state.price)

        axios.put(`http://localhost:3001/listing/${this.state.listing_id}`,  editedObj)
    }
    

    render() {

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