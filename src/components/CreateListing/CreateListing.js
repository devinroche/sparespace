import React, { Component } from "react"
import swal from "sweetalert2"
import Cookies from "../../Cookies"
import PlacesAutocomplete from 'react-places-autocomplete'
import { Redirect } from "react-router-dom"
import moment from "moment"
import { Formik } from "formik"
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { DateRange } from 'react-date-range';
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput} from "../Styles";

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
            address: "",
            redirectPhotos: false,
            dates: {
                start: null,
                end: null
            }
        };

        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleAddressChange(e) {
        this.setState({
            address: e,
            valid_addr: true
        })
    }

    handleCheckbox(e) {
        features = e
    }

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin() {
        if (Cookies.isLoggedIn() === false) {
            swal({
                title: 'Not logged in',
                text: "You must be logged in to create a listing!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login',
                cancelButtonText: 'View Listings',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                reverseButtons: true
              }).then((result) => {
                if (result.value) {
                    window.location.href = "/login"
					return <Redirect to="/login" />
                    
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    window.location.href = "/listings"
					return <Redirect to="/listings" />
                }
              })   
        }
    }

    handleSelect(date){
        this.setState({
            dates: {
                start: moment(date.startDate._d).toISOString(),
                end: moment(date.endDate._d).toISOString()
            }
        })
	}

    render() {

        const inputProps = {
            value: this.state.address,
            onChange: this.handleAddressChange,
            placeholder: "1317 N Astor St Spokane, WA",
        };

        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            this.setState({ valid_addr: false });
        };

        this.checkLogin();

        if (this.state.redirectPhotos) {
            let dates = this.state.dates
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
        }
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Formik initialValues={{
                            title: '',
                            price: '',
                            description: '',
                            location: ''
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
                                    this.setState({
                                        redirectPhotos: true,
                                    });
                                }}
                            //render part of formik
                            render={({ values, touched, errors, handleChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Title</CreateLabel>
                                            <FormStyle
                                                id="title"
                                                className="form-control"
                                                type="text"
                                                name="title"
                                                placeholder="Spacious Basement"
                                                onChange={handleChange}
                                                value={values.title}
                                            />
                                            {touched.title && errors.title && <div>{errors.title}</div>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Description</CreateLabel>
                                            <DescriptionInput
                                                id="description"
                                                className="form-control"
                                                rows="6"
                                                name="description"
                                                placeholder="Tell us why your basement is the best and why tons of people are gonna wanna start getting in contact with you about your space."
                                                onChange={handleChange}
                                                value={values.description}
                                            />
                                            {touched.description && errors.description && <div>{errors.description}</div>}
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-4 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Price</CreateLabel>
                                            <PriceInput
                                                id="price"
                                                className="form-control"
                                                type="number"
                                                name="price"
                                                placeholder="Enter a price"
                                                onChange={handleChange}
                                                value={values.price}
                                            />
                                            {touched.price && errors.price && <div>{errors.price}</div>}
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="row"><CreateLabel className="pull-left">Features</CreateLabel></div>
                                                <CheckboxGroup name="features" onChange={this.handleCheckbox} style={{ fontFamily: "Rubik"}}>
                                                    <Checkbox value="Heated" style={checkboxStyle} /> Heated
                                                    <Checkbox value="Covered" style={checkboxStyle} /> Covered
                                                    <Checkbox value="Access" style={checkboxStyle} /> Access
                                                    <Checkbox value="Power Outlet" style={checkboxStyle} /> Power Outlet
                                                </CheckboxGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1" style={calendarStyle}>
                                            <CreateLabel className="pull-left">Dates of Availability</CreateLabel>
                                            <div className="row">
                                                <div className="col-sm-11">
                                                    <DateRange onInit={this.handleSelect.bind(this)} onChange={this.handleSelect.bind(this)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <CreateLabel className="pull-left">Address</CreateLabel>
                                            <PlacesAutocomplete styles={autoCompleteStyle} inputProps={inputProps} onError={onError} />
                                            {
                                                this.state.valid_addr === true ? null :
                                                    <div className="alert alert-danger">Please input a valid address!</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-10 col-sm-offset-1">
                                            <WhiteButton className="btn text-center" type="submit">Continue</WhiteButton>
                                        </div>
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
};



