/**
 * Creates SignUp page
 *
 * @author George Kunthara
 * @version v0.0.1 10/06/17
 *
 * @ChangeLog
 * Initial 10/06/17 George Kunthara
 */

import React, { Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert"
import { Redirect } from "react-router-dom"
import Cookies from "../Cookies"

class SignUp extends Component {
	render() {
		//adjust login header to be more down the screen
		const loginStyle = {
			marginTop: 100
		}

		//adjust forms to have more space against login header
		const formStyle = {
			marginTop: 25
		}

		return (
			<div>
				<h1 style={loginStyle} className="text-center">
					{" "}
					Create Account{" "}
				</h1>
				<div className="container text-center">
				<div className="row">
				<div className="col-lg-6 col-lg-offset-3">
					<Formik
						initialValues={{
							fullname: "",
							password: "",
							contact: {
								email: "",
								phone: "",
								address: ""
							},
							usertype: ""
						}}
						//formik is handling our forms. It will check for valid
						//input, and then send info on click "Create Account" to our backend

						//makes sure valid email is entered
						validate={values => {
							let errors = {}
							if (!values.email) {
								errors.email = "Required"
							} else if (!values.fullname) {
								errors.fullname = "Required"
							} else if (!values.password) {
								errors.password = "Required"
							} else if (
								!/^[A-Z0-9._%+-]+@zagmail.gonzaga.edu$/i.test(values.email)
							) {
								//validate user has an email that ends with zagmail.gonzaga.edu
								errors.email =
									"Invalid email address (must end with zagmail.gonzaga.edu)"
							}
							return errors
						}}
						onSubmit={values => {
							//right now only way for accessing contact object
							//for some reason getting errors when accessing within forms...
							values.contact.email = values.email

							// TODO: validate if user is already in database
							axios.post("http://localhost:3001/users", {
								fullname: values.fullname,
								password: values.password,
								contact: {
									email: values.contact.email,
								}
							})

							swal({
								title: "Thanks for creating an account!",
								content: "Let's Go!",
								icon: "success"
							})
								//wait for user to press button then re-direct
								.then(() => {
									axios
										.post("http://localhost:3001/login", {
											email: values.contact.email,
											password: values.password
										})
										.then(function(response) {
                                            Cookies.loginUser(response.data.id, response.data.v)
                                            window.location.href = "/users/" + response.data.id
                                            return <Redirect to="/logged_in" />
										})
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
									<label className="pull-left">Name</label>
									<input
										id="fullname"
										className="form-control"
										type="fullname"
										name="fullname"
										placeholder="Ex: Billy"
										onChange={handleChange}
										value={values.fullname}
									/>
									{touched.fullname &&
										errors.fullname && <div>{errors.fullname}</div>}
								</div>
								<div className="form-group">
									<label className="pull-left">Email</label>
									<input
										id="email"
										className="form-control"
										type="email"
										name="email"
										placeholder="Email"
										onChange={handleChange}
										value={values.email}
									/>
									{touched.email && errors.email && <div>{errors.email}</div>}
								</div>
								<div className="form-group">
									<label className="pull-left">Password</label>
									<input
										id="password"
										className="form-control"
										type="password"
										name="password"
										placeholder="Password"
										onChange={handleChange}
										value={values.password}
									/>
									{touched.password &&
										errors.password && <div>{errors.password}</div>}
								</div>
								<button className="btn btn-primary" type="submit">
									Sign Up!
								</button>
							</form>
						)}
					/>
				</div>
			</div>
			</div>
			</div>
		)
	}
}

export default SignUp
