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
            onChange: this.props.handleAddressChange,
          }
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label >Features</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            <CheckboxGroup name="features" value = {this.props.features } onChange={this.props.handleFeatureChange} >
                                                <Checkbox value="Heated"  /> Heated
                                                <Checkbox value="Covered"  /> Covered
                                                <Checkbox value="Access"  /> Access
                                                <Checkbox value="Power Outlet"  /> Power Outlet
                                                <Checkbox value="Lock"  /> Lock
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
                                                        <label  ><Radio value="Small (5 x 5)" style={{marginRight: 10}}/>Small (5 x 5)</label>
                                                        <label ><Radio value="Medium (15 x 15)" style={{marginRight: 10}} />Medium (15 x 15)</label>
                                                        <label ><Radio value="Large (25 x 25)" style={{marginRight: 10}}/>Large (25 x 25) </label>
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
                        inputProps={inputProps}/>
                    </div>
                    <button type="submit" onClick = {this.props.handleBack} className="btn btn-primary">Back</button>
                    <button type="submit" onClick = {this.props.handleContinue} className="btn btn-primary">Continue</button>
                </form>
            
            </div>
        );
    }
}

export default CreateListingDetails1;





