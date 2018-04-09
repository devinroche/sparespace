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
            titleE: this.props.titleE, // error with title
            description:this.props.description,
            descriptionE:this.props.descriptionE,
            price:this.props.price,
            priceE:this.props.priceE
        };
        
        
    }   
    


    

    render() {
        return (
            <div className="container">
                
                    <div className="form-group">
                        <label >Title</label>
                        <div>
                        {
                            this.props.titleE === true ? null:
                                <input  autoComplete="off" type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="title-input" placeholder="Big Basement"/>

                        }
                        </div>
                        {
                            this.props.titleE === false ? null:
                                <input  autoComplete="off" type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="title-incomplete-input" placeholder="Big Basement"/>

                        }
                    </div>
                    <div className="form-group">
                        <label >Description</label>
                        {
                            this.props.descriptionE === true ? undefined:
                                <textarea rows = {6} type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="descrip-input" placeholder="ITS HUGE!"/>
                        }
                        {
                            this.props.descriptionE === false ? undefined:
                                <textarea rows = {6} type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="descrip-input-incomplete" placeholder="ITS HUGE!"/>
                        }
                        
                    </div>
                    <div className="form-group">
                        <label>Price $</label>
                        {
                            this.props.priceE === true ? null:
                                <input type="text" value = {this.props.price} onChange = {this.props.handlePriceChange} className="title-input" />
                        }
                        {
                            this.props.priceE === false ? null:
                                <input type="text" value = {this.props.price} onChange = {this.props.handlePriceChange} className="title-incomplete-input" />
                        }
                        
                        
                    </div>
                    <div className = "button-div">
                        <button type="submit" onClick = {this.props.handleContinue} className = "button-continue"> Continue</button>
                    </div>
                
            
            </div>
        );
    }
}

export default CreateListingDetails;





