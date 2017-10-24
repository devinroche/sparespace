/**
 * Creates CreateListing page
 *
 * @author George Kunthara
 * @version v0.0.1 10/23/17
 *
 * @ChangeLog
 * Initial 10/23/17 George Kunthara
 */


import React, { Component } from "react";
import { Formik } from 'formik'
import axios from 'axios'
import swal from 'sweetalert';
import Yup from 'yup';

class CreateListing extends Component {

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
                <h1 style={loginStyle} className="text-center"> Create a Listing!</h1>
                <div className="container text-center">
                    <Formik initialValues={{
                        title: '',
                        duration: '',
                        description: ''
                    }}
                        //formik is handling our forms. It will check for valid
                        //input, and then send info on click "Create Account" to our backend


                        //makes sure valid email is entered
                            validate={values => {

                                let errors = {}
                                if (!values.title) {
                                    errors.title = 'Required'
                                }
                                else if (!values.duration) {
                                    errors.duration = 'Required'
                                }
                                else if (!values.description) {
                                    errors.description = 'Required'
                                }
                                return errors
                            }}

                            onSubmit={(values) => {

                                axios.post('localhost:3001/u/listing', {
                                    hostid: "123455786",
                                    title: values.title,
                                    duration: values.duration,
                                    description: values.description
                                })
                                swal({
                                    title: "You made a Listing!",
                                    content: "Nice!!",
                                    icon: "success"
                                })
                            }}

                        //render is actually rendering the form for the user to see
                            render={({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) =>
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
                                        <label className="pull-left">Duration</label>
                                        <input
                                            id="duration"
                                            className="form-control"
                                            type="duration"
                                            name="duration"
                                            placeholder="summer"
                                            onChange={handleChange}
                                            value={values.duration}
                                        />
                                        {touched.duration && errors.duration && <div>{errors.duration}</div>}
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
                                        {touched.description && errors.description && <div>{errors.description}</div>}
                                    </div>
                                    <button className="btn btn-default" type="submit">Create Listing!</button>
                                </form>}
                    />
                </div>
            </div>

        );
    }
}

CreateListing.contextTypes = {
    router: React.PropTypes.func.isRequired
};


export default CreateListing;
