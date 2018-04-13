import React, { Component } from "react"
import './create_listing.css';
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import {RadioGroup, Radio} from 'react-radio-group'
import moment from "moment";
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput, Label} from "../Styles";
import Outline from "../CreateListing/Outline";




var DatePicker = require("react-bootstrap-date-picker");

class CreateListingDetails1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
           features: this.props.features,
           size: this.props.size,
           duration: this.props.duration,
           address: this.props.address
        };
     
    }   

    render() {
        const inputProps = {
            value: this.props.address,
            onChange: this.props.handleAddressChange
          }
        return (
            <div className="container">

                <div className="col-sm-8 col-sm-offset-1">

                <div className="row">
                    <div className="col-sm-10 col-sm-offset-2">
                        <Label header className="pull-left" style={{marginTop: "50"}}>Space Details</Label>
                    </div>
                </div>
                
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-2">
                            <CreateLabel className="pull-left">Features</CreateLabel>
                        </div>
                        
                            <div className="row" style={{marginTop: 10}}>
                                <div className="col-sm-10 col-sm-offset-2">
                                    <CheckboxGroup name="features" value = {this.props.features } onChange={this.props.handleFeatureChange} >
                                        <Checkbox style={checkboxStyle} value="Heated"  /> Heated
                                        <Checkbox style={checkboxStyle} value="Covered"  /> Covered
                                        <Checkbox style={checkboxStyle} value="Access"  /> Access
                                        <Checkbox style={checkboxStyle} value="Power Outlet"  /> Power Outlet
                                        <Checkbox style={checkboxStyle} value="Lock"  /> Lock
                                    </CheckboxGroup>
                                </div>
                            </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-2">
                            <CreateLabel className="pull-left">Size</CreateLabel>
                        </div>
                            <div className="row" style={{marginTop: 10}}>
                                <div className="col-sm-11 col-sm-offset-2">

                                    <RadioGroup
                                        name = "size"
                                        selectedValue = {this.props.size} onChange={this.props.handleSizeChange}>
                                        <label style={radioButtonStyle}  ><Radio value="Small (5 x 5)" style={{marginRight: 10}} />Small (5 x 5)</label>
                                        <label style={radioButtonStyle} ><Radio value="Medium (15 x 15)" style={{marginRight: 10}} />Medium (15 x 15)</label>
                                        <label style={radioButtonStyle} ><Radio value="Large (25 x 25)" style={{marginRight: 10}}/>Large (25 x 25) </label>
                                    </RadioGroup>
                                    {
                                        this.props.sizeE === false ? null:
                                            <hr className = "incomplete-line"/>
                                    }
                                </div>
                            </div>    
                    </div>


                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-2">
                            <CreateLabel className="pull-left">Duration</CreateLabel>
                        </div>
                        <div className="row" style={{marginTop: 10}}> 
                            <div className="col-sm-7 col-sm-offset-2"> 
                               <div className="col-sm-2" style={{marginTop: 5}}>
                                    <h5 style={dateLabel}>Start</h5>
                               </div>
                                    <div className="col-sm-10" style={{marginTop: 5}}>
                                        <DatePicker value = {this.props.duration.start} showClearButton={false} minDate = {new Date().toISOString()} onChange = {this.props.handleStartChange} />
                                    </div>
                            </div>   
                        </div>
                                                    
                        <div className="row"> 
                            <div className="col-sm-7 col-sm-offset-2"> 
                            <div className="col-sm-2" style={{marginTop: 5}}>
                            <h5 style={dateLabel}>End</h5>
                               </div>
                               <div className="col-sm-10" style={{marginTop: 5}}>
                                    <DatePicker value = {this.props.duration.end} showClearButton={false} minDate = {this.props.duration.start} onChange = {this.props.handleEndChange}/>
                                </div>   
                            </div>
                        </div>
                    </div>



                    <div className= "row">
                        <div className="col-sm-10 col-sm-offset-2">
                            <CreateLabel className="pull-left">Address</CreateLabel>
                        </div>
                            <div className="row">
                                <div className="col-sm-9 col-sm-offset-2">
                                    <PlacesAutocomplete 
                                    styles = {autoCompleteStyles}
                                    inputProps={inputProps}/>
                                    {
                                        this.props.addressE === false ? null:
                                            <h3 className = "text-danger">Invalid Address</h3>
                                    }
                                </div>
                            </div>
                    </div>
                
                    <div className="row text-center" style={{marginTop: 35}}>
                        <button type="submit" onClick = {this.props.handleBack} className = "button-back">Back</button>
                        <WhiteButton type="submit" onClick = {this.props.handleContinue}>Continue</WhiteButton>
                    </div>

                </div>

                <div className="col-sm-2" style={container}>
                        <Outline/>
                    </div>
                        
            
            </div>
        );
    }
}

export default CreateListingDetails1;


const autoCompleteStyles = {
    border:0,
    outline: 0,
    background:"transparent",
    borderBottom: "1px solid darkgray",
}

const checkboxStyle = {
    marginLeft: 25,
    fontFamily: "Rubik",
    color: "#333",
    fontWeight: "300",
    marginTop: 15
};

const radioButtonStyle = {
    marginLeft: 25,
    fontFamily: "Rubik",
    color: "#333",
    fontWeight: "300",
};

const dateLabel = {
    fontFamily: "Rubik",
    color: "#333",
    fontWeight: "300",
}

const container = {
    marginTop: "100px"
}







