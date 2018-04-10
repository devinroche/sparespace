import React, { Component } from "react"
import './create_listing.css';
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput, Label} from "../Styles";
import Outline from "../CreateListing/Outline";




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

            <div className="col-sm-8 col-sm-offset-1">

                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <Label header className="pull-left" style={{marginTop: "50"}}>Space Basics</Label>
                    </div>
                </div>
                
                    <div className="row" style={{marginTop: "20"}}>
                        <div className="col-sm-8 col-sm-offset-2">

                            <CreateLabel className="pull-left">Title</CreateLabel>
                                {
                                    this.props.titleE === true ? null:
                                        <FormStyle  autoComplete="off" type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="form-control"
                                        placeholder="Spacious Basement"/>

                                }
                           
                                {
                                    this.props.titleE === false ? null:
                                        <FormStyle  autoComplete="off" type="text" value = {this.props.title} onChange = {this.props.handleTitleChange} className="form-control title-incomplete-input" placeholder="Spacious Basement"/>

                                }
                        </div>
                    </div>


                    <div className="row" style={{marginTop: "5"}}>
                        <div className="col-sm-8 col-sm-offset-2" style={{marginTop: "5"}}>
                        <CreateLabel >Description</CreateLabel>
                        {
                            this.props.descriptionE === true ? undefined:
                                <DescriptionInput rows = {6} type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="form-control"  placeholder="What would you call your space? A large basement?"/>
                        }
                        {
                            this.props.descriptionE === false ? undefined:
                                <DescriptionInput rows = {6} type="text" value = {this.props.description} onChange = {this.props.handleDescriptionChange} className="form-control descrip-input-incomplete" placeholder="What would you call your space? A large basement?"/>
                        }
                        </div>
                        
                    </div>

                    <div className="row" style={{marginTop: "5"}}>
                        <div className="col-sm-5 col-sm-offset-2">

                        <CreateLabel>Price</CreateLabel>
                        {
                            this.props.priceE === true ? null:
                                <PriceInput type="number" value = {this.props.price} onChange = {this.props.handlePriceChange} className="form-control"  placeholder="Enter a price" min={1} max={999} />
                        }
                        {
                            this.props.priceE === false ? null:
                                <PriceInput type="number" value = {this.props.price} onChange = {this.props.handlePriceChange} className="incomplete-line" placeholder="Enter a price" min={1} max={999} />
                        }
                        </div>
                    
                    </div>
                    <div className="row text-center">
                        <WhiteButton type="submit" onClick = {this.props.handleContinue}> Continue</WhiteButton>
                    </div>


                </div>
                
                    

                    <div className="col-sm-2" style={container}>
                        <Outline/>
                    </div>
                
            
            </div>
        );
    }
}

export default CreateListingDetails;

const container = {
    marginTop: "100px"
}





