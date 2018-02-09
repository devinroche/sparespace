import React, { Component } from "react"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert2"
import Cookies from "../Cookies"
import {LoginHeader, SupportText, FormFormat, FormInput, FormLabel, LoginButton} from "./Styles";

class Login extends Component {

	render() {
		return (
			<div className="container text-center">
				<div className="row">
					<LoginHeader className="text-center">Login</LoginHeader>
					<SupportText className="text-center">Welcome back, we missed you</SupportText>
				</div>
				<div className="row">
					<div className="col-sm-4 col-sm-offset-4">
					<Formik
						initialValues={{
							email: "",
							password: ""
						}}
						validate={values => {
							let errors = {}
							if (!values.email) {
								errors.email = "Required"
							} else if (!values.password) {
								errors.password = "Required"
							} else if (
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
							) {
								errors.email = "Invalid email address"
							}
							return errors
						}}
						onSubmit={(values, { setSubmitting }) => {

							setSubmitting(false);
							axios
								.post("http://localhost:3001/login", values)
								.then(function(response) {
									Cookies.loginUser(response.data.id, response.data.v);
									window.location.href = "/users/" + response.data.id; //maybe use react router instead
								})
								.catch(function() {
									swal({
										title: "Login Failed!",
										text: "Your email or password is incorrect!",
										icon: "warning",
										dangerMode: true
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
						}) => (
							<FormFormat onSubmit={handleSubmit}>
									<FormLabel className="pull-left">Email address</FormLabel>
									<FormInput
										id="email"
										className="form-control"
										type="text"
										name="email"
										placeholder="Email"
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
										placeholder="Password"
										onChange={handleChange}
										value={values.password}
									/>
									{touched.password && errors.password && <div>{errors.password}</div>}
								<LoginButton className="btn" type="submit">Log In</LoginButton>
							</FormFormat>
						)}
					/>
					</div>
				</div>
			</div>
		)
	}
}

export default Login

