import React, { Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert2"
import { Redirect } from "react-router-dom"
import Cookies from "../Cookies"
import {LoginHeader, SupportText, FormFormat, FormInput, FormLabel, SignUpButton} from "./Styles";


class SignUp extends Component {

	render() {

		return (
			<div className="container text-center">
                <div className="row">
					<LoginHeader className="text-center">Create Your Account</LoginHeader>
					<SupportText className="text-center">First we need to know a little bit about you</SupportText>
				</div>
				<div className="row">
					<div className="col-sm-4 col-sm-offset-4">
					<Formik
						initialValues={{
							first: "",
							last: "",
							password: "",
							confirm: "",
							contact: {
								email: "",
								phone: "",
								address: ""
							}
						}}
						validate={values => {
							let errors = {};
							if (!values.email) {
								errors.email = "Required"
							} else if (!values.first) {
								errors.first = "Required"
							}
                            else if (!values.last) {
                                errors.last = "Required"
                            }
                            else if (!values.confirm) {
                                errors.confirm = "Required"
                            }
                            else if (values.confirm !== values.password){
								errors.confirm = "Passwords do not match!!"
							}
							else if (!values.password) {
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

							axios.post("http://localhost:3001/users", {
                                first: values.first,
                                last: values.last,
								password: values.password,
                                email: values.email,
							}).then((response) => { // Check the response good/bad
								if (response.data.errors) { // if account cant be created 
									swal({
										title: "That email is already in use!",
										content: "Log in!",
										icon: "success"
									}).then(() => { // redirect to login page
										window.location.href = "/login"
                                        return <Redirect to="/login" />
									});
								} else { // if account can be created
									swal({
										title: "Thanks for creating an account!",
										content: "Let's Go!",
										icon: "success"
									}).then(() => {
										axios.post("http://localhost:3001/login", {
											email: values.email,
											password: values.password
										})
										.then(function(response) {
											Cookies.loginUser(response.data.id, response.data.v)
											window.location.href = "/users/" + response.data.id
											return <Redirect to="/logged_in" />
										})
									})
								}
								
							});
							swal(
								"Email Verification Required",
								"Please check your email to verify your account",
								"warning"
							).then(() => {
                                axios
                                    .post("http://localhost:3001/login", {
                                        email: values.email,
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
							handleSubmit
						}) => (
							<FormFormat onSubmit={handleSubmit}>
										<FormLabel className="pull-left">First Name</FormLabel>
										<FormInput
											id="first"
											className="form-control"
											type="text"
											name="first"
											onChange={handleChange}
											value={values.first}
										/>
										{touched.first && errors.first && <div>{errors.first}</div>}
										<FormLabel className="pull-left">Last Name</FormLabel>
										<FormInput
											id="last"
											className="form-control"
											type="text"
											name="last"
											onChange={handleChange}
											value={values.last}
										/>
										{touched.last && errors.last && <div>{errors.last}</div>}
										<FormLabel className="pull-left">Email</FormLabel>
										<FormInput
											id="email"
											className="form-control"
											type="email"
											name="email"
											onChange={handleChange}
											value={values.email}
										/>
										{touched.email && errors.email && <div>{errors.email}</div>}
										<FormLabel className="pull-left">Password</FormLabel>
										<FormInput
											id="password"
											className="form-control"
											type="password"
											name="password"
											onChange={handleChange}
											value={values.password}
										/>
										{touched.password && errors.password && <div>{errors.password}</div>}
										<FormLabel className="pull-left">Confirm Password</FormLabel>
										<FormInput
											id="confirm"
											className="form-control"
											type="password"
											name="confirm"
											onChange={handleChange}
											value={values.confirm}
										/>
										{touched.confirm && errors.confirm && <div>{errors.confirm}</div>}
									<SignUpButton className="btn" type="submit">Confirm</SignUpButton>
							</FormFormat>
						)}
					/>
					</div>
				</div>
			</div>
		)
	}
}

export default SignUp
