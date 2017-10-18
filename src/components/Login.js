/**
 * Creates Login Page
 *
 * @author George Kunthara
 * @version v0.0.1 10/02/17
 *
 * @ChangeLog
 *
 * Initial 10/02/17 George Kunthara
 * Validate User 10/05/17 Devin Roche
 *
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import swal from 'sweetalert';



class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
        };
    }

  render() {
    console.log("inside render", this.context.router);
    const loginStyle = {
      marginTop: 100
      //adjust login header to be more down the screen
    };

    //adjust forms to have more space against login header
    const formStyle = {
      marginTop: 25
    };

    return (
      <div>
        <h1 style={loginStyle} className="text-center">
          {" "}
          Login{" "}
        </h1>
        <div className="container text-center">
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            //formik is handling our forms. It will check for valid
            //input, and then send info on click "Login" to our backend

            //makes sure valid email is entered
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (!values.password) {
                errors.password = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
              //add a little time delay
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
              axios
                .post("http://localhost:3001/login", values)
                .then(function (response) {
                  console.log("You're logged in!");
                  //return this.context.router.history.replace("/logged_in");
                  console.log(response.data[0]._id)
                  window.location.href = "/users/" + response.data[0]._id
                  //return <Redirect to="/logged_in" />;
                })
                .catch(function (error) {
                    console.log("Invalid log in!");
                    //if incorrect login, add a JS alert (using sweetalert)
                    swal({
                        title: "Login Failed!",
                        text: "Your email or password is incorrect!",
                        icon: "warning",
                        dangerMode: true,
                    })
                });

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
                    <label className="pull-left">Email address</label>
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
                  <button className="btn btn-default" type="submit">
                    Login
                </button>
                </form>
              )}
          />
        </div>
      </div>
    );
  }
}


Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Login;
