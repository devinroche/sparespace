import React, { Component } from "react"
import Cookies from "../../Cookies"
import VerifiedAlert from "../Alerts/Verified"
import LoginAlert from "../Alerts/LoggedIn"
import PlacesAutocomplete from 'react-places-autocomplete'
import moment from "moment"
import { Formik } from "formik"
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput, CreateLabelFeatures, SectionDivider} from "../Styles";
import {RadioGroup, Radio} from 'react-radio-group'
var DatePicker = require("react-bootstrap-date-picker");

let title = "";
let description = "";
let price = "";
let location = "";
let features = [];

class CreateListing extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            showAddPhotos: false,
            valid_addr: true,
            address: this.props.address,
            redirectPhotos: false,
            dates: this.props.dates,
            featurez: this.props.features,
            selectedValue: "Small (5 x 5)",
            pageChange:false
        };

        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleRadioGroup = this.handleRadioGroup.bind(this);
        this.onPageChange = this.onPageChange.bind(this)



    }
    //changes address for react places autocomplete
    handleAddressChange(e) {
        
        this.setState({
            address: e,
            valid_addr: true
        })
    }
    //change for checkbox
    handleCheckbox = (e) => {
        this.setState({
          featurez: e
        });
    }
    /*
    handleCheckbox(e) {
        features = e
    }
    */
    componentDidMount() {
        
        this.checkLogin()
    }


    checkLogin() {
        if (!Cookies.isLoggedIn()) {
            return 'log'
        }
    }

    /*
    //Calendar change start
    handleSelect(date){
        this.setState({
            dates: {
                start: moment(date.startDate._d).toISOString(),
                end: moment(date.endDate._d).toISOString()
            }
        })
    }
    */

   //Handles the middle button to choose between pages 
   // forms are split between two pages
    onPageChange() {
        
        if (this.state.pageChange == true) {
            this.setState({
                pageChange:false
            })
        } else {
            this.setState({
                pageChange:true
            })
        }
    }

	//for size feature handling
	handleRadioGroup(value){
        this.setState(
            {
                selectedValue: value
            });
    }

    render() {

        const inputProps = {
            value: this.state.address,
            onChange: this.handleAddressChange,
            onClick: this.handleClick,
            placeholder: "1317 N Astor St Spokane, WA",
        };

        const onError = (status, clearSuggestions) => {
            this.setState({ valid_addr: false });
        };

        if(this.checkLogin() === 'log'){
            return <LoginAlert />
        }

        if (this.state.redirectPhotos) {
            /*
            return <Redirect to={{
                pathname: "/add_photos", query: {
                    title: { title },
                    description: { description },
                    price: { price },
                    location: { location },
                    dates: { dates },
                    features: { features },
                }
            }} />
            */
        }
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-sm-12">
                        <Formik initialValues={{
                            title: this.props.title,
                            price: this.props.price,
                            description: this.props.description,
                            size: this.props.size,
                            location: this.props.address
                        }}
                            validate={values => {
                                let errors = {}
                                if (!values.title) {
                                    errors.title = 'Required'
                                }
                                else if (!values.price) {
                                    errors.price = 'Required'
                                }
                                else if (!values.description) {
                                    errors.description = 'Required'
                                }
                                else if (!this.state.address) {
                                    errors.address = 'Required'
                                }
                                return errors
                            }}
                            onSubmit={
                                (values) => {
                                    if (this.state.valid_addr === false) {
                                        return;
                                    }
                                    title = values.title
                                    description = values.description
                                    price = values.price
                                    location = this.state.address
                                    this.props.onFormChange(values.title,values.description,values.price,this.state.address,this.state.featurez, this.state.selectedValue, this.state.dates)
                                    this.props.onPageChange(0)
                                    this.setState({
                                        redirectPhotos: true,
                                    });
                                }}
                            //render part of formik
                            render={({ values, touched, errors, handleChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>

                                
                                    <div className="row">
                                    { // if pagechange = true then show image upload page 
                                            this.state.pageChange === true ? null :
                                        <div className="col-sm-10 col-sm-offset-1">
                                        
                                            <CreateLabel className="pull-left">Title</CreateLabel>
                                            <FormStyle
                                                id="title"
                                                className="form-control"
                                                type="text"
                                                name="title"
                                                placeholder="What would you call your space? A large basement?"
                                                maxLength={35}
                                                onChange={handleChange}
                                                value={values.title}
                                            />
                                            {touched.title && errors.title && <div>{errors.title}</div>}
                                        </div>
                                    }
                                    </div>
                                    <div className="row">
                                    { // if pagechange = true then show image upload page               
                                            this.state.pageChange === true ? null :
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Description</CreateLabel>
                                            <DescriptionInput
                                                id="description"
                                                className="form-control"
                                                rows="6"
                                                name="description"
                                                placeholder="Why should people rent out your space? Any special features? Is it being shared with anyone else? What could fit in this space?"
                                                onChange={handleChange}
                                                value={values.description}
                                            />
                                            {touched.description && errors.description && <div>{errors.description}</div>}
                                        </div>
                                    }
                                    </div>

                                    
                                    <div className="container">
                                    { // if pagechange = true then show image upload page 
                                            this.state.pageChange === true ? null :
                                        <div className="col-sm-3 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Price (/mo)</CreateLabel>
                                            <PriceInput
                                                id="price"
                                                className="form-control"
                                                type="number"
                                                name="price"
                                                placeholder="Enter a price"
                                                onChange={handleChange}
                                                value={values.price}
                                                min={1}
                                                max={999}
                                            />
                                            {touched.price && errors.price && <div>{errors.price}</div>}

                                        </div>
                                    }
                                    </div>   
                                    { // if pagechange = true then show image upload page 
                                            this.state.pageChange === true ? null :
                                         <WhiteButton className="btn text-center" onClick = {this.onPageChange} type="submit">Continue</WhiteButton>
                                    }
                                        <div className="col-sm-8">
                                        { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                                <div className="row" >
                                                    <CreateLabel className="pull-left">Size</CreateLabel>
                                                </div>
                                        }
                                                

                                        <div className="col-sm-12">
                                        { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                            <RadioGroup
                                                        name="size"
                                                        selectedValue={this.state.selectedValue}
                                                        onChange={this.handleRadioGroup}>
                                                        <label  style={radioButtonStyle}><Radio value="Small (5 x 5)" style={{marginRight: 10}}/>Small (5 x 5)</label>
                                                        <label style={radioButtonStyle}><Radio value="Medium (15 x 15)" style={{marginRight: 10}} />Medium (15 x 15)</label>
                                                        <label style={radioButtonStyle}><Radio value="Large (25 x 25)" style={{marginRight: 10}}/>Large (25 x 25) </label>
                                                    </RadioGroup>
                                        }
                                            </div>
                                        </div>
                                        { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                                <SectionDivider/>
                                        }
                                    <div className="row">
                                        <div className="col-sm-4 col-sm-offset-1">
                                        { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                            <CreateLabelFeatures className="pull-left">Features</CreateLabelFeatures>
                                        }
                                        </div>
                                    </div>
                                    { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                            <CheckboxGroup name="features" value = {this.state.featurez} onChange={this.handleCheckbox} style={{ fontFamily: "Rubik"}}>
                                                <Checkbox value="Heated" style={checkboxStyle} /> Heated
                                                <Checkbox value="Covered" style={checkboxStyle} /> Covered
                                                <Checkbox value="Access" style={checkboxStyle} /> Access
                                                <Checkbox value="Power Outlet" style={checkboxStyle} /> Power Outlet
                                                <Checkbox value="Lock" style={checkboxStyle} /> Lock

                                            </CheckboxGroup>
                                    }

                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1" style={calendarStyle}>
                                        { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                            <CreateLabel className="pull-left">Dates of Availability</CreateLabel>
                                        }
                                            <div className="row">
                                            { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                                <div className="col-sm-11">
                                                    <div> 
                                                        <span>Start</span>
                                                        <DatePicker value = {this.state.dates.start} onChange={ e => this.setState({ dates:{start:moment(e)._d.toISOString(),end:this.state.dates.end} }) }  />   
                                                    </div>
                                                    
                                                    <div> 
                                                        <span>End</span>
                                                        <DatePicker value = {this.state.dates.end} onChange={ e => this.setState({ dates:{start:this.state.dates.start,end:moment(e)._d.toISOString()} }) }/>   
                                                    </div>
                                                </div>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Address</CreateLabel>
                                            <PlacesAutocomplete styles={autoCompleteStyle} inputProps={inputProps} onError={onError} />
                                            {<div>{errors.address}</div>}
                                            {
                                                this.state.valid_addr === true ? null :
                                                    <div className="alert alert-danger">Please input a valid address!</div>
                                            }
                                            { // if pagechange = true then show image upload page 
                                            this.state.pageChange === false ? null :
                                                <WhiteButton className="btn text-center" onClick = {this.onPageChange} type="submit">Back</WhiteButton>
                                            }
                                            <WhiteButton className="btn text-center" type="submit">Continue</WhiteButton>

                                        </div>
                                    }
                                    </div>

                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateListing;


const calendarStyle = {
    width: '100%'
};

const checkboxStyle = {
    marginLeft: 25,
    fontFamily: "Rubik",
    color: "#333",
    fontWeight: "300",
    marginTop: 15
};


const autoCompleteStyle = {
    input: {
        border: "none",
        boxShadow: "none",
        borderBottom: "1px solid #CCCCCC"
    },
}
const radioButtonStyle = {
    marginLeft: 25,
    fontFamily: "Rubik",
    color: "#333",
    fontWeight: "300",
};



