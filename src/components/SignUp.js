import React, { Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert"
import { Redirect } from "react-router-dom"
import Cookies from "../Cookies"

class SignUp extends Component {
	render() {

		const SignUpHeader = {
			marginTop: 50,
			fontFamily: 'Rubik',
			color: "#FC5B45",
			fontWeight: "400"
		};

		const subHeader = {
            fontFamily: 'Rubik',
            color: "#747272",
            fontWeight: "300",
			fontSize: 20
		};

		const labels = {
            fontFamily: 'Rubik',
            color: "#333",
            fontWeight: "400"
		}

		const formStyle = {
			marginTop: 10,
			marginLeft: 75
		};

		const submitStyle = {
            color: "#FFF",
			backgroundColor: "#FC5B45",
			border: "none",
			borderRadius: 6,
			fontFamily: 'Rubik',
			fontWeight: "300",
			width: 200,
			marginTop: 25,
			marginLeft: 20,
			padding: 10

		};

		return (
			<div>
				<h1 style={SignUpHeader} className="text-center">
					Create Your Account
				</h1>
				<h3 className="text-center" style={subHeader}>First we need to know a little bit about you</h3>
				<div className="container text-center">
				<div className="row">
				<div className="col-lg-6 col-lg-offset-3">
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
						//formik is handling our forms. It will check for valid
						//input, and then send info on click "Create Account" to our backend

						//makes sure valid email is entered
						validate={values => {
							let errors = {}
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
							})

							swal({
								title: "Thanks for creating an account!",
								content: "Let's Go!",
								icon: "success"
							}).then(() => {
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
							<form style={formStyle} onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-sm-6" style={formStyle}>
										<label className="pull-left" style={labels}>First Name</label>
										<input
											id="first"
											className="form-control"
											type="text"
											name="first"
											onChange={handleChange}
											value={values.first}
										/>
										{touched.first &&
											errors.first && <div>{errors.first}</div>}
									</div>
								</div>
                                <div className="row">
									<div className="col-sm-6" style={formStyle}>
										<label className="pull-left" style={labels}>Last Name</label>
										<input
											id="last"
											className="form-control"
											type="text"
											name="last"
											onChange={handleChange}
											value={values.last}
										/>
										{touched.last &&
										errors.last && <div>{errors.last}</div>}
                                    </div>
                                </div>
								<div className="row">
									<div className="col-sm-6" style={formStyle}>
										<label className="pull-left" style={labels}>Email</label>
										<input
											id="email"
											className="form-control"
											type="email"
											name="email"
											onChange={handleChange}
											value={values.email}
										/>
										{touched.email && errors.email && <div>{errors.email}</div>}
										</div>
								</div>
								<div className="row">
									<div className="col-sm-6" style={formStyle}>
										<label className="pull-left" style={labels}>Password</label>
										<input
											id="password"
											className="form-control"
											type="password"
											name="password"
											onChange={handleChange}
											value={values.password}
										/>
										{touched.password &&
											errors.password && <div>{errors.password}</div>}
									</div>
								</div>
                                <div className="row">
									<div className="col-sm-6" style={formStyle}>
										<label className="pull-left" style={labels}>Confirm Password</label>
										<input
											id="confirm"
											className="form-control"
											type="password"
											name="confirm"
											onChange={handleChange}
											value={values.confirm}
										/>
										{touched.confirm &&
										errors.confirm && <div>{errors.confirm}</div>}
									</div>
                                </div>
								<div className="row">
									<div className="col-sm-9">
									<button className="btn" type="submit" style={submitStyle}>
										Confirm
									</button>
									</div>
								</div>

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
