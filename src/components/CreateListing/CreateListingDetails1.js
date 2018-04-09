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
                <form>
                    <div className="form-group">
                        <label >Features</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            <CheckboxGroup name="features" value = {this.props.features } onChange={this.props.handleFeatureChange} >
                                <Checkbox className = "check-box-input" value="Heated"  /> Heated
                                <Checkbox className = "check-box-input" value="Covered"  /> Covered
                                <Checkbox className = "check-box-input" value="Access"  /> Access
                                <Checkbox className = "check-box-input" value="Power Outlet"  /> Power Outlet
                                <Checkbox className = "check-box-input" value="Lock"  /> Lock
                            </CheckboxGroup>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label >Size</label>
                        <div className="input-group mb-3">
                        <RadioGroup

                            name = "size"
                            selectedValue = {this.props.size} onChange={this.props.handleSizeChange}>
                            <label  ><Radio value="Small (5 x 5)" className = "radio-but-input"/>Small (5 x 5)</label>
                            <label ><Radio value="Medium (15 x 15)" className = "radio-but-input" />Medium (15 x 15)</label>
                            <label ><Radio value="Large (25 x 25)" className = "radio-but-input"/>Large (25 x 25) </label>
                        </RadioGroup>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>duration</label>
                        <div> 
                            <span>Start</span>
                                <DatePicker value = {this.props.duration.start} minDate = {new Date().toISOString()} onChange = {this.props.handleStartChange} />   
                        </div>
                                                    
                        <div> 
                            <span>End</span>
                            <DatePicker value = {this.props.duration.end} minDate = {new Date().toISOString()} onChange = {this.props.handleEndChange}/>   
                        </div>
                    </div>
                    <div className = "form-group">
                        <label >Address</label>
                        <PlacesAutocomplete 
                        styles = {autoCompleteStyles}
                        inputProps={inputProps}/>
                        {
                            this.props.addressE === false ? null:
                                <h1 className = "text-danger">Invalid Address</h1>
                        }
                    </div>
                    <div className = "button-div">
                        <button type="submit" onClick = {this.props.handleBack} className = "button-back">Back</button>
                        <button type="submit" onClick = {this.props.handleContinue} className = "button-continue">Continue</button>
                    </div>
                </form>
            
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
    width: "100%"
}




