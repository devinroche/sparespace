import React, {Component } from "react"
import { Formik } from "formik"
import swal from "sweetalert"
import { Redirect } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import Cookies from "../../Cookies"
import PlacesAutocomplete from 'react-places-autocomplete'
import axios from 'axios';


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
            address: "",
            selectedDuration: '',
            heatChecked: false,
            coverChecked: false,
            accessChecked: false,
            outletChecked: false

        };
        this.onChange = (address) => this.setState({ address })
		this.checkLogin = this.checkLogin.bind(this)
        this.enableAddPhotos  = this.enableAddPhotos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHeat = this.handleHeat.bind(this);
        this.handleCover = this.handleCover.bind(this);
        this.handleAccess = this.handleAccess.bind(this);
        this.handleOutlet = this.handleOutlet.bind(this);

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


    enableAddPhotos() {
        return (
                <ImageUpload title= {title}
                                description= {description}
                                price={price}
                                location = {location}
                                duration = {duration}
                                features = {features}
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
        };

		this.checkLogin()

        return(
                <div className="container text-center">
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
                        title = values.title
                        description = values.description
                        price = values.price
                        duration = this.state.selectedDuration
                        location = this.state.address
                        this.setState({
                            showAddPhotos : true,
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
                                                  value="heated"
                                                  checked={this.state.isChecked}
                                                  onChange={this.handleHeat}
                                            />Heated</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}><input
                                                   type="checkbox"
                                                   value="covered"
                                                   checked={this.state.isChecked}
                                                    onChange={this.handleCover}/>Covered</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}>
                                                <input type="checkbox" value="access"
                                                      checked={this.state.isChecked}
                                                      onChange={this.handleAccess}
                                                />24/7 Access</label>
                                            <label className="checkbox-inline pull-left" style={checkboxStyle}>
                                                <input type="checkbox" value="outlet"
                                                      checked={this.state.isChecked}
                                                      onChange={this.handleOutlet}
                                            />Power Outlet</label>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-sm-7">
                                            <label className="pull-left" style={labels}>Address</label>
                                            <PlacesAutocomplete styles={autoCompleteStyle} inputProps={inputProps}/>
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
                        { this.state.showAddPhotos ? this.enableAddPhotos() : null }

                </div>
                </div>
        );
    }
}

export default CreateListing;
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