import React, { Component } from "react"
import swal from "sweetalert"
import ImageUpload from "./ImageUpload"
import Cookies from "../../Cookies"
import PlacesAutocomplete from 'react-places-autocomplete'
import axios from 'axios';
import { Redirect } from "react-router-dom"
import moment from "moment"
import { Formik } from "formik"
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { DateRange } from 'react-date-range';


let title = "";
let description = "";
let price = "";
let location = "";
let duration = "";
let features = [];



class CreateListing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showAddPhotos: false,
            valid_addr: true,
            address: "",
            selectedDuration: '',
            redirectPhotos: false,
            dates: {
                start: null,
                end: null
            }
        };

        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleAddressChange(e) {
        this.setState({
            address: e,
            valid_addr: true
        })
    }

    handleChange(e) {
        this.setState({ selectedDuration: e.target.value });
    }

    handleCheckbox(e) {
        features = e
    }

    componentDidMount() {
        this.checkLogin()
    }

    checkLogin() {
        if (Cookies.isLoggedIn() === false) {
            swal("Woah you must be logged in to do this!", {
                buttons: {
                    return: {
                        text: "Login",
                        value: "login",
                    },
                    view: {
                        text: "View All Listings",
                        value: "viewall",
                    }
                },
            }).then((value) => {
                switch (value) {
                    case "login":
                        window.location.href = "/login"
                        return <Redirect to="/login" />

                    case "viewall":
                        window.location.href = "/listings"
                        return <Redirect to="/listings" />

                    default:
                        window.location.href = "/listings"
                        return <Redirect to="/listings" />
                }
            })
        }

        else if (Cookies.isVerified() === false) {
            swal("You need to verify your account first!", {
                buttons:
                    {
                        return:
                            {
                                text: "Resend Verification Email",
                                value: "rve",
                            },
                        view:
                            {
                                text: "View All Listings",
                                value: "viewall",
                            }
                    },

            }).then((value) => {
                switch (value) {
                    case "rve":

                        axios.post('http://localhost:3001/reverify', { id: Cookies.getId() })
                        window.location.href = "/listings"
                        return <Redirect to="/listings" />

                    case "viewall":
                        window.location.href = "/listings"
                        return <Redirect to="/listings" />

                    default:
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

        console.log(this.state.dates)
	}

    render() {

        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            this.setState({ valid_addr: false });
        }

        this.checkLogin()
        const titleStyle = {
            fontFamily: "Rubik",
            color: "#333",
            fontWeight: "300",
            fontSize: 20,
        };
        const calendarStyle = {
            width: '100%'
        }
        const checkboxStyle = {
            marginLeft: 25,
            fontFamily: "Rubik",
            color: "#333",
            fontWeight: "300",
            marginTop: 15
        };
        const labels = {
            fontFamily: "Rubik",
            color: "#333",
            fontWeight: "300",
            fontSize: 20,
            marginTop: 40
        };

        const featuresStyles = {
            fontFamily: "Rubik",
            color: "#333",
            fontWeight: "300",
            fontSize: 20,
            marginTop: 50
        };

        const inputProps = {
            value: this.state.address,
            onChange: this.handleAddressChange,
            placeholder: "1317 N Astor St Spokane, WA",
        };
        const descriptionStyle = {
            borderRadius: 5,
            borderColor: "#CCCCCC"
        };

        const formStyle = {
            marginTop: 25,
            border: "none",
            boxShadow: "none",
            borderBottom: "1px solid #CCCCCC"
        };

        const autoCompleteStyle = {
            input: {
                border: "none",
                boxShadow: "none",
                borderBottom: "1px solid #CCCCCC"
            },
        };


        const submitStyle = {
            color: "#FC5B45",
            backgroundColor: "#FFF",
            borderRadius: 4,
            fontFamily: 'Rubik',
            fontWeight: "400",
            width: 150,
            marginTop: 200,
            padding: 10,
            borderColor: "#FC5B45"
        };

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
                            duration: '',
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
                                    if (this.state.valid_addr == false) {
                                        return;
                                    }
                                    title = values.title
                                    description = values.description
                                    price = values.price
                                    duration = this.state.selectedDuration
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
                                            <label className="pull-left" style={titleStyle}>Title</label>
                                            <input
                                                id="title"
                                                style={formStyle}
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
                                            <label className="pull-left" style={labels}>Description</label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                rows="6"
                                                style={descriptionStyle}
                                                name="description"
                                                placeholder="Tell us why your basement is the best and why tons of people are gonna wanna start getting in contact with you about your space."
                                                onChange={handleChange}
                                                value={values.description}
                                            />
                                            {touched.description && errors.description && <div>{errors.description}</div>}
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label className="pull-left" style={labels}>Price</label>
                                            <input
                                                id="price"
                                                className="form-control"
                                                type="number"
                                                name="price"
                                                placeholder="Enter a price"
                                                style={formStyle}
                                                onChange={handleChange}
                                                value={values.price}
                                            />
                                            {touched.price && errors.price && <div>{errors.price}</div>}
                                        </div>

                                        <div className="col-sm-7 col-sm-offset-1">
                                            <div className="row"><label className="pull-left" style={featuresStyles}>Features</label></div>
                                            <div className="row">
                                                <CheckboxGroup name="features" onChange={this.handleCheckbox} style={{ fontFamily: "Rubik" }}>
                                                    <Checkbox value="Heated" style={checkboxStyle} /> Heated
                                                    <Checkbox value="Covered" style={checkboxStyle} /> Covered
                                                    <Checkbox value="Access" style={checkboxStyle} /> Access
                                                    <Checkbox value="Power Outlet" style={checkboxStyle} /> Power Outlet
                                                </CheckboxGroup>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12" styles={calendarStyle}>
                                        <div className="row"><label className="pull-left" style={featuresStyles}>Dates of Availability</label></div>
                                        <div className="row">
                                            <DateRange onInit={this.handleSelect.bind(this)} onChange={this.handleSelect.bind(this)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-7">
                                            <label className="pull-left" style={labels}>Address</label>
                                            <PlacesAutocomplete styles={autoCompleteStyle} inputProps={inputProps} onError={onError} />
                                            {
                                                this.state.valid_addr == true ? null :
                                                    <div className="alert alert-danger">Please input a valid address!</div>
                                            }
                                        </div>

                                    </div>



                                    <div className="row">
                                        <div className="col-sm-7">
                                            <button className="btn text-center" type="submit" style={submitStyle}>Continue</button>
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