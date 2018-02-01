import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { Formik } from "formik"
import axios from "axios"
import swal from "sweetalert"
import Cookies from "../Cookies"

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false
		}
	}

	render() {
		const loginStyle = {
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
        };

		const formStyle = {
			marginTop: 15,
            marginLeft: 75
		};

        const submitStyle = {
            color: "#FC5B45",
            backgroundColor: "#FFF",
            borderRadius: 6,
            fontFamily: 'Rubik',
            fontWeight: "400",
            width: 200,
            marginTop: 35,
            marginLeft: 25,
            padding: 10,
			borderColor: "#FC5B45",

        };

		return (
			<div className="card">
			<div className="container text-center">
				<h1 style={loginStyle} className="text-center card-title">
					Login
				</h1>
                <h3 className="text-center" style={subHeader}>Welcome back, we missed you</h3>
				<div className="row">
					<div className="col-lg-6 col-lg-offset-3">
					<Formik
						initialValues={{
							email: "",
							password: ""
						}}
						//formik is handling our forms. It will check for valid
						//input, and then send info on click "Login" to our backend

						//makes sure valid email is entered
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
							setSubmitting(false)
							axios
								.post("http://localhost:3001/login", values)
								.then(function(response) {
									Cookies.loginUser(response.data.id, response.data.v)
									window.location.href = "/users/" + response.data.id
									return <Redirect to="/logged_in" />
								})
								.catch(function(error) {
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
							<form style={formStyle} onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-sm-7" style={formStyle}>
									<label className="pull-left" style={labels}>Email address</label>
									<input
										id="email"
										className="form-control"
										type="text"
										name="email"
										placeholder="Email"
										onChange={handleChange}
										value={values.email}
									/>
									{touched.email && errors.email && <div>{errors.email}</div>}
								</div>
								</div>
								<div className="row">
									<div className="col-sm-7" style={formStyle}>
									<label className="pull-left" style={labels}>Password</label>
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
								</div>
                                <div className="row">
                                    <div className="col-sm-10">
                                        <button className="btn" type="submit" style={submitStyle}>
                                            Log In
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

export default Login
