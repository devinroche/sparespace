import React, { Component } from "react";
import { Formik } from 'formik'

class Login extends Component {
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
                <h1 style={loginStyle} className="text-center"> Login </h1>
                    <div className="container text-center">
                        <Formik initialValues={{
                            email: '',
                            password: ''
                        }}
                                //formik is handling our forms. It will check for valid
                                //input, and then send info on click "Login" to our backend


                        //makes sure valid email is entered
                        validate={values => {

                            let errors = {}
                            if (!values.email) {
                                errors.email = 'Required'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = 'Invalid email address'
                            }
                            return errors
                        }}

                         onSubmit={(values, actions) => {
                             //LoginToMyApp(values) make request to backend
                                console.log(values)
                                    // .then(
                                    //     user => {
                                    //         console.log("you logged in!")
                                    //     },
                                    //     errors => {
                                    //         console.log("BAD LOGIN!!")
                                    //     }
                                    // )
                         }}

                                //render is actually rendering the form for the user to see
                        render={({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) =>
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
                                    {touched.password && errors.password && <div>{errors.password}</div>}
                                </div>
                                <button className="btn btn-default" type="submit">Login</button>
                            </form>}
                        />
                    </div>
            </div>

        );
    }
}


export default Login;
