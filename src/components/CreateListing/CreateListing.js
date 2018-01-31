import React, {Component } from "react"
import { Formik } from "formik"
import swal from "sweetalert"
import { Redirect } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import Cookies from "../../Cookies"
import PlacesAutocomplete from 'react-places-autocomplete'
import axios from 'axios';


let title = ""
let description = ""
let price = ""
let location = ""

class CreateListing extends Component {
	constructor(props) {
        super(props)
        
        this.state = {
            showAddPhotos : false,
            address: ""
            
        };
        this.onChange = (address) => this.setState({ address }) //added
		this.checkLogin = this.checkLogin.bind(this)
        this.enableAddPhotos  = this.enableAddPhotos.bind(this);
    }


    enableAddPhotos() {
        return (
                <ImageUpload title= {title}
                                description= {description}
                                price={price}
                                location = {location}
                />

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

				case "viewall":
					window.location.href = "/listings"
					return <Redirect to="/listings" />

				default:
                    window.location.href = "/listings"
                    return <Redirect to="/listings" />
			  }
			})
        }

        else if(Cookies.isVerified() === false){
            swal("You need to verify your account first!" ,{buttons: 
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
                
                    axios.post('http://localhost:3001/reverify', {id: Cookies.getId()})
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

	render() {

        const inputProps = {
          value: this.state.address,
          onChange: this.onChange,
          placeholder: "1317 N Astor St Spokane, WA",
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
                                        <label className="pull-left">Price</label>
                                        <input
                                            id="price"
                                            className="form-control"
                                            type="number"
                                            name="price"
                                            placeholder="$25"
                                            onChange={handleChange}
                                            value={values.price}
                                        />
                                        {touched.price && errors.price && <div>{errors.price}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="pull-left">Description</label>
                                        <textarea
                                            id="description"
                                            rows="10"
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
                                        <label className="pull-left">Location</label>
                                        <PlacesAutocomplete inputProps={inputProps}/>
                                    </div>

                                    
                                    <button className="btn btn-primary" type="submit">Add some pictures!</button>
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
