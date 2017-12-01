/**
 * Creates CreateListing page
 *
 * @author George Kunthara
 * @version v0.0.1 10/23/17
 *
 * @ChangeLog
 * Initial 10/23/17 George Kunthara
 * Photos 11/6/17 George Kunthara
 */

import React, {Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert"
import { Switch, Link, Route, Redirect } from "react-router-dom"
import ImageUploadNew from "./ImageUploadNew"
import Cookies from "../Cookies"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

let title = ""
let description = ""
let price = ""
let location = ""

class CreateListing extends Component {
	constructor(props) {
        super(props)
        
        this.state = {
            showAddPhotos : false,
            address: 'San Francisco, CA' //aded
        };
        this.onChange = (address) => this.setState({ address }) //added
		this.checkLogin = this.checkLogin.bind(this)
        this.enableAddPhotos  = this.enableAddPhotos.bind(this);
    }


    enableAddPhotos() {
        return (
            <div className= 'container'>
                <ImageUploadNew title= {title}
                                description= {description}
                                price={price}
                                location = {location}
                />
            </div>

        )
    }

	componentDidMount() {
		this.checkLogin()
	}

	checkLogin() {
		if (Cookies.isLoggedIn() === false) {
			swal("Woah you must be logged in to do this!" ,{buttons: {
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
					break;

				case "viewall":
					window.location.href = "/listings"
					return <Redirect to="/listings" />
					break;

				default:
                    window.location.href = "/listings"
                    return <Redirect to="/listings" />
				  break;
			  }
			})
		}
	}

	render() {

        const inputProps = {
          value: this.state.address,
          onChange: this.onChange,
        }

		this.checkLogin()

		const loginStyle = {
			marginTop: 100
		}

		const formStyle = {
			marginTop: 25
        }

        return(
            <div> 
                <h1 style={loginStyle} className="text-center"> Create a Listing!</h1> 
                <div className="container text-center"> 
                <div className="row">
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
                        title = values.title
                        description = values.description
                        price = values.price
                        location = this.state.address
                        this.setState({
                            showAddPhotos : true,
                        });
                }}
                        //render part of formik
                            render={({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) =>
                            <div className="col-lg-6 col-lg-offset-3">
                                <form style={formStyle} onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="pull-left">Title</label>
                                        <input
                                            id="title"
                                            className="form-control"
                                            type="title"
                                            name="title"
                                            placeholder="Beautiful Basement"
                                            onChange={handleChange}
                                            value={values.title}
                                        />
                                        {touched.title && errors.title && <div>{errors.title}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="pull-left">price</label>
                                        <input
                                            id="price"
                                            className="form-control"
                                            type="price"
                                            name="price"
                                            placeholder="$25"
                                            onChange={handleChange}
                                            value={values.price}
                                        />
                                        {touched.price && errors.price && <div>{errors.price}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="pull-left">Description</label>
                                        <input
                                            id="description"
                                            className="form-control"
                                            type="description"
                                            name="description"
                                            placeholder="This place is awesome..."
                                            onChange={handleChange}
                                            value={values.description}
                                        />
                                        {touched.description && errors.description && <div>{errors.description}</div>}
                                    </div>

                                    <div className="form-group">
                                        <label className="pull-left">location</label>
                                        <PlacesAutocomplete inputProps={inputProps}/>
                                    </div>

                                    
                                    <button className="btn btn-primary" type="submit">Add some pix!</button>
                                </form>
                                { this.state.showAddPhotos ? this.enableAddPhotos() : null }
                                </div>
                                }
                    />
                </div>
                </div>
            </div>
        );
    }
}

export default CreateListing;
