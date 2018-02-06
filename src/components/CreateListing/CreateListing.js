import React, {Component } from "react"
import { Formik } from "formik"
import swal from "sweetalert"
import { Redirect } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import Cookies from "../../Cookies"
import PlacesAutocomplete from 'react-places-autocomplete'
import axios from 'axios';
import {Link, Route, Switch} from "react-router-dom";


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
            showAddPhotos : false,
            valid_addr: true,
            address: "",
            selectedDuration: '',
            heatChecked: false,
            coverChecked: false,
            accessChecked: false,
            outletChecked: false,
            redirectPhotos: false,
        };
        //this.onChange = (address) => this.setState({ address })
        this.handleAddressChange = this.handleAddressChange.bind(this)
		this.checkLogin = this.checkLogin.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleHeat = this.handleHeat.bind(this);
        this.handleCover = this.handleCover.bind(this);
        this.handleAccess = this.handleAccess.bind(this);
        this.handleOutlet = this.handleOutlet.bind(this);

    }

    handleAddressChange(e) {
        this.setState({
            address:e,
            valid_addr:true
        })
    }

    handleChange(e) {

        this.setState({selectedDuration: e.target.value});
    }

    handleHeat(e) {

        this.setState({
            heatChecked: !this.state.heatChecked
        });

	    if(!this.state.heatChecked){
	        features.push(e.target.value)
        }

    }

    handleCover(e) {

        this.setState({
            coverChecked: !this.state.coverChecked
        });

        if(!this.state.coverChecked){
            features.push(e.target.value)
        }
    }

    handleAccess(e) {

        this.setState({
            accessChecked: !this.state.accessChecked
        });

        if(!this.state.accessChecked){
            features.push(e.target.value)
        }
    }

    handleOutlet(e) {

        this.setState({
            outletChecked: !this.state.outletChecked
        });

        if(!this.state.outletChecked){
            features.push(e.target.value)
        }
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

        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            this.setState({valid_addr:false});
        }

        const ImageUploadPage = (props) => {
            return (
                <ImageUpload
                    title= {title}
                    description= {description}
                    price={price}
                    location = {location}
                    duration = {duration}
                    features = {features}
                    {...props}
                />
            );
        };


        const titleStyle = {
            fontFamily: "Rubik",
            color: "#333",
            fontWeight: "300",
            fontSize: 20,
        };

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

		this.checkLogin()

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
                borderBottom: "1px solid #CCCCCC" },
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

        if(this.state.redirectPhotos){
            return <Redirect to={{
                pathname: "/add_photos", query: {
                    title: {title},
                    description: {description},
                    price: {price},
                    location: {location},
                    duration: {duration},
                    features: {features}
                }
            }}/>
        }
        return(


                <div className="container text-center">
                    {/*<Switch>*/}
                        {/*<Route path="/add_photos" render={props => <ImageUpload*/}
                            {/*{...props}*/}
                            {/*title= {title}*/}
                            {/*description= {description}*/}
                            {/*price={price}*/}
                            {/*location = {location}*/}
                            {/*duration = {duration}*/}
                            {/*features = {features}*/}
                             {/*/>} />*/}
                    {/*</Switch>*/}
                    <div className="row">
                        <div className="col-sm-9 col-sm-offset-3">
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
                            redirectPhotos : true,
                        });
                }}
                        //render part of formik
                            render={({ values, touched, errors, handleChange, handleSubmit}) => (

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-7">
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
                                        <div className="col-sm-7">
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
                                        <div className="col-sm-3">
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

                                        <div className="col-sm-3 col-sm-offset-1">
                                            <label className="pull-left" style={labels}>Duration</label>
                                            <select required value={this.state.selectedDuration}
                                                    onChange={this.handleChange}
                                                    className="form-control" id="duration">
                                                <option value="" selected disabled hidden>Select...</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-7">
                                            <label className="pull-left" style={featuresStyles}>Features</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-7">
                                            <label className="checkbox-inline pull-left" style={{fontFamily: "Rubik",
                                                color: "#333",
                                                fontWeight: "300", marginTop: 15}}>
                                                <input type="checkbox"
                                                  value="Heated"
                                                  checked={this.state.isChecked}
                                                  onChange={this.handleHeat}
                                            />Heated</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}><input
                                                   type="checkbox"
                                                   value="Covered"
                                                   checked={this.state.isChecked}
                                                    onChange={this.handleCover}/>Covered</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}>
                                                <input type="checkbox" value="Access"
                                                      checked={this.state.isChecked}
                                                      onChange={this.handleAccess}
                                                />24/7 Access</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}>
                                                <input type="checkbox" value="Outlet"
                                                      checked={this.state.isChecked}
                                                      onChange={this.handleOutlet}
                                            />Power Outlet</label>
                                        </div>
                                    </div>


                                    <div className="row form-group">
                                        <div className="col-sm-7">
                                            <label className="pull-left" style={labels}>Address</label>
                                            <PlacesAutocomplete styles={autoCompleteStyle} inputProps={inputProps} onError={onError}/>
                                            {
                                            this.state.valid_addr == true ? null:
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
