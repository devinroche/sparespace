import React, { Component } from "react"
import './create_listing.css';
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'



class CreateListingDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            description:this.props.description,
            price:this.props.price
        };
     


    }   

    


    

    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label >Title</label>
                        <input type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="form-control" placeholder="Big Basement"/>
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <input type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="form-control" placeholder="ITS HUGE!"/>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="text" value = {this.props.price} onChange = {this.props.handlePriceChange} className="form-control" />
                    </div>
                    <button type="submit" onClick = {this.props.handleContinue} className="btn btn-primary">Continue</button>
                </form>
            
            </div>
        );
    }
}

export default CreateListingDetails;





