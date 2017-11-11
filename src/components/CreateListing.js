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

import React, { Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert"
import { Switch, Link, Route, Redirect } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import Cookies from "../Cookies"

class CreateListing extends Component {
	constructor(props) {
		super(props)

		this.checkLogin = this.checkLogin.bind(this)
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
				  swal("Got away safely!");
				  break;
			  }
			})
		}
	}

	render() {
		this.checkLogin()

		const loginStyle = {
			marginTop: 100
		}

		const formStyle = {
			marginTop: 25
		}

		return (
			<div>
				<h1 style={loginStyle} className="text-center">
					{" "}
					Create a Listing!
				</h1>
				<div className="container text-center">
					<Formik
						initialValues={{
							title: "",
							price: "",
							description: ""
						}}
						validate={values => {
							let errors = {}
							if (!values.title) {
								errors.title = "Required"
							} else if (!values.price) {
								errors.price = "Required"
							} else if (!values.description) {
								errors.description = "Required"
							}
							return errors
						}}
						onSubmit={values => {
							{
								/*<Route path="/add_photos" render={(props) =>*/
							}
							{
								/*(<ImageWrapper hostid = "123456785"*/
							}
							{
								/*title = {values.title}*/
							}
							{
								/*price = {values.price}*/
							}
							{
								/*description={values.description}/>)}/>*/
							}

							//
							{
								/*<Route path="/add_photos" component={ImageUpload}/>*/
							}

							axios.post("http://localhost:3001/listings", {
								hostid: "123455786",
								title: values.title,
								price: values.price,
								description: values.description
							})
							swal({
								title: "You made a Listing!",
								content: "Nice!!",
								icon: "success"
							})
						}}
						//render is actually rendering the form for the user to see
						render={({
							values,
							touched,
							errors,
							handleChange,
							handleSubmit,
							isSubmitting
						}) => (
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
										placeholder="summer"
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
									{touched.description &&
										errors.description && <div>{errors.description}</div>}
								</div>
								<Link to="/add_photos">
									<button className="btn btn-default" type="submit">
										Create Listing!
									</button>
								</Link>
								{/*<button className="btn btn-default" type="submit">Create Listing!</button>*/}
							</form>
						)}
					/>
				</div>
			</div>
		)
	}
}

export default CreateListing
