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
                        <div>
                            <input  autoComplete="off" type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="title-input" placeholder="Big Basement"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        <textarea rows = {6} type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="descrip-input" placeholder="ITS HUGE!"/>
                    </div>
                    <div className="form-group">
                        <label>Price $</label>
                        <input type="text" value = {this.props.price} onChange = {this.props.handlePriceChange} className="title-input" />
                    </div>
                    <div className = "button-div">
                        <button type="submit" onClick = {this.props.handleContinue} className = "button-continue"> Continue</button>
                    </div>
                </form>
            
            </div>
        );
    }
}

export default CreateListingDetails;





